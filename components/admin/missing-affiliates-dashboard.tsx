"use client";

import type { SiteAffiliateInventoryRow } from "@/lib/affiliate-inventory";
import {
  getAffiliateStatuses,
  saveAffiliateStatus,
  syncAffiliateOverrideCookieFromStore,
  type AffiliateWorkflowKind,
  type AffiliateWorkflowRecord,
} from "@/lib/affiliate-status-store";
import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type TierBuckets = {
  tier1: SiteAffiliateInventoryRow[];
  tier2: SiteAffiliateInventoryRow[];
  tier3: SiteAffiliateInventoryRow[];
};

type ListFilter = "all" | "approved" | "applied" | "missing";

function workflowBadgeClasses(status: AffiliateWorkflowKind): string {
  switch (status) {
    case "researching":
      return "bg-sky-500/15 text-sky-300 border-sky-500/25";
    case "applied":
      return "bg-amber-500/15 text-amber-300 border-amber-500/25";
    case "approved":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/25";
    case "rejected":
      return "bg-red-500/15 text-red-300 border-red-500/25";
    default:
      return "bg-zinc-500/15 text-zinc-400 border-white/10";
  }
}

function cardOutlineClasses(status: AffiliateWorkflowKind): string {
  switch (status) {
    case "approved":
      return "border-emerald-500/50 bg-emerald-500/[0.07] shadow-[0_0_24px_-8px_rgba(16,185,129,0.35)]";
    case "applied":
      return "border-amber-500/40 bg-amber-500/[0.06]";
    case "researching":
      return "border-sky-500/40 bg-sky-500/[0.05]";
    case "rejected":
      return "border-white/5 opacity-50";
    default:
      return "border-white/5 bg-[#11161c]";
  }
}

function TierSection({
  title,
  subtitle,
  accentClass,
  entries,
  renderCard,
}: {
  title: string;
  subtitle: string;
  accentClass: string;
  entries: SiteAffiliateInventoryRow[];
  renderCard: (entry: SiteAffiliateInventoryRow) => ReactNode;
}) {
  if (entries.length === 0) return null;
  return (
    <div>
      <div className="mb-4">
        <h2 className={cn("text-xl font-medium tracking-tight", accentClass)}>
          {title}
        </h2>
        <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((e) => (
          <div key={e.slug}>{renderCard(e)}</div>
        ))}
      </div>
    </div>
  );
}

function bucketByTier(rows: SiteAffiliateInventoryRow[]): TierBuckets {
  const tier1: SiteAffiliateInventoryRow[] = [];
  const tier2: SiteAffiliateInventoryRow[] = [];
  const tier3: SiteAffiliateInventoryRow[] = [];
  for (const r of rows) {
    if (r.tier === "tier1") tier1.push(r);
    else if (r.tier === "tier2") tier2.push(r);
    else tier3.push(r);
  }
  return { tier1, tier2, tier3 };
}

export function MissingAffiliatesDashboard({
  inventory,
}: {
  inventory: SiteAffiliateInventoryRow[];
}) {
  const [statusBySlug, setStatusBySlug] = useState<
    Record<string, AffiliateWorkflowRecord>
  >({});
  const [linkDraftBySlug, setLinkDraftBySlug] = useState<Record<string, string>>(
    {},
  );
  const [listFilter, setListFilter] = useState<ListFilter>("missing");

  const hydrate = useCallback(() => {
    const fromStore = getAffiliateStatuses();
    setStatusBySlug(fromStore);
    setLinkDraftBySlug((prev) => {
      const next = { ...prev };
      for (const [slug, rec] of Object.entries(fromStore)) {
        if (next[slug] == null && rec.affiliateUrl) {
          next[slug] = rec.affiliateUrl;
        }
      }
      return next;
    });
    syncAffiliateOverrideCookieFromStore();
  }, []);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const updateWorkflow = useCallback(
    (slug: string, status: AffiliateWorkflowKind) => {
      const prev = getAffiliateStatuses()[slug];
      const updated: AffiliateWorkflowRecord = {
        slug,
        status,
        notes: prev?.notes,
        affiliateUrl: prev?.affiliateUrl ?? linkDraftBySlug[slug],
      };
      saveAffiliateStatus(updated);
      setStatusBySlug((s) => ({ ...s, [slug]: updated }));
    },
    [linkDraftBySlug],
  );

  const persistAffiliateUrl = useCallback(
    (slug: string, url: string) => {
      const prev = getAffiliateStatuses()[slug] ?? {
        slug,
        status: "not_checked" as const,
      };
      const status =
        prev.status === "not_checked" ? "approved" : prev.status;
      const updated: AffiliateWorkflowRecord = {
        ...prev,
        slug,
        status,
        affiliateUrl: url,
      };
      saveAffiliateStatus(updated);
      setStatusBySlug((s) => ({ ...s, [slug]: updated }));
    },
    [],
  );

  const inventoryStats = useMemo(() => {
    let notInRegistry = 0;
    let inRegistryNoAffiliate = 0;
    let hasAffiliateFlag = 0;
    for (const row of inventory) {
      if (!row.hasRegistryEntry) notInRegistry += 1;
      else if (!row.hasAffiliate) inRegistryNoAffiliate += 1;
      else hasAffiliateFlag += 1;
    }
    return {
      totalSites: inventory.length,
      notInRegistry,
      inRegistryNoAffiliate,
      hasAffiliateFlag,
    };
  }, [inventory]);

  const filteredRows = useMemo(() => {
    return inventory.filter((row) => {
      const wf = statusBySlug[row.slug]?.status ?? "not_checked";
      const needsAffiliateWork =
        !row.hasRegistryEntry ||
        (row.hasRegistryEntry && !row.hasAffiliate);

      switch (listFilter) {
        case "all":
          return true;
        case "approved":
          return wf === "approved";
        case "applied":
          return wf === "applied";
        case "missing":
          return needsAffiliateWork;
        default:
          return true;
      }
    });
  }, [inventory, listFilter, statusBySlug]);

  const tiers = useMemo(() => bucketByTier(filteredRows), [filteredRows]);

  const summary = useMemo(() => {
    let approved = 0;
    let applied = 0;
    for (const row of inventory) {
      const st = statusBySlug[row.slug]?.status ?? "not_checked";
      if (st === "approved") approved += 1;
      if (st === "applied") applied += 1;
    }
    const needsAffiliateWorkCount = inventory.filter(
      (r) =>
        !r.hasRegistryEntry || (r.hasRegistryEntry && !r.hasAffiliate),
    ).length;
    return {
      approved,
      applied,
      needsAffiliateWorkCount,
      totalSites: inventory.length,
    };
  }, [inventory, statusBySlug]);

  const nextBest = useMemo(() => {
    const tier1Missing = inventory.filter(
      (r) => r.tier === "tier1" && !r.hasAffiliate,
    );
    return tier1Missing.slice(0, 3);
  }, [inventory]);

  const filterButtons: { id: ListFilter; label: string }[] = [
    { id: "all", label: "Show all" },
    { id: "approved", label: "Approved" },
    { id: "applied", label: "Applied" },
    { id: "missing", label: "Missing affiliates" },
  ];

  const renderCard = (site: SiteAffiliateInventoryRow) => {
    const wf = statusBySlug[site.slug]?.status ?? "not_checked";
    const showLinkUi = wf === "approved";
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(
      `${site.name} affiliate program`,
    )}`;

    let registryHint = "In registry — tracked";
    if (!site.hasRegistryEntry) registryHint = "Not in registry";
    else if (!site.hasAffiliate) registryHint = "In registry — no affiliate";

    return (
      <div
        className={cn(
          "rounded-xl border p-5 transition hover:border-orange-500/40",
          cardOutlineClasses(wf),
        )}
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm text-zinc-400">{site.categoryLabel}</span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded border border-white/10 bg-black/20 px-2 py-1 text-[11px] text-zinc-400">
              {registryHint}
            </span>
            <span
              className={cn(
                "rounded border px-2 py-1 text-xs font-medium",
                workflowBadgeClasses(wf),
              )}
            >
              {wf.replace(/_/g, " ")}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white">{site.name}</h3>
        <p className="mt-1 font-mono text-sm text-zinc-500">slug: {site.slug}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-md bg-sky-600/90 px-3 py-2 text-sm font-medium text-white hover:bg-sky-500"
            onClick={() => {
              updateWorkflow(site.slug, "researching");
              window.open(googleUrl, "_blank", "noopener,noreferrer");
            }}
          >
            Research
          </button>
          <button
            type="button"
            className="rounded-md bg-amber-500/90 px-3 py-2 text-sm font-medium text-[#1a1006] hover:bg-amber-400"
            onClick={() => updateWorkflow(site.slug, "applied")}
          >
            Applied
          </button>
          <button
            type="button"
            className="rounded-md bg-emerald-600/90 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500"
            onClick={() => updateWorkflow(site.slug, "approved")}
          >
            Approved
          </button>
          <button
            type="button"
            className="rounded-md bg-red-600/80 px-3 py-2 text-sm font-medium text-white hover:bg-red-500"
            onClick={() => updateWorkflow(site.slug, "rejected")}
          >
            Reject
          </button>
        </div>

        {showLinkUi ? (
          <div className="mt-4 space-y-2 border-t border-white/5 pt-4">
            <label className="block text-xs font-medium uppercase tracking-wide text-zinc-500">
              Paste affiliate link
            </label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="url"
                name={`affiliate-url-${site.slug}`}
                placeholder="https://…"
                autoComplete="off"
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-orange-500/50 focus:outline-none"
                value={
                  linkDraftBySlug[site.slug] ??
                  statusBySlug[site.slug]?.affiliateUrl ??
                  ""
                }
                onChange={(ev) => {
                  const v = ev.target.value;
                  setLinkDraftBySlug((m) => ({ ...m, [site.slug]: v }));
                }}
                onBlur={() => {
                  const raw = (
                    linkDraftBySlug[site.slug] ??
                    statusBySlug[site.slug]?.affiliateUrl ??
                    ""
                  ).trim();
                  persistAffiliateUrl(site.slug, raw);
                }}
              />
              <button
                type="button"
                className="shrink-0 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-[#140b02] hover:bg-orange-400"
                onClick={() => {
                  const raw = (
                    linkDraftBySlug[site.slug] ?? ""
                  ).trim();
                  persistAffiliateUrl(site.slug, raw);
                }}
              >
                Save
              </button>
            </div>
            {(statusBySlug[site.slug]?.affiliateUrl?.trim() ?? "") !== "" ? (
              <p className="text-xs text-emerald-400/90">
                Saved locally — cookie syncs <code className="text-zinc-400">/out</code>{" "}
                redirects in this browser.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Affiliate control center
          </h1>
          <p className="mt-2 text-zinc-400">
            Inventory comes from live site listings; registry rows are overlaid for
            tracking and tiers.
          </p>

          {nextBest.length > 0 ? (
            <div className="mt-6 rounded-xl border border-orange-500/25 bg-orange-500/10 px-4 py-4 text-sm text-orange-100/95">
              <p className="font-medium text-orange-200">
                Next best action — fastest revenue
              </p>
              <p className="mt-2 text-orange-100/85">
                Apply to these tier 1 sites without a registry affiliate first:{" "}
                {nextBest.map((s, i) => (
                  <span key={s.slug}>
                    {i > 0 ? ", " : ""}
                    <a
                      className="font-semibold text-white underline decoration-orange-400/50 underline-offset-2 hover:decoration-orange-300"
                      href={`/site/${s.slug}`}
                    >
                      {s.name}
                    </a>
                  </span>
                ))}
                .
              </p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-300">
              Total sites:{" "}
              <span className="font-semibold text-white">
                {inventoryStats.totalSites}
              </span>
            </span>
            <span className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              Not in registry:{" "}
              <span className="font-semibold text-rose-100">
                {inventoryStats.notInRegistry}
              </span>
            </span>
            <span className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
              Registry, no affiliate:{" "}
              <span className="font-semibold text-amber-100">
                {inventoryStats.inRegistryNoAffiliate}
              </span>
            </span>
            <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
              Registry tracked:{" "}
              <span className="font-semibold text-emerald-200">
                {inventoryStats.hasAffiliateFlag}
              </span>
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
              Workflow approved:{" "}
              <span className="font-semibold text-emerald-200">
                {summary.approved}
              </span>
            </span>
            <span className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
              Workflow applied:{" "}
              <span className="font-semibold text-amber-100">{summary.applied}</span>
            </span>
            <span className="rounded-lg border border-zinc-600/40 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-300">
              Need affiliate (inventory vs registry):{" "}
              <span className="font-semibold text-white">
                {summary.needsAffiliateWorkCount}
              </span>
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {filterButtons.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setListFilter(b.id)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition",
                  listFilter === b.id
                    ? "border-orange-500/60 bg-orange-500/15 text-white"
                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200",
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
        </header>

        <div className="space-y-12">
          {filteredRows.length === 0 ? (
            <p className="text-center text-zinc-500">
              No listings match this filter.
            </p>
          ) : null}
          <TierSection
            title="Tier 1 — High conversion"
            subtitle="Prioritize these first."
            accentClass="text-orange-400"
            entries={tiers.tier1}
            renderCard={renderCard}
          />
          <TierSection
            title="Tier 2 — Mid value"
            subtitle="Strong follow-ups after tier 1."
            accentClass="text-yellow-400"
            entries={tiers.tier2}
            renderCard={renderCard}
          />
          <TierSection
            title="Tier 3 — Lower priority"
            subtitle="Fill in when bandwidth allows."
            accentClass="text-blue-400"
            entries={tiers.tier3}
            renderCard={renderCard}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Gem, LayoutGrid, Rows3 } from "lucide-react";
import type { CategoryDef } from "@/lib/categories";
import type { Listing } from "@/types/listing";
import { cn, clampTagline } from "@/lib/utils";
import { CategoryIcon } from "@/components/icons/category-icon";
import { IconStarTiny } from "@/components/icons/mini-icons";

type SortId = "rating" | "newest" | "popular";
type FilterId = "free" | "premium" | "live" | "ai";
type GridMode = "compact" | "comfortable";

const SORT_OPTIONS: { id: SortId; label: string }[] = [
  { id: "rating", label: "Highest rated" },
  { id: "newest", label: "Newest" },
  { id: "popular", label: "Popular" },
];

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "free", label: "Free" },
  { id: "premium", label: "Premium" },
  { id: "live", label: "Live" },
  { id: "ai", label: "AI" },
];

const PAGE_SIZE = 60;
const TOP_PICKS = 4;
const CHUNK = 15;

function matchesFilters(l: Listing, active: Set<FilterId>): boolean {
  if (active.size === 0) return true;
  return Array.from(active).some((f) => {
    if (f === "free")
      return l.tags.some((t) => t === "free" || t.includes("free"));
    if (f === "premium")
      return l.tags.some(
        (t) => t === "premium" || t === "exclusive" || t.includes("premium"),
      );
    if (f === "live")
      return l.tags.some((t) => t === "live" || t.includes("live"));
    if (f === "ai") return l.tags.includes("ai");
    return true;
  });
}

function matchesSearch(l: Listing, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  const hay = [l.name, l.description, l.categoryLabel, ...l.tags]
    .join(" ")
    .toLowerCase();
  return hay.includes(s);
}

function CompactListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/site/${listing.slug}`}
      className={cn(
        "group relative flex min-h-[72px] flex-col overflow-hidden rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#11131A] p-2 transition-all duration-200 ease-out",
        "hover:z-10 hover:-translate-y-0.5 hover:border-[rgba(255,122,0,0.28)] hover:bg-[#151820] hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.65)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]/40",
      )}
    >
      <div className="flex gap-2">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-[#0A0B10] ring-1 ring-[rgba(255,255,255,0.05)]">
          <Image
            src={listing.logo}
            alt=""
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold leading-tight text-white">
            {listing.name}
          </p>
          <p className="mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-medium text-[#6B7280]">
            <IconStarTiny className="h-2.5 w-2.5 text-[#6B7280]" />
            {listing.rating.toFixed(1)}
          </p>
        </div>
      </div>
      <p className="mt-1.5 line-clamp-2 max-h-0 overflow-hidden text-[10px] leading-snug text-[#8B909A] opacity-0 transition-[max-height,opacity] duration-200 ease-out group-hover:max-h-[3.25rem] group-hover:opacity-100">
        {clampTagline(listing.description, 96)}
      </p>
      <span
        className="pointer-events-none absolute bottom-1.5 right-1.5 text-[10px] font-semibold text-[#FF7A00] opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      >
        View
      </span>
    </Link>
  );
}

function TopPickCard({ listing }: { listing: Listing }) {
  return (
    <div className="flex min-h-[100px] flex-col rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#12151c] p-3 transition hover:border-[rgba(255,122,0,0.25)]">
      <div className="flex flex-1 gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#0A0B10] ring-1 ring-[rgba(255,255,255,0.06)]">
          <Image
            src={listing.logo}
            alt=""
            fill
            className="object-cover"
            sizes="44px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <Link
            href={`/site/${listing.slug}`}
            className="line-clamp-1 text-sm font-semibold text-white hover:text-[#FF7A00]"
          >
            {listing.name}
          </Link>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[#8B909A]">
            {clampTagline(listing.description, 100)}
          </p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-0.5 text-xs text-[#6B7280]">
              <IconStarTiny className="h-3 w-3" />
              {listing.rating.toFixed(1)}
            </span>
            <a
              href={listing.affiliate_url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="rounded-lg bg-[#FF7A00] px-2.5 py-1 text-[11px] font-bold text-black transition hover:brightness-110"
              onClick={(e) => e.stopPropagation()}
            >
              Visit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function BreakBand({
  variant,
  categoryLabel,
}: {
  variant: number;
  categoryLabel: string;
}) {
  const v = variant % 3;
  if (v === 0) {
    return (
      <div
        className="col-span-full my-1 flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#0f1016] px-3 py-2.5"
        role="separator"
      >
        <Flame className="h-4 w-4 shrink-0 text-[#FF7A00]" aria-hidden />
        <p className="text-[11px] font-medium text-[#A0A6B1]">
          <span className="text-white">Trending now</span> in {categoryLabel}{" "}
          — fast movers readers are clicking this week.
        </p>
      </div>
    );
  }
  if (v === 1) {
    return (
      <div
        className="col-span-full my-1 flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#0f1016] px-3 py-2.5"
        role="separator"
      >
        <Gem className="h-4 w-4 shrink-0 text-[#D4A574]" aria-hidden />
        <p className="text-[11px] font-medium text-[#A0A6B1]">
          <span className="text-white">Hidden gems</span> — strong scores, less
          mainstream noise. Worth a bookmark.
        </p>
      </div>
    );
  }
  return <MiniEmailCapture />;
}

function MiniEmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "ok" : "err");
      if (res.ok) setEmail("");
    } catch {
      setStatus("err");
    }
  }

  return (
    <div className="col-span-full my-1 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#0f1016] px-3 py-3">
      <p className="text-xs font-semibold text-white">Weekly picks in your inbox</p>
      <p className="mt-0.5 text-[10px] text-[#6B7280]">
        Short list, no spam. Unsubscribe anytime.
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center"
      >
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-9 min-w-0 flex-1 rounded-md border border-[rgba(255,255,255,0.08)] bg-[#11131A] px-2.5 text-xs text-white placeholder:text-[#5C6370] focus:border-[rgba(255,122,0,0.35)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-9 shrink-0 rounded-md bg-[#FF7A00] px-4 text-xs font-semibold text-black transition hover:brightness-110 disabled:opacity-50"
        >
          {status === "loading" ? "…" : "Subscribe"}
        </button>
      </form>
      {status === "ok" ? (
        <p className="mt-1 text-[10px] text-emerald-500/90">You&apos;re in.</p>
      ) : null}
      {status === "err" ? (
        <p className="mt-1 text-[10px] text-rose-500/90">Try again.</p>
      ) : null}
    </div>
  );
}

type Props = {
  cat: CategoryDef;
  categories: CategoryDef[];
  items: Listing[];
};

export function CategoryExploreClient({ cat, categories, items }: Props) {
  const [sort, setSort] = useState<SortId>("rating");
  const [filters, setFilters] = useState<Set<FilterId>>(new Set());
  const [query, setQuery] = useState("");
  const [gridMode, setGridMode] = useState<GridMode>("compact");
  const [page, setPage] = useState(1);

  const sortedFiltered = useMemo(() => {
    let list = items.filter((l) => matchesFilters(l, filters));
    list = list.filter((l) => matchesSearch(l, query));
    const copy = [...list];
    if (sort === "rating") copy.sort((a, b) => b.rating - a.rating);
    if (sort === "newest")
      copy.sort(
        (a, b) =>
          new Date(b.added_date).getTime() - new Date(a.added_date).getTime(),
      );
    if (sort === "popular")
      copy.sort((a, b) => b.popularity_score - a.popularity_score);
    return copy;
  }, [items, sort, filters, query]);

  const topPicks = sortedFiltered.slice(0, TOP_PICKS);
  const topIds = new Set(topPicks.map((l) => l.id));
  const rest = sortedFiltered.filter((l) => !topIds.has(l.id));

  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageSlice = rest.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const chunks: Listing[][] = [];
  for (let i = 0; i < pageSlice.length; i += CHUNK) {
    chunks.push(pageSlice.slice(i, i + CHUNK));
  }

  function toggleFilter(id: FilterId) {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setPage(1);
  }

  const gridClass =
    gridMode === "compact"
      ? "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      : "grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5";

  return (
    <div className="min-h-[100dvh] bg-[#0A0B10] text-white">
      {/* Single sticky shell: toolbar + category pills share one opaque surface (no scroll seam). */}
      <div className="sticky top-14 z-[90] border-b border-[rgba(255,255,255,0.08)] bg-[#0A0B10] shadow-[0_1px_0_rgba(0,0,0,0.4)]">
        <div className="mx-auto max-w-[1600px]">
          <div
            className="flex flex-col gap-2 border-b border-[rgba(255,255,255,0.06)] px-4 py-2.5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-3 md:px-6"
            role="toolbar"
            aria-label="Sort and filter"
          >
            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="cat-sort">
                Sort
              </label>
              <select
                id="cat-sort"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as SortId);
                  setPage(1);
                }}
                className="h-9 min-w-[140px] rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#11131A] px-2.5 text-xs font-medium text-white focus:border-[rgba(255,122,0,0.35)] focus:outline-none focus:ring-1 focus:ring-[rgba(255,122,0,0.2)]"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>

              <div
                className="flex flex-wrap gap-1.5"
                role="group"
                aria-label="Filters"
              >
                {FILTERS.map((f) => {
                  const on = filters.has(f.id);
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggleFilter(f.id)}
                      className={cn(
                        "h-9 rounded-lg border px-2.5 text-xs font-medium transition",
                        on
                          ? "border-[rgba(255,122,0,0.35)] bg-[rgba(255,122,0,0.1)] text-[#FF7A00]"
                          : "border-[rgba(255,255,255,0.08)] bg-[#11131A] text-[#A0A6B1] hover:border-[rgba(255,255,255,0.12)] hover:text-white",
                      )}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
              <input
                type="search"
                placeholder="Search in this category…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className="h-9 min-w-0 flex-1 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#11131A] px-3 text-xs text-white placeholder:text-[#5C6370] focus:border-[rgba(255,122,0,0.35)] focus:outline-none focus:ring-1 focus:ring-[rgba(255,122,0,0.2)] md:min-w-[200px] md:flex-none md:w-56"
              />
              <div className="flex rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#11131A] p-0.5">
                <button
                  type="button"
                  aria-pressed={gridMode === "compact"}
                  onClick={() => setGridMode("compact")}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-md transition",
                    gridMode === "compact"
                      ? "bg-[#1a1c24] text-white"
                      : "text-[#6B7280] hover:text-white",
                  )}
                  aria-label="Compact grid"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-pressed={gridMode === "comfortable"}
                  onClick={() => setGridMode("comfortable")}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-md transition",
                    gridMode === "comfortable"
                      ? "bg-[#1a1c24] text-white"
                      : "text-[#6B7280] hover:text-white",
                  )}
                  aria-label="Comfortable grid"
                >
                  <Rows3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div
            className="category-scroll flex min-h-[3.25rem] items-center gap-2 px-4 py-1.5 md:px-6"
            role="tablist"
            aria-label="Browse categories"
          >
            {categories.map((c) => {
              const active = c.slug === cat.slug;
              return (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={cn("category-pill shrink-0 no-underline")}
                >
                  <CategoryIcon slug={c.slug} />
                  <span className="max-w-[160px] truncate">{c.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 py-4 md:px-6 md:py-5">
        <div className="mb-3 flex flex-wrap items-center gap-1.5 text-[11px] text-[#6B7280]">
          <Link href="/categories" className="hover:text-[#FF7A00]">
            Categories
          </Link>
          <span className="text-[#3d424c]">/</span>
          <span className="text-[#A0A6B1]">{cat.label}</span>
          <span className="text-[#5C6370]">· {sortedFiltered.length}</span>
        </div>

        <div className="mb-2 flex flex-wrap items-start gap-3">
          <span className="mt-0.5 inline-flex text-[var(--text-secondary)]">
            <CategoryIcon slug={cat.slug} size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-balance text-xl font-bold tracking-tight text-white md:text-2xl">
              {cat.label}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#8B909A]">
              {cat.description}
            </p>
          </div>
        </div>

        {topPicks.length > 0 ? (
          <section className="mb-5" aria-labelledby="top-picks-heading">
            <h2
              id="top-picks-heading"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-white"
            >
              <Flame className="h-4 w-4 text-[#FF7A00]" aria-hidden />
              Top picks in {cat.label}
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {topPicks.map((l) => (
                <TopPickCard key={l.id} listing={l} />
              ))}
            </div>
          </section>
        ) : null}

        {sortedFiltered.length === 0 ? (
          <p className="mb-4 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#11131A] px-4 py-6 text-center text-sm text-[#8B909A]">
            No listings match your filters or search. Clear filters or try
            another keyword.
          </p>
        ) : (
          <>
        {rest.length > 0 ? (
        <p className="mb-2 text-[11px] text-[#6B7280]">
          Showing{" "}
          <span className="font-medium text-[#A0A6B1]">
            {pageSlice.length ? (safePage - 1) * PAGE_SIZE + 1 : 0}–
            {(safePage - 1) * PAGE_SIZE + pageSlice.length}
          </span>{" "}
          of <span className="text-[#A0A6B1]">{rest.length}</span> in view
          {topPicks.length ? " (plus top picks)" : ""}
        </p>
        ) : null}

        {rest.length === 0 && sortedFiltered.length > 0 ? (
          <p className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#11131A] px-4 py-4 text-center text-sm text-[#8B909A]">
            All matching listings are shown in{" "}
            <span className="text-[#A0A6B1]">Top picks</span> above.
          </p>
        ) : (
        <motion.div
          key={`${sort}-${safePage}-${query}-${Array.from(filters).sort().join()}-${gridMode}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className={gridClass}
        >
          {chunks.map((chunk, ci) => (
            <div key={ci} className="contents">
              {chunk.map((l) => (
                <CompactListingCard key={l.id} listing={l} />
              ))}
              {ci < chunks.length - 1 ? (
                <BreakBand
                  variant={ci}
                  categoryLabel={cat.label}
                />
              ) : null}
            </div>
          ))}
        </motion.div>
        )}

        {totalPages > 1 ? (
          <nav
            className="mt-4 flex flex-wrap items-center justify-center gap-2"
            aria-label="Pagination"
          >
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-[rgba(255,255,255,0.08)] px-3 py-1.5 text-xs font-medium text-[#A0A6B1] transition enabled:hover:border-[rgba(255,122,0,0.3)] enabled:hover:text-white disabled:opacity-35"
            >
              Previous
            </button>
            <span className="text-xs text-[#6B7280]">
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-[rgba(255,255,255,0.08)] px-3 py-1.5 text-xs font-medium text-[#A0A6B1] transition enabled:hover:border-[rgba(255,122,0,0.3)] enabled:hover:text-white disabled:opacity-35"
            >
              Next
            </button>
          </nav>
        ) : null}
          </>
        )}
      </div>
    </div>
  );
}

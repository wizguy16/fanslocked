"use client";

import { AFFILIATE_LINK_OVERRIDE_COOKIE } from "@/lib/affiliate-constants";

export type AffiliateWorkflowKind =
  | "not_checked"
  | "researching"
  | "applied"
  | "approved"
  | "rejected";

export type AffiliateWorkflowRecord = {
  slug: string;
  status: AffiliateWorkflowKind;
  notes?: string;
  affiliateUrl?: string;
};

const STORAGE_KEY = "affiliate_status_v1";

const LEGACY_STATUS_PREFIX = "affiliate-status-";
const LEGACY_LINK_PREFIX = "affiliate-link-";

function syncAffiliateOverrideCookie(map: Record<string, AffiliateWorkflowRecord>) {
  if (typeof document === "undefined") return;
  const urls: Record<string, string> = {};
  for (const [slug, rec] of Object.entries(map)) {
    const u = rec.affiliateUrl?.trim();
    if (u) urls[slug] = u;
  }
  document.cookie = `${AFFILIATE_LINK_OVERRIDE_COOKIE}=${encodeURIComponent(JSON.stringify(urls))};path=/;max-age=31536000;SameSite=Lax`;
}

function migrateLegacyIntoV1(): void {
  if (typeof localStorage === "undefined") return;
  if (localStorage.getItem(STORAGE_KEY)) return;

  const linkBySlug = new Map<string, string>();
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k?.startsWith(LEGACY_LINK_PREFIX)) continue;
    const slug = k.slice(LEGACY_LINK_PREFIX.length);
    const url = localStorage.getItem(k)?.trim();
    if (slug && url) linkBySlug.set(slug, url);
  }

  const merged: Record<string, AffiliateWorkflowRecord> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k?.startsWith(LEGACY_STATUS_PREFIX)) continue;
    const slug = k.slice(LEGACY_STATUS_PREFIX.length);
    const raw = localStorage.getItem(k)?.trim();
    if (
      raw === "researching" ||
      raw === "applied" ||
      raw === "approved" ||
      raw === "rejected"
    ) {
      merged[slug] = {
        slug,
        status: raw,
        affiliateUrl: linkBySlug.get(slug),
      };
    }
  }

  linkBySlug.forEach((url, slug) => {
    if (merged[slug]) return;
    merged[slug] = { slug, status: "not_checked", affiliateUrl: url };
  });

  if (Object.keys(merged).length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  }
}

export function getAffiliateStatuses(): Record<string, AffiliateWorkflowRecord> {
  if (typeof window === "undefined") return {};
  migrateLegacyIntoV1();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const out: Record<string, AffiliateWorkflowRecord> = {};
    for (const [slug, v] of Object.entries(parsed)) {
      if (!v || typeof v !== "object") continue;
      const rec = v as AffiliateWorkflowRecord;
      if (typeof rec.slug !== "string") continue;
      const status = rec.status;
      if (
        status !== "not_checked" &&
        status !== "researching" &&
        status !== "applied" &&
        status !== "approved" &&
        status !== "rejected"
      ) {
        continue;
      }
      out[slug] = {
        slug: rec.slug,
        status,
        notes: typeof rec.notes === "string" ? rec.notes : undefined,
        affiliateUrl:
          typeof rec.affiliateUrl === "string" ? rec.affiliateUrl : undefined,
      };
    }
    return out;
  } catch {
    return {};
  }
}

export function saveAffiliateStatus(entry: AffiliateWorkflowRecord): void {
  if (typeof window === "undefined") return;

  const current = getAffiliateStatuses();
  current[entry.slug] = entry;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  syncAffiliateOverrideCookie(current);
}

/** Rebuild cookie from store (e.g. after migration or manual storage edits). */
export function syncAffiliateOverrideCookieFromStore(): void {
  syncAffiliateOverrideCookie(getAffiliateStatuses());
}

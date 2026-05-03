import { AFFILIATE_REGISTRY as AFFILIATE_REGISTRY_DATA } from "./affiliate-registry-data.mjs";

export type AffiliateTier = "tier1" | "tier2" | "tier3";

export type AffiliateStatus =
  | "not_checked"
  | "researching"
  | "applied"
  | "approved"
  | "rejected";

export type AffiliateEntry = {
  slug: string;
  name: string;
  baseUrl: string;
  affiliateUrl?: string;
  hasAffiliate: boolean;
  /** Workflow tracking (registry defaults; admin UI may override via localStorage). */
  status: AffiliateStatus;
  affiliateNetwork?: string;
  tier: AffiliateTier;
  category: string[];
};

/**
 * Central catalog of partner destinations. Curated listing `slug` values must match
 * `slug` here for `getAffiliateLink` to resolve tracked URLs.
 *
 * Source data: `affiliate-registry-data.mjs` (shared with Node ESM scripts).
 */
export const AFFILIATE_REGISTRY = AFFILIATE_REGISTRY_DATA as AffiliateEntry[];

const bySlug = new Map(AFFILIATE_REGISTRY.map((e) => [e.slug, e]));

export function getAffiliateRegistryEntry(slug: string): AffiliateEntry | undefined {
  return bySlug.get(slug);
}

function logAffiliateRegistryIssuesDev(): void {
  if (process.env.NODE_ENV !== "development") return;
  const missingTracked = AFFILIATE_REGISTRY.filter(
    (e) => e.hasAffiliate && !(e.affiliateUrl?.trim()),
  );
  if (missingTracked.length > 0) {
    // eslint-disable-next-line no-console -- intentional dev diagnostics
    console.info(
      "[affiliate-registry] hasAffiliate=true but no affiliateUrl (set NEXT_PUBLIC_STRIPCHAT_AFFILIATE_URL or affiliateUrl on the entry):",
      missingTracked.map((e) => e.slug),
    );
  }
  const approvedNoUrl = AFFILIATE_REGISTRY.filter(
    (e) => e.status === "approved" && !(e.affiliateUrl?.trim()),
  );
  if (approvedNoUrl.length > 0) {
    // eslint-disable-next-line no-console -- intentional dev diagnostics
    console.warn(
      "[affiliate-registry] status is approved but affiliateUrl is empty:",
      approvedNoUrl.map((e) => e.slug),
    );
  }
}

logAffiliateRegistryIssuesDev();

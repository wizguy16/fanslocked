import {
  getAffiliateRegistryEntry,
  type AffiliateTier,
} from "@/lib/affiliate-registry";
import { getAllSiteSlugs } from "@/lib/get-all-site-slugs";

export type SiteAffiliateInventoryRow = {
  slug: string;
  name: string;
  categorySlug: string;
  categoryLabel: string;
  hasRegistryEntry: boolean;
  /** From registry: partner program flagged as active. */
  hasAffiliate: boolean;
  affiliateUrl: string | null;
  tier: AffiliateTier;
};

export function buildSiteAffiliateInventory(): SiteAffiliateInventoryRow[] {
  return getAllSiteSlugs().map((s) => {
    const registryEntry = getAffiliateRegistryEntry(s.slug);
    return {
      slug: s.slug,
      name: s.name,
      categorySlug: s.categorySlug,
      categoryLabel: s.categoryLabel,
      hasRegistryEntry: Boolean(registryEntry),
      hasAffiliate: registryEntry?.hasAffiliate ?? false,
      affiliateUrl: registryEntry?.affiliateUrl?.trim()
        ? registryEntry.affiliateUrl
        : null,
      tier: registryEntry?.tier ?? "tier3",
    };
  });
}

import { listings } from "@/lib/data";

/** One row per unique listing slug (site inventory). */
export type SiteSlugSummary = {
  slug: string;
  name: string;
  /** Primary category slug for this listing. */
  categorySlug: string;
  categoryLabel: string;
};

/**
 * All listing slugs from generated site data (`lib/data` → `generateAllListings`).
 * This is the inventory truth for the admin affiliate panel.
 */
export function getAllSiteSlugs(): SiteSlugSummary[] {
  const bySlug = new Map<string, SiteSlugSummary>();
  for (const l of listings) {
    if (!bySlug.has(l.slug)) {
      bySlug.set(l.slug, {
        slug: l.slug,
        name: l.name,
        categorySlug: l.categorySlug,
        categoryLabel: l.categoryLabel,
      });
    }
  }
  return Array.from(bySlug.values());
}

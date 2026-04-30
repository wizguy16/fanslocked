import type { Listing } from "@/types/listing";

/**
 * Prestige "Top picks" for a category when listings set `topPickRank` (lower = earlier).
 * Returns null when no listings declare a rank — callers keep legacy slug/rating fallbacks.
 */
export function selectCategoryTopPicks(
  listings: Listing[],
  categorySlug: string,
  limit: number,
): Listing[] | null {
  const ranked = listings
    .filter((l) => l.categorySlug === categorySlug && l.topPickRank !== undefined)
    .sort((a, b) => (a.topPickRank ?? 999) - (b.topPickRank ?? 999));
  if (ranked.length === 0) return null;
  return ranked.slice(0, limit);
}

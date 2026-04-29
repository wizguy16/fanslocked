import type { Listing } from "@/types/listing";
import { CATEGORIES, categorySlugs, getCategoryBySlug } from "@/lib/categories";
import { getListingLogoDebugSnapshot } from "@/lib/listing-logo-debug";
import { generateAllListings } from "@/lib/generate-listings";
import { resolveListingSiteImages } from "@/lib/resolve-listing-site-images";

export const listings: Listing[] = generateAllListings().map(
  resolveListingSiteImages,
);

if (
  process.env.NODE_ENV === "development" &&
  process.env.DEBUG_LISTING_LOGO === "1"
) {
  const slug = process.env.DEBUG_LISTING_LOGO_SLUG?.trim() ?? "stripchat";
  const row = listings.find((l) => l.slug === slug);
  if (row) {
    // eslint-disable-next-line no-console -- intentional dev tracing
    console.info(
      "[listing-logo] lib/data (after resolveListingSiteImages)",
      getListingLogoDebugSnapshot(row),
    );
  }
}

export { CATEGORIES, categorySlugs, getCategoryBySlug };

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getTopPicks(count = 10): Listing[] {
  return [...listings].sort((a, b) => b.rating - a.rating).slice(0, count);
}

export function getByTag(tag: string): Listing[] {
  const t = tag.toLowerCase();
  return listings.filter((l) => l.tags.map((x) => x.toLowerCase()).includes(t));
}

export function getByCategorySlug(categorySlug: string): Listing[] {
  return listings.filter(
    (l) => l.categorySlug.toLowerCase() === categorySlug.toLowerCase(),
  );
}

export function getListingsByCategorySlug(slug: string): Listing[] {
  if (!getCategoryBySlug(slug)) return [];
  return getByCategorySlug(slug);
}

export function getRecentlyAdded(count = 12): Listing[] {
  return [...listings]
    .sort(
      (a, b) =>
        new Date(b.added_date).getTime() - new Date(a.added_date).getTime(),
    )
    .slice(0, count);
}

export function getTrendingByScore(count = 12): Listing[] {
  return [...listings]
    .sort((a, b) => b.popularity_score - a.popularity_score)
    .slice(0, count);
}

export function getSimilar(listing: Listing, count = 8): Listing[] {
  return listings
    .filter(
      (l) =>
        l.slug !== listing.slug &&
        l.categorySlug === listing.categorySlug,
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}

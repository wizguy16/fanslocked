import type { CategoryDef } from "@/lib/categories";
import { getCategoryBySlug } from "@/lib/categories";
import type { CategoryPrestigeEditorial } from "@/lib/category-prestige-editorial";
import { getCategoryEditorial } from "@/lib/category-prestige-editorial";
import { getListingsByCategorySlug } from "@/lib/data";
import type { Listing } from "@/types/listing";

export type CategoryPageData = {
  category: CategoryDef;
  listings: Listing[];
  editorial: CategoryPrestigeEditorial | null;
};

/**
 * Single entry for category prestige + blog auto-pages: category metadata,
 * full listing set for the slug, and optional prestige editorial overrides.
 */
export function getCategoryData(slug: string): CategoryPageData | null {
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  const listings = getListingsByCategorySlug(slug);
  const editorial = getCategoryEditorial(slug);

  return {
    category,
    listings,
    editorial,
  };
}

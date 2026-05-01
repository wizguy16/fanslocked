import { CATEGORIES } from "@/lib/categories";

export type MegaMenuCategoryTile = {
  slug: string;
  /** Full taxonomy name (e.g. aria-label). */
  label: string;
  /** One-line tile title; prefers `megaMenuShortLabel` when set. */
  menuTitle: string;
  href: string;
  coverImage: string;
  accentRgb?: string;
};

/**
 * Mega menu middle column: one stable tile per taxonomy entry (no listing thumbnails).
 */
export function getMegaMenuCategoryTiles(): MegaMenuCategoryTile[] {
  return [...CATEGORIES]
    .sort(
      (a, b) =>
        a.megaMenuOrder - b.megaMenuOrder || a.slug.localeCompare(b.slug),
    )
    .map((c) => ({
      slug: c.slug,
      label: c.label,
      menuTitle: (c.megaMenuShortLabel ?? c.label).trim(),
      href: `/categories/${c.slug}`,
      coverImage: c.coverImage,
      accentRgb: c.megaMenuAccentRgb,
    }));
}

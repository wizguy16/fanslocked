import type { MegaMenuCategoryTile } from "@/lib/mega-menu-category-tiles";
import type { MegaMenuListingThumb } from "@/components/layout/categories-mega-menu";
import { getMegaMenuCategoryTiles } from "@/lib/mega-menu-category-tiles";
import { getTopPicks, getTrendingByScore } from "@/lib/data";

export type FlNavMegaMenuData = {
  topPicks: MegaMenuListingThumb[];
  popular: MegaMenuListingThumb[];
  megaTiles: MegaMenuCategoryTile[];
};

function toThumb(r: {
  slug: string;
  name: string;
  image: string;
  screenshot?: string;
}) {
  return {
    slug: r.slug,
    name: r.name,
    image: r.image,
    screenshot: r.screenshot,
  };
}

/** Static mega menu payload for `FlNav` (safe to call from client components). */
export function getFlNavMegaMenuData(): FlNavMegaMenuData {
  return {
    topPicks: getTopPicks(4).map(toThumb),
    popular: getTrendingByScore(4).map(toThumb),
    megaTiles: getMegaMenuCategoryTiles(),
  };
}

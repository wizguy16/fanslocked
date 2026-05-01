import { NavbarClient, type NavbarListingThumb } from "@/components/layout/navbar-client";
import { getMegaMenuCategoryTiles } from "@/lib/mega-menu-category-tiles";
import {
  getTopPicks,
  getTrendingByScore,
} from "@/lib/data";

function toThumbRow(r: {
  slug: string;
  name: string;
  image: string;
  screenshot?: string;
}): NavbarListingThumb {
  return {
    slug: r.slug,
    name: r.name,
    image: r.image,
    screenshot: r.screenshot,
  };
}

export function Navbar() {
  const topPicks = getTopPicks(4).map(toThumbRow);
  const popular = getTrendingByScore(4).map(toThumbRow);
  const megaTiles = getMegaMenuCategoryTiles();

  return (
    <NavbarClient
      topPicks={topPicks}
      popular={popular}
      megaTiles={megaTiles}
    />
  );
}

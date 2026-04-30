import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedSearchRow = {
  name: string;
  slug: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  preview: string;
  tier: 1 | 2 | 3;
};

/** Top rail source — order is editorial; ranking comes from tier + buildCuratedSearchListings. */
export const SEARCH_FEATURED: CuratedSearchRow[] = [
  {
    name: "XVideos Search",
    slug: "xvideos-search",
    website: "https://www.xvideos.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 1,
    preview:
      "XVideos includes one of the largest searchable databases of adult content online.",
  },
  {
    name: "XNXX Search",
    slug: "xnxx-search",
    website: "https://www.xnxx.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 1,
    preview:
      "XNXX provides fast and extensive search capabilities across millions of videos.",
  },
  {
    name: "xHamster Search",
    slug: "xhamster-search",
    website: "https://www.xhamster.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 1,
    preview:
      "xHamster’s search spans a huge UGC library and trending queries.",
  },
  {
    name: "YouPorn Search",
    slug: "youporn-search",
    website: "https://www.youporn.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 1,
    preview:
      "YouPorn’s search system helps users find trending and popular videos instantly.",
  },
  {
    name: "Eporner",
    slug: "eporner",
    website: "https://www.eporner.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 2,
    preview:
      "Eporner offers a clean interface with strong search and filtering capabilities.",
  },
  {
    name: "SpankBang",
    slug: "spankbang-search",
    website: "https://spankbang.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 2,
    preview:
      "SpankBang offers a powerful internal search engine with a massive content library.",
  },
  {
    name: "RedTube",
    slug: "redtube",
    website: "https://www.redtube.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 2,
    preview:
      "RedTube provides an easy-to-use search experience with curated video results.",
  },
  {
    name: "PornMD",
    slug: "pornmd",
    website: "https://www.pornmd.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 2,
    preview:
      "PornMD is a search engine that aggregates content from multiple adult sites in one place.",
  },
  {
    name: "YesPornPlease",
    slug: "yespornplease",
    website: "https://yespornplease.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "aggregator",
    tier: 3,
    preview:
      "YesPornPlease curates trending adult content and provides a fast, search-driven browsing experience across multiple sites.",
  },
  {
    name: "KeezMovies",
    slug: "keezmovies",
    website: "https://www.keezmovies.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 3,
    preview:
      "KeezMovies provides fast search functionality and curated adult content.",
  },
  {
    name: "Tube8",
    slug: "tube8",
    website: "https://www.tube8.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 3,
    preview:
      "Tube8 offers categorized search and curated video discovery.",
  },
  {
    name: "DrTuber",
    slug: "drtuber",
    website: "https://www.drtuber.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 3,
    preview:
      "DrTuber allows users to explore a wide selection of adult content through search.",
  },
];

/** Grid source — tier-2 strong picks first, then tier-3 long tail. No duplicate slugs vs SEARCH_FEATURED. */
export const SEARCH_GRID: CuratedSearchRow[] = [
  {
    name: "Nudevista",
    slug: "nudevista",
    website: "https://www.nudevista.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 2,
    preview:
      "Nudevista aggregates tube results so users can search across many sources at once.",
  },
  {
    name: "PeekVids",
    slug: "peekvids",
    website: "https://www.peekvids.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 2,
    preview:
      "PeekVids offers trending and search-driven discovery across popular scenes.",
  },
  {
    name: "Porntrex",
    slug: "porntrex",
    website: "https://www.porntrex.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 2,
    preview:
      "Porntrex emphasizes HD discovery with strong filters and search.",
  },
  {
    name: "HQporner",
    slug: "hqporner",
    website: "https://hqporner.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 2,
    preview:
      "HQporner focuses on high-bitrate scenes with straightforward search.",
  },
  {
    name: "Beeg",
    slug: "beeg",
    website: "https://www.beeg.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 2,
    preview:
      "Beeg offers minimal UI with fast search and curated scene picks.",
  },
  {
    name: "FUQ",
    slug: "fuq",
    website: "https://www.fuq.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 3,
    preview:
      "FUQ surfaces popular clips and categories from major tubes in one interface.",
  },
  {
    name: "Tubesafari",
    slug: "tubesafari",
    website: "https://tubesafari.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 3,
    preview:
      "Tubesafari helps users discover videos across a wide index with simple search.",
  },
  {
    name: "AlohaTube",
    slug: "alohatube",
    website: "https://www.alohatube.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 3,
    preview:
      "AlohaTube combines a large catalog with search and category browsing.",
  },
  {
    name: "iXXX",
    slug: "ixxx",
    website: "https://www.ixxx.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 3,
    preview:
      "iXXX links out to multiple tubes and niches for broad discovery.",
  },
  {
    name: "SunPorno",
    slug: "sunporno",
    website: "https://www.sunporno.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 3,
    preview:
      "SunPorno provides category-first discovery plus full-site search.",
  },
  {
    name: "4Tube",
    slug: "4tube",
    website: "https://www.4tube.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 3,
    preview:
      "4Tube surfaces network-wide results with consistent search UX.",
  },
  {
    name: "PornHD",
    slug: "pornhd",
    website: "https://www.pornhd.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "search",
    tier: 3,
    preview:
      "PornHD highlights HD scenes with search and studio-style filters.",
  },
];

function tagsFor(): string[] {
  return ["search", "directory", "discovery", "tube", "editor-pick"];
}

function buildListing(
  row: CuratedSearchRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.preview, 160);
  const review = `${row.name} is listed in our ${cat.label} set for discovery and search traffic: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "High-intent search traffic you can route to tubes, premium, or cams",
    "Familiar search UX that reduces bounce on cold clicks",
    "Indirect monetization paths when paired with your outbound stack",
  ];
  const cons = [
    "Affiliate models are often indirect — track assisted conversions",
    "Index freshness varies — spot-check top queries seasonally",
    "Policy and DMCA posture differ by destination — qualify partners",
  ];

  return {
    id: `listing-search-${row.slug}`,
    name: row.name,
    slug: row.slug,
    categorySlug: cat.slug,
    categoryLabel: cat.label,
    tags: tagsFor(),
    preview: row.preview,
    description,
    review,
    pros,
    cons,
    image: SITE_IMAGE_PLACEHOLDER,
    logo: SITE_IMAGE_PLACEHOLDER,
    affiliate_url: buildListingOutboundPath(row.slug),
    website_url: row.website,
    rating,
    tag: curatedListingTag(cat.slug, row.slug),
    added_date,
    popularity_score,
  };
}

const TIER_BASE: Record<1 | 2 | 3, number> = {
  1: 4.9,
  2: 4.7,
  3: 4.5,
};

function ratingForRow(row: CuratedSearchRow, indexInSlice: number): number {
  const tierBase = TIER_BASE[row.tier];
  return Math.round((tierBase - indexInSlice * 0.015) * 10) / 10;
}

function popularityForRow(row: CuratedSearchRow, indexInSlice: number): number {
  const base = row.tier === 1 ? 100 : row.tier === 2 ? 90 : 80;
  return base - indexInSlice;
}

export function buildCuratedSearchListings(cat: CategoryDef): Listing[] {
  const featured = SEARCH_FEATURED.map((row, i) =>
    buildListing(
      row,
      cat,
      ratingForRow(row, i),
      popularityForRow(row, i),
      `2025-08-${String((i % 28) + 1).padStart(2, "0")}`,
    ),
  );
  const grid = SEARCH_GRID.map((row, i) =>
    buildListing(
      row,
      cat,
      ratingForRow(row, i),
      popularityForRow(row, i),
      `2025-07-${String((i % 28) + 1).padStart(2, "0")}`,
    ),
  );

  return [...featured, ...grid].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.popularity_score - a.popularity_score;
  });
}

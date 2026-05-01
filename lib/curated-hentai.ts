import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedHentaiRow = {
  name: string;
  slug: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  preview: string;
  tier: 1 | 2 | 3;
};

/** Top band — monetization + traffic leaders (slug `nutaku-hentai` avoids clash with `gaming` → nutaku). */
export const HENTAI_FEATURED: CuratedHentaiRow[] = [
  {
    name: "Fakku",
    slug: "fakku",
    website: "https://www.fakku.net",
    payout: "High",
    difficulty: "Medium",
    type: "premium-hentai",
    tier: 1,
    preview:
      "Fakku is one of the most popular premium hentai platforms offering high-quality manga, videos, and exclusive releases.",
  },
  {
    name: "Nutaku",
    slug: "nutaku-hentai",
    website: "https://www.nutaku.net",
    payout: "High",
    difficulty: "Easy",
    type: "hentai-games",
    tier: 1,
    preview:
      "Nutaku features a massive collection of hentai games and interactive anime-style experiences.",
  },
  {
    name: "Hanime.tv",
    slug: "hanime",
    website: "https://hanime.tv",
    payout: "High",
    difficulty: "Easy",
    type: "streaming",
    tier: 1,
    preview:
      "Hanime.tv is a top destination for high-quality hentai streaming with uncensored anime content.",
  },
  {
    name: "HentaiHaven",
    slug: "hentaihaven",
    website: "https://hentaihaven.xxx",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    tier: 1,
    preview:
      "HentaiHaven offers free streaming anime porn with a large library of subtitled content.",
  },
  {
    name: "Nhentai",
    slug: "nhentai",
    website: "https://nhentai.net",
    payout: "Medium",
    difficulty: "Easy",
    type: "manga",
    tier: 2,
    preview:
      "Nhentai is one of the largest hentai manga libraries with extensive tagging and search features.",
  },
  {
    name: "HentaiFox",
    slug: "hentaifox",
    website: "https://hentaifox.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "manga",
    tier: 2,
    preview:
      "HentaiFox specializes in hentai manga with thousands of translated doujinshi titles.",
  },
  {
    name: "Hentai2Read",
    slug: "hentai2read",
    website: "https://hentai2read.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "manga",
    tier: 2,
    preview:
      "Hentai2Read allows users to browse and read hentai manga online with clean navigation.",
  },
  {
    name: "Hentaistream",
    slug: "hentaistream",
    website: "https://hentaistream.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    tier: 2,
    preview:
      "Hentaistream provides a wide range of anime porn series with easy browsing and streaming.",
  },
  {
    name: "Hentia.xxx",
    slug: "hentai-xxx",
    website: "https://hentia.xxx",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    tier: 2,
    preview:
      "Adult anime content platform featuring curated releases, categorized scenes, and regularly updated hentai video collections. Hentia.xxx provides a wide range of animated adult content organized by categories, trends, and new releases. Built for users who want quick access to updated hentai videos, it emphasizes consistent uploads, easy browsing, and niche-specific discovery.",
  },
  {
    name: "E-Hentai",
    slug: "e-hentai",
    website: "https://e-hentai.org",
    payout: "Medium",
    difficulty: "Easy",
    type: "archive",
    tier: 3,
    preview:
      "E-Hentai is a long-standing archive offering a vast collection of hentai manga and galleries.",
  },
  {
    name: "Rule34.xxx",
    slug: "rule34",
    website: "https://rule34.xxx",
    payout: "Indirect",
    difficulty: "Easy",
    type: "community",
    tier: 3,
    preview:
      "Rule34.xxx is a massive user-generated archive of animated and hentai-style adult content.",
  },
];

/** Dense grid — long tail; all tier 3 (`anime-rule34` removed — duplicate domain of `rule34`). */
export const HENTAI_GRID: CuratedHentaiRow[] = [
  {
    name: "AnimeHentaivideos",
    slug: "animehentaivideos",
    website: "https://animehentaivideos.xxx",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    tier: 3,
    preview:
      "AnimeHentaivideos hosts a variety of hentai clips and full-length animated scenes.",
  },
  {
    name: "HentaiPulse",
    slug: "hentaipulse",
    website: "https://hentaipulse.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    tier: 3,
    preview:
      "HentaiPulse offers a clean streaming experience with a variety of anime porn titles.",
  },
  {
    name: "HentaiDude",
    slug: "hentaidude",
    website: "https://hentaidude.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    tier: 3,
    preview:
      "HentaiDude provides free hentai streaming with categorized content and tags.",
  },
  {
    name: "9Hentai",
    slug: "9hentai",
    website: "https://9hentai.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "manga",
    tier: 3,
    preview:
      "9Hentai is a manga-focused platform with a large collection of translated adult comics.",
  },
  {
    name: "HentaiCafe",
    slug: "hentaicafe",
    website: "https://hentaicafe.io",
    payout: "Medium",
    difficulty: "Easy",
    type: "manga",
    tier: 3,
    preview:
      "HentaiCafe hosts translated hentai manga and doujinshi with frequent updates.",
  },
  {
    name: "SimplyHentai",
    slug: "simplyhentai",
    website: "https://simply-hentai.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    tier: 3,
    preview:
      "SimplyHentai offers streaming videos and animated content in one platform.",
  },
  {
    name: "HentaiStigma",
    slug: "hentaistigma",
    website: "https://hentaistigma.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    tier: 3,
    preview:
      "HentaiStigma delivers a mix of anime porn videos and curated collections.",
  },
  {
    name: "HentaiHere",
    slug: "hentaihere",
    website: "https://hentaihere.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    tier: 3,
    preview:
      "HentaiHere provides free anime porn streaming with an organized layout.",
  },
  {
    name: "HentaiZ",
    slug: "hentaiz",
    website: "https://hentaiz.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    tier: 3,
    preview:
      "HentaiZ offers a growing collection of hentai videos and anime scenes.",
  },
  {
    name: "HentaiMoon",
    slug: "hentaimoon",
    website: "https://hentaimoon.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    tier: 3,
    preview:
      "HentaiMoon hosts anime porn clips and longer scenes for streaming.",
  },
  {
    name: "HentaiShare",
    slug: "hentaishare",
    website: "https://hentaishare.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "download",
    tier: 3,
    preview:
      "HentaiShare offers downloadable hentai content including videos and archives.",
  },
  {
    name: "HentaiDownload",
    slug: "hentaidownload",
    website: "https://hentaidownload.org",
    payout: "Medium",
    difficulty: "Easy",
    type: "download",
    tier: 3,
    preview:
      "HentaiDownload provides access to downloadable anime porn collections.",
  },
  {
    name: "AnimeBooty",
    slug: "animebooty",
    website: "https://animebooty.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    tier: 3,
    preview:
      "AnimeBooty features a mix of animated adult videos and curated hentai clips.",
  },
];

function tagsFor(): string[] {
  return ["hentai", "anime", "manga", "subbed", "editor-pick"];
}

function buildListing(
  row: CuratedHentaiRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.preview, 160);
  const review = `${row.name} is listed in our ${cat.label} set for hentai and anime intent: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "Strong niche search volume and long-tail discovery",
    "Mix of manga, stream, and game-adjacent destinations for funnel splits",
    "Subbed and tagged catalogs that match informed traffic",
  ];
  const cons = [
    "Affiliate quality varies — verify program terms and geo rules",
    "Censorship and licensing differ by title and region",
    "Some destinations are community-heavy — qualify compliance copy",
  ];

  return {
    id: `listing-hentai-${row.slug}`,
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

function rowScore(row: CuratedHentaiRow, index: number): { rating: number; popularity_score: number } {
  const tierBase = {
    1: 4.9,
    2: 4.7,
    3: 4.4,
  }[row.tier];
  const rating = Math.round((tierBase - index * 0.02) * 10) / 10;
  const popularity_score = (row.tier === 1 ? 100 : row.tier === 2 ? 92 : 84) - index;
  return { rating, popularity_score };
}

export function buildCuratedHentaiListings(cat: CategoryDef): Listing[] {
  const featured = HENTAI_FEATURED.map((row, i) => {
    const { rating, popularity_score } = rowScore(row, i);
    return buildListing(row, cat, rating, popularity_score, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`);
  });
  const grid = HENTAI_GRID.map((row, i) => {
    const { rating, popularity_score } = rowScore(row, i);
    return buildListing(row, cat, rating, popularity_score, `2025-07-${String((i % 28) + 1).padStart(2, "0")}`);
  });
  return [...featured, ...grid];
}

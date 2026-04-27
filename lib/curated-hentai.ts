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
};

/** Top 12 — manga, streaming, archives (slug `nutaku-hentai` avoids clash with `gaming` → nutaku). */
export const HENTAI_FEATURED: CuratedHentaiRow[] = [
  {
    name: "Fakku",
    slug: "fakku",
    website: "https://www.fakku.net",
    payout: "High",
    difficulty: "Medium",
    type: "premium-hentai",
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
    preview:
      "Nutaku features a massive collection of hentai games and interactive anime-style experiences.",
  },
  {
    name: "HentaiHaven",
    slug: "hentaihaven",
    website: "https://hentaihaven.xxx",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    preview:
      "HentaiHaven offers free streaming anime porn with a large library of subtitled content.",
  },
  {
    name: "Hanime.tv",
    slug: "hanime",
    website: "https://hanime.tv",
    payout: "High",
    difficulty: "Easy",
    type: "streaming",
    preview:
      "Hanime.tv is a top destination for high-quality hentai streaming with uncensored anime content.",
  },
  {
    name: "Hentaistream",
    slug: "hentaistream",
    website: "https://hentaistream.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    preview:
      "Hentaistream provides a wide range of anime porn series with easy browsing and streaming.",
  },
  {
    name: "HentaiFox",
    slug: "hentaifox",
    website: "https://hentaifox.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "manga",
    preview:
      "HentaiFox specializes in hentai manga with thousands of translated doujinshi titles.",
  },
  {
    name: "Nhentai",
    slug: "nhentai",
    website: "https://nhentai.net",
    payout: "Medium",
    difficulty: "Easy",
    type: "manga",
    preview:
      "Nhentai is one of the largest hentai manga libraries with extensive tagging and search features.",
  },
  {
    name: "E-Hentai",
    slug: "e-hentai",
    website: "https://e-hentai.org",
    payout: "Medium",
    difficulty: "Easy",
    type: "archive",
    preview:
      "E-Hentai is a long-standing archive offering a vast collection of hentai manga and galleries.",
  },
  {
    name: "Hentai2Read",
    slug: "hentai2read",
    website: "https://hentai2read.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "manga",
    preview:
      "Hentai2Read allows users to browse and read hentai manga online with clean navigation.",
  },
  {
    name: "AnimeHentaivideos",
    slug: "animehentaivideos",
    website: "https://animehentaivideos.xxx",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    preview:
      "AnimeHentaivideos hosts a variety of hentai clips and full-length animated scenes.",
  },
  {
    name: "HentaiWorld",
    slug: "hentaiworld",
    website: "https://hentaiworld.tv",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
    preview:
      "HentaiWorld offers categorized anime porn content with frequent updates and trending videos.",
  },
  {
    name: "Rule34.xxx",
    slug: "rule34",
    website: "https://rule34.xxx",
    payout: "Indirect",
    difficulty: "Easy",
    type: "community",
    preview:
      "Rule34.xxx is a massive user-generated archive of animated and hentai-style adult content.",
  },
];

export const HENTAI_GRID: CuratedHentaiRow[] = [
  {
    name: "HentaiPulse",
    slug: "hentaipulse",
    website: "https://hentaipulse.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
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
    preview:
      "HentaiZ offers a growing collection of hentai videos and anime scenes.",
  },
  {
    name: "AnimeRule34",
    slug: "anime-rule34",
    website: "https://rule34.xxx",
    payout: "Indirect",
    difficulty: "Easy",
    type: "community",
    preview:
      "AnimeRule34 features user-generated hentai and animated content across many categories.",
  },
  {
    name: "HentaiMoon",
    slug: "hentaimoon",
    website: "https://hentaimoon.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "streaming",
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

export function buildCuratedHentaiListings(cat: CategoryDef): Listing[] {
  const featured = HENTAI_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  const grid = HENTAI_GRID.map((row, i) =>
    buildListing(
      row,
      cat,
      Math.round((4.62 - i * 0.02) * 10) / 10,
      88 - i,
      `2025-07-${String((i % 28) + 1).padStart(2, "0")}`,
    ),
  );
  return [...featured, ...grid];
}

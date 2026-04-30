import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedPremiumPornRow = {
  name: string;
  slug: string;
  website: string;
  preview: string;
  tier: 1 | 2 | 3;
};

/** Top band — horizontal featured rail. Tier 1 (highest conversion), then tier 2, then tier 3. */
export const PREMIUM_PORN_FEATURED: CuratedPremiumPornRow[] = [
  {
    name: "AdultTime",
    slug: "adulttime",
    website: "https://www.adulttime.com",
    tier: 1,
    preview:
      "AdultTime is an all-in-one premium platform offering access to multiple top studios with one subscription, often called the Netflix of porn.",
  },
  {
    name: "Brazzers",
    slug: "brazzers",
    website: "https://www.brazzers.com",
    tier: 1,
    preview:
      "Brazzers is one of the most recognized premium porn networks, known for high-budget scenes, top-tier performers, and polished production quality.",
  },
  {
    name: "BangBros",
    slug: "bangbros",
    website: "https://www.bangbros.com",
    tier: 1,
    preview:
      "BangBros delivers a massive collection of raw, high-energy scenes across dozens of popular series, updated daily with exclusive content.",
  },
  {
    name: "Reality Kings",
    slug: "reality-kings",
    website: "https://www.realitykings.com",
    tier: 1,
    preview:
      "Reality Kings offers a huge library of exclusive scenes and long-running series featuring popular performers and real-world settings.",
  },
  {
    name: "TeamSkeet",
    slug: "teamskeet",
    website: "https://www.teamskeet.com",
    tier: 2,
    preview:
      "TeamSkeet features a wide range of popular series and exclusive scenes, focusing on high-quality amateur-style and studio content.",
  },
  {
    name: "Naughty America",
    slug: "naughty-america",
    website: "https://www.naughtyamerica.com",
    tier: 2,
    preview:
      "Naughty America offers high-definition scenes with a focus on immersive storytelling and VR-compatible experiences.",
  },
  {
    name: "PornPros",
    slug: "pornpros",
    website: "https://www.pornpros.com",
    tier: 2,
    preview:
      "PornPros features multiple popular brands under one network, offering a wide range of premium scenes.",
  },
  {
    name: "Digital Playground",
    slug: "digital-playground",
    website: "https://www.digitalplayground.com",
    tier: 2,
    preview:
      "Digital Playground produces high-budget, story-driven adult films with a focus on visual effects and premium quality.",
  },
  {
    name: "Vixen",
    slug: "vixen",
    website: "https://www.vixen.com",
    tier: 2,
    preview:
      "Vixen is known for cinematic adult films with stunning visuals, luxury aesthetics, and some of the industry’s top talent.",
  },
  {
    name: "MYLF",
    slug: "mylf",
    website: "https://www.mylf.com",
    tier: 3,
    preview:
      "MYLF specializes in premium MILF-focused content with high production value and a strong lineup of experienced performers.",
  },
  {
    name: "Babes",
    slug: "babes",
    website: "https://www.babes.com",
    tier: 3,
    preview:
      "Babes focuses on sensual, high-quality scenes featuring top performers and a more intimate, cinematic style.",
  },
  {
    name: "Private.com",
    slug: "private",
    website: "https://www.private.com",
    tier: 3,
    preview:
      "Private.com delivers European-style adult content with elegant production, strong narratives, and exclusive scenes.",
  },
];

/** Dense grid below the rail — niche / long tail (all tier 3). Blacked appended last so rating-sort keeps featured tier 3 above it on prestige pages. */
export const PREMIUM_PORN_GRID: CuratedPremiumPornRow[] = [
  {
    name: "Mofos",
    slug: "mofos",
    website: "https://www.mofos.com",
    tier: 3,
    preview:
      "Mofos is known for its casual, street-style adult content with a wide range of popular series and frequent updates.",
  },
  {
    name: "Evil Angel",
    slug: "evil-angel",
    website: "https://www.evilangel.com",
    tier: 3,
    preview:
      "Evil Angel offers a massive catalog of director-driven content, featuring unique styles and niche categories.",
  },
  {
    name: "PornBox",
    slug: "pornbox",
    website: "https://www.pornbox.com",
    tier: 3,
    preview:
      "PornBox combines content from multiple studios into one platform, offering a large and diverse premium library.",
  },
  {
    name: "Nubiles Porn",
    slug: "nubiles-porn",
    website: "https://nubiles-porn.com",
    tier: 3,
    preview:
      "Nubiles focuses on youthful, high-quality scenes with clean visuals and a polished production style.",
  },
  {
    name: "Jules Jordan",
    slug: "jules-jordan",
    website: "https://www.julesjordan.com",
    tier: 3,
    preview:
      "Jules Jordan is known for high-performance scenes and a strong reputation for quality and consistency.",
  },
  {
    name: "SisLovesMe",
    slug: "sislovesme",
    website: "https://www.sislovesme.com",
    tier: 3,
    preview:
      "SisLovesMe features storyline-driven scenes with popular themes and high-quality production value.",
  },
  {
    name: "Tiny4K",
    slug: "tiny4k",
    website: "https://www.tiny4k.com",
    tier: 3,
    preview:
      "Tiny4K delivers ultra-HD content with a focus on petite performers and crisp, modern visuals.",
  },
  {
    name: "Passion HD",
    slug: "passion-hd",
    website: "https://www.passionhd.com",
    tier: 3,
    preview:
      "Passion HD focuses on sensual, story-driven scenes with high-definition production and elegant direction.",
  },
  {
    name: "New Sensations",
    slug: "new-sensations",
    website: "https://www.newsensations.com",
    tier: 3,
    preview:
      "New Sensations is a long-running studio known for its wide range of themed content and consistent releases.",
  },
  {
    name: "CherryPimps",
    slug: "cherrypimps",
    website: "https://www.cherrypimps.com",
    tier: 3,
    preview:
      "CherryPimps blends amateur and professional content with a focus on variety and frequent updates.",
  },
  {
    name: "Deeper.com",
    slug: "deeper",
    website: "https://www.deeper.com",
    tier: 3,
    preview:
      "Deeper offers intense, cinematic experiences with a strong focus on storytelling and visual depth.",
  },
  {
    name: "21Sextury",
    slug: "21sextury",
    website: "https://www.21sextury.com",
    tier: 3,
    preview:
      "21Sextury delivers European-style adult content with a diverse selection of scenes and performers.",
  },
  {
    name: "Blacked",
    slug: "blacked",
    website: "https://www.blacked.com",
    tier: 3,
    preview:
      "Blacked delivers high-end cinematic scenes with a signature visual style and strong storytelling elements.",
  },
];

function tagsFor(): string[] {
  return ["premium-porn", "editor-pick", "premium", "streaming"];
}

function buildListing(
  row: CuratedPremiumPornRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.preview, 160);
  const review = `${row.name} is listed in our ${cat.label} set because it matches high-intent traffic expectations: ${row.preview}`;
  const pros = [
    "Strong brand recognition with search-intent audiences",
    "Premium positioning that supports higher-quality funnel traffic",
    "Familiar subscription UX for readers upgrading from tubes",
  ];
  const cons = [
    "Competitive SERPs — win with angle-specific landers and disclosures",
    "Program terms and caps vary by geo — verify current affiliate rules",
    "Catalog emphasis shifts over time — spot-check category fit",
  ];

  return {
    id: `listing-premium-${row.slug}`,
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

function rowScore(
  row: CuratedPremiumPornRow,
  index: number,
): { rating: number; popularity_score: number } {
  const tierBase = {
    1: 4.95,
    2: 4.75,
    3: 4.55,
  }[row.tier];
  const rating = Math.round((tierBase - index * 0.02) * 10) / 10;
  const popularity_score = (row.tier === 1 ? 100 : row.tier === 2 ? 92 : 84) - index;
  return { rating, popularity_score };
}

export function buildCuratedPremiumPornListings(cat: CategoryDef): Listing[] {
  const featured = PREMIUM_PORN_FEATURED.map((row, i) => {
    const { rating, popularity_score } = rowScore(row, i);
    return buildListing(row, cat, rating, popularity_score, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`);
  });
  const grid = PREMIUM_PORN_GRID.map((row, i) => {
    const { rating, popularity_score } = rowScore(row, i);
    return buildListing(row, cat, rating, popularity_score, `2025-07-${String((i % 28) + 1).padStart(2, "0")}`);
  });
  return [...featured, ...grid];
}

import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedFetishRow = {
  name: string;
  slug: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  preview: string;
  tier: 1 | 2 | 3;
};

/**
 * Top band — monetization / authority first (clips + creators), then VR / networks / social, then dating-adjacent.
 * Slugs suffixed where they collide with amateur / VR / fan listings.
 */
export const FETISH_FEATURED: CuratedFetishRow[] = [
  {
    name: "Clips4Sale",
    slug: "clips4sale-fetish",
    website: "https://www.clips4sale.com",
    payout: "High",
    difficulty: "Easy",
    type: "Fetish Marketplace",
    tier: 1,
    preview:
      "Clips4Sale dominates the fetish niche with thousands of creators offering extremely specific and custom kink content.",
  },
  {
    name: "ManyVids",
    slug: "manyvids-fetish",
    website: "https://www.manyvids.com",
    payout: "High",
    difficulty: "Easy",
    type: "Creator Platform",
    tier: 1,
    preview:
      "ManyVids blends fetish and creator-driven content, making it perfect for custom requests and niche fantasies.",
  },
  {
    name: "iWantClips",
    slug: "iwantclips-fetish",
    website: "https://iwantclips.com",
    payout: "High",
    difficulty: "Easy",
    type: "Clip Store",
    tier: 1,
    preview:
      "iWantClips focuses heavily on domination, humiliation, and extreme fetish categories with strong creator presence.",
  },
  {
    name: "Kink",
    slug: "kink",
    website: "https://www.kink.com",
    payout: "High",
    difficulty: "Medium",
    type: "BDSM Network",
    tier: 1,
    preview:
      "Kink is the industry leader in BDSM content, known for high-production scenes, real sets, and intense power dynamics.",
  },
  {
    name: "Fetish Network",
    slug: "fetish-network",
    website: "https://www.fetishnetwork.com",
    payout: "High",
    difficulty: "Medium",
    type: "Network",
    tier: 2,
    preview:
      "Fetish Network bundles multiple BDSM brands into one membership covering bondage, domination, and taboo themes.",
  },
  {
    name: "SexLikeReal",
    slug: "sexlikereal-fetish",
    website: "https://www.sexlikereal.com",
    payout: "High",
    difficulty: "Medium",
    type: "VR Fetish",
    tier: 2,
    preview:
      "SexLikeReal includes a large VR fetish library with interactive scenes and high-end production.",
  },
  {
    name: "VRPorn",
    slug: "vrporn-fetish",
    website: "https://vrporn.com",
    payout: "High",
    difficulty: "Medium",
    type: "VR Aggregator",
    tier: 2,
    preview:
      "VRPorn aggregates multiple VR fetish studios into one platform with strong affiliate monetization and scalable traffic routing.",
  },
  {
    name: "Alt",
    slug: "alt",
    website: "https://www.alt.com",
    payout: "High",
    difficulty: "Easy",
    type: "Fetish Dating",
    tier: 2,
    preview:
      "Alt is one of the largest BDSM communities online, combining dating, content, and kink exploration.",
  },
  {
    name: "LoyalFans",
    slug: "loyalfans-fetish",
    website: "https://www.loyalfans.com",
    payout: "High",
    difficulty: "Easy",
    type: "Creator Platform",
    tier: 2,
    preview:
      "LoyalFans has a strong presence in the fetish space, with creators offering subscription content, custom requests, and high-converting fan interactions across niche categories.",
  },
  {
    name: "Bondage",
    slug: "bondage",
    website: "https://www.bondage.com",
    payout: "High",
    difficulty: "Easy",
    type: "Dating + Fetish",
    tier: 3,
    preview:
      "Bondage blends adult dating with fetish exploration, connecting users based on specific kinks.",
  },
  {
    name: "Domination",
    slug: "domination",
    website: "https://www.domination.com",
    payout: "High",
    difficulty: "Medium",
    type: "Fetish Network",
    tier: 3,
    preview:
      "Domination focuses on power play, control fantasies, and intense BDSM storytelling.",
  },
];

export const FETISH_GRID: CuratedFetishRow[] = [
  {
    name: "ThisVid",
    slug: "thisvid",
    website: "https://thisvid.com",
    payout: "Low",
    difficulty: "Easy",
    type: "Community",
    tier: 3,
    preview:
      "ThisVid is a community-driven platform featuring raw, user-uploaded fetish and kink content.",
  },
  {
    name: "BoundHub",
    slug: "boundhub",
    website: "https://boundhub.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "Tube",
    tier: 3,
    preview:
      "BoundHub specializes in bondage-focused scenes, offering a wide range of tied-up fantasies.",
  },
  {
    name: "Motherless",
    slug: "motherless",
    website: "https://motherless.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "Fetish Tube",
    tier: 3,
    preview:
      "Motherless hosts one of the largest collections of extreme and niche fetish content online.",
  },
  {
    name: "Heavy-R",
    slug: "heavy-r",
    website: "https://heavy-r.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "Hardcore Tube",
    tier: 3,
    preview:
      "Heavy-R focuses on hardcore and taboo-style fetish content with a massive free library.",
  },
  {
    name: "HypnoTube",
    slug: "hypnotube",
    website: "https://hypnotube.com",
    payout: "Low",
    difficulty: "Easy",
    type: "Hypno",
    tier: 3,
    preview:
      "HypnoTube delivers hypnotic fetish content centered around mind control and visual stimulation.",
  },
  {
    name: "Pervertium",
    slug: "pervertium",
    website: "https://pervertium.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "Tube",
    tier: 3,
    preview:
      "Pervertium focuses on extreme and taboo fetish niches rarely found on mainstream platforms.",
  },
  {
    name: "BDSMX",
    slug: "bdsmx",
    website: "https://bdsmx.tube",
    payout: "Low",
    difficulty: "Easy",
    type: "Tube",
    tier: 3,
    preview:
      "BDSMX offers a large collection of BDSM content with a focus on domination and restraint.",
  },
  {
    name: "FemdomXXX",
    slug: "femdomxxx",
    website: "https://femdomxxx.com",
    payout: "Low",
    difficulty: "Easy",
    type: "Femdom",
    tier: 3,
    preview:
      "FemdomXXX specializes in female domination content with a wide variety of power-play scenarios.",
  },
  {
    name: "FemdomUp",
    slug: "femdomup",
    website: "https://femdomup.net",
    payout: "Low",
    difficulty: "Easy",
    type: "Femdom",
    tier: 3,
    preview:
      "FemdomUp curates female domination videos from across the web into one place.",
  },
  {
    name: "YoungDommes",
    slug: "youngdommes",
    website: "https://youngdommes.net",
    payout: "Low",
    difficulty: "Easy",
    type: "Femdom",
    tier: 3,
    preview:
      "YoungDommes focuses on younger dominant performers and modern domination content.",
  },
  {
    name: "Giantess",
    slug: "giantess",
    website: "https://giantessworld.net",
    payout: "Low",
    difficulty: "Easy",
    type: "Size Fetish",
    tier: 3,
    preview:
      "Giantess content explores size-difference fantasies with a strong niche following.",
  },
  {
    name: "Tickle Porn",
    slug: "tickle",
    website: "https://tickleporn.com",
    payout: "Low",
    difficulty: "Easy",
    type: "Tickle",
    tier: 3,
    preview:
      "Tickle Porn focuses on tickling fetishes with playful yet niche-specific content.",
  },
  {
    name: "Ball Busting",
    slug: "ballbusting",
    website: "https://ballbusting.cc",
    payout: "Low",
    difficulty: "Easy",
    type: "Impact Fetish",
    tier: 3,
    preview:
      "Ball Busting features extreme impact play content for a very specific fetish audience.",
  },
];

function tagsFor(): string[] {
  return ["fetish", "bdsm", "kink", "community", "editor-pick"];
}

function buildListing(
  row: CuratedFetishRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.preview, 160);
  const review = `${row.name} is listed in our ${cat.label} set for consensual kink and niche discovery: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "Clear niche angles for SEO and long-tail landing pages",
    "Mix of networks, clips, and community hubs for intent splits",
    "Education-forward positioning when paired with consent messaging",
  ];
  const cons = [
    "Program quality varies — verify affiliate rules and allowed creatives",
    "Some tube-style destinations need extra compliance review",
    "Extreme niches require transparent age-gating and regional checks",
  ];

  return {
    id: `listing-fetish-${row.slug}`,
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

function rowScore(row: CuratedFetishRow, index: number): { rating: number; popularity_score: number } {
  const tierBase = {
    1: 4.95,
    2: 4.75,
    3: 4.5,
  }[row.tier];
  const rating = Math.round((tierBase - index * 0.02) * 10) / 10;
  const popularity_score = (row.tier === 1 ? 100 : row.tier === 2 ? 92 : 84) - index;
  return { rating, popularity_score };
}

export function buildCuratedFetishBdsmListings(cat: CategoryDef): Listing[] {
  const featured = FETISH_FEATURED.map((row, i) => {
    const { rating, popularity_score } = rowScore(row, i);
    return buildListing(row, cat, rating, popularity_score, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`);
  });
  const grid = FETISH_GRID.map((row, i) => {
    const { rating, popularity_score } = rowScore(row, i);
    return buildListing(row, cat, rating, popularity_score, `2025-07-${String((i % 28) + 1).padStart(2, "0")}`);
  });
  return [...featured, ...grid];
}

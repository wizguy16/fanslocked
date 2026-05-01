import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedFanSubscriptionRow = {
  name: string;
  slug: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  description: string;
  preview: string;
};

/**
 * Real subscription / creator platforms only — one row per site (no duplicate domains or discovery URLs).
 * Grid reserved for future alternative platforms (empty until rebuilt).
 */
export const CREATOR_PLATFORMS_FEATURED: CuratedFanSubscriptionRow[] = [
  {
    name: "Fansly",
    slug: "fansly",
    website: "https://fansly.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Subscription Platform",
    description:
      "Fast-growing fan subscription platform with strong discovery features and flexible creator content options.",
    preview:
      "Fast-growing fan subscription platform with strong discovery features and flexible creator content options.",
  },
  {
    name: "Fanvue",
    slug: "fanvue",
    website: "https://fanvue.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "AI + Creator Platform",
    description: "Modern creator platform with AI integration.",
    preview:
      "Fanvue combines creator content with AI tools, creating a high-converting platform for both fans and creators.",
  },
  {
    name: "Unlockd",
    slug: "unlockd",
    website: "https://unlockd.me",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Fan Platform",
    description: "Premium fan subscription platform.",
    preview:
      "Unlockd allows creators to sell premium content directly to fans, increasing conversions.",
  },
  {
    name: "ManyVids",
    slug: "manyvids",
    website: "https://manyvids.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Creator Marketplace",
    description: "Content marketplace with built-in audience.",
    preview:
      "ManyVids allows creators to sell videos, subscriptions, and custom content, driving high conversion rates.",
  },
  {
    name: "FanCentro",
    slug: "fancentro",
    website: "https://fancentro.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Subscription Platform",
    description:
      "Creator monetization platform with built-in marketing tools and strong traffic funnels for driving subscriptions.",
    preview:
      "Creator monetization platform with built-in marketing tools and strong traffic funnels for driving subscriptions.",
  },
  {
    name: "LoyalFans",
    slug: "loyalfans",
    website: "https://loyalfans.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Fan Platform",
    description:
      "Feature-rich platform with messaging, live streams, and multiple ways for creators to monetize content.",
    preview:
      "Feature-rich platform with messaging, live streams, and multiple ways for creators to monetize content.",
  },
  {
    name: "JustForFans",
    slug: "justforfans",
    website: "https://justfor.fans",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Subscription Platform",
    description:
      "Subscription platform focused on creator control, with flexible pricing and direct fan interaction.",
    preview:
      "Subscription platform focused on creator control, with flexible pricing and direct fan interaction.",
  },
  {
    name: "AdmireMe",
    slug: "admireme",
    website: "https://admireme.vip",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Subscription Platform",
    description:
      "UK-based subscription platform with a focus on creator independence and simple fan engagement tools.",
    preview:
      "UK-based subscription platform with a focus on creator independence and simple fan engagement tools.",
  },
  {
    name: "Fanspicy",
    slug: "fanspicy",
    website: "https://fanspicy.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Subscription Platform",
    description:
      "Adult-friendly subscription platform focused on creator monetization, direct fan engagement, and flexible content control.",
    preview:
      "Fanspicy is built for adult creators looking to monetize their content through subscriptions, pay-per-view messaging, and exclusive drops. It emphasizes privacy, creator independence, and scalable earning tools without the heavy restrictions found on mainstream platforms.",
  },
  {
    name: "Ko-fi",
    slug: "kofi",
    website: "https://ko-fi.com",
    payout: "Varies",
    difficulty: "Easy",
    type: "Donation Platform",
    description: "Support-based creator platform.",
    preview:
      "Ko-fi enables direct support and subscriptions, making it easy for creators to monetize.",
  },
  {
    name: "SubscribeStar",
    slug: "subscribestar",
    website: "https://subscribestar.com",
    payout: "Varies",
    difficulty: "Easy",
    type: "Membership Platform",
    description: "Alternative creator platform.",
    preview:
      "SubscribeStar offers flexible monetization for creators and steady income streams.",
  },
];

export const CREATOR_PLATFORMS_GRID: CuratedFanSubscriptionRow[] = [];

function tagsFor(): string[] {
  return ["creator", "subscriptions", "fan-platform", "editor-pick", "revshare", "trending"];
}

function buildListing(
  row: CuratedFanSubscriptionRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.description, 160);
  const review = `${row.name} is listed in our ${cat.label} set for legit fan monetization fit: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "Recurring subscription and tip rails common to fan platforms",
    "Creator-first positioning that matches search and social outbound",
    "Established programs with clearer compliance paths than leak aggregators",
  ];
  const cons = [
    "Payout rules and caps vary by geo — confirm current affiliate terms",
    "NSFW policy shifts on mainstream rails (Ko-fi and similar) — qualify traffic",
    "Competitive creator discovery — win with niche angles and disclosures",
  ];

  return {
    id: `listing-fan-${row.slug}`,
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

export function buildCuratedFanSubscriptionPlatformListings(cat: CategoryDef): Listing[] {
  const featured = CREATOR_PLATFORMS_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  const grid = CREATOR_PLATFORMS_GRID.map((row, i) =>
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

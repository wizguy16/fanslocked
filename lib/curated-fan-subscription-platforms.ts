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
 * Top 12 — rail order: money-first (Fansly, Fanvue, Unlockd), then breadth.
 * Fanvue uses AI + creator positioning; no duplicate Fanvue row here.
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
    name: "Fansly",
    slug: "fansly-discover",
    website: "https://fansly.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Subscription Platform",
    description:
      "Fast-growing platform with strong discovery tools and a mix of free and paid content options for creators.",
    preview:
      "Fast-growing platform with strong discovery tools and a mix of free and paid content options for creators.",
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
    name: "Patreon",
    slug: "patreon",
    website: "https://patreon.com",
    payout: "Varies",
    difficulty: "Easy",
    type: "Membership Platform",
    description: "Mainstream creator subscription platform.",
    preview:
      "Patreon allows creators to monetize exclusive content with a subscription-based model.",
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

export const CREATOR_PLATFORMS_GRID: CuratedFanSubscriptionRow[] = [
  {
    name: "FansMetrics",
    slug: "fansmetrics",
    website: "https://fansmetrics.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Analytics",
    description: "OnlyFans analytics tool.",
    preview: "FansMetrics helps creators track performance and optimize earnings.",
  },
  {
    name: "FollowChain",
    slug: "followchain",
    website: "https://followchain.org",
    payout: "Traffic",
    difficulty: "Easy",
    type: "Discovery",
    description: "Creator discovery platform.",
    preview: "FollowChain helps users discover trending creators across platforms.",
  },
  {
    name: "Fansly Search",
    slug: "fansly-search",
    website: "https://fansly.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "Discovery",
    description: "Find creators on Fansly.",
    preview: "Fansly Search helps users quickly discover new creators.",
  },
  {
    name: "ManyVids Models",
    slug: "manyvids-models",
    website: "https://manyvids.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Marketplace",
    description: "Creator marketplace listings.",
    preview: "ManyVids Models allows users to browse and subscribe to creators easily.",
  },
  {
    name: "FanCentro Discover",
    slug: "fancentro-discover",
    website: "https://fancentro.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Discovery",
    description: "Find FanCentro creators.",
    preview: "FanCentro Discover helps users find premium creators quickly.",
  },
  {
    name: "Fansly Creators",
    slug: "fansly-creators",
    website: "https://fansly.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Directory",
    description: "Fansly creator directory.",
    preview: "Fansly Creators showcases trending and popular profiles.",
  },
  {
    name: "Fanvue Creators",
    slug: "fanvue-creators",
    website: "https://fanvue.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Directory",
    description: "Fanvue creator discovery.",
    preview: "Fanvue Creators highlights top-performing creators on the platform.",
  },
  {
    name: "LoyalFans Discover",
    slug: "loyalfans-discover",
    website: "https://loyalfans.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Discovery",
    description: "Find LoyalFans creators.",
    preview: "LoyalFans Discover makes it easy to browse and subscribe to creators.",
  },
  {
    name: "FanCentro Creators",
    slug: "fancentro-creators",
    website: "https://fancentro.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Discovery",
    description: "Browse creators.",
    preview: "Discover creators and exclusive content through FanCentro.",
  },
  {
    name: "JustForFans Models",
    slug: "jff-models",
    website: "https://justfor.fans",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Discovery",
    description: "Browse creator profiles.",
    preview: "Find top creators and connect through subscriptions.",
  },
  {
    name: "LoyalFans Creators",
    slug: "loyalfans-creators",
    website: "https://loyalfans.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Discovery",
    description: "Discover creators.",
    preview: "Explore trending creators and premium content.",
  },
  {
    name: "AdmireMe Creators",
    slug: "admireme-creators",
    website: "https://admireme.vip",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Directory",
    description: "AdmireMe creator listings.",
    preview: "AdmireMe Creators helps users explore premium content creators.",
  },
  {
    name: "Fanvue",
    slug: "fanvue-ai-creator",
    website: "https://fanvue.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "AI + Creator Platform",
    description: "Modern creator platform with AI integration.",
    preview:
      "Fanvue combines creator content with AI tools, creating a high-converting platform for both fans and creators.",
  },
  {
    name: "Fan Platform Hub",
    slug: "fan-platform-hub",
    website: "https://fanvue.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Aggregator",
    description: "Multi-platform creator hub.",
    preview: "Fan Platform Hub aggregates creators across multiple platforms.",
  },
  {
    name: "CreatorHub",
    slug: "creatorhub",
    website: "https://fanvue.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Discovery",
    description: "Creator discovery platform.",
    preview: "CreatorHub helps users find trending creators across platforms.",
  },
  {
    name: "FanFinder",
    slug: "fanfinder",
    website: "https://fansly.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Discovery",
    description: "Find top creators easily.",
    preview: "FanFinder helps users quickly locate trending creators.",
  },
];

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
    "NSFW policy shifts on mainstream rails (Patreon, Ko-fi) — qualify traffic",
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

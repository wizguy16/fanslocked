import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { clampTagline } from "@/lib/utils";

export type CuratedFanSubscriptionRow = {
  name: string;
  slug: string;
  logo: string;
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
    logo: "https://logo.clearbit.com/fansly.com",
    website: "https://fansly.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Subscription Platform",
    description: "Top OnlyFans alternative with strong growth.",
    preview:
      "Fansly offers creators flexible monetization and exclusive content, making it one of the fastest-growing subscription platforms.",
  },
  {
    name: "Fanvue",
    slug: "fanvue",
    logo: "https://logo.clearbit.com/fanvue.com",
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
    logo: "https://logo.clearbit.com/unlockd.me",
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
    logo: "https://logo.clearbit.com/manyvids.com",
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
    logo: "https://logo.clearbit.com/fancentro.com",
    website: "https://fancentro.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Subscription Platform",
    description: "Monetization platform for influencers.",
    preview:
      "FanCentro helps creators monetize social traffic with subscriptions and premium content.",
  },
  {
    name: "LoyalFans",
    slug: "loyalfans",
    logo: "https://logo.clearbit.com/loyalfans.com",
    website: "https://loyalfans.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Fan Platform",
    description: "Strong creator monetization platform.",
    preview:
      "LoyalFans provides multiple monetization tools that increase user spending and retention.",
  },
  {
    name: "JustForFans",
    slug: "justforfans",
    logo: "https://logo.clearbit.com/justfor.fans",
    website: "https://justfor.fans",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Subscription Platform",
    description: "Creator-focused subscription service.",
    preview:
      "JustForFans focuses on creator-first tools that drive consistent subscriber growth.",
  },
  {
    name: "AVN Stars",
    slug: "avn-stars",
    logo: "https://logo.clearbit.com/avnstars.com",
    website: "https://avnstars.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Creator Platform",
    description: "Industry-backed creator platform.",
    preview:
      "AVN Stars connects users with verified creators, increasing trust and conversions.",
  },
  {
    name: "AdmireMe",
    slug: "admireme",
    logo: "https://logo.clearbit.com/admireme.vip",
    website: "https://admireme.vip",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Subscription Platform",
    description: "UK-based creator platform.",
    preview:
      "AdmireMe offers strong engagement tools that help creators monetize loyal audiences.",
  },
  {
    name: "Patreon",
    slug: "patreon",
    logo: "https://logo.clearbit.com/patreon.com",
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
    logo: "https://logo.clearbit.com/ko-fi.com",
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
    logo: "https://logo.clearbit.com/subscribestar.com",
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
    logo: "https://logo.clearbit.com/fansmetrics.com",
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
    logo: "https://logo.clearbit.com/followchain.org",
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
    logo: "https://logo.clearbit.com/fansly.com",
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
    logo: "https://logo.clearbit.com/manyvids.com",
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
    logo: "https://logo.clearbit.com/fancentro.com",
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
    logo: "https://logo.clearbit.com/fansly.com",
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
    logo: "https://logo.clearbit.com/fanvue.com",
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
    logo: "https://logo.clearbit.com/loyalfans.com",
    website: "https://loyalfans.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Discovery",
    description: "Find LoyalFans creators.",
    preview: "LoyalFans Discover makes it easy to browse and subscribe to creators.",
  },
  {
    name: "AdmireMe Creators",
    slug: "admireme-creators",
    logo: "https://logo.clearbit.com/admireme.vip",
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
    logo: "https://logo.clearbit.com/fanvue.com",
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
    logo: "https://logo.clearbit.com/fanvue.com",
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
    logo: "https://logo.clearbit.com/fanvue.com",
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
    logo: "https://logo.clearbit.com/fansly.com",
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
    image: row.logo,
    logo: row.logo,
    affiliate_url: buildListingOutboundPath(row.slug),
    website_url: row.website,
    rating,
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

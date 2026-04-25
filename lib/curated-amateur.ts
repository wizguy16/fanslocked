import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { clampTagline } from "@/lib/utils";

export type CuratedAmateurRow = {
  name: string;
  slug: string;
  logo: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  preview: string;
};

/** Top 12 — creator marketplaces, clips, subscriptions (distinct from premium studio list). */
export const AMATEUR_FEATURED: CuratedAmateurRow[] = [
  {
    name: "ManyVids",
    slug: "manyvids",
    logo: "https://logo.clearbit.com/manyvids.com",
    website: "https://www.manyvids.com",
    payout: "High",
    difficulty: "Easy",
    type: "creator-marketplace",
    preview:
      "ManyVids is a leading creator platform where independent models sell amateur videos, custom content, and interact directly with fans.",
  },
  {
    name: "Fansly",
    slug: "fansly",
    logo: "https://logo.clearbit.com/fansly.com",
    website: "https://fansly.com",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "Fansly allows creators to monetize amateur content through subscriptions, messages, and exclusive uploads.",
  },
  {
    name: "FanCentro",
    slug: "fancentro",
    logo: "https://logo.clearbit.com/fancentro.com",
    website: "https://www.fancentro.com",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "FanCentro helps creators build premium fan clubs with amateur content, private feeds, and direct messaging.",
  },
  {
    name: "LoyalFans",
    slug: "loyalfans",
    logo: "https://logo.clearbit.com/loyalfans.com",
    website: "https://www.loyalfans.com",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "LoyalFans is a fast-growing platform for creators sharing exclusive amateur content and interacting with subscribers.",
  },
  {
    name: "Clips4Sale",
    slug: "clips4sale",
    logo: "https://logo.clearbit.com/clips4sale.com",
    website: "https://www.clips4sale.com",
    payout: "High",
    difficulty: "Easy",
    type: "clip-store",
    preview:
      "Clips4Sale is a massive marketplace for amateur video clips across thousands of niches and categories.",
  },
  {
    name: "APClips",
    slug: "apclips",
    logo: "https://logo.clearbit.com/apclips.com",
    website: "https://www.apclips.com",
    payout: "High",
    difficulty: "Easy",
    type: "clip-store",
    preview:
      "APClips lets independent creators sell amateur videos, customs, and fan experiences directly.",
  },
  {
    name: "iWantClips",
    slug: "iwantclips",
    logo: "https://logo.clearbit.com/iwantclips.com",
    website: "https://www.iwantclips.com",
    payout: "High",
    difficulty: "Easy",
    type: "clip-store",
    preview:
      "iWantClips is a creator-driven platform focused on niche amateur content and direct sales.",
  },
  {
    name: "JustForFans",
    slug: "justforfans",
    logo: "https://logo.clearbit.com/justfor.fans",
    website: "https://justfor.fans",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "JustForFans offers subscription-based access to amateur creators with exclusive content and messaging.",
  },
  {
    name: "ModelCentro",
    slug: "modelcentro",
    logo: "https://logo.clearbit.com/modelcentro.com",
    website: "https://www.modelcentro.com",
    payout: "High",
    difficulty: "Easy",
    type: "creator-tools",
    preview:
      "ModelCentro powers creator websites and helps monetize amateur content through subscriptions and sales.",
  },
  {
    name: "PocketStars",
    slug: "pocketstars",
    logo: "https://logo.clearbit.com/pocketstars.com",
    website: "https://pocketstars.com",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "PocketStars enables creators to share amateur content and connect with fans through subscriptions and messages.",
  },
  {
    name: "AdmireMe",
    slug: "admireme",
    logo: "https://logo.clearbit.com/admireme.vip",
    website: "https://admireme.vip",
    payout: "Medium–High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "AdmireMe is a UK-based creator platform offering amateur content and fan subscriptions.",
  },
  {
    name: "IsMyGirl",
    slug: "ismygirl",
    logo: "https://logo.clearbit.com/ismygirl.com",
    website: "https://ismygirl.com",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "IsMyGirl connects fans with creators through exclusive amateur content and private messaging.",
  },
];

/** Next 13 — distinct angles (stores, live, tiers) without duplicating premium tubes. */
export const AMATEUR_GRID: CuratedAmateurRow[] = [
  {
    name: "Fanvue",
    slug: "fanvue",
    logo: "https://logo.clearbit.com/fanvue.com",
    website: "https://fanvue.com",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "Fanvue is a growing creator platform offering monetization for amateur content and fan interaction.",
  },
  {
    name: "Unlockd",
    slug: "unlockd",
    logo: "https://logo.clearbit.com/unlockd.me",
    website: "https://unlockd.me",
    payout: "Medium",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "Unlockd allows creators to share exclusive amateur content behind paywalls and subscriptions.",
  },
  {
    name: "OnlyFans Alternatives Hub",
    slug: "ofan-alts",
    logo: "https://logo.clearbit.com/fansly.com",
    website: "https://fansly.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "aggregator",
    preview:
      "Explore alternative platforms where creators share amateur content and monetize their audience.",
  },
  {
    name: "FanHouse",
    slug: "fanhouse",
    logo: "https://logo.clearbit.com/fanhouse.app",
    website: "https://fanhouse.app",
    payout: "Medium",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "FanHouse provides a clean platform for creators to share exclusive content with subscribers.",
  },
  {
    name: "LoyalFans Clips",
    slug: "loyalfans-clips",
    logo: "https://logo.clearbit.com/loyalfans.com",
    website: "https://www.loyalfans.com",
    payout: "High",
    difficulty: "Easy",
    type: "clip-store",
    preview:
      "LoyalFans also offers clip-based content alongside subscription access to amateur creators.",
  },
  {
    name: "ManyVids Live",
    slug: "manyvids-live",
    logo: "https://logo.clearbit.com/manyvids.com",
    website: "https://www.manyvids.com",
    payout: "High",
    difficulty: "Easy",
    type: "live",
    preview:
      "ManyVids includes live streaming features alongside its amateur video marketplace.",
  },
  {
    name: "FanCentro Store",
    slug: "fancentro-store",
    logo: "https://logo.clearbit.com/fancentro.com",
    website: "https://www.fancentro.com",
    payout: "High",
    difficulty: "Easy",
    type: "store",
    preview:
      "FanCentro includes a store feature for creators to sell amateur content directly.",
  },
  {
    name: "APClips Live",
    slug: "apclips-live",
    logo: "https://logo.clearbit.com/apclips.com",
    website: "https://www.apclips.com",
    payout: "High",
    difficulty: "Easy",
    type: "live",
    preview:
      "APClips expands into live interactions, allowing real-time engagement with creators.",
  },
  {
    name: "Fansly Plus",
    slug: "fansly-plus",
    logo: "https://logo.clearbit.com/fansly.com",
    website: "https://fansly.com",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "Fansly Plus enhances creator monetization through premium tiers and exclusive amateur content.",
  },
  {
    name: "PocketStars VIP",
    slug: "pocketstars-vip",
    logo: "https://logo.clearbit.com/pocketstars.com",
    website: "https://pocketstars.com",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "PocketStars VIP gives access to exclusive amateur content from top creators.",
  },
  {
    name: "ModelCentro Stores",
    slug: "modelcentro-stores",
    logo: "https://logo.clearbit.com/modelcentro.com",
    website: "https://www.modelcentro.com",
    payout: "High",
    difficulty: "Easy",
    type: "store",
    preview:
      "ModelCentro enables creators to run their own amateur content storefronts.",
  },
  {
    name: "IsMyGirl Premium",
    slug: "ismygirl-premium",
    logo: "https://logo.clearbit.com/ismygirl.com",
    website: "https://ismygirl.com",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "IsMyGirl Premium unlocks exclusive amateur content and messaging features.",
  },
  {
    name: "AdmireMe Plus",
    slug: "admireme-plus",
    logo: "https://logo.clearbit.com/admireme.vip",
    website: "https://admireme.vip",
    payout: "Medium",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "AdmireMe Plus provides upgraded access to amateur creator content.",
  },
];

function tagsFor(): string[] {
  return ["amateur", "creator", "homemade", "clips", "editor-pick"];
}

function buildListing(
  row: CuratedAmateurRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.preview, 160);
  const review = `${row.name} is listed in our ${cat.label} set for creator and homemade intent: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "Clip and subscription rails suited to creator-forward traffic",
    "Direct creator monetization without studio-only positioning",
    "Mix of marketplaces and fan platforms for funnel testing",
  ];
  const cons = [
    "Program terms and revshare tiers change — verify current affiliate rules",
    "Overlap with general fan verticals — differentiate with amateur-angle landers",
    "Compliance and ID rules vary by platform and region",
  ];

  return {
    id: `listing-amateur-${row.slug}`,
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

export function buildCuratedAmateurListings(cat: CategoryDef): Listing[] {
  const featured = AMATEUR_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  const grid = AMATEUR_GRID.map((row, i) =>
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

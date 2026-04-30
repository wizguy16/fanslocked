import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedAmateurRow = {
  name: string;
  slug: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  preview: string;
};

/** Creator marketplaces and fan platforms — one row per site (no duplicate features or grid spam). */
export const AMATEUR_FEATURED: CuratedAmateurRow[] = [
  {
    name: "ManyVids",
    slug: "manyvids",
    website: "https://www.manyvids.com",
    payout: "High",
    difficulty: "Easy",
    type: "creator-marketplace",
    preview:
      "ManyVids is a leading creator platform where independent models sell amateur videos, custom content, and interact directly with fans.",
  },
  {
    name: "Clips4Sale",
    slug: "clips4sale",
    website: "https://www.clips4sale.com",
    payout: "High",
    difficulty: "Easy",
    type: "clip-store",
    preview:
      "Massive clip marketplace with one of the deepest amateur libraries online. Best for finding niche content across thousands of independent creators.",
  },
  {
    name: "APClips",
    slug: "apclips",
    website: "https://www.apclips.com",
    payout: "High",
    difficulty: "Easy",
    type: "clip-store",
    preview:
      "Creator-first platform focused on customs, direct sales, and fan interaction. Strong choice if you want more personal or niche content.",
  },
  {
    name: "iWantClips",
    slug: "iwantclips",
    website: "https://www.iwantclips.com",
    payout: "High",
    difficulty: "Easy",
    type: "clip-store",
    preview:
      "Well-established clip platform known for niche categories and consistent creator uploads. Easy to browse and discover specific interests.",
  },
  {
    name: "Fansly",
    slug: "fansly",
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
    website: "https://www.loyalfans.com",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "LoyalFans is a fast-growing platform for creators sharing exclusive amateur content and interacting with subscribers.",
  },
  {
    name: "JustForFans",
    slug: "justforfans",
    website: "https://justfor.fans",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "Subscription platform built around independent creators with a strong focus on direct fan access and exclusive content.",
  },
  {
    name: "PocketStars",
    slug: "pocketstars",
    website: "https://pocketmystars.unicornplatform.page/",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "PocketStars enables creators to share amateur content and connect with fans through subscriptions and messages.",
  },
  {
    name: "AdmireMe",
    slug: "admireme",
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
    website: "https://ismygirl.com",
    payout: "High",
    difficulty: "Easy",
    type: "subscription",
    preview:
      "IsMyGirl connects fans with creators through exclusive amateur content and private messaging.",
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

export function buildCuratedAmateurListings(cat: CategoryDef): Listing[] {
  const featured = AMATEUR_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  return featured;
}

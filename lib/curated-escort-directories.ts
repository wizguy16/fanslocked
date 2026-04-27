import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedEscortDirectoryRow = {
  name: string;
  slug: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  description: string;
  preview: string;
};

/** Top rail — regional and general escort / massage listing directories. */
export const ESCORT_DIRECTORIES_FEATURED: CuratedEscortDirectoryRow[] = [
  {
    name: "Slixa",
    slug: "slixa",
    website: "https://slixa.com",
    payout: "Lead Gen",
    difficulty: "Medium",
    type: "Directory",
    description: "Premium escort directory.",
    preview:
      "Slixa offers a high-end directory experience, connecting users with verified professionals.",
  },
  {
    name: "Scarlet Blue",
    slug: "scarlet-blue",
    website: "https://scarletblue.com.au",
    payout: "Lead Gen",
    difficulty: "Medium",
    type: "Directory",
    description: "Australia-based escort directory.",
    preview:
      "Scarlet Blue focuses on high-quality listings and trusted profiles for better user experience.",
  },
  {
    name: "Escort Babylon",
    slug: "escort-babylon",
    website: "https://escortbabylon.net",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Global escort directory.",
    preview:
      "Escort Babylon aggregates listings worldwide, making it easy to find local companions.",
  },
  {
    name: "AdultWork",
    slug: "adultwork",
    website: "https://adultwork.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Platform",
    description: "UK-based adult services platform.",
    preview:
      "AdultWork offers multiple services including companionship, making it a versatile platform for users.",
  },
  {
    name: "Massage Republic",
    slug: "massage-republic",
    website: "https://massagerepublic.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Massage Directory",
    description: "Massage-focused listings.",
    preview:
      "Massage Republic provides a structured platform for finding massage professionals.",
  },
  {
    name: "TS4Rent",
    slug: "ts4rent",
    website: "https://ts4rent.com",
    payout: "Lead Gen",
    difficulty: "Medium",
    type: "Directory",
    description: "Specialized companion directory.",
    preview:
      "TS4Rent focuses on niche audiences, delivering highly targeted traffic and strong engagement.",
  },
];

export const ESCORT_DIRECTORIES_GRID: CuratedEscortDirectoryRow[] = [
  {
    name: "Escort Babylon Listings",
    slug: "escort-babylon-list",
    website: "https://escortbabylon.net",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Browse listings.",
    preview: "Explore global listings and find companions near you.",
  },
  {
    name: "Slixa Listings",
    slug: "slixa-list",
    website: "https://slixa.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Premium listings.",
    preview: "Browse high-end profiles on Slixa.",
  },
  {
    name: "Massage Republic Listings",
    slug: "massage-republic-list",
    website: "https://massagerepublic.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Massage listings.",
    preview: "Find massage professionals easily.",
  },
  {
    name: "AdultWork Listings",
    slug: "adultwork-list",
    website: "https://adultwork.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Platform",
    description: "Browse services.",
    preview: "Explore services and connect with providers.",
  },
  {
    name: "Scarlet Blue Listings",
    slug: "scarlet-blue-list",
    website: "https://scarletblue.com.au",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Browse listings.",
    preview: "Discover trusted listings and profiles.",
  },
  {
    name: "TS4Rent Listings",
    slug: "ts4rent-list",
    website: "https://ts4rent.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Browse profiles.",
    preview: "Find niche companion listings.",
  },
];

function tagsFor(): string[] {
  return ["directory", "listings", "regional", "verified", "editor-pick"];
}

function buildListing(
  row: CuratedEscortDirectoryRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.description, 160);
  const review = `${row.name} is listed in our ${cat.label} set for directory fit: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "High-intent local and regional search traffic when disclosures are clear",
    "Mix of lead-gen and revshare programs for funnel testing",
    "Structured profiles and filters common to established directories",
  ];
  const cons = [
    "Jurisdiction and age-verification rules vary — keep landers compliant",
    "Directory quality and policies change — spot-check listings regularly",
    "Disclosure and safety copy matter — avoid misleading claims",
  ];

  return {
    id: `listing-escort-${row.slug}`,
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

export function buildCuratedEscortDirectoryListings(cat: CategoryDef): Listing[] {
  const featured = ESCORT_DIRECTORIES_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  const grid = ESCORT_DIRECTORIES_GRID.map((row, i) =>
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

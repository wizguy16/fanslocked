import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { clampTagline } from "@/lib/utils";

export type CuratedMaleCompanionsRow = {
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

/** Top 12 — horizontal featured rail. */
export const MALE_COMPANIONS_FEATURED: CuratedMaleCompanionsRow[] = [
  {
    name: "RentMen",
    slug: "rentmen",
    logo: "https://logo.clearbit.com/rent.men",
    website: "https://rent.men",
    payout: "Lead Gen",
    difficulty: "Medium",
    type: "Directory",
    description: "Largest male escort directory online.",
    preview:
      "RentMen connects users with male companions worldwide, offering a premium directory experience with high-intent traffic.",
  },
  {
    name: "RentMasseur",
    slug: "rentmasseur",
    logo: "https://logo.clearbit.com/rentmasseur.com",
    website: "https://rentmasseur.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Massage Directory",
    description: "Male massage and companion directory.",
    preview:
      "RentMasseur focuses on professional male massage services, attracting high-quality traffic and strong engagement.",
  },
  {
    name: "MasseurFinder",
    slug: "masseurfinder",
    logo: "https://logo.clearbit.com/masseurfinder.com",
    website: "https://masseurfinder.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Massage Directory",
    description: "Find male massage providers worldwide.",
    preview:
      "MasseurFinder helps users discover male massage providers, offering a safer and more structured browsing experience.",
  },
  {
    name: "JustForFans",
    slug: "justforfans",
    logo: "https://logo.clearbit.com/justfor.fans",
    website: "https://justfor.fans",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Creator Platform",
    description: "Subscription platform for male creators.",
    preview:
      "JustForFans allows users to connect with male creators through subscriptions and exclusive content.",
  },
  {
    name: "FanCentro",
    slug: "fancentro",
    logo: "https://logo.clearbit.com/fancentro.com",
    website: "https://fancentro.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Creator Platform",
    description: "Creator monetization platform.",
    preview:
      "FanCentro helps creators monetize their audience through subscriptions and direct engagement.",
  },
  {
    name: "LoyalFans",
    slug: "loyalfans",
    logo: "https://logo.clearbit.com/loyalfans.com",
    website: "https://loyalfans.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Creator Platform",
    description: "Fan subscription platform.",
    preview:
      "LoyalFans provides multiple monetization tools, helping creators and affiliates generate consistent income.",
  },
  {
    name: "Slixa",
    slug: "slixa",
    logo: "https://logo.clearbit.com/slixa.com",
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
    logo: "https://logo.clearbit.com/scarletblue.com.au",
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
    logo: "https://logo.clearbit.com/escortbabylon.net",
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
    logo: "https://logo.clearbit.com/adultwork.com",
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
    logo: "https://logo.clearbit.com/massagerepublic.com",
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
    logo: "https://logo.clearbit.com/ts4rent.com",
    website: "https://ts4rent.com",
    payout: "Lead Gen",
    difficulty: "Medium",
    type: "Directory",
    description: "Specialized companion directory.",
    preview:
      "TS4Rent focuses on niche audiences, delivering highly targeted traffic and strong engagement.",
  },
];

/** Next 13 — dense grid below the rail. */
export const MALE_COMPANIONS_GRID: CuratedMaleCompanionsRow[] = [
  {
    name: "Masseurfinder Models",
    slug: "masseurfinder-models",
    logo: "https://logo.clearbit.com/masseurfinder.com",
    website: "https://masseurfinder.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Browse masseur listings.",
    preview: "Explore available profiles and connect with professionals instantly.",
  },
  {
    name: "RentMen Europe",
    slug: "rentmen-eu",
    logo: "https://logo.clearbit.com/rent.men",
    website: "https://rent.men",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "European listings.",
    preview: "Find male companions across European cities with ease.",
  },
  {
    name: "FanCentro Creators",
    slug: "fancentro-creators",
    logo: "https://logo.clearbit.com/fancentro.com",
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
    logo: "https://logo.clearbit.com/justfor.fans",
    website: "https://justfor.fans",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Discovery",
    description: "Browse male creators.",
    preview: "Find top male creators and connect through subscriptions.",
  },
  {
    name: "LoyalFans Creators",
    slug: "loyalfans-creators",
    logo: "https://logo.clearbit.com/loyalfans.com",
    website: "https://loyalfans.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Discovery",
    description: "Discover creators.",
    preview: "Explore trending creators and premium content.",
  },
  {
    name: "Escort Babylon Listings",
    slug: "escort-babylon-list",
    logo: "https://logo.clearbit.com/escortbabylon.net",
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
    logo: "https://logo.clearbit.com/slixa.com",
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
    logo: "https://logo.clearbit.com/massagerepublic.com",
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
    logo: "https://logo.clearbit.com/adultwork.com",
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
    logo: "https://logo.clearbit.com/scarletblue.com.au",
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
    logo: "https://logo.clearbit.com/ts4rent.com",
    website: "https://ts4rent.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Browse profiles.",
    preview: "Find niche companion listings.",
  },
  {
    name: "RentMasseur Listings",
    slug: "rentmasseur-list",
    logo: "https://logo.clearbit.com/rentmasseur.com",
    website: "https://rentmasseur.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Browse profiles.",
    preview: "Find massage providers quickly.",
  },
  {
    name: "MasseurFinder Listings",
    slug: "masseurfinder-list",
    logo: "https://logo.clearbit.com/masseurfinder.com",
    website: "https://masseurfinder.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Browse profiles.",
    preview: "Explore masseur listings worldwide.",
  },
];

function tagsFor(): string[] {
  return ["male", "companions", "lgbt"];
}

function buildListing(
  row: CuratedMaleCompanionsRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.description, 160);
  const review = `${row.name} is listed in our ${cat.label} set for directory and creator fit: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "High-intent directory and subscription traffic when positioned clearly",
    "Mix of lead-gen and revshare programs for funnel testing",
    "Creator rails (JFF, FanCentro, LoyalFans) overlap cleanly with fan verticals",
  ];
  const cons = [
    "Jurisdiction and age-verification rules vary — keep landers compliant",
    "Directory quality and policies change — spot-check listings regularly",
    "Disclosure and safety copy matter — avoid misleading claims",
  ];

  return {
    id: `listing-male-${row.slug}`,
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

export function buildCuratedMaleCompanionsListings(cat: CategoryDef): Listing[] {
  const featured = MALE_COMPANIONS_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  const grid = MALE_COMPANIONS_GRID.map((row, i) =>
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

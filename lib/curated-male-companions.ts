import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedMaleCompanionsRow = {
  name: string;
  slug: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  description: string;
  preview: string;
  tier: 1 | 2 | 3;
};

/** Male escort and male massage directory picks — tier 1 authority, then tier 2 expansion. */
export const MALE_COMPANIONS_FEATURED: CuratedMaleCompanionsRow[] = [
  {
    name: "RentMen",
    slug: "rentmen",
    website: "https://rent.men",
    payout: "Lead Gen",
    difficulty: "Medium",
    type: "Directory",
    tier: 1,
    description: "Largest male escort directory online.",
    preview:
      "RentMen connects users with male companions worldwide, offering a premium directory experience with high-intent traffic.",
  },
  {
    name: "RentMasseur",
    slug: "rentmasseur",
    website: "https://rentmasseur.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Massage Directory",
    tier: 1,
    description: "Male massage and companion directory.",
    preview:
      "RentMasseur focuses on professional male massage services, attracting high-quality traffic and strong engagement.",
  },
  {
    name: "MasseurFinder",
    slug: "masseurfinder",
    website: "https://masseurfinder.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Massage Directory",
    tier: 1,
    description: "Find male massage providers worldwide.",
    preview:
      "MasseurFinder helps users discover male massage providers, offering a safer and more structured browsing experience.",
  },
  {
    name: "MintBoys",
    slug: "mintboys",
    website: "https://www.mintboys.com",
    payout: "Lead Gen",
    difficulty: "Medium",
    type: "Directory",
    tier: 2,
    description: "Male escort directory with international coverage.",
    preview:
      "MintBoys provides global listings with strong profile variety and growing user demand.",
  },
  {
    name: "Tryst",
    slug: "tryst",
    website: "https://tryst.link",
    payout: "Lead Gen",
    difficulty: "Medium",
    type: "Directory",
    tier: 2,
    description: "High-end escort directory with strong trust signals.",
    preview: "Tryst focuses on premium listings and vetted profiles for higher-quality traffic.",
  },
  {
    name: "Slixa",
    slug: "slixa",
    website: "https://www.slixa.com",
    payout: "Lead Gen",
    difficulty: "Medium",
    type: "Directory",
    tier: 2,
    description: "Premium escort listing platform.",
    preview: "Slixa offers polished listings and strong geographic coverage.",
  },
];

export const MALE_COMPANIONS_GRID: CuratedMaleCompanionsRow[] = [
  {
    name: "SkipTheGames",
    slug: "skipthegames",
    website: "https://skipthegames.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Classifieds",
    tier: 3,
    description:
      "Classified ads platform with open listings—wide coverage; users should verify profiles carefully.",
    preview:
      "Classified ads platform with open listings. Best used for broad coverage, but users should verify profiles carefully.",
  },
  {
    name: "Bedpage",
    slug: "bedpage",
    website: "https://bedpage.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Classifieds",
    tier: 3,
    description: "General classifieds with escort listings.",
    preview: "Expands reach into lower-intent traffic segments.",
  },
];

function tagsFor(): string[] {
  return ["male", "companions", "lgbt", "directory", "massage"];
}

function buildListing(
  row: CuratedMaleCompanionsRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.description, 160);
  const review = `${row.name} is listed in our ${cat.label} set for male provider and directory fit: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "High-intent traffic from users seeking male providers and massage professionals",
    "Lead-gen rails suited to directory-style landers and clear disclosures",
    "Established brands with structured profiles and search",
  ];
  const cons = [
    "Jurisdiction and age-verification rules vary — keep landers compliant",
    "Directory policies change — spot-check listings regularly",
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
  row: CuratedMaleCompanionsRow,
  index: number,
): { rating: number; popularity_score: number } {
  const tierBase = {
    1: 4.9,
    2: 4.7,
    3: 4.4,
  }[row.tier];
  const rating = Math.round((tierBase - index * 0.02) * 10) / 10;
  const popularity_score = (row.tier === 1 ? 100 : row.tier === 2 ? 92 : 84) - index;
  return { rating, popularity_score };
}

export function buildCuratedMaleCompanionsListings(cat: CategoryDef): Listing[] {
  const featured = MALE_COMPANIONS_FEATURED.map((row, i) => {
    const { rating, popularity_score } = rowScore(row, i);
    return buildListing(row, cat, rating, popularity_score, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`);
  });
  const grid = MALE_COMPANIONS_GRID.map((row, i) => {
    const { rating, popularity_score } = rowScore(row, i);
    return buildListing(row, cat, rating, popularity_score, `2025-07-${String((i % 28) + 1).padStart(2, "0")}`);
  });
  return [...featured, ...grid];
}

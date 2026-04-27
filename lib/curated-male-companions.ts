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
};

/** Male escort and male massage directory picks. */
export const MALE_COMPANIONS_FEATURED: CuratedMaleCompanionsRow[] = [
  {
    name: "RentMen",
    slug: "rentmen",
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
    website: "https://masseurfinder.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Massage Directory",
    description: "Find male massage providers worldwide.",
    preview:
      "MasseurFinder helps users discover male massage providers, offering a safer and more structured browsing experience.",
  },
];

export const MALE_COMPANIONS_GRID: CuratedMaleCompanionsRow[] = [
  {
    name: "Masseurfinder Models",
    slug: "masseurfinder-models",
    website: "https://masseurfinder.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Browse verified male massage listings with location-based filtering.",
    preview: "Explore available profiles and connect with professionals instantly.",
  },
  {
    name: "RentMen Europe",
    slug: "rentmen-eu",
    website: "https://rent.men",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Browse verified male escort listings across Europe with location-based filtering.",
    preview: "Find male companions across European cities with ease.",
  },
  {
    name: "RentMasseur Listings",
    slug: "rentmasseur-list",
    website: "https://rentmasseur.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Browse verified male massage companion profiles with location-based filtering.",
    preview: "Find massage providers quickly.",
  },
  {
    name: "MasseurFinder Listings",
    slug: "masseurfinder-list",
    website: "https://masseurfinder.com",
    payout: "Lead Gen",
    difficulty: "Easy",
    type: "Directory",
    description: "Browse verified male masseur profiles with location-based filtering.",
    preview: "Explore masseur listings worldwide.",
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

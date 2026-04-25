import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { clampTagline } from "@/lib/utils";

export type CuratedPremiumPornRow = {
  name: string;
  slug: string;
  logo: string;
  website: string;
  preview: string;
};

/** Top 12 — horizontal featured rail (Premium Porn Sites). */
export const PREMIUM_PORN_FEATURED: CuratedPremiumPornRow[] = [
  {
    name: "Brazzers",
    slug: "brazzers",
    logo: "https://logo.clearbit.com/brazzers.com",
    website: "https://www.brazzers.com",
    preview:
      "Brazzers is one of the most recognized premium porn networks, known for high-budget scenes, top-tier performers, and polished production quality.",
  },
  {
    name: "BangBros",
    slug: "bangbros",
    logo: "https://logo.clearbit.com/bangbros.com",
    website: "https://www.bangbros.com",
    preview:
      "BangBros delivers a massive collection of raw, high-energy scenes across dozens of popular series, updated daily with exclusive content.",
  },
  {
    name: "AdultTime",
    slug: "adulttime",
    logo: "https://logo.clearbit.com/adulttime.com",
    website: "https://www.adulttime.com",
    preview:
      "AdultTime is an all-in-one premium platform offering access to multiple top studios with one subscription, often called the Netflix of porn.",
  },
  {
    name: "TeamSkeet",
    slug: "teamskeet",
    logo: "https://logo.clearbit.com/teamskeet.com",
    website: "https://www.teamskeet.com",
    preview:
      "TeamSkeet features a wide range of popular series and exclusive scenes, focusing on high-quality amateur-style and studio content.",
  },
  {
    name: "MYLF",
    slug: "mylf",
    logo: "https://logo.clearbit.com/mylf.com",
    website: "https://www.mylf.com",
    preview:
      "MYLF specializes in premium MILF-focused content with high production value and a strong lineup of experienced performers.",
  },
  {
    name: "Naughty America",
    slug: "naughty-america",
    logo: "https://logo.clearbit.com/naughtyamerica.com",
    website: "https://www.naughtyamerica.com",
    preview:
      "Naughty America offers high-definition scenes with a focus on immersive storytelling and VR-compatible experiences.",
  },
  {
    name: "Vixen",
    slug: "vixen",
    logo: "https://logo.clearbit.com/vixen.com",
    website: "https://www.vixen.com",
    preview:
      "Vixen is known for cinematic adult films with stunning visuals, luxury aesthetics, and some of the industry’s top talent.",
  },
  {
    name: "Blacked",
    slug: "blacked",
    logo: "https://logo.clearbit.com/blacked.com",
    website: "https://www.blacked.com",
    preview:
      "Blacked delivers high-end cinematic scenes with a signature visual style and strong storytelling elements.",
  },
  {
    name: "Reality Kings",
    slug: "reality-kings",
    logo: "https://logo.clearbit.com/realitykings.com",
    website: "https://www.realitykings.com",
    preview:
      "Reality Kings offers a huge library of exclusive scenes and long-running series featuring popular performers and real-world settings.",
  },
  {
    name: "Digital Playground",
    slug: "digital-playground",
    logo: "https://logo.clearbit.com/digitalplayground.com",
    website: "https://www.digitalplayground.com",
    preview:
      "Digital Playground produces high-budget, story-driven adult films with a focus on visual effects and premium quality.",
  },
  {
    name: "Babes",
    slug: "babes",
    logo: "https://logo.clearbit.com/babes.com",
    website: "https://www.babes.com",
    preview:
      "Babes focuses on sensual, high-quality scenes featuring top performers and a more intimate, cinematic style.",
  },
  {
    name: "Private.com",
    slug: "private",
    logo: "https://logo.clearbit.com/private.com",
    website: "https://www.private.com",
    preview:
      "Private.com delivers European-style adult content with elegant production, strong narratives, and exclusive scenes.",
  },
];

/** Next 13 — dense grid below the rail. */
export const PREMIUM_PORN_GRID: CuratedPremiumPornRow[] = [
  {
    name: "Mofos",
    slug: "mofos",
    logo: "https://logo.clearbit.com/mofos.com",
    website: "https://www.mofos.com",
    preview:
      "Mofos is known for its casual, street-style adult content with a wide range of popular series and frequent updates.",
  },
  {
    name: "Evil Angel",
    slug: "evil-angel",
    logo: "https://logo.clearbit.com/evilangel.com",
    website: "https://www.evilangel.com",
    preview:
      "Evil Angel offers a massive catalog of director-driven content, featuring unique styles and niche categories.",
  },
  {
    name: "PornBox",
    slug: "pornbox",
    logo: "https://logo.clearbit.com/pornbox.com",
    website: "https://www.pornbox.com",
    preview:
      "PornBox combines content from multiple studios into one platform, offering a large and diverse premium library.",
  },
  {
    name: "Nubiles Porn",
    slug: "nubiles-porn",
    logo: "https://logo.clearbit.com/nubiles-porn.com",
    website: "https://nubiles-porn.com",
    preview:
      "Nubiles focuses on youthful, high-quality scenes with clean visuals and a polished production style.",
  },
  {
    name: "Jules Jordan",
    slug: "jules-jordan",
    logo: "https://logo.clearbit.com/julesjordan.com",
    website: "https://www.julesjordan.com",
    preview:
      "Jules Jordan is known for high-performance scenes and a strong reputation for quality and consistency.",
  },
  {
    name: "SisLovesMe",
    slug: "sislovesme",
    logo: "https://logo.clearbit.com/sislovesme.com",
    website: "https://www.sislovesme.com",
    preview:
      "SisLovesMe features storyline-driven scenes with popular themes and high-quality production value.",
  },
  {
    name: "Tiny4K",
    slug: "tiny4k",
    logo: "https://logo.clearbit.com/tiny4k.com",
    website: "https://www.tiny4k.com",
    preview:
      "Tiny4K delivers ultra-HD content with a focus on petite performers and crisp, modern visuals.",
  },
  {
    name: "Passion HD",
    slug: "passion-hd",
    logo: "https://logo.clearbit.com/passionhd.com",
    website: "https://www.passionhd.com",
    preview:
      "Passion HD focuses on sensual, story-driven scenes with high-definition production and elegant direction.",
  },
  {
    name: "New Sensations",
    slug: "new-sensations",
    logo: "https://logo.clearbit.com/newsensations.com",
    website: "https://www.newsensations.com",
    preview:
      "New Sensations is a long-running studio known for its wide range of themed content and consistent releases.",
  },
  {
    name: "CherryPimps",
    slug: "cherrypimps",
    logo: "https://logo.clearbit.com/cherrypimps.com",
    website: "https://www.cherrypimps.com",
    preview:
      "CherryPimps blends amateur and professional content with a focus on variety and frequent updates.",
  },
  {
    name: "Deeper.com",
    slug: "deeper",
    logo: "https://logo.clearbit.com/deeper.com",
    website: "https://www.deeper.com",
    preview:
      "Deeper offers intense, cinematic experiences with a strong focus on storytelling and visual depth.",
  },
  {
    name: "21Sextury",
    slug: "21sextury",
    logo: "https://logo.clearbit.com/21sextury.com",
    website: "https://www.21sextury.com",
    preview:
      "21Sextury delivers European-style adult content with a diverse selection of scenes and performers.",
  },
  {
    name: "PornPros",
    slug: "pornpros",
    logo: "https://logo.clearbit.com/pornpros.com",
    website: "https://www.pornpros.com",
    preview:
      "PornPros features multiple popular brands under one network, offering a wide range of premium scenes.",
  },
];

function tagsFor(): string[] {
  return ["premium-porn", "editor-pick", "premium", "streaming"];
}

function buildListing(
  row: CuratedPremiumPornRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.preview, 160);
  const review = `${row.name} is listed in our ${cat.label} set because it matches high-intent traffic expectations: ${row.preview}`;
  const pros = [
    "Strong brand recognition with search-intent audiences",
    "Premium positioning that supports higher-quality funnel traffic",
    "Familiar subscription UX for readers upgrading from tubes",
  ];
  const cons = [
    "Competitive SERPs — win with angle-specific landers and disclosures",
    "Program terms and caps vary by geo — verify current affiliate rules",
    "Catalog emphasis shifts over time — spot-check category fit",
  ];

  return {
    id: `listing-premium-${row.slug}`,
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

export function buildCuratedPremiumPornListings(cat: CategoryDef): Listing[] {
  const featured = PREMIUM_PORN_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  const grid = PREMIUM_PORN_GRID.map((row, i) =>
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

import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedGamingRow = {
  name: string;
  slug: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  preview: string;
};

/**
 * Featured hubs — each row has a matching asset under `public/images/sites/adultgames/`
 * (`{slug}.png`). GameLink sits in “More to explore” after Quick + Top picks.
 */
export const SEXGAMES_FEATURED: CuratedGamingRow[] = [
  {
    name: "Nutaku",
    slug: "nutaku",
    website: "https://www.nutaku.net",
    payout: "High",
    difficulty: "Easy",
    type: "games",
    preview:
      "Nutaku is one of the largest adult game platforms, offering both browser-based and downloadable titles across multiple genres. With free-to-play and premium options, it provides consistent updates and strong player engagement.",
  },
  {
    name: "EroLabs",
    slug: "erolabs",
    website: "https://www.erolabs.com",
    payout: "High",
    difficulty: "Easy",
    type: "games",
    preview:
      "EroLabs publishes high-quality adult games with strong progression systems, premium content, and frequent updates, making it one of the top platforms for long-term gameplay.",
  },
  {
    name: "Itch.io Adult Games",
    slug: "itch-adult",
    website: "https://itch.io/games/tag-adult",
    payout: "Indirect",
    difficulty: "Easy",
    type: "marketplace",
    preview:
      "Itch.io hosts a massive collection of indie adult games, including visual novels, RPGs, and experimental titles, making it a strong discovery platform for unique and frequently updated content.",
  },
  {
    name: "Grand Bang Auto",
    slug: "grand-bang-auto",
    website: "https://grandbangauto.com/features",
    payout: "High",
    difficulty: "Easy",
    type: "games",
    preview:
      "Grand Bang Auto delivers an open-world style adult experience with sandbox gameplay, character progression, and ongoing updates for immersive exploration.",
  },
  {
    name: "HentaiHeroes",
    slug: "hentaiheroes",
    website: "https://www.hentaiheroes.com",
    payout: "High",
    difficulty: "Easy",
    type: "rpg",
    preview:
      "HentaiHeroes is a progression-based RPG adult game that combines character collection, upgrades, and story-driven content, making it one of the most recognized long-term play experiences.",
  },
  {
    name: "GameLink Interactive",
    slug: "gamelink-interactive",
    website: "https://www.gamelink.com",
    payout: "High",
    difficulty: "Easy",
    type: "premium",
    preview:
      "GameLink Interactive offers a mix of adult video content and interactive experiences, including downloadable and game-style content. With an established subscription model and affiliate program, it works as a strong secondary platform for users exploring interactive adult content beyond browser-based games.",
  },
];

export const SEXGAMES_GRID: CuratedGamingRow[] = [
  {
    name: "Summertime Saga",
    slug: "summertime-saga",
    website: "https://summertimesaga.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "visual-novel",
    preview:
      "Summertime Saga is one of the most popular adult visual novels with deep storylines and exploration.",
  },
  {
    name: "Milfy City",
    slug: "milfy-city",
    website: "https://milfycity.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "visual-novel",
    preview:
      "Milfy City is a story-driven adult game featuring immersive environments and character development.",
  },
  {
    name: "Being a DIK",
    slug: "being-a-dik",
    website: "https://store.steampowered.com/app/825563/Being_a_DIJK/",
    payout: "Indirect",
    difficulty: "Easy",
    type: "visual-novel",
    preview:
      "Being a DIK is a highly rated adult visual novel focused on choices, relationships, and storytelling.",
  },
  {
    name: "Dreams of Desire",
    slug: "dreams-of-desire",
    website: "https://store.steampowered.com/app/463240/Dreams_of_Desire_Definitive_Edition/",
    payout: "Indirect",
    difficulty: "Easy",
    type: "visual-novel",
    preview:
      "Dreams of Desire offers a narrative-driven adult experience with branching story paths.",
  },
  {
    name: "Corruption of Champions",
    slug: "corruption-of-champions",
    website: "https://itch.io",
    payout: "Indirect",
    difficulty: "Easy",
    type: "rpg",
    preview:
      "Corruption of Champions is a text-based RPG with deep customization and adult themes.",
  },
  {
    name: "Trials in Tainted Space",
    slug: "tainted-space",
    website: "https://itch.io",
    payout: "Indirect",
    difficulty: "Easy",
    type: "rpg",
    preview:
      "Trials in Tainted Space combines sci-fi exploration with adult storytelling and gameplay.",
  },
  {
    name: "Love Esquire",
    slug: "love-esquire",
    website: "https://store.steampowered.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "dating-sim",
    preview:
      "Love Esquire is a dating sim with RPG elements and humorous adult storytelling.",
  },
  {
    name: "House Party",
    slug: "house-party",
    website: "https://store.steampowered.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "simulation",
    preview:
      "House Party is an interactive 3D simulation game with adult choices and dynamic events.",
  },
  {
    name: "My Cute Roommate",
    slug: "cute-roommate",
    website: "https://itch.io",
    payout: "Indirect",
    difficulty: "Easy",
    type: "visual-novel",
    preview:
      "My Cute Roommate is a casual adult game centered around relationships and interactions.",
  },
  {
    name: "Monster Girl Island",
    slug: "monster-girl-island",
    website: "https://itch.io",
    payout: "Indirect",
    difficulty: "Easy",
    type: "exploration",
    preview:
      "Monster Girl Island is an open-world adult game focused on exploration and encounters.",
  },
  {
    name: "Hentai Clicker",
    slug: "hentai-clicker",
    website: "https://www.nutaku.net",
    payout: "Medium",
    difficulty: "Easy",
    type: "idle",
    preview:
      "Hentai Clicker is a simple idle game with adult rewards and progression mechanics.",
  },
  {
    name: "Booty Calls",
    slug: "booty-calls",
    website: "https://www.nutaku.net",
    payout: "Medium",
    difficulty: "Easy",
    type: "mobile",
    preview:
      "Booty Calls is a casual mobile game featuring collectible characters and adult content.",
  },
  {
    name: "Hentai Legends",
    slug: "hentai-legends",
    website: "https://www.nutaku.net",
    payout: "Medium",
    difficulty: "Easy",
    type: "rpg",
    preview:
      "Hentai Legends is a strategy-based adult game with character progression and unlockable scenes.",
  },
  {
    name: "GameJolt Adult",
    slug: "gamejolt-adult",
    website: "https://gamejolt.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "community",
    preview:
      "GameJolt features indie developers creating experimental adult-themed games and experiences.",
  },
  {
    name: "AdultGameCity",
    slug: "adultgamecity",
    website: "https://adultgamecity.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "download",
    preview:
      "AdultGameCity offers downloadable adult games across multiple genres and storylines.",
  },
  {
    name: "Porngames.com",
    slug: "porngames",
    website: "https://porngames.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "browser-games",
    preview:
      "Porngames.com features quick-play browser games designed for instant adult entertainment.",
  },
  {
    name: "3DXChat",
    slug: "3dxchat",
    website: "https://3dxchat.com",
    payout: "High",
    difficulty: "Medium",
    type: "simulation",
    preview:
      "3DXChat is a 3D adult simulation game where players interact, explore, and create virtual experiences.",
  },
];

function tagsFor(): string[] {
  return ["gaming", "browser", "adult", "interactive", "editor-pick"];
}

function buildListing(
  row: CuratedGamingRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.preview, 160);
  const review = `${row.name} is listed in our ${cat.label} set for adult game discovery: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "Strong engagement and session time for SEO and newsletter funnels",
    "Mix of browser, client, and community hubs for intent-matched traffic",
    "Indie and publisher paths when disclosures stay clear",
  ];
  const cons = [
    "Monetization is often indirect compared to cams or dating — set expectations",
    "Platform policies and age gates vary — qualify outbound carefully",
    "Some titles are storefront- or Steam-backed — deep links may shift over time",
  ];

  return {
    id: `listing-gaming-${row.slug}`,
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

export function buildCuratedGamingListings(cat: CategoryDef): Listing[] {
  const featured = SEXGAMES_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  const grid = SEXGAMES_GRID.map((row, i) =>
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

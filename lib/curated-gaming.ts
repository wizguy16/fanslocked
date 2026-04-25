import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { clampTagline } from "@/lib/utils";

export type CuratedGamingRow = {
  name: string;
  slug: string;
  logo: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  preview: string;
};

/** Top 12 — adult game platforms (browser, client, community). */
export const SEXGAMES_FEATURED: CuratedGamingRow[] = [
  {
    name: "Nutaku",
    slug: "nutaku",
    logo: "https://logo.clearbit.com/nutaku.net",
    website: "https://www.nutaku.net",
    payout: "High",
    difficulty: "Easy",
    type: "games",
    preview:
      "Nutaku is the largest adult gaming platform featuring hundreds of free-to-play and premium erotic games.",
  },
  {
    name: "F95Zone",
    slug: "f95zone",
    logo: "https://logo.clearbit.com/f95zone.to",
    website: "https://f95zone.to",
    payout: "Indirect",
    difficulty: "Easy",
    type: "community",
    preview:
      "F95Zone is a massive community where users discover, download, and discuss the latest adult games.",
  },
  {
    name: "Itch.io Adult Games",
    slug: "itch-adult",
    logo: "https://logo.clearbit.com/itch.io",
    website: "https://itch.io/games/tag-adult",
    payout: "Indirect",
    difficulty: "Easy",
    type: "marketplace",
    preview:
      "Itch.io hosts a wide range of indie adult games including visual novels and interactive experiences.",
  },
  {
    name: "GameJolt Adult",
    slug: "gamejolt-adult",
    logo: "https://logo.clearbit.com/gamejolt.com",
    website: "https://gamejolt.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "community",
    preview:
      "GameJolt features indie developers creating experimental adult-themed games and experiences.",
  },
  {
    name: "LewdGames",
    slug: "lewdgames",
    logo: "https://logo.clearbit.com/lewdgames.com",
    website: "https://lewdgames.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "browser-games",
    preview:
      "LewdGames offers a large collection of browser-based adult games with instant play access.",
  },
  {
    name: "SexGamesClub",
    slug: "sexgamesclub",
    logo: "https://logo.clearbit.com/sexgamesclub.com",
    website: "https://sexgamesclub.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "browser-games",
    preview:
      "SexGamesClub features a variety of free interactive adult games across multiple genres.",
  },
  {
    name: "HentaiHeroes",
    slug: "hentaiheroes",
    logo: "https://logo.clearbit.com/hentaiheroes.com",
    website: "https://www.hentaiheroes.com",
    payout: "High",
    difficulty: "Easy",
    type: "rpg",
    preview:
      "HentaiHeroes is a popular RPG-style adult game where players build relationships and unlock scenes.",
  },
  {
    name: "HaremHeroes",
    slug: "haremheroes",
    logo: "https://logo.clearbit.com/haremheroes.com",
    website: "https://www.haremheroes.com",
    payout: "High",
    difficulty: "Easy",
    type: "rpg",
    preview:
      "HaremHeroes combines story-driven gameplay with adult content in a progression-based system.",
  },
  {
    name: "EroLabs",
    slug: "erolabs",
    logo: "https://logo.clearbit.com/erolabs.com",
    website: "https://www.erolabs.com",
    payout: "High",
    difficulty: "Easy",
    type: "games",
    preview:
      "EroLabs publishes adult mobile and browser games with strong monetization and ongoing updates.",
  },
  {
    name: "AdultGameCity",
    slug: "adultgamecity",
    logo: "https://logo.clearbit.com/adultgamecity.com",
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
    logo: "https://logo.clearbit.com/porngames.com",
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
    logo: "https://logo.clearbit.com/3dxchat.com",
    website: "https://3dxchat.com",
    payout: "High",
    difficulty: "Medium",
    type: "simulation",
    preview:
      "3DXChat is a 3D adult simulation game where players interact, explore, and create virtual experiences.",
  },
];

export const SEXGAMES_GRID: CuratedGamingRow[] = [
  {
    name: "Summertime Saga",
    slug: "summertime-saga",
    logo: "https://logo.clearbit.com/summertimesaga.com",
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
    logo: "https://logo.clearbit.com/milfycity.com",
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
    logo: "https://logo.clearbit.com/patreon.com",
    website: "https://www.patreon.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "visual-novel",
    preview:
      "Being a DIK is a highly rated adult visual novel focused on choices, relationships, and storytelling.",
  },
  {
    name: "Dreams of Desire",
    slug: "dreams-of-desire",
    logo: "https://logo.clearbit.com/patreon.com",
    website: "https://www.patreon.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "visual-novel",
    preview:
      "Dreams of Desire offers a narrative-driven adult experience with branching story paths.",
  },
  {
    name: "Corruption of Champions",
    slug: "corruption-of-champions",
    logo: "https://logo.clearbit.com/itch.io",
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
    logo: "https://logo.clearbit.com/itch.io",
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
    logo: "https://logo.clearbit.com/steam.com",
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
    logo: "https://logo.clearbit.com/steam.com",
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
    logo: "https://logo.clearbit.com/itch.io",
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
    logo: "https://logo.clearbit.com/itch.io",
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
    logo: "https://logo.clearbit.com/nutaku.net",
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
    logo: "https://logo.clearbit.com/nutaku.net",
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
    logo: "https://logo.clearbit.com/nutaku.net",
    website: "https://www.nutaku.net",
    payout: "Medium",
    difficulty: "Easy",
    type: "rpg",
    preview:
      "Hentai Legends is a strategy-based adult game with character progression and unlockable scenes.",
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
    "Some titles are Patreon or Steam-backed — deep links may shift over time",
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
    image: row.logo,
    logo: row.logo,
    affiliate_url: buildListingOutboundPath(row.slug),
    website_url: row.website,
    rating,
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

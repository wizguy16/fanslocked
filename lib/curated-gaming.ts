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

/** Featured set — first rows map to prestige Top picks via `gaming-prestige-slices`. */
export const SEXGAMES_FEATURED: CuratedGamingRow[] = [
  {
    name: "Nutaku",
    slug: "nutaku",
    website: "https://www.nutaku.net",
    payout: "High",
    difficulty: "Easy",
    type: "games",
    preview:
      "Nutaku is one of the largest adult game platforms, offering browser and downloadable titles across multiple genres. The platform features free-to-play and premium games with regular updates and strong developer support.",
  },
  {
    name: "EroLabs",
    slug: "erolabs",
    website: "https://www.erolabs.com",
    payout: "High",
    difficulty: "Easy",
    type: "games",
    preview:
      "EroLabs hosts a wide range of adult mobile and browser games, including popular RPG and gacha-style titles. Known for consistent updates and monetized progression systems, it's a strong platform for ongoing gameplay.",
  },
  {
    name: "F95Zone",
    slug: "f95zone",
    website: "https://f95zone.to",
    payout: "Indirect",
    difficulty: "Easy",
    type: "community",
    preview:
      "F95Zone is a massive community hub for adult games, where users can discover new releases, download indie titles, and follow ongoing game development. It's one of the most active spaces for adult gaming discussions and updates.",
  },
  {
    name: "Itch.io Adult Games",
    slug: "itch-adult",
    website: "https://itch.io/games/tag-adult",
    payout: "Indirect",
    difficulty: "Easy",
    type: "marketplace",
    preview:
      "Itch.io's adult section features indie-developed games across visual novels, RPGs, and experimental formats. Many titles are free or pay-what-you-want, making it a key discovery platform for new creators.",
  },
  {
    name: "HentaiHeroes",
    slug: "hentaiheroes",
    website: "https://www.hentaiheroes.com",
    payout: "High",
    difficulty: "Easy",
    type: "rpg",
    preview:
      "HentaiHeroes is a browser-based RPG that combines progression systems with adult content. Players unlock characters and scenes through gameplay, making it one of the more structured adult gaming experiences.",
  },
  {
    name: "Patreon / SubscribeStar",
    slug: "patreon-subscribestar",
    website: "https://www.patreon.com",
    payout: "Indirect",
    difficulty: "Easy",
    type: "creator-support",
    preview:
      "Many adult game developers use platforms like Patreon and SubscribeStar to release exclusive builds, early access content, and ongoing updates. These platforms give users direct access to indie creators and evolving games.",
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

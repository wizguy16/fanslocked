import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedHookupRow = {
  name: string;
  slug: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  preview: string;
};

/**
 * Curated order: trust-first brands, then monetized picks, then supporting featured rows.
 * Category prestige layout re-slices by slug (`hookup-prestige-slices`).
 */
export const HOOKUP_FEATURED: CuratedHookupRow[] = [
  {
    name: "Tinder",
    slug: "tinder",
    website: "https://tinder.com",
    payout: "Varies",
    difficulty: "Easy",
    type: "dating",
    preview:
      "The most widely used dating app for casual connections, with fast swiping, location-based matching, and massive user volume.",
  },
  {
    name: "AdultFriendFinder",
    slug: "adultfriendfinder",
    website: "https://www.adultfriendfinder.com",
    payout: "High ($40–$80 CPA)",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "A long-running adult dating platform focused on hookups, open relationships, and explicit connections.",
  },
  {
    name: "Ashley Madison",
    slug: "ashley-madison",
    website: "https://www.ashleymadison.com",
    payout: "High",
    difficulty: "Medium",
    type: "hookup",
    preview:
      "A privacy-focused dating platform designed for discreet encounters and controlled communication.",
  },
  {
    name: "BeNaughty",
    slug: "benaughty",
    website: "https://www.benaughty.com",
    payout: "High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "A casual dating platform built for quick matches and flirt-driven conversations with strong activity.",
  },
  {
    name: "Kasual",
    slug: "kasual",
    website: "https://www.kasualapp.com",
    payout: "Medium–High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "An anonymous hookup app for no-strings connections—minimal profiles and interactions built around speed and privacy.",
  },
  {
    name: "Pure",
    slug: "pure",
    website: "https://pure.app",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "A real-time hookup app where profiles expire quickly, encouraging immediate conversations and meetups.",
  },
  {
    name: "SnapSext",
    slug: "snapsext",
    website: "https://www.snapsext.com",
    payout: "High",
    difficulty: "Easy",
    type: "sexting",
    preview:
      "SnapSext connects users for private sexting, photo exchanges, and adult conversations with fast engagement.",
  },
  {
    name: "FriendFinder-X",
    slug: "friendfinder-x",
    website: "https://www.friendfinder-x.com",
    payout: "High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "An adult-focused dating network centered around explicit profiles, live cams, and open-minded communities.",
  },
  {
    name: "XMatch",
    slug: "xmatch",
    website: "https://www.xmatch.com",
    payout: "High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "Detailed profiles and advanced filters for users seeking casual encounters and compatible matches.",
  },
  {
    name: "Instabang",
    slug: "instabang",
    website: "https://www.instabang.com",
    payout: "High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "Fast connections and location-based matching for meeting nearby without long onboarding.",
  },
  {
    name: "Together2Night",
    slug: "together2night",
    website: "https://www.together2night.com",
    payout: "Medium–High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "Designed for spontaneous meetups and same-day connections with a simple path from match to chat.",
  },
  {
    name: "Flirt",
    slug: "flirt",
    website: "https://www.flirt.com",
    payout: "High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "Flirt makes it easy to meet new people with live chat and matchmaking focused on casual dating.",
  },
  {
    name: "NaughtyDate",
    slug: "naughtydate",
    website: "https://www.naughtydate.com",
    payout: "Medium–High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "NaughtyDate connects singles looking for fun, flirty interactions and casual dating without commitment.",
  },
  {
    name: "Fling",
    slug: "fling",
    website: "https://www.fling.com",
    payout: "High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "A long-running casual dating site focused on quick hookups and adult chat experiences.",
  },
  {
    name: "QuickFlirt",
    slug: "quickflirt",
    website: "https://www.quickflirt.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "QuickFlirt helps users connect instantly through chat-based matching and simple signup flows.",
  },
];

/** Dense grid below the featured set. */
export const HOOKUP_GRID: CuratedHookupRow[] = [
  {
    name: "UpForIt",
    slug: "upforit",
    website: "https://www.upforit.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "UpForIt connects users looking for fun, casual encounters with a simple and fast signup process.",
  },
  {
    name: "iHookup",
    slug: "ihookup",
    website: "https://www.ihookup.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview: "iHookup is designed for straightforward casual dating with minimal friction and quick matching.",
  },
  {
    name: "LocalFlirt",
    slug: "localflirt",
    website: "https://www.localflirt.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview: "LocalFlirt helps users meet nearby singles for casual chats and spontaneous meetups.",
  },
  {
    name: "OneNightFriend",
    slug: "onenightfriend",
    website: "https://www.onenightfriend.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "OneNightFriend focuses on fast connections for people seeking short-term fun and no-strings encounters.",
  },
  {
    name: "HookupHangout",
    slug: "hookuphangout",
    website: "https://www.hookuphangout.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "HookupHangout brings together users looking for relaxed, casual dating experiences and easy matches.",
  },
  {
    name: "CasualX",
    slug: "casualx",
    website: "https://casualxapp.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "CasualX is a modern dating app focused on casual relationships and open-minded connections.",
  },
  {
    name: "AdultDating",
    slug: "adultdating",
    website: "https://www.adultdating.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "AdultDating provides a simple platform for meeting people interested in casual encounters and adult chat.",
  },
  {
    name: "DateMyAge",
    slug: "datemyage",
    website: "https://www.datemyage.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "dating",
    preview: "DateMyAge connects mature singles looking for meaningful or casual relationships.",
  },
  {
    name: "Loveaholics",
    slug: "loveaholics",
    website: "https://www.loveaholics.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "Loveaholics focuses on fast-paced dating with chat-driven interactions and instant connections.",
  },
  {
    name: "SecretBenefits",
    slug: "secretbenefits",
    website: "https://www.secretbenefits.com",
    payout: "High",
    difficulty: "Medium",
    type: "sugar-dating",
    preview:
      "SecretBenefits is a sugar dating platform connecting attractive singles with generous partners.",
  },
  {
    name: "WhatsFlirt",
    slug: "whatsflirt",
    website: "https://www.whatsflirt.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview:
      "WhatsFlirt offers chat-first interactions with users looking for fun and flirty conversations.",
  },
  {
    name: "MeetNHook",
    slug: "meetnhook",
    website: "https://www.meetnhook.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview: "MeetNHook is built for fast matching and casual dating with nearby users.",
  },
  {
    name: "HookupDating",
    slug: "hookupdating",
    website: "https://www.hookupdating.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview: "HookupDating connects singles looking for quick meetups and casual encounters.",
  },
];

function tagsFor(): string[] {
  return ["dating", "hookup", "matches", "local", "editor-pick"];
}

function buildListing(
  row: CuratedHookupRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.preview, 160);
  const review = `${row.name} is listed in our ${cat.label} set for CPA-friendly dating traffic: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "Strong CPA and trial funnels common on adult dating offers",
    "Broad GEO coverage when creatives stay compliant and transparent",
    "Fast signup flows that suit paid social and push-style traffic",
  ];
  const cons = [
    "Program caps and scrub rules vary — verify network terms weekly",
    "Disclosure and age-gating requirements are strict in many regions",
    "Competitive placements — differentiate with angle-specific landers",
  ];

  return {
    id: `listing-hookup-${row.slug}`,
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

export function buildCuratedHookupListings(cat: CategoryDef): Listing[] {
  const featured = HOOKUP_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  const grid = HOOKUP_GRID.map((row, i) =>
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

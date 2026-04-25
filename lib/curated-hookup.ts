import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { clampTagline } from "@/lib/utils";

export type CuratedHookupRow = {
  name: string;
  slug: string;
  logo: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  preview: string;
};

/** Top 12 — horizontal featured rail. */
export const HOOKUP_FEATURED: CuratedHookupRow[] = [
  {
    name: "AdultFriendFinder",
    slug: "adultfriendfinder",
    logo: "https://logo.clearbit.com/adultfriendfinder.com",
    website: "https://www.adultfriendfinder.com",
    payout: "High ($40–$80 CPA)",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "AdultFriendFinder is one of the largest hookup platforms, connecting millions of users for casual encounters, live streams, and adult dating experiences worldwide.",
  },
  {
    name: "Ashley Madison",
    slug: "ashley-madison",
    logo: "https://logo.clearbit.com/ashleymadison.com",
    website: "https://www.ashleymadison.com",
    payout: "High",
    difficulty: "Medium",
    type: "hookup",
    preview:
      "Ashley Madison is built for discreet relationships, offering a platform for users seeking private connections and anonymous encounters.",
  },
  {
    name: "BeNaughty",
    slug: "benaughty",
    logo: "https://logo.clearbit.com/benaughty.com",
    website: "https://www.benaughty.com",
    payout: "High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "BeNaughty is a fast-growing casual dating platform designed for flirty chats, quick matches, and no-strings-attached hookups.",
  },
  {
    name: "Flirt",
    slug: "flirt",
    logo: "https://logo.clearbit.com/flirt.com",
    website: "https://www.flirt.com",
    payout: "High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "Flirt makes it easy to meet new people instantly with live chat, matchmaking, and a focus on casual dating and fun connections.",
  },
  {
    name: "SnapSext",
    slug: "snapsext",
    logo: "https://logo.clearbit.com/snapsext.com",
    website: "https://www.snapsext.com",
    payout: "High",
    difficulty: "Easy",
    type: "sexting",
    preview:
      "SnapSext connects users with real people for instant sexting, photo exchanges, and private adult conversations.",
  },
  {
    name: "FriendFinder-X",
    slug: "friendfinder-x",
    logo: "https://logo.clearbit.com/friendfinder-x.com",
    website: "https://www.friendfinder-x.com",
    payout: "High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "FriendFinder-X is a premium adult dating platform focused on explicit connections, live cams, and open-minded relationships.",
  },
  {
    name: "XMatch",
    slug: "xmatch",
    logo: "https://logo.clearbit.com/xmatch.com",
    website: "https://www.xmatch.com",
    payout: "High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "XMatch helps users find compatible partners for casual dating with powerful search filters and detailed profiles.",
  },
  {
    name: "Instabang",
    slug: "instabang",
    logo: "https://logo.clearbit.com/instabang.com",
    website: "https://www.instabang.com",
    payout: "High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "Instabang focuses on instant connections, helping users quickly find nearby matches for casual encounters.",
  },
  {
    name: "Together2Night",
    slug: "together2night",
    logo: "https://logo.clearbit.com/together2night.com",
    website: "https://www.together2night.com",
    payout: "Medium–High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "Together2Night is designed for spontaneous meetups, helping users find someone for tonight quickly and easily.",
  },
  {
    name: "NaughtyDate",
    slug: "naughtydate",
    logo: "https://logo.clearbit.com/naughtydate.com",
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
    logo: "https://logo.clearbit.com/fling.com",
    website: "https://www.fling.com",
    payout: "High",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "Fling is a long-running casual dating site focused on quick hookups and adult chat experiences.",
  },
  {
    name: "QuickFlirt",
    slug: "quickflirt",
    logo: "https://logo.clearbit.com/quickflirt.com",
    website: "https://www.quickflirt.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview:
      "QuickFlirt helps users connect instantly through chat-based matching and simple signup flows.",
  },
];

/** Next 13 — dense grid below the rail. */
export const HOOKUP_GRID: CuratedHookupRow[] = [
  {
    name: "UpForIt",
    slug: "upforit",
    logo: "https://logo.clearbit.com/upforit.com",
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
    logo: "https://logo.clearbit.com/ihookup.com",
    website: "https://www.ihookup.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview: "iHookup is designed for straightforward casual dating with minimal friction and quick matching.",
  },
  {
    name: "LocalFlirt",
    slug: "localflirt",
    logo: "https://logo.clearbit.com/localflirt.com",
    website: "https://www.localflirt.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview: "LocalFlirt helps users meet nearby singles for casual chats and spontaneous meetups.",
  },
  {
    name: "OneNightFriend",
    slug: "onenightfriend",
    logo: "https://logo.clearbit.com/onenightfriend.com",
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
    logo: "https://logo.clearbit.com/hookuphangout.com",
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
    logo: "https://logo.clearbit.com/casualxapp.com",
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
    logo: "https://logo.clearbit.com/adultdating.com",
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
    logo: "https://logo.clearbit.com/datemyage.com",
    website: "https://www.datemyage.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "dating",
    preview: "DateMyAge connects mature singles looking for meaningful or casual relationships.",
  },
  {
    name: "Loveaholics",
    slug: "loveaholics",
    logo: "https://logo.clearbit.com/loveaholics.com",
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
    logo: "https://logo.clearbit.com/secretbenefits.com",
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
    logo: "https://logo.clearbit.com/whatsflirt.com",
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
    logo: "https://logo.clearbit.com/meetnhook.com",
    website: "https://www.meetnhook.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "hookup",
    preview: "MeetNHook is built for fast matching and casual dating with nearby users.",
  },
  {
    name: "HookupDating",
    slug: "hookupdating",
    logo: "https://logo.clearbit.com/hookupdating.com",
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
    image: row.logo,
    logo: row.logo,
    affiliate_url: buildListingOutboundPath(row.slug),
    website_url: row.website,
    rating,
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

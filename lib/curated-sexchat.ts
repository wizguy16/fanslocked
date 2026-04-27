import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedSexChatRow = {
  name: string;
  slug: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  preview: string;
};

/**
 * Featured band (prestige “Top picks” order is fixed in `sex-chat-prestige-slices`).
 * First five: SextPanther → Arousr → iSexyChat → Jerkmate → ChatRecruit.
 */
export const SEXCHAT_FEATURED: CuratedSexChatRow[] = [
  {
    name: "SextPanther",
    slug: "sextpanther",
    website: "https://www.sextpanther.com",
    payout: "Very High",
    difficulty: "Medium",
    type: "sex-chat",
    preview:
      "SextPanther connects users with real verified creators for private messaging, sexting, and paid interactions. The platform is known for fast response times and high engagement through text, voice, and media.",
  },
  {
    name: "Arousr",
    slug: "arousr",
    website: "https://www.arousr.com",
    payout: "High",
    difficulty: "Easy",
    type: "sexting",
    preview:
      "Arousr focuses on real-time sexting and private messaging with verified chat partners. The platform emphasizes consistent engagement, personalized conversations, and ongoing interactions.",
  },
  {
    name: "iSexyChat",
    slug: "isexychat",
    website: "https://www.isexychat.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview:
      "iSexyChat is built for fast, anonymous sexting and private messaging. Users can instantly connect with chat partners for direct conversations without long onboarding.",
  },
  {
    name: "Jerkmate",
    slug: "jerkmate",
    website: "https://jerkmate.com",
    payout: "High",
    difficulty: "Easy",
    type: "chat",
    preview:
      "Jerkmate blends live cam and chat, allowing users to instantly connect and message performers. Its smart matching system increases engagement and keeps conversations active.",
  },
  {
    name: "ChatRecruit",
    slug: "chatrecruit",
    website: "https://www.chatrecruit.com",
    payout: "High",
    difficulty: "Easy",
    type: "chat",
    preview:
      "ChatRecruit is a multi-format chat platform offering text, phone, and video conversations with real users. It's designed for continuous engagement, giving users multiple ways to connect and keep conversations active beyond simple messaging. The platform stands out for flexibility—whether you prefer texting, voice chat, or live interaction, ChatRecruit supports ongoing, personalized conversations with strong response rates.",
  },
  {
    name: "MyGirlFund",
    slug: "mygirlfund",
    website: "https://www.mygirlfund.com",
    payout: "High",
    difficulty: "Easy",
    type: "chat",
    preview:
      "MyGirlFund connects users with real women for chatting, private messaging, and exclusive content.",
  },
  {
    name: "Phrendly",
    slug: "phrendly",
    website: "https://www.phrendly.com",
    payout: "High",
    difficulty: "Easy",
    type: "chat",
    preview:
      "Phrendly is a chat-based platform where conversations can turn flirty and fun with real people.",
  },
  {
    name: "TalkToMe",
    slug: "talktome",
    website: "https://www.talktome.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview:
      "TalkToMe offers instant chat and conversation opportunities with users from around the world.",
  },
  {
    name: "NiteFlirt",
    slug: "niteflirt",
    website: "https://www.niteflirt.com",
    payout: "High",
    difficulty: "Easy",
    type: "phone-chat",
    preview:
      "NiteFlirt specializes in phone-based conversations, combining voice and chat interactions.",
  },
  {
    name: "FlirtBucks",
    slug: "flirtbucks",
    website: "https://www.flirtbucks.com",
    payout: "High",
    difficulty: "Easy",
    type: "chat",
    preview:
      "FlirtBucks powers chat-based interactions focused on texting and online conversations. The platform is optimized for continuous engagement and high reply rates.",
  },
];

/** Dense grid — first rows in prestige “More” via `sex-chat-prestige-slices` (after featured-only listings). */
export const SEXCHAT_GRID: CuratedSexChatRow[] = [
  {
    name: "TextingFactory",
    slug: "textingfactory",
    website: "https://www.textingfactory.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview:
      "TextingFactory focuses on chat-based conversations and messaging interactions. It's structured for continuous engagement and scalable chat traffic.",
  },
  {
    name: "LipService",
    slug: "lipservice",
    website: "https://lipservice.net",
    payout: "Medium",
    difficulty: "Easy",
    type: "phone-chat",
    preview:
      "LipService connects users with chat partners for private messaging and adult conversations, focusing on anonymity and fast replies.",
  },
  {
    name: "Cloudworkers",
    slug: "cloudworkers",
    website: "https://cloudworkers.company",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview:
      "Cloudworkers connects users with chat operators for continuous messaging and engagement.",
  },
  {
    name: "TexKings",
    slug: "texkings",
    website: "https://www.texkings.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview:
      "TexKings offers real-time messaging platforms for casual and ongoing conversations.",
  },
  {
    name: "RentACyberFriend",
    slug: "rentacyberfriend",
    website: "https://www.rentacyberfriend.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview:
      "RentACyberFriend connects users with companions for online conversations and social interaction.",
  },
  {
    name: "FlirtMe",
    slug: "flirtme",
    website: "https://www.flirtme.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview: "FlirtMe is built for instant messaging, flirting, and casual chat experiences.",
  },
  {
    name: "ChatJobs",
    slug: "chatjobs",
    website: "https://www.chatjobs.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview: "ChatJobs offers chat-based interactions with a focus on ongoing engagement.",
  },
  {
    name: "FriendPC",
    slug: "friendpc",
    website: "https://www.friendpc.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview:
      "FriendPC connects users with online companions for messaging and casual interaction.",
  },
  {
    name: "Premium.Chat",
    slug: "premiumchat",
    website: "https://premium.chat",
    payout: "High",
    difficulty: "Medium",
    type: "chat",
    preview:
      "Premium.Chat allows creators to monetize private conversations and direct messaging.",
  },
  {
    name: "Only2Chat",
    slug: "only2chat",
    website: "https://www.only2chat.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview: "Only2Chat offers private messaging and real-time chat interactions.",
  },
  {
    name: "ChatMatch",
    slug: "chatmatch",
    website: "https://www.chatmatch.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview: "ChatMatch focuses on quick connections and instant messaging experiences.",
  },
  {
    name: "TalkLiv",
    slug: "talkliv",
    website: "https://www.talkliv.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview: "TalkLiv offers real-time chat and conversation opportunities with active users.",
  },
  {
    name: "ChatSpin",
    slug: "chatspin",
    website: "https://www.chatspin.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "video-chat",
    preview:
      "ChatSpin is a random video chat platform that connects users instantly.",
  },
];

function tagsFor(): string[] {
  return ["sexting", "chat", "credits", "private", "editor-pick"];
}

function buildListing(
  row: CuratedSexChatRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.preview, 160);
  const review = `${row.name} is listed in our ${cat.label} set for pay-per-message and chat monetization fit: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "Credit and PPM rails that monetize chat intent quickly",
    "Real-operator and creator models that suit compliant outbound",
    "Mix of phone, text, and video paths for funnel testing",
  ];
  const cons = [
    "Disclosure and regional rules vary — keep creatives transparent",
    "Chargeback and scrub policies differ by network — verify caps often",
    "Competitive placements — win with niche angles and trust copy",
  ];

  return {
    id: `listing-sexchat-${row.slug}`,
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

export function buildCuratedSexChatListings(cat: CategoryDef): Listing[] {
  const featured = SEXCHAT_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  const grid = SEXCHAT_GRID.map((row, i) =>
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

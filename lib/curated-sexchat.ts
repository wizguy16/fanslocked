import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { clampTagline } from "@/lib/utils";

export type CuratedSexChatRow = {
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
export const SEXCHAT_FEATURED: CuratedSexChatRow[] = [
  {
    name: "SextPanther",
    slug: "sextpanther",
    logo: "https://logo.clearbit.com/sextpanther.com",
    website: "https://www.sextpanther.com",
    payout: "Very High",
    difficulty: "Medium",
    type: "sex-chat",
    preview:
      "SextPanther lets users connect directly with real creators for private sexting, voice calls, and custom content.",
  },
  {
    name: "FlirtBucks",
    slug: "flirtbucks",
    logo: "https://logo.clearbit.com/flirtbucks.com",
    website: "https://www.flirtbucks.com",
    payout: "High",
    difficulty: "Easy",
    type: "chat",
    preview:
      "FlirtBucks offers live chat experiences where users can flirt, message, and build connections instantly.",
  },
  {
    name: "MyGirlFund",
    slug: "mygirlfund",
    logo: "https://logo.clearbit.com/mygirlfund.com",
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
    logo: "https://logo.clearbit.com/phrendly.com",
    website: "https://www.phrendly.com",
    payout: "High",
    difficulty: "Easy",
    type: "chat",
    preview:
      "Phrendly is a chat-based platform where conversations can turn flirty and fun with real people.",
  },
  {
    name: "ChatRecruit",
    slug: "chatrecruit",
    logo: "https://logo.clearbit.com/chatrecruit.com",
    website: "https://www.chatrecruit.com",
    payout: "High",
    difficulty: "Easy",
    type: "chat",
    preview:
      "ChatRecruit offers text, phone, and video chat options with real users looking for engaging conversations.",
  },
  {
    name: "LiveJasmin Chat",
    slug: "livejasmin-chat",
    logo: "https://logo.clearbit.com/livejasmin.com",
    website: "https://www.livejasmin.com",
    payout: "High",
    difficulty: "Easy",
    type: "chat",
    preview:
      "LiveJasmin combines live cams with private chat, letting users connect directly with performers.",
  },
  {
    name: "Streamate Chat",
    slug: "streamate-chat",
    logo: "https://logo.clearbit.com/streamate.com",
    website: "https://www.streamate.com",
    payout: "High",
    difficulty: "Easy",
    type: "chat",
    preview:
      "Streamate offers private one-on-one chat sessions with models, focusing on real-time interaction.",
  },
  {
    name: "Arousr",
    slug: "arousr",
    logo: "https://logo.clearbit.com/arousr.com",
    website: "https://www.arousr.com",
    payout: "High",
    difficulty: "Easy",
    type: "sexting",
    preview:
      "Arousr connects users with real chat partners for private messaging, photos, and personalized experiences.",
  },
  {
    name: "ChatUpLines",
    slug: "chatuplines",
    logo: "https://logo.clearbit.com/chatuplines.com",
    website: "https://www.chatuplines.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview:
      "ChatUpLines is designed for fast, anonymous chat connections with people looking to flirt and talk.",
  },
  {
    name: "TalkToMe",
    slug: "talktome",
    logo: "https://logo.clearbit.com/talktome.com",
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
    logo: "https://logo.clearbit.com/niteflirt.com",
    website: "https://www.niteflirt.com",
    payout: "High",
    difficulty: "Easy",
    type: "phone-chat",
    preview:
      "NiteFlirt specializes in phone-based conversations, combining voice and chat interactions.",
  },
  {
    name: "iSexyChat",
    slug: "isexychat",
    logo: "https://logo.clearbit.com/isexychat.com",
    website: "https://www.isexychat.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview:
      "iSexyChat delivers quick connections with chat partners ready for flirty and engaging conversations.",
  },
];

/** Next 13 — dense grid below the rail. */
export const SEXCHAT_GRID: CuratedSexChatRow[] = [
  {
    name: "TextingFactory",
    slug: "textingfactory",
    logo: "https://logo.clearbit.com/textingfactory.com",
    website: "https://www.textingfactory.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview:
      "TextingFactory focuses on fast-paced messaging interactions and casual chat experiences.",
  },
  {
    name: "Cloudworkers",
    slug: "cloudworkers",
    logo: "https://logo.clearbit.com/cloudworkers.company",
    website: "https://cloudworkers.company",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview:
      "Cloudworkers connects users with chat operators for continuous messaging and engagement.",
  },
  {
    name: "LipService",
    slug: "lipservice",
    logo: "https://logo.clearbit.com/lipservice.net",
    website: "https://lipservice.net",
    payout: "Medium",
    difficulty: "Easy",
    type: "phone-chat",
    preview:
      "LipService specializes in voice-based chat interactions with flexible communication options.",
  },
  {
    name: "TexKings",
    slug: "texkings",
    logo: "https://logo.clearbit.com/texkings.com",
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
    logo: "https://logo.clearbit.com/rentacyberfriend.com",
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
    logo: "https://logo.clearbit.com/flirtme.com",
    website: "https://www.flirtme.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview: "FlirtMe is built for instant messaging, flirting, and casual chat experiences.",
  },
  {
    name: "ChatJobs",
    slug: "chatjobs",
    logo: "https://logo.clearbit.com/chatjobs.com",
    website: "https://www.chatjobs.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview: "ChatJobs offers chat-based interactions with a focus on ongoing engagement.",
  },
  {
    name: "FriendPC",
    slug: "friendpc",
    logo: "https://logo.clearbit.com/friendpc.com",
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
    logo: "https://logo.clearbit.com/premium.chat",
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
    logo: "https://logo.clearbit.com/only2chat.com",
    website: "https://www.only2chat.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview: "Only2Chat offers private messaging and real-time chat interactions.",
  },
  {
    name: "ChatMatch",
    slug: "chatmatch",
    logo: "https://logo.clearbit.com/chatmatch.com",
    website: "https://www.chatmatch.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview: "ChatMatch focuses on quick connections and instant messaging experiences.",
  },
  {
    name: "TalkLiv",
    slug: "talkliv",
    logo: "https://logo.clearbit.com/talkliv.com",
    website: "https://www.talkliv.com",
    payout: "Medium",
    difficulty: "Easy",
    type: "chat",
    preview: "TalkLiv offers real-time chat and conversation opportunities with active users.",
  },
  {
    name: "ChatSpin",
    slug: "chatspin",
    logo: "https://logo.clearbit.com/chatspin.com",
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
    image: row.logo,
    logo: row.logo,
    affiliate_url: buildListingOutboundPath(row.slug),
    website_url: row.website,
    rating,
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

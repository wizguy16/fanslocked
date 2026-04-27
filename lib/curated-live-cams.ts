import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedLiveCamsRow = {
  name: string;
  slug: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  description: string;
  preview: string;
};

/** Top 12 — horizontal featured rail (Live Cams). */
export const LIVE_CAMS_FEATURED: CuratedLiveCamsRow[] = [
  {
    name: "Stripchat",
    slug: "stripchat",
    website: "https://stripchat.com",
    payout: "$168 PPS / RevShare",
    difficulty: "Easy",
    type: "Freemium Cam",
    description: "Massive global cam platform with high engagement.",
    preview:
      "Stripchat is one of the highest-converting live cam platforms, offering massive global traffic, interactive features, and freemium access that keeps users engaged and spending longer.",
  },
  {
    name: "JerkMate",
    slug: "jerkmate",
    website: "https://jerkmate.com",
    payout: "$65+ PPS",
    difficulty: "Easy",
    type: "Smart Match Cam",
    description: "AI-powered cam matching system.",
    preview:
      "JerkMate uses smart matching technology to instantly connect users with models they want, creating high-intent traffic and strong conversions across all devices.",
  },
  {
    name: "BongaCams",
    slug: "bongacams",
    website: "https://bongacams.com",
    payout: "RevShare + PPS",
    difficulty: "Easy",
    type: "Freemium Cam",
    description: "Huge traffic cam platform with global reach.",
    preview:
      "BongaCams delivers massive worldwide traffic and consistent conversions through a freemium model that encourages tipping, private shows, and repeat visits.",
  },
  {
    name: "CamSoda",
    slug: "camsoda",
    website: "https://camsoda.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Freemium Cam",
    description: "VR-friendly cam site with modern features.",
    preview:
      "CamSoda blends VR, live cams, and interactive features to create an immersive experience that keeps users engaged and increases session time.",
  },
  {
    name: "Streamate",
    slug: "streamate",
    website: "https://streamate.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Premium Cam",
    description:
      "Premium cam platform focused on private shows, with high-quality streams and a more one-on-one experience.",
    preview:
      "Premium cam platform focused on private shows, with high-quality streams and a more one-on-one experience.",
  },
  {
    name: "LiveJasmin",
    slug: "livejasmin",
    website: "https://livejasmin.com",
    payout: "$130 PPS + RevShare",
    difficulty: "Medium",
    type: "Premium Cam",
    description:
      "High-end cam site with polished performers and strong private show options across a global audience.",
    preview:
      "High-end cam site with polished performers and strong private show options across a global audience.",
  },
  {
    name: "SinParty",
    slug: "sinparty",
    website: "https://sinparty.com",
    payout: "$150 PPS",
    difficulty: "Easy",
    type: "New Cam",
    description:
      "Modern cam platform with fast browsing, active rooms, and strong token-based interaction features.",
    preview:
      "Modern cam platform with fast browsing, active rooms, and strong token-based interaction features.",
  },
  {
    name: "MyFreeCams",
    slug: "myfreecams",
    website: "https://myfreecams.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Freemium Cam",
    description:
      "Large cam community with active public rooms and a mix of free interaction and paid private shows.",
    preview:
      "Large cam community with active public rooms and a mix of free interaction and paid private shows.",
  },
  {
    name: "Cam4",
    slug: "cam4",
    website: "https://cam4.com",
    payout: "PPL + RevShare",
    difficulty: "Easy",
    type: "Freemium Cam",
    description:
      "High-traffic cam site with global performers and a strong mix of public and private streaming.",
    preview:
      "High-traffic cam site with global performers and a strong mix of public and private streaming.",
  },
  {
    name: "ImLive",
    slug: "imlive",
    website: "https://imlive.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Premium Cam",
    description: "International cam platform with premium traffic.",
    preview:
      "ImLive offers a premium cam experience with international reach, delivering consistent conversions across multiple markets.",
  },
  {
    name: "Xtease",
    slug: "xtease",
    website: "https://xtease.com",
    payout: "$168 PPS",
    difficulty: "Easy",
    type: "Stripchat Network",
    description: "High payout cam offer powered by Stripchat.",
    preview:
      "Xtease leverages Stripchat’s backend with high payout offers, making it one of the most profitable cam affiliate programs available.",
  },
  {
    name: "SlutRoulette",
    slug: "slutroulette",
    website: "https://slutroulette.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Random Cam",
    description: "Omegle-style adult cam matching.",
    preview:
      "SlutRoulette connects users instantly with random cam partners, creating high engagement and impulsive conversion behavior.",
  },
];

/** Next 13 — dense grid below the rail. */
export const LIVE_CAMS_GRID: CuratedLiveCamsRow[] = [
  {
    name: "SkyPrivate",
    slug: "skyprivate",
    website: "https://skyprivate.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Private Cam",
    description: "Skype-based private cam platform.",
    preview:
      "SkyPrivate allows direct private cam sessions, giving users a more personal experience that converts well for affiliates.",
  },
  {
    name: "CooMeet",
    slug: "coomeet",
    website: "https://coomeet.com",
    payout: "PPL + RevShare",
    difficulty: "Easy",
    type: "Video Chat",
    description: "Premium video chat with real users.",
    preview:
      "CooMeet offers verified female users and instant video matching, leading to strong conversions and high user trust.",
  },
  {
    name: "LuckyCrush",
    slug: "luckycrush",
    website: "https://luckycrush.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Random Cam",
    description: "Male/female instant cam matching.",
    preview:
      "LuckyCrush pairs users instantly with the opposite gender, creating high retention and strong conversion behavior.",
  },
  {
    name: "Camster",
    slug: "camster",
    website: "https://camster.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Freemium Cam",
    description: "Classic cam platform with steady traffic.",
    preview:
      "Camster provides a simple cam experience with consistent traffic, making it a reliable affiliate performer.",
  },
  {
    name: "SextPanther",
    slug: "sextpanther",
    website: "https://sextpanther.com",
    payout: "RevShare",
    difficulty: "Medium",
    type: "Premium Chat",
    description: "Text + cam monetization platform.",
    preview:
      "SextPanther combines messaging, calls, and cam features, allowing multiple monetization paths and higher user spend.",
  },
  {
    name: "Xcams",
    slug: "xcams",
    website: "https://xcams.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Freemium Cam",
    description: "European cam platform with high traffic.",
    preview:
      "Xcams delivers strong European traffic and consistent conversions through its freemium cam model.",
  },
  {
    name: "Flirtbate",
    slug: "flirtbate",
    website: "https://flirtbate.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Freemium Cam",
    description: "Chaturbate-style cam platform.",
    preview:
      "Flirtbate offers a familiar freemium cam experience that encourages tipping and extended engagement.",
  },
  {
    name: "BabeStation",
    slug: "babestation",
    website: "https://babestation.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "TV Cam",
    description: "Live TV-style cam platform.",
    preview:
      "BabeStation blends live TV broadcasting with cam interaction, creating a unique experience for users.",
  },
  {
    name: "Joystick.tv",
    slug: "joysticktv",
    website: "https://joystick.tv",
    payout: "RevShare",
    difficulty: "Easy",
    type: "NSFW Streaming",
    description: "Twitch-style adult streaming.",
    preview:
      "Joystick.tv brings a Twitch-style streaming experience to adult content, attracting a younger, engaged audience.",
  },
  {
    name: "AdultWork Cams",
    slug: "adultwork",
    website: "https://adultwork.com",
    payout: "RevShare",
    difficulty: "Medium",
    type: "UK Cam",
    description: "UK-based cam and escort platform.",
    preview:
      "AdultWork combines cam and escort services, giving affiliates access to multiple revenue streams.",
  },
  {
    name: "SakuraLive",
    slug: "sakuralive",
    website: "https://sakuralive.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Asian Cam",
    description: "Asian-focused cam platform.",
    preview:
      "SakuraLive targets niche audiences with region-specific content, helping affiliates convert targeted traffic.",
  },
  {
    name: "Reveal Me",
    slug: "revealme",
    website: "https://reveal.me",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Social Cam",
    description: "Social media style cam platform.",
    preview:
      "Reveal Me blends social media and cam features, creating high engagement and user interaction.",
  },
  {
    name: "Peeks Social",
    slug: "peeks",
    website: "https://peeks.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Social Cam",
    description: "Live streaming + social platform.",
    preview:
      "Peeks Social combines live streaming with social interaction, keeping users engaged and spending longer.",
  },
];

function tagsFor(): string[] {
  return ["live-cams", "cams", "editor-pick", "live", "tokens", "interactive"];
}

function buildListing(
  row: CuratedLiveCamsRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.description, 160);
  const review = `${row.name} is listed in our ${cat.label} set because it matches high-intent cam traffic: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "Token and private-show funnels that monetize curiosity quickly",
    "Mobile-first experiences that suit cold outbound traffic",
    "Established programs with clear payout models for scale testing",
  ];
  const cons = [
    "Geo rules and ID checks vary — confirm allowed regions before scaling",
    "Competitive placements — differentiate with niche angles and landers",
    "Program terms change seasonally — re-verify caps and revshare tiers",
  ];

  return {
    id: `listing-live-${row.slug}`,
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

export function buildCuratedLiveCamsListings(cat: CategoryDef): Listing[] {
  const featured = LIVE_CAMS_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  const grid = LIVE_CAMS_GRID.map((row, i) =>
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

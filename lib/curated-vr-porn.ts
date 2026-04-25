import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { clampTagline } from "@/lib/utils";

export type CuratedVRPornRow = {
  name: string;
  slug: string;
  logo: string;
  website: string;
  description: string;
  preview: string;
  payout: string;
  difficulty: string;
  type: string;
};

/** Top 12 — horizontal featured rail (VR). */
export const VR_PORN_FEATURED: CuratedVRPornRow[] = [
  {
    name: "VRPorn",
    slug: "vrporn",
    logo: "https://logo.clearbit.com/vrporn.com",
    website: "https://vrporn.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "VR Aggregator",
    description: "Massive VR content hub with multiple studios.",
    preview:
      "VRPorn aggregates top VR studios into one platform, giving users a huge variety of immersive content that keeps them engaged and exploring longer.",
  },
  {
    name: "POVR",
    slug: "povr",
    logo: "https://logo.clearbit.com/povr.com",
    website: "https://povr.com",
    payout: "$120 PPS",
    difficulty: "Easy",
    type: "POV VR",
    description: "High-quality POV VR experience.",
    preview:
      "POVR delivers ultra-realistic POV VR scenes designed for immersion, making it one of the highest-converting VR platforms for new users.",
  },
  {
    name: "VRBangers",
    slug: "vrbangers",
    logo: "https://logo.clearbit.com/vrbangers.com",
    website: "https://vrbangers.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Studio VR",
    description: "Top-tier VR production studio.",
    preview:
      "VRBangers is known for premium production quality and consistent updates, giving users a high-end VR experience that drives strong conversions.",
  },
  {
    name: "SexLikeReal",
    slug: "sexlikereal",
    logo: "https://logo.clearbit.com/sexlikereal.com",
    website: "https://sexlikereal.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "VR Platform",
    description: "One of the largest VR libraries online.",
    preview:
      "SexLikeReal offers one of the biggest VR libraries available, combining quantity and quality to maximize user retention and spending.",
  },
  {
    name: "VirtualRealPorn",
    slug: "virtualrealporn",
    logo: "https://logo.clearbit.com/virtualrealporn.com",
    website: "https://virtualrealporn.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "VR Studio",
    description: "Realistic VR storytelling platform.",
    preview:
      "VirtualRealPorn focuses on immersive storytelling and realism, helping convert users looking for deeper VR experiences.",
  },
  {
    name: "Naughty America VR",
    slug: "naughty-america-vr",
    logo: "https://logo.clearbit.com/naughtyamerica.com",
    website: "https://naughtyamerica.com",
    payout: "$100+ PPS",
    difficulty: "Easy",
    type: "Premium VR",
    description: "Premium VR from a top studio brand.",
    preview:
      "Naughty America VR combines premium branding with immersive VR scenes, making it a strong performer for high-value traffic.",
  },
  {
    name: "BadoinkVR",
    slug: "badoinkvr",
    logo: "https://logo.clearbit.com/badoinkvr.com",
    website: "https://badoinkvr.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "VR Platform",
    description: "Long-standing VR platform with bundles.",
    preview:
      "BadoinkVR offers bundled VR content across multiple niches, increasing user value and affiliate earnings.",
  },
  {
    name: "Virtual Taboo",
    slug: "virtual-taboo",
    logo: "https://logo.clearbit.com/virtualtaboo.com",
    website: "https://virtualtaboo.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Niche VR",
    description: "Story-driven immersive VR scenes.",
    preview:
      "Virtual Taboo focuses on immersive storytelling that keeps users engaged and increases session time.",
  },
  {
    name: "WankzVR",
    slug: "wankzvr",
    logo: "https://logo.clearbit.com/wankzvr.com",
    website: "https://wankzvr.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "VR Studio",
    description: "High-volume VR content studio.",
    preview:
      "WankzVR produces a steady stream of content, helping affiliates convert repeat traffic consistently.",
  },
  {
    name: "AdultTime VR",
    slug: "adulttime-vr",
    logo: "https://logo.clearbit.com/adulttime.com",
    website: "https://adulttime.com",
    payout: "$120 PPS",
    difficulty: "Easy",
    type: "Bundle VR",
    description: "VR inside premium bundle.",
    preview:
      "AdultTime VR offers access to multiple studios in one subscription, increasing perceived value and conversions.",
  },
  {
    name: "Brazzers VR",
    slug: "brazzers-vr",
    logo: "https://logo.clearbit.com/brazzers.com",
    website: "https://brazzers.com",
    payout: "$100+ PPS",
    difficulty: "Easy",
    type: "Premium VR",
    description: "Top brand VR content.",
    preview:
      "Brazzers VR leverages one of the strongest brands in the industry, making it easier to convert high-intent users.",
  },
  {
    name: "CzechVR",
    slug: "czechvr",
    logo: "https://logo.clearbit.com/czechvr.com",
    website: "https://czechvr.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Niche VR",
    description: "European VR niche content.",
    preview:
      "CzechVR targets niche audiences with authentic content, helping affiliates convert targeted traffic.",
  },
];

/** Next 13 — dense grid below the rail. */
export const VR_PORN_GRID: CuratedVRPornRow[] = [
  {
    name: "MilfVR",
    slug: "milfvr",
    logo: "https://logo.clearbit.com/milfvr.com",
    website: "https://milfvr.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Niche VR",
    description: "VR content focused on MILF category.",
    preview:
      "MilfVR targets a high-demand niche, making it easier to convert traffic into paying users.",
  },
  {
    name: "WetVR",
    slug: "wetvr",
    logo: "https://logo.clearbit.com/wetvr.com",
    website: "https://wetvr.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "VR Studio",
    description: "High-quality immersive VR scenes.",
    preview:
      "WetVR offers immersive scenes with strong production quality that keeps users engaged.",
  },
  {
    name: "VRHush",
    slug: "vrhush",
    logo: "https://logo.clearbit.com/vrhush.com",
    website: "https://vrhush.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "VR Platform",
    description: "Large VR content collection.",
    preview:
      "VRHush provides a broad selection of VR content, helping affiliates capture a wide audience.",
  },
  {
    name: "VRCosplayX",
    slug: "vrcosplayx",
    logo: "https://logo.clearbit.com/vrcosplayx.com",
    website: "https://vrcosplayx.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Niche VR",
    description: "Cosplay-focused VR content.",
    preview:
      "VRCosplayX taps into cosplay fandom, increasing engagement and conversions for niche audiences.",
  },
  {
    name: "VRSpy",
    slug: "vrspy",
    logo: "https://logo.clearbit.com/vrspy.com",
    website: "https://vrspy.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "POV VR",
    description: "POV-style immersive VR.",
    preview:
      "VRSpy delivers POV experiences that enhance immersion and user retention.",
  },
  {
    name: "RealPornstarsVR",
    slug: "realpornstarsvr",
    logo: "https://logo.clearbit.com/realpornstarsvr.com",
    website: "https://realpornstarsvr.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "Premium VR",
    description: "VR content featuring known performers.",
    preview:
      "RealPornstarsVR leverages known performers to drive trust and conversions.",
  },
  {
    name: "GroobyVR",
    slug: "groobyvr",
    logo: "https://logo.clearbit.com/groobyvr.com",
    website: "https://groobyvr.com",
    payout: "RevShare",
    difficulty: "Medium",
    type: "Niche VR",
    description: "Specialized VR niche content.",
    preview:
      "GroobyVR targets specific audiences with tailored VR experiences, improving conversion rates.",
  },
  {
    name: "KinkVR",
    slug: "kinkvr",
    logo: "https://logo.clearbit.com/kinkvr.com",
    website: "https://kinkvr.com",
    payout: "RevShare",
    difficulty: "Medium",
    type: "Niche VR",
    description: "Alternative VR content.",
    preview:
      "KinkVR focuses on alternative experiences, capturing niche audiences with high engagement.",
  },
  {
    name: "PornCornVR",
    slug: "porncornvr",
    logo: "https://logo.clearbit.com/porncornvr.com",
    website: "https://porncornvr.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "VR Platform",
    description: "VR-focused content hub.",
    preview:
      "PornCornVR aggregates content to keep users browsing longer and increasing conversions.",
  },
  {
    name: "ZexyVR",
    slug: "zexyvr",
    logo: "https://logo.clearbit.com/zexyvr.com",
    website: "https://zexyvr.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "VR Studio",
    description: "Modern VR production studio.",
    preview:
      "ZexyVR delivers modern VR scenes designed for immersive viewing and longer sessions.",
  },
  {
    name: "SexBabesVR",
    slug: "sexbabesvr",
    logo: "https://logo.clearbit.com/sexbabesvr.com",
    website: "https://sexbabesvr.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "VR Studio",
    description: "High-quality VR scenes.",
    preview:
      "SexBabesVR focuses on visual quality and immersive angles, helping boost engagement.",
  },
  {
    name: "BlushEroticaVR",
    slug: "blusheroticavr",
    logo: "https://logo.clearbit.com/blusherotica.com",
    website: "https://blusherotica.com",
    payout: "RevShare",
    difficulty: "Easy",
    type: "VR Platform",
    description: "Erotic storytelling VR platform.",
    preview:
      "BlushEroticaVR combines storytelling and VR immersion to keep users engaged longer.",
  },
  {
    name: "StripChat VR",
    slug: "stripchat-vr",
    logo: "https://logo.clearbit.com/stripchat.com",
    website: "https://stripchat.com",
    payout: "$168 PPS",
    difficulty: "Easy",
    type: "VR Cam",
    description: "VR-enabled live cam platform.",
    preview:
      "StripChat VR blends live cam interaction with VR immersion, creating strong engagement and high conversions.",
  },
];

function tagsFor(): string[] {
  return ["vr", "immersive", "headset", "editor-pick", "premium", "streaming"];
}

function buildListing(
  row: CuratedVRPornRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.description, 160);
  const review = `${row.name} is listed in our ${cat.label} set because it fits headset-first traffic: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "Headset-ready catalogs that reward demo-to-subscribe flows",
    "Strong production cues that reduce refund anxiety on trials",
    "Clear studio branding that matches search-intent keywords",
  ];
  const cons = [
    "Hardware fragmentation — QA messaging for Quest vs PCVR",
    "File sizes and streaming bitrate can frustrate slow networks",
    "Program/geo rules shift often — verify funnels before scaling",
  ];

  return {
    id: `listing-vr-${row.slug}`,
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

export function buildCuratedVRPornListings(cat: CategoryDef): Listing[] {
  const featured = VR_PORN_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  const grid = VR_PORN_GRID.map((row, i) =>
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

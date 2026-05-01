import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { curatedListingTag } from "@/lib/curated-listing-tags";
import { clampTagline } from "@/lib/utils";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export type CuratedAIGeneratedRow = {
  name: string;
  slug: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  description: string;
  preview: string;
  tier: 1 | 2 | 3;
};

/** Top band — tier 1 = highest LTV, then tier 2 monetizers; `candybox-ai` last in tier 2. */
export const AI_GENERATED_FEATURED: CuratedAIGeneratedRow[] = [
  {
    name: "Candy AI",
    slug: "candy-ai",
    website: "https://candy.ai",
    payout: "40% recurring",
    difficulty: "Easy",
    type: "AI Companion",
    tier: 1,
    description: "Top AI companion generator with strong conversions.",
    preview:
      "Candy AI lets users create fully customizable AI companions with visuals and chat, making it one of the highest-converting platforms in the space.",
  },
  {
    name: "OurDream AI",
    slug: "ourdream-ai",
    website: "https://ourdream.ai",
    payout: "40% recurring / CPA",
    difficulty: "Easy",
    type: "AI Companion",
    tier: 1,
    description: "High EPC AI platform with strong affiliate support.",
    preview:
      "OurDream AI combines high conversion rates with flexible payouts, making it one of the most profitable AI companion platforms for affiliates.",
  },
  {
    name: "GirlfriendGPT",
    slug: "girlfriendgpt",
    website: "https://girlfriendgpt.com",
    payout: "Recurring commissions",
    difficulty: "Easy",
    type: "AI Chat",
    tier: 1,
    description: "Story-driven AI companion platform.",
    preview:
      "GirlfriendGPT focuses on immersive conversations and long-term engagement, helping increase retention and recurring revenue.",
  },
  {
    name: "SpicyChat",
    slug: "spicychat",
    website: "https://spicychat.ai",
    payout: "RevShare",
    difficulty: "Easy",
    type: "AI Chat",
    tier: 1,
    description: "Popular AI chat platform with strong engagement.",
    preview:
      "SpicyChat offers a wide variety of AI characters and scenarios, driving high user engagement and consistent conversions.",
  },
  {
    name: "JuicyChat AI",
    slug: "juicychat",
    website: "https://juicychat.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Chat",
    tier: 2,
    description:
      "AI chat platform with a large library of user-created characters focused on roleplay and NSFW conversations. Strong for fast responses, character variety, and ongoing interaction.",
    preview:
      "AI chat platform with a large library of user-created characters focused on roleplay and NSFW conversations. Strong for fast responses, character variety, and ongoing interaction.",
  },
  {
    name: "Joi AI",
    slug: "joi-ai",
    website: "https://joi.ai",
    payout: "RevShare / CPA",
    difficulty: "Easy",
    type: "AI Companion",
    tier: 2,
    description:
      "Premium AI companion platform focused on structured chat, guided interactions, and high-quality character experiences. Built for more controlled and immersive AI conversations.",
    preview:
      "Premium AI companion platform focused on structured chat, guided interactions, and high-quality character experiences. Built for more controlled and immersive AI conversations.",
  },
  {
    name: "Secrets AI",
    slug: "secrets-ai",
    website: "https://secrets.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    tier: 2,
    description:
      "AI content platform combining chat, character customization, and visual generation. Designed for users who want both conversation and image-based interaction in one place.",
    preview:
      "AI content platform combining chat, character customization, and visual generation. Designed for users who want both conversation and image-based interaction in one place.",
  },
  {
    name: "TryNectar",
    slug: "trynectar",
    website: "https://trynectar.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Companion",
    tier: 2,
    description:
      "Custom AI companion builder that allows full control over personality, traits, and interaction style. Built for users who want to design and refine their own AI characters.",
    preview:
      "Custom AI companion builder that allows full control over personality, traits, and interaction style. Built for users who want to design and refine their own AI characters.",
  },
  {
    name: "CrushOn AI",
    slug: "crushon-ai",
    website: "https://crushon.ai",
    payout: "RevShare",
    difficulty: "Easy",
    type: "AI Chat",
    tier: 2,
    description: "AI chat platform with a large selection of characters and strong focus on NSFW roleplay conversations.",
    preview:
      "AI chat platform with a large selection of characters and strong focus on NSFW roleplay conversations.",
  },
  {
    name: "Lovescape",
    slug: "lovescape",
    website: "https://lovescape.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Companion",
    tier: 2,
    description: "AI companion platform focused on immersive relationships and long-form interaction.",
    preview:
      "AI companion platform focused on immersive relationships and long-form interaction.",
  },
  {
    name: "SecretCrush AI",
    slug: "secretcrush",
    website: "https://secretcrush.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Chat",
    tier: 2,
    description: "AI chat experience focused on personalized interactions and companion-style conversations.",
    preview:
      "AI chat experience focused on personalized interactions and companion-style conversations.",
  },
  {
    name: "Candy Box AI",
    slug: "candybox-ai",
    website: "https://candybox.ai",
    payout: "RevShare",
    difficulty: "Easy",
    type: "AI Generator",
    tier: 2,
    description:
      "AI chat platform with simple onboarding and quick access to NSFW conversations. Focused on speed, ease of use, and lightweight interaction without complex setup.",
    preview:
      "AI chat platform with simple onboarding and quick access to NSFW conversations. Focused on speed, ease of use, and lightweight interaction without complex setup.",
  },
];

/** Dense grid — tier-2 companions first, then tools / experimental (tier 3). */
export const AI_GENERATED_GRID: CuratedAIGeneratedRow[] = [
  {
    name: "Nemora AI",
    slug: "nemora-ai",
    website: "https://nemora.ai",
    payout: "RevShare",
    difficulty: "Easy",
    type: "AI Companion",
    tier: 2,
    description: "AI companion platform focused on emerging chat-based interactions and character creation.",
    preview:
      "AI companion platform focused on emerging chat-based interactions and character creation.",
  },
  {
    name: "LustGF AI",
    slug: "lustgf-ai",
    website: "https://lustgf.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Companion",
    tier: 2,
    description: "AI companion platform.",
    preview:
      "LustGF AI offers strong engagement features that help convert and retain users.",
  },
  {
    name: "GoLoveAI",
    slug: "goloveai",
    website: "https://goloveai.com",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Companion",
    tier: 2,
    description:
      "Adult-oriented AI companion platform focused on immersive chat, customizable personalities, and intimate virtual interactions.",
    preview:
      "GoLoveAI allows users to create and interact with AI companions tailored to specific preferences, including personality, tone, and engagement style. Designed for adult audiences, it emphasizes realism, emotional connection, and interactive experiences that go beyond basic chatbot functionality.",
  },
  {
    name: "Undress AI",
    slug: "undress-ai",
    website: "https://undress.ai",
    payout: "High CPA",
    difficulty: "Easy",
    type: "AI Tool",
    tier: 3,
    description: "AI image tool designed for generating and transforming explicit visuals.",
    preview:
      "AI image tool designed for generating and transforming explicit visuals.",
  },
  {
    name: "SugarGenBox",
    slug: "sugargenbox",
    website: "https://sugargenbox.com",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    tier: 3,
    description: "AI content generator focused on creating adult images and fantasy scenarios.",
    preview:
      "AI content generator focused on creating adult images and fantasy scenarios.",
  },
  {
    name: "ClothOff",
    slug: "clothoff",
    website: "https://clothoff.ai",
    payout: "CPA",
    difficulty: "Easy",
    type: "AI Tool",
    tier: 3,
    description: "AI image transformation tool focused on visual-based adult content generation.",
    preview:
      "AI image transformation tool focused on visual-based adult content generation.",
  },
  {
    name: "PornWorks",
    slug: "pornworks",
    website: "https://pornworks.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    tier: 3,
    description: "AI platform for generating custom adult images and scenes.",
    preview:
      "AI platform for generating custom adult images and scenes.",
  },
  {
    name: "CreatePorn",
    slug: "createporn",
    website: "https://createporn.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    tier: 3,
    description: "AI porn generator built for creating custom explicit images and visual content.",
    preview:
      "AI porn generator built for creating custom explicit images and visual content.",
  },
  {
    name: "CherryPop AI",
    slug: "cherrypop-ai",
    website: "https://cherrypop.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    tier: 3,
    description: "AI content platform centered around interactive chat and visual generation.",
    preview:
      "AI content platform centered around interactive chat and visual generation.",
  },
  {
    name: "PornMaker AI",
    slug: "pornmaker-ai",
    website: "https://pornmaker.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    tier: 3,
    description: "AI content creation tool.",
    preview:
      "PornMaker AI focuses on quick generation and repeat usage, boosting revenue potential.",
  },
  {
    name: "LoveChat",
    slug: "lovechat",
    website: "https://lovechat.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Chat",
    tier: 3,
    description: "AI relationship chat platform.",
    preview:
      "LoveChat delivers engaging chat experiences that keep users returning frequently.",
  },
  {
    name: "LusyChat AI",
    slug: "lusychat",
    website: "https://lusychat.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Chat",
    tier: 3,
    description: "AI-driven conversation platform.",
    preview:
      "LusyChat AI provides fast engagement loops that increase conversion rates.",
  },
  {
    name: "MuseBox AI",
    slug: "musebox",
    website: "https://musebox.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    tier: 3,
    description: "AI creative platform.",
    preview:
      "MuseBox AI keeps users engaged through creative outputs and repeat sessions.",
  },
];

function tagsFor(): string[] {
  return ["ai", "generator", "editor-pick", "companion", "recurring", "trending"];
}

function buildListing(
  row: CuratedAIGeneratedRow,
  cat: CategoryDef,
  rating: number,
  popularity_score: number,
  added_date: string,
): Listing {
  const description = clampTagline(row.description, 160);
  const review = `${row.name} is listed in our ${cat.label} set for high recurring and engagement fit: ${row.preview} (${row.type} · ${row.payout} · ${row.difficulty}).`;
  const pros = [
    "Recurring and hybrid payout models common in AI companion verticals",
    "Fast onboarding flows that suit paid social and cold outbound",
    "Strong LTV loops from chat, image gen, and upsell add-ons",
  ];
  const cons = [
    "Policy and card-network scrutiny — keep landers compliant and transparent",
    "Offer caps and tiers change quickly — verify current program terms",
    "Tool-style offers can spike chargebacks — qualify traffic and set expectations",
  ];

  return {
    id: `listing-ai-${row.slug}`,
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

function rowScore(row: CuratedAIGeneratedRow, index: number): { rating: number; popularity_score: number } {
  const tierBase = {
    1: 4.95,
    2: 4.75,
    3: 4.55,
  }[row.tier];
  const rating = Math.round((tierBase - index * 0.02) * 10) / 10;
  const popularity_score = (row.tier === 1 ? 100 : row.tier === 2 ? 92 : 84) - index;
  return { rating, popularity_score };
}

export function buildCuratedAIGeneratedListings(cat: CategoryDef): Listing[] {
  const featured = AI_GENERATED_FEATURED.map((row, i) => {
    const { rating, popularity_score } = rowScore(row, i);
    return buildListing(row, cat, rating, popularity_score, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`);
  });
  const grid = AI_GENERATED_GRID.map((row, i) => {
    const { rating, popularity_score } = rowScore(row, i);
    return buildListing(row, cat, rating, popularity_score, `2025-07-${String((i % 28) + 1).padStart(2, "0")}`);
  });
  return [...featured, ...grid];
}

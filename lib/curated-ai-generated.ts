import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { clampTagline } from "@/lib/utils";

export type CuratedAIGeneratedRow = {
  name: string;
  slug: string;
  logo: string;
  website: string;
  payout: string;
  difficulty: string;
  type: string;
  description: string;
  preview: string;
};

/** Top 12 — horizontal featured rail (AI generated). */
export const AI_GENERATED_FEATURED: CuratedAIGeneratedRow[] = [
  {
    name: "Candy AI",
    slug: "candy-ai",
    logo: "https://logo.clearbit.com/candy.ai",
    website: "https://candy.ai",
    payout: "40% recurring",
    difficulty: "Easy",
    type: "AI Companion",
    description: "Top AI companion generator with strong conversions.",
    preview:
      "Candy AI lets users create fully customizable AI companions with visuals and chat, making it one of the highest-converting platforms in the space.",
  },
  {
    name: "OurDream AI",
    slug: "ourdream-ai",
    logo: "https://logo.clearbit.com/ourdream.ai",
    website: "https://ourdream.ai",
    payout: "40% recurring / CPA",
    difficulty: "Easy",
    type: "AI Companion",
    description: "High EPC AI platform with strong affiliate support.",
    preview:
      "OurDream AI combines high conversion rates with flexible payouts, making it one of the most profitable AI companion platforms for affiliates.",
  },
  {
    name: "GirlfriendGPT",
    slug: "girlfriendgpt",
    logo: "https://logo.clearbit.com/girlfriendgpt.com",
    website: "https://girlfriendgpt.com",
    payout: "Recurring commissions",
    difficulty: "Easy",
    type: "AI Chat",
    description: "Story-driven AI companion platform.",
    preview:
      "GirlfriendGPT focuses on immersive conversations and long-term engagement, helping increase retention and recurring revenue.",
  },
  {
    name: "SpicyChat",
    slug: "spicychat",
    logo: "https://logo.clearbit.com/spicychat.ai",
    website: "https://spicychat.ai",
    payout: "RevShare",
    difficulty: "Easy",
    type: "AI Chat",
    description: "Popular AI chat platform with strong engagement.",
    preview:
      "SpicyChat offers a wide variety of AI characters and scenarios, driving high user engagement and consistent conversions.",
  },
  {
    name: "JuicyChat AI",
    slug: "juicychat",
    logo: "https://logo.clearbit.com/juicychat.ai",
    website: "https://juicychat.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Chat",
    description: "Fast-growing AI chat ecosystem.",
    preview:
      "JuicyChat AI delivers fast onboarding and high engagement, making it ideal for converting cold traffic into subscribers.",
  },
  {
    name: "Joi AI",
    slug: "joi-ai",
    logo: "https://logo.clearbit.com/joi.ai",
    website: "https://joi.ai",
    payout: "RevShare / CPA",
    difficulty: "Easy",
    type: "AI Companion",
    description: "Premium AI interaction platform.",
    preview:
      "Joi AI combines premium features and strong monetization, helping affiliates earn from both subscriptions and usage.",
  },
  {
    name: "Secrets AI",
    slug: "secrets-ai",
    logo: "https://logo.clearbit.com/secrets.ai",
    website: "https://secrets.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    description: "AI content generation platform.",
    preview:
      "Secrets AI focuses on customizable content creation, keeping users engaged and increasing repeat spending.",
  },
  {
    name: "PlayBox",
    slug: "playbox",
    logo: "https://logo.clearbit.com/playbox.ai",
    website: "https://playbox.ai",
    payout: "RevShare",
    difficulty: "Easy",
    type: "AI Generator",
    description: "AI content creation with strong UX.",
    preview:
      "PlayBox simplifies content creation, making it easy for users to generate and engage with AI-driven experiences.",
  },
  {
    name: "TryNectar",
    slug: "trynectar",
    logo: "https://logo.clearbit.com/trynectar.ai",
    website: "https://trynectar.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Companion",
    description: "Custom AI companion builder.",
    preview:
      "TryNectar focuses on deep customization and immersive experiences, helping increase user retention and conversions.",
  },
  {
    name: "CrushOn AI",
    slug: "crushon-ai",
    logo: "https://logo.clearbit.com/crushon.ai",
    website: "https://crushon.ai",
    payout: "RevShare",
    difficulty: "Easy",
    type: "AI Chat",
    description: "Fast-growing AI chat platform.",
    preview:
      "CrushOn AI offers strong engagement loops that keep users interacting longer and spending more.",
  },
  {
    name: "Lovescape",
    slug: "lovescape",
    logo: "https://logo.clearbit.com/lovescape.ai",
    website: "https://lovescape.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Companion",
    description: "Immersive AI relationship platform.",
    preview:
      "Lovescape focuses on emotional and interactive experiences, increasing session time and recurring revenue.",
  },
  {
    name: "SecretCrush AI",
    slug: "secretcrush",
    logo: "https://logo.clearbit.com/secretcrush.ai",
    website: "https://secretcrush.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Chat",
    description: "AI-driven companion experience.",
    preview:
      "SecretCrush AI provides engaging chat experiences that convert casual users into paying subscribers.",
  },
];

/** Next 13 — dense grid below the rail. */
export const AI_GENERATED_GRID: CuratedAIGeneratedRow[] = [
  {
    name: "Undress AI",
    slug: "undress-ai",
    logo: "https://logo.clearbit.com/undress.ai",
    website: "https://undress.ai",
    payout: "High CPA",
    difficulty: "Easy",
    type: "AI Tool",
    description: "AI image transformation tool.",
    preview:
      "Undress AI offers a unique tool-based experience that drives curiosity clicks and high conversion rates.",
  },
  {
    name: "SugarGenBox",
    slug: "sugargenbox",
    logo: "https://logo.clearbit.com/sugargenbox.com",
    website: "https://sugargenbox.com",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    description: "AI content generator platform.",
    preview:
      "SugarGenBox combines ease of use with engaging outputs, helping convert new users quickly.",
  },
  {
    name: "ClothOff",
    slug: "clothoff",
    logo: "https://logo.clearbit.com/clothoff.ai",
    website: "https://clothoff.ai",
    payout: "CPA",
    difficulty: "Easy",
    type: "AI Tool",
    description: "Popular AI transformation tool.",
    preview:
      "ClothOff leverages curiosity-driven traffic, making it one of the highest click-through tools in the niche.",
  },
  {
    name: "PornWorks",
    slug: "pornworks",
    logo: "https://logo.clearbit.com/pornworks.ai",
    website: "https://pornworks.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    description: "AI-driven content creation.",
    preview:
      "PornWorks keeps users engaged through customizable content generation and repeat usage.",
  },
  {
    name: "CreatePorn",
    slug: "createporn",
    logo: "https://logo.clearbit.com/createporn.ai",
    website: "https://createporn.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    description: "AI image generator platform.",
    preview:
      "CreatePorn offers simple tools that convert quickly due to low friction onboarding.",
  },
  {
    name: "Nemora AI",
    slug: "nemora-ai",
    logo: "https://logo.clearbit.com/nemora.ai",
    website: "https://nemora.ai",
    payout: "RevShare",
    difficulty: "Easy",
    type: "AI Companion",
    description: "Emerging AI companion platform.",
    preview:
      "Nemora AI is a newer platform with less competition, making it easier to capture conversions.",
  },
  {
    name: "CherryPop AI",
    slug: "cherrypop-ai",
    logo: "https://logo.clearbit.com/cherrypop.ai",
    website: "https://cherrypop.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    description: "AI content platform.",
    preview:
      "CherryPop AI provides engaging content tools that drive user interaction and spending.",
  },
  {
    name: "LustGF AI",
    slug: "lustgf-ai",
    logo: "https://logo.clearbit.com/lustgf.ai",
    website: "https://lustgf.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Companion",
    description: "AI companion platform.",
    preview:
      "LustGF AI offers strong engagement features that help convert and retain users.",
  },
  {
    name: "PornMaker AI",
    slug: "pornmaker-ai",
    logo: "https://logo.clearbit.com/pornmaker.ai",
    website: "https://pornmaker.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    description: "AI content creation tool.",
    preview:
      "PornMaker AI focuses on quick generation and repeat usage, boosting revenue potential.",
  },
  {
    name: "LoveChat",
    slug: "lovechat",
    logo: "https://logo.clearbit.com/lovechat.ai",
    website: "https://lovechat.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Chat",
    description: "AI relationship chat platform.",
    preview:
      "LoveChat delivers engaging chat experiences that keep users returning frequently.",
  },
  {
    name: "LusyChat AI",
    slug: "lusychat",
    logo: "https://logo.clearbit.com/lusychat.ai",
    website: "https://lusychat.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Chat",
    description: "AI-driven conversation platform.",
    preview:
      "LusyChat AI provides fast engagement loops that increase conversion rates.",
  },
  {
    name: "MuseBox AI",
    slug: "musebox",
    logo: "https://logo.clearbit.com/musebox.ai",
    website: "https://musebox.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Generator",
    description: "AI creative platform.",
    preview:
      "MuseBox AI keeps users engaged through creative outputs and repeat sessions.",
  },
  {
    name: "FeelReal",
    slug: "feelreal",
    logo: "https://logo.clearbit.com/feelreal.ai",
    website: "https://feelreal.ai",
    payout: "Recurring",
    difficulty: "Easy",
    type: "AI Companion",
    description: "Immersive AI experience platform.",
    preview:
      "FeelReal focuses on immersive interaction that increases user retention and spending.",
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
    image: row.logo,
    logo: row.logo,
    affiliate_url: buildListingOutboundPath(row.slug),
    website_url: row.website,
    rating,
    added_date,
    popularity_score,
  };
}

export function buildCuratedAIGeneratedListings(cat: CategoryDef): Listing[] {
  const featured = AI_GENERATED_FEATURED.map((row, i) =>
    buildListing(row, cat, Math.round((4.95 - i * 0.04) * 10) / 10, 96 - i, `2025-08-${String((i % 28) + 1).padStart(2, "0")}`),
  );
  const grid = AI_GENERATED_GRID.map((row, i) =>
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

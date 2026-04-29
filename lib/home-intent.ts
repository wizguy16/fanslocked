/**
 * Homepage “Pick your lane” — hybrid traffic (tubes) + revenue verticals.
 * Listing caps keep the home rail tight (4–8 picks); full catalogs stay on category pages.
 */

export type HomeLaneTier = "revenue" | "traffic";

export const HOME_INTENT_OPTIONS = [
  {
    id: "chat-sexting",
    label: "Chat & Sexting",
    categorySlug: "sex-chat",
    tier: "revenue" as const,
    /** Curated count shown on homepage (4–8). */
    listingCount: 8,
  },
  {
    id: "live-cams",
    label: "Live Cams",
    categorySlug: "live-cams",
    tier: "revenue" as const,
    listingCount: 8,
  },
  {
    id: "dating-hookups",
    label: "Dating & Hookups",
    categorySlug: "hookup",
    tier: "revenue" as const,
    listingCount: 8,
  },
  {
    id: "ai-companions",
    label: "AI Companions",
    categorySlug: "ai-generated",
    tier: "revenue" as const,
    listingCount: 8,
  },
  {
    id: "creator-platforms",
    label: "Creator Platforms",
    categorySlug: "fan-subscription-platforms",
    tier: "revenue" as const,
    listingCount: 8,
  },
  {
    id: "watch-free-porn",
    label: "Watch Free Porn",
    categorySlug: "free-tube",
    tier: "traffic" as const,
    listingCount: 6,
  },
] as const;

export type HomeIntentId = (typeof HOME_INTENT_OPTIONS)[number]["id"];

/** Default to top-of-funnel; strong monetization lanes are one click away. */
export const DEFAULT_HOME_INTENT: HomeIntentId = "watch-free-porn";

export const HOME_INTENT_STORAGE_KEY = "intent";

export function isHomeIntentId(v: string): v is HomeIntentId {
  return HOME_INTENT_OPTIONS.some((o) => o.id === v);
}

export function getCategorySlugForIntent(id: HomeIntentId): string {
  return HOME_INTENT_OPTIONS.find((o) => o.id === id)!.categorySlug;
}

export function getIntentIdForCategorySlug(
  slug: string,
): HomeIntentId | undefined {
  return HOME_INTENT_OPTIONS.find((o) => o.categorySlug === slug)?.id;
}

export function getLaneListingCap(id: HomeIntentId): number {
  return HOME_INTENT_OPTIONS.find((o) => o.id === id)!.listingCount;
}

export function isTrafficAcquisitionLane(id: HomeIntentId): boolean {
  return HOME_INTENT_OPTIONS.find((o) => o.id === id)!.tier === "traffic";
}

export function getLaneTier(id: HomeIntentId): HomeLaneTier {
  return HOME_INTENT_OPTIONS.find((o) => o.id === id)!.tier;
}

/** First three homepage picks use editorial tier framing (positional, not listing metadata). */
export const HOME_LISTING_TIER_LABELS = [
  "Top pick",
  "Best for beginners",
  "Best premium option",
] as const;

/** Free-tube lane — conversion-focused homepage tier framing. */
export const HOME_LISTING_TIER_LABELS_FREE_TUBE = [
  "🔥 Instant free videos",
  "⚡ Find anything fast",
  "💎 Premium-style scenes",
] as const;

export function getHomeListingTierLabels(
  intent: HomeIntentId,
): readonly string[] {
  return intent === "watch-free-porn"
    ? HOME_LISTING_TIER_LABELS_FREE_TUBE
    : HOME_LISTING_TIER_LABELS;
}

export type HomeLaneExperience = {
  /** Hero paragraph under the H1 — changes with the active lane. */
  heroSubtitle: string;
  /** Listings section title (specific lane framing). */
  contextTitle: string;
  /** 1–2 sentences under the title — what the user actually gets in this lane. */
  contextDescription: string;
  /** Three short value props (no emoji), shown as a subtle strip. */
  valueStrip: readonly [string, string, string];
};

const HOME_LANE_EXPERIENCE = {
  "chat-sexting": {
    heroSubtitle:
      "Start chatting instantly — pay-per-message rooms with real people, built for discretion.",
    contextTitle: "Chat & sexting",
    contextDescription:
      "Private text and video chat built around adult conversation — fast entry, pay-as-you-go when you are ready.",
    valueStrip: [
      "Instant access to live rooms",
      "Real operators and community chat",
      "Pay per message or session — no surprise bundles",
    ],
  },
  "live-cams": {
    heroSubtitle:
      "Find real-time cam interactions — tip in public rooms or go private on your terms.",
    contextTitle: "Live sex cams",
    contextDescription:
      "Real-time video with tipping, goal shows, and private sessions — the lane for interaction over passive scrolling.",
    valueStrip: [
      "Instant access to live rooms",
      "Real performers with cam-to-cam options",
      "Pay per tip or private — clear spend control",
    ],
  },
  "dating-hookups": {
    heroSubtitle:
      "Meet someone tonight — locals, matches, and hookup-first apps without the small talk.",
    contextTitle: "Dating & hookups",
    contextDescription:
      "Location-aware discovery and fast filters — when you want IRL or same-night chemistry, not endless feeds.",
    valueStrip: [
      "Location-based matching",
      "Intent-forward profiles and filters",
      "From browse to chat without friction",
    ],
  },
  "ai-companions": {
    heroSubtitle:
      "Shape AI companions — chat, roleplay, and image tools that stay on when you are.",
    contextTitle: "AI companions",
    contextDescription:
      "Character-led sessions with chat continuity — ideal when you want fantasy on demand without scheduling.",
    valueStrip: [
      "Always-on characters and memory-style chat",
      "Text and media workflows in one lane",
      "Private sessions without performer logistics",
    ],
  },
  "creator-platforms": {
    heroSubtitle:
      "Subscribe to creators — exclusives, DMs, and feeds built for long-form fans.",
    contextTitle: "Creator platforms",
    contextDescription:
      "Fan subscriptions and bundled perks — the lane for following specific creators and unlocking depth over clips.",
    valueStrip: [
      "Subscriptions and bundles in one place",
      "Direct messaging and tiered perks",
      "Long-form updates beyond tube clips",
    ],
  },
  "watch-free-porn": {
    heroSubtitle:
      "Browse free tubes for volume — switch lanes when you want cams, chat, dating, or creators.",
    contextTitle: "Free tubes",
    contextDescription:
      "Discovery-first libraries for sampling scenes — use them as a bridge; pair with upgrades below when you are ready to convert.",
    valueStrip: [
      "Massive libraries with instant playback",
      "No paywall to start watching",
      "Pair with cams, chat, or premium when you upgrade intent",
    ],
  },
} satisfies Record<HomeIntentId, HomeLaneExperience>;

export function getHomeLaneExperience(id: HomeIntentId): HomeLaneExperience {
  return HOME_LANE_EXPERIENCE[id];
}

/**
 * Suggested next lanes after listings — excludes current; order is editorial.
 * Used for the “upgrade path” strip on revenue lanes (tube keeps the dedicated funnel).
 */
const HOME_UPGRADE_PATHS: Record<HomeIntentId, HomeIntentId[]> = {
  "chat-sexting": ["live-cams", "ai-companions", "dating-hookups"],
  "live-cams": ["chat-sexting", "ai-companions", "creator-platforms"],
  "dating-hookups": ["live-cams", "chat-sexting", "ai-companions"],
  "ai-companions": ["chat-sexting", "live-cams", "creator-platforms"],
  "creator-platforms": ["live-cams", "chat-sexting", "ai-companions"],
  "watch-free-porn": [],
};

export function getHomeUpgradePathIntents(active: HomeIntentId): HomeIntentId[] {
  return HOME_UPGRADE_PATHS[active] ?? [];
}

export function getIntentLabel(id: HomeIntentId): string {
  return HOME_INTENT_OPTIONS.find((o) => o.id === id)!.label;
}

/** Keyword in the homepage hero subtitle — matches “Pick your lane” selection. */
export function getHeroKeywordForIntent(id: HomeIntentId): string {
  const map: Record<HomeIntentId, string> = {
    "live-cams": "cams",
    "chat-sexting": "chat",
    "dating-hookups": "dating",
    "ai-companions": "AI",
    "creator-platforms": "creators",
    "watch-free-porn": "free sites",
  };
  return map[id] ?? "sites";
}

/** Editorial order for idle hero keyword rotation (cams → … → free sites). */
export const HOME_HERO_KEYWORD_CYCLE: readonly HomeIntentId[] = [
  "live-cams",
  "chat-sexting",
  "dating-hookups",
  "ai-companions",
  "creator-platforms",
  "watch-free-porn",
];

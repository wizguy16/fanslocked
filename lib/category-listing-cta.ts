/** Placement on the category page — drives CTA and microcopy intensity. */
export type CtaContext = "default" | "top-pick" | "featured";

/** Default category → CTA mapping (grid, quick rails, home cards). */
function categoryListingCtaLabelDefault(categorySlug: string): string {
  switch (categorySlug) {
    case "sex-chat":
      return "Start Chat";

    case "live-cams":
      return "Browse Rooms";

    case "premium-porn":
      return "Start Free Access";

    case "fan-subscription-platforms":
      return "Unlock Content";

    case "ai-generated":
      return "Start Chatting";

    case "amateur":
      return "Explore Creators";

    case "free-tube":
      return "Watch Free";

    case "vr":
      return "Watch in VR";

    case "gaming":
      return "Play Now";

    case "hookup":
      return "Browse Matches";

    case "fetish-bdsm":
      return "Explore Content";

    case "escort-directories":
    case "male-companions":
    case "escort":
    case "male-companion":
      return "View Listings";

    default:
      return "Explore Site";
  }
}

/**
 * Primary listing CTA copy for prestige category sections (aligned with page `category.slug`).
 * Use `context: "featured"` for the #1 showcase card (stronger CTAs); `top-pick` matches default grid copy.
 */
export function categoryListingCtaLabel(
  categorySlug: string,
  context: CtaContext = "default",
): string {
  if (context === "featured") {
    switch (categorySlug) {
      case "live-cams":
        return "Enter Room";
      case "premium-porn":
        return "Start Watching";
      case "fan-subscription-platforms":
        return "Unlock Access";
      default:
        break;
    }
  }

  return categoryListingCtaLabelDefault(categorySlug);
}

/**
 * Optional subline under card CTAs — strongest on the primary (`featured`) showcase card only.
 */
export function categoryListingCtaMicrocopy(
  categorySlug: string,
  context: CtaContext = "default",
): string | null {
  if (context !== "featured") return null;

  switch (categorySlug) {
    case "live-cams":
      return "Live now · No signup";
    case "premium-porn":
      return "Trial available";
    case "hookup":
      return "Matches near you";
    default:
      return null;
  }
}

const SHOWCASE_BADGES = [
  "Best Overall",
  "Best Value",
  "Most Popular",
  "Most Cinematic",
  "Best for Beginners",
] as const;

const SHOWCASE_BADGES_BY_CATEGORY: Record<string, readonly string[]> = {
  "live-cams": [
    "Best for Private Shows",
    "Best Overall",
    "Best for Discovery",
    "Best Community",
    "Most Active",
  ],
  "premium-porn": [
    "Best Overall",
    "Best Value",
    "Most Cinematic",
    "Most Popular",
    "Best Variety",
  ],
};

export function categoryShowcaseBadgeLabel(
  categorySlug: string,
  index: number,
): string | null {
  const row = SHOWCASE_BADGES_BY_CATEGORY[categorySlug];
  return row?.[index] ?? SHOWCASE_BADGES[index] ?? null;
}

/** Future hook for “Best for: …” lines on showcase rows (optional UI). */
export function categoryBestForLabel(
  categorySlug: string,
  index: number,
): string | null {
  const MAP: Record<string, readonly string[]> = {
    "live-cams": [
      "Private shows",
      "Premium experience",
      "Fast discovery",
      "Community interaction",
      "High activity",
    ],
    "premium-porn": [
      "All-around content",
      "Best value",
      "Cinematic scenes",
      "Trusted brand",
      "Variety",
    ],
  };

  return MAP[categorySlug]?.[index] ?? null;
}

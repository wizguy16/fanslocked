/** Primary listing CTA copy for prestige category sections (aligned with page `category.slug`). */
export function categoryListingCtaLabel(categorySlug: string): string {
  if (categorySlug === "sex-chat") return "Start Chat";
  if (categorySlug === "live-cams") return "Watch Now";
  if (
    categorySlug === "escort-directories" ||
    categorySlug === "male-companions" ||
    categorySlug === "escort" ||
    categorySlug === "male-companion"
  ) {
    return "View Listings";
  }
  return "Visit Site";
}

/** Optional subline under card CTAs for high-intent verticals. */
export function categoryListingCtaMicrocopy(categorySlug: string): string | null {
  if (categorySlug === "sex-chat") return "Instant access · No signup required";
  return null;
}

const SHOWCASE_BADGES = [
  "Best Overall",
  "Top Pick",
  "Best Value",
  "Most Popular",
  "Editor's pick",
] as const;

export function categoryShowcaseBadgeLabel(index: number): string | null {
  return SHOWCASE_BADGES[index] ?? null;
}

/** Maps `listing.categorySlug` → directory name under `public/images/sites/`. */
export const CATEGORY_SLUG_TO_SITES_FOLDER: Record<string, string> = {
  "free-tube": "free",
  search: "search-engine",
  "premium-porn": "premium",
  "male-companions": "male-companions",
  "escort-directories": "escort",
  vr: "virtual",
  "live-cams": "live-cams",
  "fan-subscription-platforms": "creator",
  amateur: "amateur",
  "ai-generated": "ai",
  hookup: "hookup",
  "sex-chat": "sex-chat",
  gaming: "adultgames",
};

export function sitesFolderForCategorySlug(
  categorySlug: string,
): string | undefined {
  return CATEGORY_SLUG_TO_SITES_FOLDER[categorySlug];
}

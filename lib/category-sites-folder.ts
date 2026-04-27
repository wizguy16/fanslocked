/** Maps `listing.categorySlug` → directory name under `public/images/sites/`. */
export const CATEGORY_SLUG_TO_SITES_FOLDER: Record<string, string> = {
  "free-tube": "free",
  search: "searchEngine",
  "premium-porn": "premium",
  "male-companions": "male-companion",
  vr: "virtual",
  "live-cams": "livecam",
  "fan-subscription-platforms": "creator",
  amateur: "amateur",
  "ai-generated": "ai",
  hookup: "hookup",
  "sex-chat": "sexchat",
};

export function sitesFolderForCategorySlug(
  categorySlug: string,
): string | undefined {
  return CATEGORY_SLUG_TO_SITES_FOLDER[categorySlug];
}

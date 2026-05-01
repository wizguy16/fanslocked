/** Maps `listing.categorySlug` → directory name under `public/images/sites/`. */
export const CATEGORY_SLUG_TO_SITES_FOLDER: Record<string, string> = {
  "free-tube": "free",
  search: "search-engine",
  "premium-porn": "premium",
  "male-companions": "male-companions",
  "escort-directories": "escort",
  vr: "virtual",
  /** Matches `public/images/sites/livecam/` + manifest key `livecam`. */
  "live-cams": "livecam",
  "fan-subscription-platforms": "creator",
  amateur: "amateur",
  "ai-generated": "ai",
  /** Matches `public/images/sites/anime/` + manifest key `anime`. */
  "hentai-anime": "anime",
  hookup: "hookup",
  "fetish-bdsm": "fetish",
  "sex-chat": "sex-chat",
  gaming: "adultgames",
};

export function sitesFolderForCategorySlug(
  categorySlug: string,
): string | undefined {
  return CATEGORY_SLUG_TO_SITES_FOLDER[categorySlug];
}

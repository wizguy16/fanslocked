import type { Listing } from "@/types/listing";
import { getSiteImage } from "@/lib/get-site-image";
import { CATEGORY_SLUG_TO_SITES_FOLDER } from "@/lib/category-sites-folder";

export { CATEGORY_SLUG_TO_SITES_FOLDER as CATEGORY_SITES_FOLDER };

/**
 * When a local asset exists under `public/images/sites/`, assign `image`, `logo`, and
 * optional `screenshot`. Leaves listings unchanged when no manifest match (keeps
 * Unsplash placeholders for generated rows and tubes without assets).
 */
export function resolveListingSiteImages(listing: Listing): Listing {
  const folder = CATEGORY_SLUG_TO_SITES_FOLDER[listing.categorySlug];
  const preferFolder = folder;

  const explicitShot = preferFolder
    ? getSiteImage(listing.slug, "screenshot", false, preferFolder)
    : getSiteImage(listing.slug, "screenshot", false);
  const explicitLogo = preferFolder
    ? getSiteImage(listing.slug, "logo", false, preferFolder)
    : getSiteImage(listing.slug, "logo", false);

  const hero =
    explicitShot ??
    explicitLogo ??
    (preferFolder
      ? getSiteImage(listing.slug, "screenshot", true, preferFolder)
      : getSiteImage(listing.slug, "screenshot", true));

  if (!hero) {
    return listing;
  }

  // Keep `logo` independent from screenshots so logo tiles can fallback to favicon.
  const logo = explicitLogo ?? listing.logo;
  return {
    ...listing,
    image: hero,
    logo,
    ...(explicitShot ? { screenshot: explicitShot } : {}),
  };
}

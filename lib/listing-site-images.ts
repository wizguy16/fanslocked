import { getSiteImage, getSiteImageOrPlaceholder } from "@/lib/get-site-image";
import { sitesFolderForCategorySlug } from "@/lib/category-sites-folder";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

function isPlaceholderLike(url: string): boolean {
  const u = url.trim();
  return u === SITE_IMAGE_PLACEHOLDER || u.endsWith("/placeholder.svg");
}

/**
 * Local logo asset only (manifest `logo` keys). Never falls back to screenshots.
 */
export function resolveListingLogoPath(
  slug: string,
  categorySlug: string,
): string | undefined {
  const f = sitesFolderForCategorySlug(categorySlug);
  return getSiteImage(slug, "logo", false, f) ?? undefined;
}

/**
 * Screenshot-first local path, then logo map.
 */
export function resolveListingScreenshotPath(
  slug: string,
  categorySlug: string,
): string | undefined {
  const f = sitesFolderForCategorySlug(categorySlug);
  return getSiteImage(slug, "screenshot", true, f) ?? undefined;
}

/**
 * Local manifest logo first, then a distinct remote `listing.logo`.
 * Skips remote when it matches `listing.image` (screenshot duplicated into `logo`)
 * or when it is the generic placeholder, then falls back to manifest/placeholder.
 * Never prefers screenshot files from the manifest (`resolveListingLogoPath` only).
 */
export function listingLogoImageSrc(
  slug: string,
  categorySlug: string,
  fallbackRemote?: string | null,
  /** Listing hero URL — when `fallbackRemote` equals this, it is ignored (classic image||logo data bug). */
  heroImageUrl?: string | null,
): string {
  const folder = sitesFolderForCategorySlug(categorySlug);
  const local = resolveListingLogoPath(slug, categorySlug);
  if (local) return local;

  const remote = fallbackRemote?.trim() ?? "";
  const hero = heroImageUrl?.trim() ?? "";

  if (
    remote &&
    !isPlaceholderLike(remote) &&
    remote !== hero
  ) {
    return remote;
  }

  return getSiteImageOrPlaceholder(slug, "logo", folder, false);
}

export function listingScreenshotImageSrc(
  slug: string,
  categorySlug: string,
  fallbackRemote?: string | null,
): string {
  const local = resolveListingScreenshotPath(slug, categorySlug);
  if (local) return local;
  const fb = fallbackRemote?.trim();
  if (fb) return fb;
  return getSiteImageOrPlaceholder(
    slug,
    "screenshot",
    sitesFolderForCategorySlug(categorySlug),
  );
}

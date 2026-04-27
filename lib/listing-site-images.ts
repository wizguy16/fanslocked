import { getSiteImage, getSiteImageOrPlaceholder } from "@/lib/get-site-image";
import { sitesFolderForCategorySlug } from "@/lib/category-sites-folder";

/**
 * Logo-first local path, then screenshot map (`fallbackToOtherType`).
 * If nothing in the manifest, returns `undefined` so callers can use a remote fallback.
 */
export function resolveListingLogoPath(
  slug: string,
  categorySlug: string,
): string | undefined {
  const f = sitesFolderForCategorySlug(categorySlug);
  return getSiteImage(slug, "logo", true, f) ?? undefined;
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

/** For `<Image src>` when a remote fallback (e.g. Unsplash) is acceptable. */
export function listingLogoImageSrc(
  slug: string,
  categorySlug: string,
  fallbackRemote?: string | null,
): string {
  const local = resolveListingLogoPath(slug, categorySlug);
  if (local) return local;
  const fb = fallbackRemote?.trim();
  if (fb) return fb;
  return getSiteImageOrPlaceholder(
    slug,
    "logo",
    sitesFolderForCategorySlug(categorySlug),
  );
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

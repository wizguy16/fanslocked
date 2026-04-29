import type { Listing } from "@/types/listing";
import {
  listingLogoImageSrc,
  resolveListingLogoPath,
} from "@/lib/listing-site-images";

export type ListingLogoDebugSnapshot = {
  name: string;
  slug: string;
  listingLogo: string;
  listingImage: string;
  localManifestLogoPath: string | null;
  listingLogoImageSrcOutput: string;
  logoEqualsHero: boolean;
  logoMissingOrPlaceholder: boolean;
};

/** Snapshot for tracing — listing must already be post-`resolveListingSiteImages` when passed from `lib/data`. */
export function getListingLogoDebugSnapshot(
  listing: Listing,
): ListingLogoDebugSnapshot {
  const local = resolveListingLogoPath(listing.slug, listing.categorySlug);
  const flat = listingLogoImageSrc(
    listing.slug,
    listing.categorySlug,
    listing.logo,
    listing.image,
  );
  const l = listing.logo?.trim() ?? "";
  const logoMissingOrPlaceholder =
    !l ||
    l === "/images/placeholder.svg" ||
    l.endsWith("/placeholder.svg");
  return {
    name: listing.name,
    slug: listing.slug,
    listingLogo: listing.logo,
    listingImage: listing.image,
    localManifestLogoPath: local ?? null,
    listingLogoImageSrcOutput: flat,
    logoEqualsHero:
      Boolean(l && listing.image?.trim()) && l === listing.image.trim(),
    logoMissingOrPlaceholder,
  };
}

/**
 * Dev-only pipeline logs. Browser: set `NEXT_PUBLIC_DEBUG_LISTING_LOGO=1`.
 * Optional `NEXT_PUBLIC_DEBUG_LISTING_LOGO_SLUG=stripchat` to filter one slug.
 */
export function logListingLogoPipelineDev(
  listing: Listing,
  layer: string,
): void {
  if (process.env.NODE_ENV !== "development") return;

  const slugFilter =
    typeof process.env.NEXT_PUBLIC_DEBUG_LISTING_LOGO_SLUG === "string"
      ? process.env.NEXT_PUBLIC_DEBUG_LISTING_LOGO_SLUG.trim()
      : "";
  if (slugFilter && listing.slug !== slugFilter) return;

  const isBrowser = typeof window !== "undefined";
  const enabled = isBrowser
    ? process.env.NEXT_PUBLIC_DEBUG_LISTING_LOGO === "1"
    : process.env.DEBUG_LISTING_LOGO === "1";
  if (!enabled) return;

  const snap = getListingLogoDebugSnapshot(listing);
  // eslint-disable-next-line no-console -- intentional dev tracing
  console.info(`[listing-logo] ${layer}`, snap);

  if (snap.logoEqualsHero) {
    // eslint-disable-next-line no-console -- intentional dev tracing
    console.warn(
      `[listing-logo] logo equals image for "${snap.slug}" — remote logo skipped by resolver; use ListingLogo (favicon chain).`,
    );
  }
  if (snap.logoMissingOrPlaceholder && !snap.localManifestLogoPath) {
    // eslint-disable-next-line no-console -- intentional dev tracing
    console.warn(
      `[listing-logo] no manifest logo and placeholder remote for "${snap.slug}" — favicon letter fallback expected.`,
    );
  }
}

"use client";

import type { Listing } from "@/types/listing";
import { FlListingLogo } from "@/components/fanslocked-home/fl-listing-logo";

type Props = {
  listing: Listing;
  className?: string;
  fit?: "cover" | "contain";
  /**
   * When true, manifest may use a screenshot file if no logo asset exists.
   * Default false: logo tiles prefer favicon over screenshot-as-logo (matches redesigned resolver).
   */
  screenshotFallback?: boolean;
  /**
   * Circular badge with normalized plate (gradient + vignette). Use for spotlight-style round slots.
   */
  slotShape?: "default" | "circle";
};

/**
 * Canonical listing logo — same pipeline as legacy cards (`FlCardDense`): manifest logo,
 * distinct remote `listing.logo`, Google favicon, then generated letter. Uses `<img>` so CDNs
 * are not blocked by `next/image` remotePatterns.
 */
export function ListingLogo({
  listing,
  className,
  fit = "cover",
  screenshotFallback = false,
  slotShape = "default",
}: Props) {
  return (
    <FlListingLogo
      slug={listing.slug}
      categorySlug={listing.categorySlug}
      websiteUrl={listing.website_url}
      fallbackLogo={listing.logo}
      heroImageUrl={listing.image}
      className={className}
      fit={fit}
      screenshotFallback={screenshotFallback}
      slotShape={slotShape}
    />
  );
}

"use client";

import Link from "next/link";
import { cn, clampTagline } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { FlListingLogo } from "@/components/fanslocked-home/fl-listing-logo";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";
import { CATEGORY_GLASS_PANEL } from "@/components/category/sections/category-prestige-styles";

type Props = {
  items: Listing[];
  /** Optional line per tile (e.g. gaming editorial). */
  blurbs?: readonly string[] | null;
};

export function CategoryQuickPicks({ items, blurbs }: Props) {
  if (items.length === 0) return null;
  const hasBlurbs = Boolean(blurbs?.length);

  return (
    <section aria-labelledby="category-quick-picks-heading" className="space-y-5">
      <h2
        id="category-quick-picks-heading"
        className="font-display text-xl font-bold tracking-tight text-white md:text-2xl"
      >
        Quick picks
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {items.map((listing, i) => {
          const link = outboundLinkProps(listing);
          const blurb =
            blurbs?.[i]?.trim() != null && blurbs[i]!.trim() !== ""
              ? clampTagline(blurbs[i]!.trim(), 200)
              : null;
          return (
            <Link
              key={listing.id}
              {...link}
              aria-label={`${listing.name}, view site`}
              className={cn(
                CATEGORY_GLASS_PANEL,
                "flex flex-col items-center p-6 text-center no-underline outline-none transition-[border-color,transform] duration-200 hover:border-[rgba(255,140,66,0.45)] focus-visible:ring-2 focus-visible:ring-[#ff8c42]/50",
                hasBlurbs && "min-h-[220px]",
                i === 2 && "border-[rgba(255,140,66,0.35)]",
              )}
            >
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-lg border border-[#564338] bg-[#1e1f25]">
                <div className="relative h-10 w-10">
                  <FlListingLogo
                    slug={listing.slug}
                    categorySlug={listing.categorySlug}
                    websiteUrl={listing.website_url}
                    fallbackLogo={listing.logo}
                    fit="contain"
                    screenshotFallback={false}
                    className="h-10 w-10"
                  />
                </div>
              </div>
              <h3 className={cn("text-sm font-semibold text-white", blurb ? "mb-2" : "mb-4")}>
                {listing.name}
              </h3>
              {blurb ? (
                <p className="mb-3 line-clamp-4 text-xs leading-relaxed text-[#ddc1b3]">{blurb}</p>
              ) : null}
              <span
                className={cn(
                  "text-xs font-semibold uppercase tracking-wide text-[#ffb68d] underline-offset-2 hover:underline",
                  hasBlurbs && "mt-auto",
                )}
              >
                View site
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

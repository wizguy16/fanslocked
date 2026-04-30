"use client";

import Link from "next/link";
import { cn, clampTagline } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { FlListingLogo } from "@/components/fanslocked-home/fl-listing-logo";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";
import { CATEGORY_GLASS_PANEL } from "@/components/category/sections/category-prestige-styles";
import {
  categoryListingCtaLabel,
  categoryListingCtaMicrocopy,
} from "@/lib/category-listing-cta";

type Props = {
  categorySlug: string;
  items: Listing[];
  /** Optional line per tile (e.g. gaming editorial). */
  blurbs?: readonly string[] | null;
};

export function CategoryQuickPicks({ categorySlug, items, blurbs }: Props) {
  if (items.length === 0) return null;
  const hasBlurbs = Boolean(blurbs?.length);
  const ctaLabel = categoryListingCtaLabel(categorySlug);
  const ctaMicro = categoryListingCtaMicrocopy(categorySlug);

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
              aria-label={`${listing.name}. Opens partner site.`}
              className={cn(
                CATEGORY_GLASS_PANEL,
                "group flex flex-col items-center p-6 text-center no-underline outline-none transition-[border-color,transform] duration-200 hover:border-[rgba(255,140,66,0.45)] focus-visible:ring-2 focus-visible:ring-[#ff8c42]/50",
                hasBlurbs && "min-h-[220px]",
                i === 2 && "border-[rgba(255,140,66,0.35)]",
              )}
            >
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-lg border border-[#564338] bg-[#1e1f25]">
                <div className="relative isolate h-10 w-10 overflow-hidden rounded-lg">
                  <FlListingLogo
                    slug={listing.slug}
                    categorySlug={listing.categorySlug}
                    websiteUrl={listing.website_url}
                    fallbackLogo={listing.logo}
                    heroImageUrl={listing.image}
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
              <div
                className={cn(
                  "flex w-full flex-col items-center gap-1.5",
                  hasBlurbs && "mt-auto",
                )}
              >
                <span className="inline-flex w-full max-w-[220px] items-center justify-center rounded-lg bg-[#ff8c42] px-4 py-2.5 text-sm font-bold text-[#331200] shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)] transition-colors group-hover:bg-[#ff9f5a]">
                  {ctaLabel}
                </span>
                {ctaMicro ? (
                  <p className="text-center text-[10px] leading-snug text-zinc-500">{ctaMicro}</p>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

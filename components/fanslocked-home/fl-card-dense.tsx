"use client";

/**
 * Dense grid card — fixed h-[132px].
 * With `preview`: layer-1 fades out (opacity), full-card overlay fades in — no resize, no layout motion.
 */

import Link from "next/link";
import { cn, clampTagline } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { FlListingBlurb } from "@/components/fanslocked-home/fl-listing-blurb";
import { FlListingLogo } from "@/components/fanslocked-home/fl-listing-logo";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";

type Props = {
  listing: Listing;
  /** When set, shows mock-style rank strip (category landing). */
  rank?: number;
};

export function FlCardDense({ listing, rank }: Props) {
  const link = outboundLinkProps(listing);
  const p = listing.preview?.trim();
  const hasPreview = Boolean(p);

  return (
    <Link
      {...link}
      aria-label={`${listing.name}. Opens partner site.`}
      className={cn(
        "group relative flex h-[132px] w-full items-center gap-4 overflow-hidden rounded-none border border-white/[0.09] bg-[#292929] px-5 py-4 no-underline outline-none",
        "shadow-[0_2px_12px_-8px_rgba(0,0,0,0.35)]",
        "transition-colors duration-200 ease-out hover:border-primary/35",
        hasPreview && "group-hover:border-white/[0.12]",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
      )}
    >
      {rank != null ? (
        <>
          <span
            className="pointer-events-none absolute left-4 top-3 z-[1] text-[13px] font-bold tabular-nums leading-none text-[#6B7280] transition-colors group-hover:text-primary"
            aria-hidden
          >
            #{rank}
          </span>
        </>
      ) : null}
      <div
        className={cn(
          "relative z-0 flex h-full min-w-0 flex-1 items-center gap-4 transition-opacity duration-200 ease-out",
          hasPreview && "group-hover:opacity-0",
          rank != null && "pt-4",
        )}
      >
        <div className="relative isolate h-14 w-14 shrink-0 overflow-hidden rounded-none bg-[var(--bg-elevated)] ring-1 ring-white/[0.06]">
          <FlListingLogo
            slug={listing.slug}
            categorySlug={listing.categorySlug}
            websiteUrl={listing.website_url}
            fallbackLogo={listing.logo}
            heroImageUrl={listing.image}
            fit="contain"
            screenshotFallback={false}
          />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-0.5 pr-14 sm:pr-16">
          <span className="truncate text-[18px] font-semibold leading-tight text-[var(--text-primary)]">
            {listing.name}
          </span>
          {hasPreview ? (
            <p className="line-clamp-2 text-[13px] leading-snug text-[var(--text-secondary)]">
              {clampTagline(listing.description, 120)}
            </p>
          ) : (
            <FlListingBlurb listing={listing} />
          )}
        </div>
      </div>

      {hasPreview ? (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-none opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
          aria-hidden
        >
          <div
            className="absolute inset-0 rounded-none bg-[rgba(10,11,16,0.72)] backdrop-blur-xl"
            aria-hidden
          />
          <div className="relative z-[1] flex max-h-[calc(100%-1.25rem)] w-full flex-col items-center justify-center gap-2.5 overflow-y-auto px-4 text-center">
            <p className="text-[13px] leading-[1.5] text-[rgba(255,255,255,0.95)]">
              {p}
            </p>
            <span className="shrink-0 text-[14px] font-medium text-primary">
              Enter →
            </span>
          </div>
        </div>
      ) : null}

      {!hasPreview ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-3.5 right-4 inline-flex items-center gap-1.5 text-sm font-medium tabular-nums tracking-tight transition-[opacity,color] duration-200 ease-out",
            "text-primary/90 group-hover:text-primary",
            "opacity-100",
            "lg:opacity-0 lg:group-hover:opacity-100",
          )}
        >
          Enter
          <span className="translate-y-px text-[0.95em] font-normal leading-none opacity-90">
            →
          </span>
        </span>
      ) : null}
    </Link>
  );
}

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
        "group relative flex h-[132px] w-full items-center gap-4 overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[var(--bg-card)] px-5 py-4 no-underline outline-none",
        "shadow-[0_2px_12px_-8px_rgba(0,0,0,0.35)]",
        "transition-[border-color] duration-200 ease-out",
        !hasPreview &&
          "hover:border-[rgba(255,122,0,0.7)] hover:bg-[var(--bg-elevated)]",
        hasPreview && "group-hover:border-[rgba(255,255,255,0.08)]",
        "focus-visible:ring-2 focus-visible:ring-[rgba(255,122,0,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
      )}
    >
      {rank != null ? (
        <>
          <span
            className="pointer-events-none absolute left-4 top-3 z-[1] text-[13px] font-bold tabular-nums leading-none text-[#6B7280] transition-colors group-hover:text-[#FF7A00]/80"
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
        <div className="relative isolate h-14 w-14 shrink-0 overflow-hidden rounded-[12px] bg-[var(--bg-elevated)] ring-1 ring-white/[0.06]">
          <FlListingLogo
            slug={listing.slug}
            categorySlug={listing.categorySlug}
            websiteUrl={listing.website_url}
            fallbackLogo={listing.logo}
            heroImageUrl={listing.image}
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
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-[16px] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
          aria-hidden
        >
          <div
            className="absolute inset-0 rounded-[16px] bg-[rgba(10,11,16,0.65)] backdrop-blur-xl"
            aria-hidden
          />
          <div className="relative z-[1] flex max-h-[calc(100%-1.25rem)] w-full flex-col items-center justify-center gap-2.5 overflow-y-auto px-4 text-center">
            <p className="text-[13px] leading-[1.5] text-[rgba(255,255,255,0.95)]">
              {p}
            </p>
            <span className="shrink-0 text-[14px] font-medium text-[#C49A72]">
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
            "text-[#C49A72] group-hover:text-[#D4AA84]",
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

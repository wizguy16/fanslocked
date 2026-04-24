"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { FlListingBlurb } from "@/components/fanslocked-home/fl-listing-blurb";
import { FlListingLogo } from "@/components/fanslocked-home/fl-listing-logo";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";

type Props = {
  listing: Listing;
};

const glassCard =
  "min-h-[132px] overflow-hidden transition-[transform,background-color,border-color,box-shadow,backdrop-filter] duration-200 ease-out " +
  "origin-top group-hover:scale-[1.02] group-hover:overflow-visible " +
  "group-hover:border-[rgba(255,122,0,0.6)] group-hover:bg-[rgba(236,242,250,0.11)] group-hover:backdrop-blur-2xl " +
  "group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_16px_48px_rgba(0,0,0,0.38)] group-hover:z-[5]";

const plainCard =
  "h-[132px] overflow-hidden transition-[background-color,border-color] duration-200 ease-out " +
  "hover:border-[rgba(255,122,0,0.7)] hover:bg-[var(--bg-elevated)]";

export function FlCardDense({ listing }: Props) {
  const link = outboundLinkProps(listing);
  const hasPreview = Boolean(listing.preview?.trim());

  return (
    <Link
      {...link}
      aria-label={`${listing.name}. Opens partner site.`}
      className={cn(
        "group relative flex w-full gap-4 rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[var(--bg-card)] px-5 py-4 no-underline outline-none",
        hasPreview ? "min-h-[132px] items-start" : "h-[132px] items-center",
        "shadow-[0_2px_12px_-8px_rgba(0,0,0,0.35)]",
        hasPreview ? glassCard : plainCard,
        "focus-visible:ring-2 focus-visible:ring-[rgba(255,122,0,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
      )}
    >
      <div
        className={cn(
          "flex min-h-0 min-w-0 flex-1 gap-4 transition-transform duration-200 ease-out",
          hasPreview ? "items-start" : "items-center group-hover:-translate-y-px",
        )}
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[12px] bg-[var(--bg-elevated)] ring-1 ring-white/[0.06]">
          <FlListingLogo logo={listing.logo} websiteUrl={listing.website_url} />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-0.5 self-stretch pr-14 sm:pr-16">
          <span className="truncate text-[18px] font-semibold leading-tight text-[var(--text-primary)]">
            {listing.name}
          </span>
          <FlListingBlurb listing={listing} />
        </div>
      </div>

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
    </Link>
  );
}

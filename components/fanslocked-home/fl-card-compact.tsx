"use client";

import Link from "next/link";
import { cn, clampTagline } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { FlListingLogo } from "@/components/fanslocked-home/fl-listing-logo";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";

type Props = {
  listing: Listing;
  className?: string;
  /** Optional one-line teaser (e.g. category editorial); falls back to description. */
  teaser?: string;
};

export function FlCardCompact({ listing, className, teaser }: Props) {
  const link = outboundLinkProps(listing);
  const sub =
    teaser?.trim() ||
    clampTagline(listing.description, 120);

  return (
    <Link
      {...link}
      aria-label={`${listing.name}. Opens partner site.`}
      className={cn(
        "group relative flex min-h-[110px] w-full flex-col justify-between gap-1 overflow-hidden rounded-[14px]",
        "border border-[rgba(255,255,255,0.06)] bg-[var(--bg-card)] p-4",
        "transition-[border-color,background-color] duration-200 ease-out",
        "hover:border-[rgba(255,122,0,0.7)] hover:bg-[var(--bg-elevated)]",
        "focus-visible:ring-2 focus-visible:ring-[rgba(255,122,0,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="relative isolate h-9 w-9 shrink-0 overflow-hidden rounded-[8px] bg-[var(--bg-elevated)] ring-1 ring-white/[0.06]">
          <FlListingLogo
            slug={listing.slug}
            categorySlug={listing.categorySlug}
            websiteUrl={listing.website_url}
            fallbackLogo={listing.logo}
            heroImageUrl={listing.image}
          />
        </div>
      </div>

      <div className="mt-2 min-w-0">
        <p className="truncate text-[14px] font-semibold text-[var(--text-primary)]">
          {listing.name}
        </p>

        <p className="mt-1 line-clamp-1 text-[12px] text-[var(--text-secondary)]">{sub}</p>
      </div>

      <span className="mt-1 inline-flex max-w-full items-center justify-center self-start rounded-md bg-[#ff8c42] px-3 py-1.5 text-[12px] font-semibold text-[#331200] transition-colors group-hover:bg-[#ff9f5a]">
        Visit Site
      </span>
    </Link>
  );
}

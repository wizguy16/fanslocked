"use client";

import Link from "next/link";
import { cn, clampTagline } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { FlListingLogo } from "@/components/fanslocked-home/fl-listing-logo";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";
import {
  categoryListingCtaLabel,
  categoryListingCtaMicrocopy,
} from "@/lib/category-listing-cta";

type Props = {
  listing: Listing;
  className?: string;
  /** Optional one-line teaser (e.g. category editorial); falls back to description. */
  teaser?: string;
  /** When set (e.g. category prestige page), CTA label follows page category; else uses `listing.categorySlug`. */
  categoryPageSlug?: string;
};

export function FlCardCompact({
  listing,
  className,
  teaser,
  categoryPageSlug,
}: Props) {
  const link = outboundLinkProps(listing);
  const sub =
    teaser?.trim() ||
    clampTagline(listing.description, 120);
  const slugForCta = categoryPageSlug ?? listing.categorySlug;
  const ctaLabel = categoryListingCtaLabel(slugForCta);
  const ctaMicro = categoryListingCtaMicrocopy(slugForCta);

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

      <div className="mt-2 min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold text-[var(--text-primary)]">
          {listing.name}
        </p>

        <p className="mt-1 line-clamp-1 text-[12px] text-[var(--text-secondary)]">{sub}</p>
      </div>

      <div className="mt-2 flex w-full flex-col gap-1">
        <span className="inline-flex max-w-full items-center justify-center self-start rounded-lg bg-[#ff8c42] px-3 py-2 text-[12px] font-bold text-[#331200] shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)] transition-colors group-hover:bg-[#ff9f5a]">
          {ctaLabel}
        </span>
        {ctaMicro ? (
          <p className="text-[10px] leading-snug text-zinc-500">{ctaMicro}</p>
        ) : null}
      </div>
    </Link>
  );
}

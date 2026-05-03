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
        "group relative flex min-h-[110px] w-full flex-col justify-between gap-1 overflow-hidden rounded-none",
        "border border-white/[0.09] bg-[#292929] p-4",
        "transition-colors duration-200 ease-out hover:border-primary/35",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="relative isolate h-9 w-9 shrink-0 overflow-hidden rounded-none bg-[var(--bg-elevated)] ring-1 ring-white/[0.06]">
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
      </div>

      <div className="mt-2 min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold text-[var(--text-primary)]">
          {listing.name}
        </p>

        <p className="mt-1 line-clamp-1 text-[12px] text-[var(--text-secondary)]">{sub}</p>
      </div>

      <div className="mt-2 flex w-full flex-col gap-1">
        <span className="inline-flex max-w-full items-center justify-center self-start rounded-full bg-primary px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-lg transition-colors group-hover:bg-primary/90">
          {ctaLabel}
        </span>
        {ctaMicro ? (
          <p className="text-[10px] leading-snug text-zinc-500">{ctaMicro}</p>
        ) : null}
      </div>
    </Link>
  );
}

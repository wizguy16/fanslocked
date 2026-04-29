"use client";

/**
 * FEATURED CARD — horizontal rail, stacked row, or portrait tile.
 * Rail: tier label on top; icon + copy row; inner block scales on hover. With `preview`, base row fades to overlay.
 */

import Link from "next/link";
import { cn, clampTagline } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { FlListingBlurb } from "@/components/fanslocked-home/fl-listing-blurb";
import { FlListingLogo } from "@/components/fanslocked-home/fl-listing-logo";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";
import { listingScreenshotImageSrc } from "@/lib/listing-site-images";

export type FlCardFeaturedVariant = "rail" | "portrait" | "stacked";

type Props = {
  listing: Listing;
  rank: number;
  /** When set (e.g. home tier framing), shown instead of #{rank}. */
  rankLabel?: string;
  variant?: FlCardFeaturedVariant;
  /** `stacked` only: flip logo / copy for alternating rows. */
  stackedReverse?: boolean;
};

export function FlCardFeatured({
  listing,
  rank,
  rankLabel,
  variant = "rail",
  stackedReverse = false,
}: Props) {
  const link = outboundLinkProps(listing);
  const rankDisplay = rankLabel?.trim() || null;
  const p = listing.preview?.trim();
  const hasPreview = Boolean(p);
  const isStacked = variant === "stacked";
  const coverSrc = listingScreenshotImageSrc(
    listing.slug,
    listing.categorySlug,
    listing.image ?? listing.logo,
  );

  if (variant === "portrait") {
    return (
      <Link
        {...link}
        aria-label={
          rankDisplay
            ? `${listing.name}, ${rankDisplay}. Opens partner site.`
            : `${listing.name}, rank ${rank}. Opens partner site.`
        }
        className={cn(
          "group relative flex h-[min(52vh,26rem)] w-full shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#121318] no-underline outline-none",
          "shadow-[0_2px_12px_-8px_rgba(0,0,0,0.35)]",
          "transition-[transform,border-color,box-shadow] duration-250 ease-out hover:-translate-y-0.5 hover:scale-[1.008] hover:border-[rgba(255,122,0,0.45)] hover:shadow-[0_14px_30px_-18px_rgba(255,122,0,0.5)]",
          "focus-visible:ring-2 focus-visible:ring-[rgba(255,122,0,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0B10]",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- mixed CDNs like rail assets */}
        <img
          src={coverSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20"
          aria-hidden
        />
        <span
          className="absolute left-4 top-4 z-[1] max-w-[min(85%,11rem)] rounded bg-black/55 px-2 py-1 text-left text-[11px] font-bold uppercase leading-tight tracking-wide text-[#FF7A00] backdrop-blur-sm sm:text-[12px]"
          aria-hidden
        >
          {rankDisplay ?? `#${rank}`}
        </span>
        <div className="relative z-[1] mt-auto flex flex-col gap-3 p-5 pt-16">
          <span className="text-lg font-bold leading-tight tracking-tight text-white">
            {listing.name}
          </span>
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-sm font-semibold uppercase tracking-wide text-[#FF7A00]">
            <span>View site</span>
            <span aria-hidden>→</span>
          </div>
        </div>
      </Link>
    );
  }

  const railWidthClasses =
    variant === "stacked"
      ? "h-[132px] w-full shrink-0 snap-start"
      : "min-h-[152px] w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2.2)] lg:w-[calc((100%-3rem)/3.2)]";

  const rankStacked = rankDisplay ? (
    <span
      className="pointer-events-none absolute left-4 top-1/2 z-[1] max-w-[min(calc(100%-7rem),9rem)] -translate-y-1/2 text-left text-[10px] font-semibold uppercase leading-snug tracking-wide text-[var(--accent-primary)] sm:left-5 sm:text-[11px]"
      aria-hidden
    >
      {rankDisplay}
    </span>
  ) : (
    <span
      className="pointer-events-none absolute left-5 top-1/2 z-[1] w-10 -translate-y-1/2 text-left text-[18px] font-bold tabular-nums leading-none text-[var(--accent-primary)]"
      aria-hidden
    >
      #{rank}
    </span>
  );

  const logoBlock = (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[12px] bg-[var(--bg-elevated)] ring-1 ring-white/[0.06]">
      <FlListingLogo
        slug={listing.slug}
        categorySlug={listing.categorySlug}
        websiteUrl={listing.website_url}
        fallbackLogo={listing.logo}
      />
    </div>
  );

  const logoBlockRail = (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[12px] bg-[var(--bg-elevated)] ring-1 ring-white/[0.06]">
      <FlListingLogo
        slug={listing.slug}
        categorySlug={listing.categorySlug}
        websiteUrl={listing.website_url}
        fallbackLogo={listing.logo}
      />
    </div>
  );

  const textBlockStacked = (
    <div
      className={cn(
        "flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-0.5",
        "min-w-0 sm:pr-2",
      )}
    >
      <span className="truncate text-xl font-semibold leading-tight text-[var(--text-primary)]">
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
  );

  const textBlockRail = (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-1.5 pr-9">
      <span className="break-words text-lg font-semibold leading-snug text-[var(--text-primary)] sm:text-xl">
        {listing.name}
      </span>
      {hasPreview ? (
        <p className="line-clamp-3 text-[13px] leading-snug text-[var(--text-secondary)]">
          {clampTagline(listing.description, 160)}
        </p>
      ) : (
        <div className="min-w-0 [&_p]:!line-clamp-4">
          <FlListingBlurb listing={listing} />
        </div>
      )}
    </div>
  );

  return (
    <Link
      {...link}
      aria-label={
        rankDisplay
          ? `${listing.name}, ${rankDisplay}. Opens partner site.`
          : `${listing.name}, rank ${rank}. Opens partner site.`
      }
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[var(--bg-card)] no-underline outline-none",
        railWidthClasses,
        isStacked ? "relative flex items-center gap-5 p-6" : "flex flex-col p-6",
        "shadow-[0_2px_12px_-8px_rgba(0,0,0,0.35)]",
        "transition-[transform,border-color,background-color,box-shadow] duration-250 ease-out",
        "hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[#FF7A00]/65 hover:bg-[var(--bg-elevated)] hover:shadow-[0_14px_28px_-16px_rgba(255,122,0,0.45)]",
        "focus-visible:ring-2 focus-visible:ring-[rgba(255,122,0,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
      )}
    >
      {isStacked ? (
        <>
          {rankStacked}
          <div
            className={cn(
              "relative z-0 flex h-full min-w-0 flex-1 items-center gap-4 transition-opacity duration-200 ease-out",
              hasPreview && "group-hover:opacity-0",
              rankDisplay ? "pl-[7.25rem] sm:pl-[7.75rem]" : "pl-12",
            )}
          >
            {stackedReverse ? (
              <>
                {textBlockStacked}
                {logoBlock}
              </>
            ) : (
              <>
                {logoBlock}
                {textBlockStacked}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="shrink-0 border-b border-white/[0.08] pb-2.5">
            {rankDisplay ? (
              <span
                className="block text-left text-[10px] font-semibold uppercase leading-tight tracking-wide text-[#FF7A00] sm:text-[11px]"
                aria-hidden
              >
                {rankDisplay}
              </span>
            ) : (
              <span
                className="block text-left text-xl font-bold tabular-nums leading-none text-[#FF7A00]"
                aria-hidden
              >
                #{rank}
              </span>
            )}
          </div>
          <div
            className={cn(
              "relative z-0 mt-3 flex min-h-0 flex-1 origin-top items-start gap-4 transition-transform duration-300 ease-out will-change-transform",
              "group-hover:scale-[1.035] motion-reduce:transform-none",
              hasPreview && "group-hover:opacity-0",
            )}
          >
            {logoBlockRail}
            {textBlockRail}
          </div>
        </>
      )}

      {hasPreview ? (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
          aria-hidden
        >
          <div
            className="absolute inset-0 rounded-2xl bg-[rgba(10,11,16,0.65)] backdrop-blur-xl"
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

      {isStacked ? (
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 z-[1] inline-flex -translate-y-1/2 items-center gap-1 rounded-lg bg-[#FF7A00] px-3 py-2 text-xs font-bold text-black sm:right-4 sm:px-4 sm:py-2.5 sm:text-sm"
        >
          Visit site
          <span className="text-sm font-normal leading-none sm:text-base">→</span>
        </span>
      ) : !hasPreview ? (
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

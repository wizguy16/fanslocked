"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn, clampTagline } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";
import { CATEGORY_GLASS_PANEL } from "@/components/category/sections/category-prestige-styles";
import { SitePreview } from "@/components/shared/site-preview";
import {
  categoryListingCtaLabel,
  categoryListingCtaMicrocopy,
  categoryShowcaseBadgeLabel,
} from "@/lib/category-listing-cta";

type Props = {
  categorySlug: string;
  items: Listing[];
  /** Rank offset so badges continue after quick picks (e.g. 4). */
  rankOffset: number;
  blurbs?: readonly string[] | null;
};

export function CategoryTopPicks({ categorySlug, items, rankOffset, blurbs }: Props) {
  if (items.length === 0) return null;
  const ctaLabel = categoryListingCtaLabel(categorySlug);
  const ctaMicro = categoryListingCtaMicrocopy(categorySlug);

  return (
    <section aria-labelledby="category-top-picks-heading" className="space-y-4">
      <h2
        id="category-top-picks-heading"
        className="font-display text-xl font-bold tracking-tight text-white md:text-2xl"
      >
        Top picks
      </h2>
      <div className="space-y-4">
        {items.map((listing, index) => {
          const link = outboundLinkProps(listing);
          const reverse = index % 2 === 1;
          const rank = rankOffset + index + 1;
          const rankLabel = String(rank).padStart(2, "0");
          const body =
            blurbs?.[index]?.trim() || clampTagline(listing.description, 160);
          const showcaseBadge = categoryShowcaseBadgeLabel(index);

          return (
            <Link
              key={listing.id}
              {...link}
              aria-label={`${listing.name}, rank ${rank}. Opens partner site.`}
              className={cn(
                CATEGORY_GLASS_PANEL,
                "group flex flex-col items-center gap-6 p-6 no-underline outline-none transition-[border-color] duration-200 hover:border-[rgba(255,140,66,0.4)] focus-visible:ring-2 focus-visible:ring-[#ff8c42]/50 md:flex-row",
                reverse && "md:flex-row-reverse",
              )}
            >
              <div className="w-full shrink-0 md:w-1/3">
                <SitePreview
                  slug={listing.slug}
                  categorySlug={listing.categorySlug}
                  alt={`${listing.name} preview`}
                  fallbackScreenshot={listing.screenshot}
                  fallbackLogo={listing.logo}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  overlay={
                    <span
                      className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-sm bg-[#ffb68d] text-center font-extrabold leading-none tracking-wide text-[#331200]"
                      aria-hidden
                    >
                      {rankLabel}
                    </span>
                  }
                />
              </div>

              <div
                className={cn(
                  "flex w-full flex-col items-stretch gap-6 md:w-2/3 md:flex-row md:items-center md:justify-between",
                  reverse && "md:flex-row-reverse",
                )}
              >
                <div className={cn("min-w-0 flex-1", reverse && "text-right")}>
                  <div
                    className={cn(
                      "flex flex-col gap-2",
                      reverse ? "items-end" : "items-start",
                    )}
                  >
                    {showcaseBadge ? (
                      <span className="inline-flex rounded-full border border-[rgba(255,182,141,0.28)] bg-[rgba(255,140,66,0.1)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#ffb68d]">
                        {showcaseBadge}
                      </span>
                    ) : null}
                    <h3 className="font-display text-xl font-bold text-[#e3e1e9] md:text-2xl">
                      {listing.name}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      "max-w-lg text-sm leading-relaxed text-[#ddc1b3]",
                      reverse && "ml-auto",
                    )}
                  >
                    {body}
                  </p>
                  <div
                    className={cn(
                      "mt-4 flex flex-wrap items-center gap-4",
                      reverse ? "justify-end" : "justify-start",
                    )}
                  >
                    {listing.tag ? (
                      <span className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-[var(--text-secondary)]">
                        {listing.tag}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div
                  className={cn(
                    "flex shrink-0 flex-col items-stretch gap-1.5 md:items-end",
                    reverse && "md:items-start",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff8c42] px-8 py-3.5 text-[15px] font-bold text-[#331200] shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)] transition-colors md:min-w-[200px] md:px-10 md:py-4",
                      "group-hover:bg-[#ff9f5a]",
                    )}
                  >
                    {ctaLabel}
                    <ArrowRight className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />
                  </span>
                  {ctaMicro ? (
                    <p
                      className={cn(
                        "max-w-[14rem] text-center text-[10px] leading-snug text-zinc-500 md:text-right",
                        reverse && "md:text-left",
                      )}
                    >
                      {ctaMicro}
                    </p>
                  ) : null}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

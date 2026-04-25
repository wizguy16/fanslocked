"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { cn, clampTagline } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";
import { CATEGORY_GLASS_PANEL } from "@/components/category/sections/category-prestige-styles";

function showcaseTag(listing: Listing): string {
  const t = listing.tags.find(Boolean);
  return t ? t.replace(/-/g, " ") : listing.categoryLabel;
}

type Props = {
  items: Listing[];
  /** Rank offset so badges continue after quick picks (e.g. 4). */
  rankOffset: number;
  blurbs?: readonly string[] | null;
};

export function CategoryTopPicks({ items, rankOffset, blurbs }: Props) {
  if (items.length === 0) return null;

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
          const cover = listing.image?.trim() || listing.logo;
          const body =
            blurbs?.[index]?.trim() || clampTagline(listing.description, 160);

          return (
            <Link
              key={listing.id}
              {...link}
              aria-label={`${listing.name}, rank ${rank}. Opens partner site.`}
              className={cn(
                CATEGORY_GLASS_PANEL,
                "flex flex-col items-center gap-6 p-6 no-underline outline-none transition-[border-color] duration-200 hover:border-[rgba(255,140,66,0.4)] focus-visible:ring-2 focus-visible:ring-[#ff8c42]/50 md:flex-row",
                reverse && "md:flex-row-reverse",
              )}
            >
              <div className="w-full shrink-0 md:w-1/3">
                <div className="relative aspect-video overflow-hidden rounded-lg border border-[#564338] bg-[#1e1f25]">
                  <span
                    className="absolute left-4 top-4 z-[1] flex h-10 w-10 items-center justify-center rounded-sm bg-[#ffb68d] text-center font-extrabold leading-none tracking-wide text-[#331200]"
                    aria-hidden
                  >
                    {rankLabel}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cover}
                    alt=""
                    className="h-full w-full object-cover opacity-60"
                  />
                </div>
              </div>

              <div
                className={cn(
                  "flex w-full flex-col items-stretch gap-6 md:w-2/3 md:flex-row md:items-center md:justify-between",
                  reverse && "md:flex-row-reverse",
                )}
              >
                <div className={cn("min-w-0 flex-1", reverse && "text-right")}>
                  <h3 className="mb-2 font-display text-xl font-bold text-[#e3e1e9] md:text-2xl">
                    {listing.name}
                  </h3>
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
                    <div className="inline-flex items-center gap-1 rounded-full border border-[#564338] bg-[#292a2f] px-3 py-1">
                      <Star
                        className="h-3.5 w-3.5 fill-[#ffb68d] text-[#ffb68d]"
                        aria-hidden
                      />
                      <span className="text-xs font-bold tabular-nums text-[#e3e1e9]">
                        {listing.rating.toFixed(1)}/10
                      </span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#ddc1b3]">
                      {showcaseTag(listing)}
                    </span>
                  </div>
                </div>
                <span
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#ff8c42] px-8 py-3.5 text-[15px] font-semibold uppercase tracking-wide text-[#331200] md:px-10 md:py-4",
                    "pointer-events-none",
                  )}
                  aria-hidden
                >
                  Visit site
                  <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

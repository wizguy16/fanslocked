"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn, clampTagline } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";
import {
  DIRECTORY_CARD_HERO,
  DIRECTORY_CARD_INSET,
} from "@/components/category/sections/category-prestige-styles";
import { Stack } from "@/components/ui/stack";
import { SitePreview } from "@/components/shared/site-preview";
import { getCategoryBySlug } from "@/lib/categories";
import {
  categoryListingCtaLabel,
  categoryListingCtaMicrocopy,
  categoryShowcaseBadgeLabel,
  categoryBestForLabel,
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
  const categoryLabel = getCategoryBySlug(categorySlug)?.label ?? categorySlug;

  return (
    <section aria-labelledby="category-top-picks-heading" className="space-y-5">
      <h2
        id="category-top-picks-heading"
        className="font-display text-xl font-bold tracking-tight text-white md:text-2xl"
      >
        Top picks
      </h2>
      <div className="space-y-6 md:space-y-8">
        {items.map((listing, index) => {
          const link = outboundLinkProps(listing);
          const reverse = index % 2 === 1;
          const rank = rankOffset + index + 1;
          const rankLabel = String(rank).padStart(2, "0");
          const body =
            blurbs?.[index]?.trim() || clampTagline(listing.description, 160);
          const showcaseBadge = categoryShowcaseBadgeLabel(categorySlug, index);
          const bestFor = categoryBestForLabel(categorySlug, index);
          const isPrimary = index === 0;
          const ctaLabel = categoryListingCtaLabel(
            categorySlug,
            isPrimary ? "featured" : "top-pick",
          );
          const ctaMicro = categoryListingCtaMicrocopy(
            categorySlug,
            isPrimary ? "featured" : "top-pick",
          );

          return (
            <Stack key={listing.id}>
              <Link
                {...link}
                aria-label={`View ${listing.name} – ranked ${rank} in ${categoryLabel}`}
                className={cn(
                  DIRECTORY_CARD_HERO,
                  "group flex flex-col items-center gap-6 p-6 no-underline md:flex-row",
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
                        className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-none border border-white/15 bg-black/70 text-center text-[11px] font-extrabold leading-none tracking-wide text-white shadow-md"
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
                        <span className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/90">
                          {showcaseBadge}
                        </span>
                      ) : null}
                      <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                        {listing.name}
                      </h3>
                    </div>
                    <p
                      className={cn(
                        "max-w-lg text-sm leading-relaxed text-neutral-400",
                        reverse && "ml-auto",
                      )}
                    >
                      {body}
                    </p>
                    {bestFor ? (
                      <p
                        className={cn(
                          "mt-2 text-xs font-medium text-neutral-500",
                          reverse && "ml-auto",
                        )}
                      >
                        Best for <span className="font-semibold">{bestFor}</span>
                      </p>
                    ) : null}
                    <div
                      className={cn(
                        "mt-4 flex flex-wrap items-center gap-4",
                        reverse ? "justify-end" : "justify-start",
                      )}
                    >
                      {listing.tag ? (
                        <span className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-[11px] font-medium text-neutral-300">
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
                        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 md:min-w-[200px] md:px-10 md:py-4",
                        "group-hover:bg-primary/90",
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
              {index === 1 ? (
                <div className={cn(DIRECTORY_CARD_INSET, "flex flex-col gap-4 p-6")}>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-400">
                      Recommended Alternative
                    </span>

                    <h3 className="font-display text-lg font-bold text-white">
                      Looking for something more niche?
                    </h3>

                    <p className="max-w-lg text-sm text-neutral-400">
                      Try a specialized platform with faster access and more focused content.
                      Best when you already know what you&apos;re looking for.
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-1.5">
                    <span
                      className={cn(
                        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-lg transition-colors hover:bg-primary/90",
                      )}
                    >
                      {categoryListingCtaLabel(categorySlug, "featured")}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>

                    {categoryListingCtaMicrocopy(categorySlug, "featured") ? (
                      <p className="text-[10px] text-zinc-500">
                        {categoryListingCtaMicrocopy(categorySlug, "featured")}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </Stack>
          );
        })}
      </div>
    </section>
  );
}

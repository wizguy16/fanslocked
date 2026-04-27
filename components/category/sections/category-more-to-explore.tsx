"use client";

import type { Listing } from "@/types/listing";
import { FlCardCompact } from "@/components/fanslocked-home/fl-card-compact";

type Props = {
  items: Listing[];
  blurbs?: readonly string[] | null;
  /** Replaces the default “More to explore” section title. */
  heading?: string;
  /** Max cards in the supporting grid (default 10). */
  limit?: number;
};

export function CategoryMoreToExplore({
  items,
  blurbs,
  heading = "More to explore",
  limit = 10,
}: Props) {
  const limited = items.slice(0, limit);
  if (limited.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="category-more-to-explore-heading">
      <div className="mx-auto w-full max-w-[1400px]">
        <h3
          id="category-more-to-explore-heading"
          className="mb-4 text-[18px] font-semibold text-white"
        >
          {heading}
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 md:gap-4">
          {limited.map((listing, i) => (
            <FlCardCompact
              key={listing.id}
              listing={listing}
              teaser={blurbs?.[i]?.trim()}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

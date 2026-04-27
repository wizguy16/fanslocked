"use client";

import type { Listing } from "@/types/listing";
import { CategoryMoreToExplore } from "@/components/category/sections/category-more-to-explore";
import { CategoryQuickPicks } from "@/components/category/sections/category-quick-picks";
import { CategoryTopPicks } from "@/components/category/sections/category-top-picks";

export type CategoryListingCopy = {
  showcaseBlurbs: readonly string[];
  risingBlurbs: readonly string[];
};

type Props = {
  quick: Listing[];
  showcase: Listing[];
  rising: Listing[];
  /** When set, replaces the default “More to explore” heading. */
  moreSectionHeading?: string | null;
  /** When set, overrides the default supporting grid cap (10). */
  moreSectionLimit?: number;
  listingCopy?: CategoryListingCopy | null;
};

/**
 * Orchestrates listing bands only (wide max-width lives in `CategoryPrestigeShell`).
 * Layout rules per section live in `components/category/sections/*`.
 */
export function CategoryPrestigeListings({
  quick,
  showcase,
  rising,
  moreSectionHeading,
  moreSectionLimit,
  listingCopy,
}: Props) {
  return (
    <div className="space-y-10 md:space-y-12">
      <CategoryQuickPicks items={quick} />
      <CategoryTopPicks
        items={showcase}
        rankOffset={quick.length}
        blurbs={listingCopy?.showcaseBlurbs ?? null}
      />
      <CategoryMoreToExplore
        items={rising}
        blurbs={listingCopy?.risingBlurbs ?? null}
        heading={moreSectionHeading ?? undefined}
        limit={moreSectionLimit}
      />
    </div>
  );
}

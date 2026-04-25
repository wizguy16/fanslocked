"use client";

/**
 * FEATURED ROW
 * - scroll: horizontal drag rail (home).
 * - stacked: full-width alternating rows (category landing).
 */

import type { Listing } from "@/types/listing";
import { FlCardFeatured } from "@/components/fanslocked-home/fl-card-featured";
import { useDragScroll } from "@/components/home/use-drag-scroll";

type Props = {
  items: Listing[];
  /** `stacked` = vertical list with alternating layout (category page). */
  mode?: "scroll" | "stacked";
  /** Added to each card's displayed rank (e.g. after a separate quick-picks row). */
  rankOffset?: number;
};

export function FlFeaturedRow({
  items,
  mode = "scroll",
  rankOffset = 0,
}: Props) {
  const { ref: dragRef, dragScrollProps } = useDragScroll<HTMLDivElement>();

  if (items.length === 0) return null;

  if (mode === "stacked") {
    return (
      <section aria-label="Top earners" className="relative px-6">
        <div className="relative mx-auto max-w-[1600px] space-y-4">
          {items.map((l, i) => (
            <FlCardFeatured
              key={l.id}
              listing={l}
              rank={rankOffset + i + 1}
              variant="stacked"
              stackedReverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Featured picks" className="relative px-6">
      <div className="relative mx-auto max-w-[1600px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-10 bg-gradient-to-r from-[#0A0B10] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-10 bg-gradient-to-l from-[#0A0B10] to-transparent" />
        <div
          ref={dragRef}
          {...dragScrollProps}
          className="scroll-momentum flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible scroll-smooth py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        >
          {items.map((l, i) => (
            <FlCardFeatured
              key={l.id}
              listing={l}
              rank={rankOffset + i + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

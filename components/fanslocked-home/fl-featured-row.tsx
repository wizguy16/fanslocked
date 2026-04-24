"use client";

/**
 * FEATURED ROW (HORIZONTAL SCROLL RAIL)
 * ----------------------------------------
 * Displays the top picks in a horizontal scroll layout.
 *
 * Behavior:
 * - Drag scroll (desktop + mobile)
 * - Snap scrolling
 * - Edge fade gradients
 * - 3 cards visible + partial 4th (desktop)
 */

import type { Listing } from "@/types/listing";
import { FlCardFeatured } from "@/components/fanslocked-home/fl-card-featured";
import { useDragScroll } from "@/components/home/use-drag-scroll";

type Props = {
  items: Listing[];
};

export function FlFeaturedRow({ items }: Props) {
  const { ref: dragRef, dragScrollProps } =
    useDragScroll<HTMLDivElement>();

  if (items.length === 0) return null;

  return (
    <section aria-label="Featured picks" className="relative px-6">
      <div className="relative mx-auto max-w-[1600px]">

        {/* ----------------------------------------
            LEFT FADE (visual polish)
        ---------------------------------------- */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-10 bg-gradient-to-r from-[#0A0B10] to-transparent" />

        {/* ----------------------------------------
            RIGHT FADE
        ---------------------------------------- */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-10 bg-gradient-to-l from-[#0A0B10] to-transparent" />

        {/* ----------------------------------------
            SCROLL CONTAINER
        ---------------------------------------- */}
        <div
          ref={dragRef}
          {...dragScrollProps}
          className="scroll-momentum flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible scroll-smooth py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        >
          {items.map((l, i) => (
            <FlCardFeatured
              key={l.id}
              listing={l}
              rank={i + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
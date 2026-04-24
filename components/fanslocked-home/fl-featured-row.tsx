"use client";

import type { Listing } from "@/types/listing";
import { Reveal } from "@/components/motion/reveal";
import { FlCardFeatured } from "@/components/fanslocked-home/fl-card-featured";

type Props = {
  items: Listing[];
};

export function FlFeaturedRow({ items }: Props) {
  const slice = items.slice(0, 4);
  if (slice.length === 0) return null;
  return (
    <section aria-label="Featured picks" className="px-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {slice.map((l, i) => (
            <Reveal
              key={l.id}
              delay={Math.min(i * 0.05, 0.2)}
              className="shrink-0"
            >
              <FlCardFeatured listing={l} showTopBadge={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

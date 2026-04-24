"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Listing } from "@/types/listing";
import { Reveal } from "@/components/motion/reveal";
import { FlCardDense } from "@/components/fanslocked-home/fl-card-dense";

const BATCH = 16;
const MAX = 64;

type Props = {
  items: Listing[];
  /**
   * When true, render the full `items` slice at once (e.g. server-paginated
   * pages). Skips incremental reveal and intersection-based loading.
   */
  eager?: boolean;
};

export function FlDenseGrid({ items, eager = false }: Props) {
  const [visible, setVisible] = useState(() =>
    eager ? items.length : Math.min(BATCH, items.length),
  );
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (eager) return;
    setVisible((v) => Math.min(v + BATCH, MAX, items.length));
  }, [eager, items.length]);

  useEffect(() => {
    setVisible(
      eager ? items.length : Math.min(BATCH, items.length),
    );
  }, [eager, items]);

  useEffect(() => {
    if (eager || items.length === 0) return;
    const el = sentinelRef.current;
    if (!el || visible >= items.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "120px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [eager, items, visible, loadMore]);

  const shown = items.slice(0, Math.min(visible, items.length));

  return (
    <section aria-label="All listings" className="px-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7 2xl:grid-cols-8">
          {shown.map((l, i) => (
            <Reveal
              key={l.id}
              delay={Math.min(i * 0.03, 0.45)}
              className="min-w-0"
            >
              <FlCardDense listing={l} />
            </Reveal>
          ))}
        </div>
        {visible < items.length ? (
          <div ref={sentinelRef} className="h-8 w-full" aria-hidden />
        ) : null}
      </div>
    </section>
  );
}

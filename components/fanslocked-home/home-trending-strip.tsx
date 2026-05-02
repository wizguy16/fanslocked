"use client";

import { useEffect, useState } from "react";
import type { Listing } from "@/types/listing";
import { FlCardCompact } from "@/components/fanslocked-home/fl-card-compact";

export function HomeTrendingStrip() {
  const [items, setItems] = useState<Listing[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/affiliate-clicks", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { listings?: Listing[] };
        if (!cancelled && Array.isArray(data.listings)) {
          setItems(data.listings);
        }
      } catch {
        if (!cancelled) setItems([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (items !== null && items.length === 0) return null;

  return (
    <section
      className="border-t border-white/5 px-6 py-12 md:py-16"
      aria-labelledby="home-trending-heading"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff8c42]/90">
              Live signals
            </p>
            <h2
              id="home-trending-heading"
              className="mt-1 font-display text-xl font-semibold tracking-tight text-white md:text-2xl"
            >
              Trending right now
            </h2>
            <p className="mt-1 max-w-xl text-sm text-[#9CA3AF]">
              Platforms visitors are exiting to most often from FansLocked (session-based).
            </p>
          </div>
        </div>

        {items === null ? (
          <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:pb-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="min-h-[110px] min-w-[220px] animate-pulse rounded-[14px] bg-white/[0.04] md:min-w-0"
              />
            ))}
          </div>
        ) : (
          <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-2 pt-1 scrollbar-thin md:grid md:grid-cols-5 md:gap-4 md:overflow-visible">
            {items.map((listing) => (
              <div key={listing.id} className="relative min-w-[220px] shrink-0 md:min-w-0">
                <span className="pointer-events-none absolute -left-1 -top-2 z-[2] rounded-md bg-[#ff4d2a]/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-black/40">
                  Trending
                </span>
                <FlCardCompact listing={listing} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

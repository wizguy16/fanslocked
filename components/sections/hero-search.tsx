"use client";

import type { QuickFilterId } from "@/types/listing";
import { cn } from "@/lib/utils";

const quickFilters: { id: QuickFilterId; label: string }[] = [
  { id: "free", label: "Free" },
  { id: "trending", label: "Trending" },
  { id: "premium", label: "Premium" },
  { id: "new", label: "New" },
];

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
  quickFilter: QuickFilterId;
  onQuickFilterChange: (f: QuickFilterId) => void;
};

export function HeroSearch({
  query,
  onQueryChange,
  quickFilter,
  onQuickFilterChange,
}: Props) {
  return (
    <section className="border-b border-white/5 px-3 pb-6 pt-10 sm:px-4 md:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mt-0.5">
          <label htmlFor="fl-legacy-hero-search" className="sr-only">
            Search listings
          </label>
          <input
            id="fl-legacy-hero-search"
            type="search"
            autoComplete="off"
            placeholder="Search tubes, VR, cams, premium, niches…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#0a0a0f]/70 px-4 py-3.5 text-sm text-white shadow-inner shadow-black/40 backdrop-blur-xl placeholder:text-slate-500 focus:border-amber-500/45 focus:outline-none focus:ring-2 focus:ring-amber-500/25 sm:py-4 sm:text-base"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
            Quick filters
          </span>
          {quickFilters.map((f) => {
            const active = quickFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() =>
                  onQuickFilterChange(active ? "all" : f.id)
                }
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition sm:text-sm",
                  active
                    ? "border-amber-500/60 bg-amber-500/15 text-amber-100 shadow-[0_0_20px_-8px_rgba(245,158,11,0.45)]"
                    : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-amber-500/30 hover:text-white",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

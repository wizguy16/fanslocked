"use client";

import type { QuickFilterId } from "@/types/listing";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { listings } from "@/lib/data";

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
    <section className="relative overflow-hidden border-b border-white/5 px-3 py-10 sm:px-4 sm:py-12 md:px-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-30%,rgba(245,158,11,0.22),transparent),radial-gradient(ellipse_50%_40%_at_100%_0%,rgba(34,211,238,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/90"
        >
          The Porn Dude 2.0 · 2026 edition
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-3 font-display text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          The curated directory for smarter clicks.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base"
        >
          {listings.length}+ adult destinations ranked by editorial testing,
          transparent disclosures, and conversion-ready CTAs — built for readers
          who want fewer surprises at checkout.
        </motion.p>
        <div className="mt-8">
          <label htmlFor="tpd-search" className="sr-only">
            Search listings
          </label>
          <motion.input
            id="tpd-search"
            type="search"
            autoComplete="off"
            placeholder="Search tubes, VR, cams, premium, niches…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="w-full rounded-2xl border border-white/10 bg-[#0a0a0f]/70 px-4 py-3.5 text-sm text-white shadow-inner shadow-black/40 backdrop-blur-xl placeholder:text-slate-500 focus:border-amber-500/45 focus:outline-none focus:ring-2 focus:ring-amber-500/25 sm:py-4 sm:text-base"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
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

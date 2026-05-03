"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Listing } from "@/types/listing";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { FlNav } from "@/components/fanslocked-home/fl-nav";
import { getFlNavMegaMenuData } from "@/lib/fl-nav-mega-menu-data";
import { FlDenseGrid } from "@/components/fanslocked-home/fl-dense-grid";
import { BTN_SECONDARY_OUTLINE } from "@/components/category/sections/category-prestige-styles";
import { cn } from "@/lib/utils";

type SortMode = "default" | "trending";

type Props = {
  listings: Listing[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  sortMode: SortMode;
  prevHref: string;
  nextHref: string;
};

const btnBase =
  "inline-flex items-center justify-center rounded-full border border-white/[0.09] bg-[#292929] px-4 py-2 text-sm font-medium text-[#A0A6B1] transition-colors hover:border-primary/35 hover:text-white";

const btnDisabled = "pointer-events-none opacity-35";

export function FanslockedExplorePage({
  listings,
  currentPage,
  totalPages,
  totalCount,
  sortMode,
  prevHref,
  nextHref,
}: Props) {
  const trending = sortMode === "trending";
  const megaMenuData = useMemo(() => getFlNavMegaMenuData(), []);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[#1A1A1A] text-white">
      <FlNav megaMenuData={megaMenuData} />
      <Breadcrumbs containerClassName="max-w-[1600px] px-6" />

      {/* Hero — matches reference: radial glow, watermark, centered stack */}
      <header className="relative overflow-hidden px-6 pb-12 pt-10 md:pb-20 md:pt-14">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(600px,90vw)] w-[min(600px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden">
          <span className="whitespace-nowrap text-center font-bold uppercase leading-none tracking-tighter text-white/[0.03] [font-size:clamp(4rem,min(22vw,14rem),14rem)]">
            EXPLORE • DISCOVER • TRENDING • PLATFORMS
          </span>
        </div>

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-white/90">
            Directory
          </span>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tighter text-white md:text-7xl md:leading-[0.95]">
            Explore
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Navigate the elite landscape of digital content creation. Our
            directory provides high-fidelity insights into trending platforms and
            top-tier creators across the ecosystem.
          </p>
          <div className="mt-10 flex w-full max-w-xl flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row sm:gap-6">
            <Link
              href="/explore?sort=trending"
              className="inline-flex w-full min-w-[200px] items-center justify-center rounded-full bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 sm:w-auto"
            >
              Start Exploring
            </Link>
            <Link
              href="/explore"
              className={cn(
                BTN_SECONDARY_OUTLINE,
                "inline-flex w-full min-w-[200px] items-center justify-center px-10 py-4 text-base font-semibold sm:w-auto",
              )}
            >
              View All Platforms
            </Link>
          </div>
        </div>
      </header>

      {/* Listing toolbar — separate from hero so it does not affect the visual */}
      <div className="mx-auto max-w-[1600px] border-t border-[rgba(255,255,255,0.06)] px-6 pb-8 pt-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-xs text-[#6B7280]">
            <span className="font-medium text-[#A0A6B1]">
              {totalCount.toLocaleString()}
            </span>{" "}
            listings
            <span
              className="mx-2 inline-block h-3 w-px bg-[rgba(255,255,255,0.08)] align-middle"
              aria-hidden
            />
            Page{" "}
            <span className="font-medium text-white">{currentPage}</span> of{" "}
            <span className="font-medium text-white">{totalPages}</span>
          </p>
          <nav className="flex items-center gap-2" aria-label="Pagination">
            <Link
              href={prevHref}
              className={`${btnBase} ${currentPage <= 1 ? btnDisabled : ""}`}
              aria-disabled={currentPage <= 1}
            >
              Previous
            </Link>
            <Link
              href={nextHref}
              className={`${btnBase} ${currentPage >= totalPages ? btnDisabled : ""}`}
              aria-disabled={currentPage >= totalPages}
            >
              Next
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] pb-16">
        <div id="grid" className="scroll-mt-28 space-y-4">
          <div className="flex flex-wrap items-center gap-3 px-6">
            <motion.h2
              key={sortMode}
              initial={{ opacity: 0.72 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-semibold text-white md:text-base"
            >
              {trending ? "Trending Platforms" : "All Platforms"}
            </motion.h2>
            {trending ? (
              <span className="inline-flex items-center rounded-md border border-primary/35 bg-[#292929] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                Trending
              </span>
            ) : null}
          </div>
          <motion.div
            key={`${sortMode}-${currentPage}`}
            initial={{ opacity: 0.86 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <FlDenseGrid
              items={listings}
              eager
              highlightFirstRow={trending}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

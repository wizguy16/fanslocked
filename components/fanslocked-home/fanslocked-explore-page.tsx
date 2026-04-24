"use client";

import Link from "next/link";
import type { Listing } from "@/types/listing";
import { FlNav } from "@/components/fanslocked-home/fl-nav";
import { FlDenseGrid } from "@/components/fanslocked-home/fl-dense-grid";

type Props = {
  listings: Listing[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

function pageHref(n: number) {
  return n <= 1 ? "/explore" : `/explore?page=${n}`;
}

const btnBase =
  "inline-flex items-center justify-center rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#11131A] px-4 py-2 text-sm font-medium text-[#A0A6B1] transition hover:border-[rgba(255,255,255,0.1)] hover:text-white";

const btnDisabled = "pointer-events-none opacity-35";

export function FanslockedExplorePage({
  listings,
  currentPage,
  totalPages,
  totalCount,
}: Props) {
  return (
    <div className="min-h-[100dvh] bg-[#0A0B10] text-white">
      <FlNav />
      <div className="mx-auto max-w-[1600px] pb-16 pt-10">
        <header className="mb-10 border-b border-[rgba(255,255,255,0.04)] px-6 pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
            Directory
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Explore
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#A0A6B1]">
            Every listing in one paginated grid. Jump home to filter by category
            or search the full catalog.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
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
            <nav
              className="flex items-center gap-2"
              aria-label="Pagination"
            >
              <Link
                href={pageHref(currentPage - 1)}
                className={`${btnBase} ${currentPage <= 1 ? btnDisabled : ""}`}
                aria-disabled={currentPage <= 1}
              >
                Previous
              </Link>
              <Link
                href={pageHref(currentPage + 1)}
                className={`${btnBase} ${currentPage >= totalPages ? btnDisabled : ""}`}
                aria-disabled={currentPage >= totalPages}
              >
                Next
              </Link>
            </nav>
          </div>
        </header>

        <FlDenseGrid items={listings} eager />
      </div>
    </div>
  );
}

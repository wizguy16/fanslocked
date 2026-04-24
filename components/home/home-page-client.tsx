"use client";

import { useMemo, useState, type ReactNode } from "react";
import { listings } from "@/lib/data";
import { filterListings } from "@/lib/search";
import type { QuickFilterId } from "@/types/listing";
import { HeroSearch } from "@/components/sections/hero-search";
import { SearchResults } from "@/components/sections/search-results";
import { HomeDiscoveryClient } from "@/components/home/home-discovery-client";

function resultsSubtitle(
  query: string,
  quickFilter: QuickFilterId,
  count: number,
): string {
  const q = query.trim();
  const parts: string[] = [];
  if (q) parts.push(`matching “${q}”`);
  if (quickFilter !== "all") parts.push(`quick filter: ${quickFilter}`);
  if (count === 0) {
    if (parts.length === 0) return "No filters applied.";
    return `No listings ${parts.join(" · ")}. Try another keyword.`;
  }
  return `${count} listing${count === 1 ? "" : "s"} ${parts.join(" · ") || "in the directory"}.`;
}

export function HomePageClient({
  categoryGrid,
}: {
  categoryGrid?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState<QuickFilterId>("all");

  const filtered = useMemo(
    () => filterListings(listings, query, quickFilter),
    [query, quickFilter],
  );

  const searchActive = query.trim().length > 0 || quickFilter !== "all";

  return (
    <>
      <HeroSearch
        query={query}
        onQueryChange={setQuery}
        quickFilter={quickFilter}
        onQuickFilterChange={setQuickFilter}
      />
      {searchActive ? (
        <SearchResults
          subtitle={resultsSubtitle(query, quickFilter, filtered.length)}
          count={filtered.length}
          items={filtered}
        />
      ) : (
        <>
          <HomeDiscoveryClient />
          {categoryGrid}
          <p className="mx-auto max-w-[1600px] px-3 py-2 text-center text-[10px] text-slate-600 sm:px-4 md:px-6">
            {listings.length}+ listings ·{" "}
            <a
              href="/explore"
              className="font-medium text-[#FF7A00]/90 hover:text-[#ff9333]"
            >
              Full index
            </a>{" "}
            ·{" "}
            <a
              href="/categories"
              className="font-medium text-slate-500 hover:text-slate-300"
            >
              All categories
            </a>
          </p>
        </>
      )}
    </>
  );
}

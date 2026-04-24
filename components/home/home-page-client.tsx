"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  getByTag,
  getRecentlyAdded,
  getTopPicks,
  getTrendingByScore,
  listings,
} from "@/lib/data";
import { filterListings } from "@/lib/search";
import type { QuickFilterId } from "@/types/listing";
import { HeroSearch } from "@/components/sections/hero-search";
import { TopPicks } from "@/components/sections/top-picks";
import { CategoryRow } from "@/components/sections/category-row";
import { DenseGrid } from "@/components/sections/dense-grid";
import { SearchResults } from "@/components/sections/search-results";
import { Newsletter } from "@/components/sections/newsletter";
import { Reveal } from "@/components/motion/reveal";

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

  const topPicks = useMemo(() => getTopPicks(10), []);
  const trending = useMemo(() => getTrendingByScore(8), []);
  const recent = useMemo(() => getRecentlyAdded(8), []);
  const tubes = useMemo(
    () => getByTag("free").slice(0, 6),
    [],
  );
  const premium = useMemo(
    () => listings.filter((l) => l.tags.includes("premium")).slice(0, 6),
    [],
  );

  const catalogPreview = useMemo(() => listings.slice(0, 36), []);

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
          <Reveal>
            <TopPicks items={topPicks} />
          </Reveal>
          <Reveal>
            <CategoryRow title="Recently added" items={recent} />
          </Reveal>
          <Reveal>
            <CategoryRow title="Trending this week" items={trending} />
          </Reveal>
          <Reveal>
            <CategoryRow title="Free tubes spotlight" items={tubes} />
          </Reveal>
          <Reveal>
            <CategoryRow title="Premium picks" items={premium} />
          </Reveal>
          {categoryGrid}
          <Reveal>
            <DenseGrid
              title="Browse the catalog (preview)"
              items={catalogPreview}
            />
          </Reveal>
          <p className="mx-auto max-w-7xl px-3 pb-6 text-center text-xs text-slate-500 sm:px-4 md:px-6">
            Showing 36 of {listings.length}+ curated listings. Open{" "}
            <a href="/explore" className="text-amber-400/90 hover:text-amber-300">
              Explore
            </a>{" "}
            for paginated A–Z browsing.
          </p>
          <Newsletter />
        </>
      )}
    </>
  );
}

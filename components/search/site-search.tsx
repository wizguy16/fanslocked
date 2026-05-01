"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Listing = {
  name: string;
  slug: string;
  category: string;
};

type Props = {
  listings: Listing[];
  className?: string;
};

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  if (!q) return <>{text}</>;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return <>{text}</>;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);
  return (
    <>
      {before}
      <strong className="font-semibold text-white">{match}</strong>
      {after}
    </>
  );
}

export default function SiteSearch({ listings, className }: Props) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    return listings
      .filter((l) => l.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
  }, [query, listings]);

  return (
    <div className={cn("relative w-full max-w-md min-w-0", className)}>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/30"
          aria-hidden
        />
        <input
          type="search"
          enterKeyHint="search"
          placeholder="Search sites"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setQuery("");
          }}
          className={cn(
            "w-full rounded-full border border-white/[0.12] bg-white/[0.06] py-2 pl-10 pr-4 text-sm text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition placeholder:text-white/35",
            "hover:border-white/[0.16] hover:bg-white/[0.08]",
            "focus:border-white/25 focus:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-[#00bcd4]/25",
          )}
        />
      </div>

      {query && results.length > 0 && (
        <div className="absolute z-[120] mt-2 w-full rounded-2xl border border-white/[0.12] bg-[#0a0a0a]/85 shadow-[0_16px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={`/site/${item.slug}`}
              className="block px-4 py-2.5 text-sm text-white/95 transition first:rounded-t-2xl last:rounded-b-2xl hover:bg-white/[0.08]"
            >
              <HighlightMatch text={item.name} query={query} />
              <span className="ml-2 text-xs text-white/40">
                ({item.category})
              </span>
            </Link>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="absolute z-[120] mt-2 w-full rounded-2xl border border-white/[0.12] bg-[#0a0a0a]/85 px-4 py-2.5 text-sm text-white/45 backdrop-blur-xl">
          No results found
        </div>
      )}
    </div>
  );
}

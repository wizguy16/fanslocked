"use client";

import { useMemo, useState } from "react";
import type { Listing } from "@/types/listing";
import { CompactCard } from "@/components/cards/compact-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type SortId = "rating" | "newest" | "popular";

const SORTS: { id: SortId; label: string }[] = [
  { id: "rating", label: "Highest rated" },
  { id: "newest", label: "Newest" },
  { id: "popular", label: "Most popular" },
];

const PAGE_SIZE = 24;

export function CategoryListings({ items }: { items: Listing[] }) {
  const [sort, setSort] = useState<SortId>("rating");
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    const copy = [...items];
    if (sort === "rating") copy.sort((a, b) => b.rating - a.rating);
    if (sort === "newest")
      copy.sort(
        (a, b) =>
          new Date(b.added_date).getTime() - new Date(a.added_date).getTime(),
      );
    if (sort === "popular")
      copy.sort((a, b) => b.popularity_score - a.popularity_score);
    return copy;
  }, [items, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = sorted.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="mt-6 space-y-6">
      <div
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        role="toolbar"
        aria-label="Sort listings"
      >
        <p className="text-sm text-slate-400">
          Showing{" "}
          <span className="font-medium text-slate-200">
            {pageItems.length ? (safePage - 1) * PAGE_SIZE + 1 : 0}–
            {(safePage - 1) * PAGE_SIZE + pageItems.length}
          </span>{" "}
          of <span className="text-slate-200">{sorted.length}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {SORTS.map((s) => {
            const active = sort === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSort(s.id);
                  setPage(1);
                }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition sm:text-sm",
                  active
                    ? "border-amber-500/60 bg-amber-500/15 text-amber-200"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-amber-500/25 hover:text-white",
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        key={`${sort}-${safePage}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-6"
      >
        {pageItems.map((l) => (
          <CompactCard key={l.id} listing={l} />
        ))}
      </motion.div>

      {totalPages > 1 ? (
        <nav
          className="flex flex-wrap items-center justify-center gap-2 pt-2"
          aria-label="Pagination"
        >
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-xl border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition enabled:hover:border-amber-500/40 enabled:hover:text-white disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-xs text-slate-500">
            Page {safePage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-xl border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition enabled:hover:border-amber-500/40 enabled:hover:text-white disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      ) : null}
    </div>
  );
}

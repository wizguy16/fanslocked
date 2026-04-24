"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import type { CategoryDef } from "@/lib/categories";
import type { Listing } from "@/types/listing";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "@/components/icons/category-icon";
import { FeaturedDiscoveryCard } from "@/components/cards/featured-discovery-card";
import { DenseDiscoveryCard } from "@/components/cards/dense-discovery-card";
import { useDragScroll } from "@/components/home/use-drag-scroll";

const DENSE_GRID =
  "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10";

type Props = {
  category: CategoryDef;
  listings: Listing[];
  focusedSlug: string | null;
  onFocusToggle: (slug: string | null) => void;
};

export function CategoryDiscoveryBlock({
  category,
  listings,
  focusedSlug,
  onFocusToggle,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [, startTransition] = useTransition();
  const { ref: dragRef, dragScrollProps } = useDragScroll<HTMLDivElement>();

  const sorted = useMemo(
    () => [...listings].sort((a, b) => b.rating - a.rating),
    [listings],
  );
  const featured = sorted.slice(0, 4);
  const denseInitial = sorted.slice(4, 22);
  const denseExtra = expanded ? sorted.slice(22, 102) : [];

  const isDimmed = focusedSlug !== null && focusedSlug !== category.slug;
  const isFocused = focusedSlug === category.slug;

  return (
    <section
      className={cn(
        "mb-11 scroll-mt-20 transition-opacity duration-300 md:mb-14",
        isDimmed && "opacity-60",
        isFocused && "opacity-100",
      )}
      data-category-block={category.slug}
    >
      {/* Layer 1 */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() =>
            onFocusToggle(focusedSlug === category.slug ? null : category.slug)
          }
          className="group min-w-0 text-left text-base font-semibold tracking-tight text-white transition hover:text-[#FF7A00] md:text-lg"
        >
          <span
            className="mr-2 inline-flex text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]"
            aria-hidden
          >
            <CategoryIcon slug={category.slug} size={16} />
          </span>
          {category.label}
        </button>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() =>
              startTransition(() => setExpanded((e) => !e))
            }
            className="text-xs font-semibold text-[#FF7A00] transition hover:text-[#ff9333]"
          >
            {expanded ? "Show less" : "View all →"}
          </button>
          <Link
            href={`/categories/${category.slug}`}
            className="hidden text-xs font-medium text-slate-500 hover:text-slate-300 sm:inline"
          >
            Page
          </Link>
        </div>
      </div>

      {/* Layer 2 — featured strip */}
      <div
        ref={dragRef}
        {...dragScrollProps}
        className="scroll-momentum -mx-1 mb-4 flex cursor-grab gap-3 overflow-x-auto scroll-smooth px-1 pb-1 [scrollbar-width:thin] active:cursor-grabbing sm:snap-x"
      >
        {featured.map((l, i) => (
          <FeaturedDiscoveryCard key={l.id} listing={l} index={i} />
        ))}
      </div>

      {/* Layer 3 — dense grid */}
      <div className={cn(DENSE_GRID)}>
        {denseInitial.map((l, i) => (
          <DenseDiscoveryCard key={l.id} listing={l} index={i} />
        ))}
      </div>

      {expanded ? (
        <div className={cn("mt-3", DENSE_GRID)}>
          {denseExtra.map((l, i) => (
            <DenseDiscoveryCard
              key={l.id}
              listing={l}
              index={i + denseInitial.length}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CategoryDef } from "@/lib/categories";
import { CategoryIcon } from "@/components/icons/category-icon";

type Props = {
  categories: CategoryDef[];
  scrolled?: boolean;
};

/**
 * Secondary nav rail: each chip is a real route to `/categories/[slug]`.
 * No in-page state or scroll-jump — distinct from hero “Pick your lane”.
 */
export function FlCategoryStrip({
  categories,
  scrolled = false,
}: Props) {
  return (
    <div
      className={cn(
        "sticky top-16 z-40 border-b border-[rgba(255,255,255,0.04)] bg-[#0A0B10]/95 backdrop-blur-md transition-[box-shadow,background-color] duration-300 ease-out",
        scrolled &&
          "shadow-[0_12px_36px_-20px_rgba(0,0,0,0.75)] bg-[#0A0B10]/82",
      )}
    >
      <nav
        className="category-scroll scroll-touch flex min-h-11 items-center gap-1.5 px-6 py-2"
        aria-label="Browse all categories"
      >
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
            data-category-pill={c.slug}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.05)] bg-transparent px-2.5 py-1.5 text-left text-[11px] font-medium leading-tight text-[#7B8190] transition-colors duration-200",
              "hover:border-[rgba(255,255,255,0.1)] hover:text-[#A0A6B1]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7A00]",
              "md:px-3 md:text-xs",
            )}
          >
            <CategoryIcon slug={c.slug} size={14} />
            <span className="max-w-[118px] truncate sm:max-w-[150px] md:max-w-none">
              {c.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

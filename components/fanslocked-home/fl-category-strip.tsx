"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { CategoryDef } from "@/lib/categories";
import { CategoryIcon } from "@/components/icons/category-icon";

type Props = {
  categories: CategoryDef[];
  activeSlug: string;
  onSelect: (slug: string) => void;
  scrolled?: boolean;
};

export function FlCategoryStrip({
  categories,
  activeSlug,
  onSelect,
  scrolled = false,
}: Props) {
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const el = pillRefs.current[activeSlug];
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeSlug]);

  return (
    <div
      className={cn(
        "sticky top-16 z-40 border-b border-[rgba(255,255,255,0.04)] bg-[#0A0B10]/95 backdrop-blur-md transition-[box-shadow,background-color] duration-300 ease-out",
        scrolled &&
          "shadow-[0_12px_36px_-20px_rgba(0,0,0,0.75)] bg-[#0A0B10]/82",
      )}
    >
      <div
        className="category-scroll scroll-touch flex h-14 items-center px-6"
        role="tablist"
        aria-label="Categories"
      >
        {categories.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <button
              key={c.slug}
              ref={(node) => {
                pillRefs.current[c.slug] = node;
              }}
              type="button"
              role="tab"
              data-category-pill={c.slug}
              aria-selected={active}
              onClick={() => onSelect(c.slug)}
              className={cn("category-pill shrink-0")}
            >
              <CategoryIcon slug={c.slug} />
              <span className="max-w-[140px] truncate text-left sm:max-w-none">
                {c.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

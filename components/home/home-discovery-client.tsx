"use client";

import { useMemo, useState } from "react";
import { getCategoryBySlug } from "@/lib/categories";
import { getListingsByCategorySlug } from "@/lib/data";
import type { Listing } from "@/types/listing";
import { CategoryDiscoveryBlock } from "@/components/home/category-discovery-block";
import { SpinToPick } from "@/components/home/spin-to-pick";

/** Homepage discovery verticals — high-intent mix, capped for performance. */
const HOME_CATEGORY_SLUGS = [
  "live-cams",
  "free-tubes",
  "premium-porn",
  "vr",
  "best-overall",
  "amateur",
  "dating-hookup",
  "hd-4k",
] as const;

export function HomeDiscoveryClient() {
  const [focusedSlug, setFocusedSlug] = useState<string | null>(null);

  const blocks = useMemo(() => {
    const out: { cat: NonNullable<ReturnType<typeof getCategoryBySlug>>; items: Listing[] }[] = [];
    for (const slug of HOME_CATEGORY_SLUGS) {
      const cat = getCategoryBySlug(slug);
      if (!cat) continue;
      const items = getListingsByCategorySlug(slug);
      if (items.length === 0) continue;
      out.push({ cat, items });
    }
    return out;
  }, []);

  const spinPool = useMemo(() => {
    const m = new Map<string, Listing>();
    for (const b of blocks) {
      for (const l of b.items) m.set(l.id, l);
    }
    return Array.from(m.values());
  }, [blocks]);

  return (
    <div className="relative px-3 sm:px-4 md:px-6">
      <div className="mx-auto max-w-[1600px]">
        {blocks.map(({ cat, items }) => (
          <CategoryDiscoveryBlock
            key={cat.slug}
            category={cat}
            listings={items}
            focusedSlug={focusedSlug}
            onFocusToggle={setFocusedSlug}
          />
        ))}
      </div>
      <SpinToPick pool={spinPool} />
    </div>
  );
}

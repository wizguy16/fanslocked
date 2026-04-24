import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { CategoryIcon } from "@/components/icons/category-icon";
import { listings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "30+ editorial categories covering tubes, premium, VR, cams, niches, and safety-forward verticals.",
  alternates: { canonical: "/categories" },
};

function countInCategory(slug: string) {
  return listings.filter((l) => l.categorySlug === slug).length;
}

export default function CategoriesPage() {
  return (
    <div className="px-3 py-3 sm:px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-sm font-bold text-white">
          Categories · {CATEGORIES.length}
        </h1>
        <ul className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CATEGORIES.map((c) => {
            const n = countInCategory(c.slug);
            return (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="group flex h-[100px] max-h-[100px] flex-col justify-between overflow-hidden rounded-md border border-white/10 bg-white/[0.02] p-1.5 transition hover:border-amber-500/35"
                >
                  <div className="flex items-start justify-between gap-1">
                    <span
                      className="inline-flex text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                      aria-hidden
                    >
                      <CategoryIcon slug={c.slug} size={16} />
                    </span>
                    <span className="rounded bg-white/10 px-1 py-px text-[8px] font-semibold text-slate-400">
                      {n}
                    </span>
                  </div>
                  <span className="line-clamp-2 text-left text-[10px] font-semibold leading-tight text-slate-200">
                    {c.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

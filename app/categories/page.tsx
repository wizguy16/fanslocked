import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
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
    <div className="px-3 py-8 sm:px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
          All categories
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Every vertical is stocked with {Math.floor(
            listings.length / CATEGORIES.length,
          )}
          + hand-ranked listings for predictable affiliate testing and reader
          trust.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const n = countInCategory(c.slug);
            return (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-amber-500/35 hover:shadow-[0_0_36px_-14px_rgba(245,158,11,0.3)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-2xl" aria-hidden>
                      {c.icon}
                    </span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      {n} sites
                    </span>
                  </div>
                  <span className="mt-3 font-display text-base font-semibold text-white">
                    {c.label}
                  </span>
                  <span className="mt-1 line-clamp-2 text-xs text-slate-500">
                    {c.description}
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

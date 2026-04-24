import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { listings } from "@/lib/data";
import { Reveal } from "@/components/motion/reveal";

function countFor(slug: string) {
  return listings.filter((l) => l.categorySlug === slug).length;
}

export function CategoryGrid() {
  return (
    <section
      className="px-3 py-8 sm:px-4 md:px-6"
      aria-labelledby="category-grid-heading"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="category-grid-heading"
                className="font-display text-xl font-bold text-white sm:text-2xl"
              >
                Browse by category
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                {CATEGORIES.length} curated verticals — each packed with editor-ranked
                destinations and transparent affiliate disclosures.
              </p>
            </div>
            <Link
              href="/categories"
              className="text-sm font-medium text-amber-400/90 hover:text-amber-300"
            >
              View all →
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 0.02, 0.24)}>
              <Link
                href={`/categories/${c.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-amber-500/35 hover:shadow-[0_0_40px_-12px_rgba(245,158,11,0.35)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl" aria-hidden>
                    {c.icon}
                  </span>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    {countFor(c.slug)} sites
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold text-white group-hover:text-amber-100">
                  {c.label}
                </h3>
                <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-400">
                  {c.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

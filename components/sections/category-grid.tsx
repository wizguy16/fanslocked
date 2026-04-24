import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { CategoryIcon } from "@/components/icons/category-icon";
import { listings } from "@/lib/data";

function countFor(slug: string) {
  return listings.filter((l) => l.categorySlug === slug).length;
}

export function CategoryGrid() {
  return (
    <section
      className="mb-11 px-3 py-2 sm:px-4 md:mb-14 md:px-6"
      aria-labelledby="category-grid-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h2
            id="category-grid-heading"
            className="text-[11px] font-semibold uppercase tracking-wide text-slate-500"
          >
            Categories
          </h2>
          <Link
            href="/categories"
            className="text-[10px] font-medium text-[#FF7A00]/90 hover:text-[#ff9333]"
          >
            All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="group flex h-[100px] max-h-[100px] flex-col justify-between overflow-hidden rounded-md border border-white/[0.08] bg-[#12131a] p-1.5 transition hover:border-[#FF7A00]/35 hover:bg-[#16171f]"
            >
              <div className="flex items-start justify-between gap-1">
                <span
                  className="inline-flex text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                  aria-hidden
                >
                  <CategoryIcon slug={c.slug} size={16} />
                </span>
                <span className="shrink-0 rounded bg-white/10 px-1 py-px text-[8px] font-semibold text-slate-400">
                  {countFor(c.slug)}
                </span>
              </div>
              <span className="line-clamp-2 text-left text-[10px] font-semibold leading-tight text-slate-200">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

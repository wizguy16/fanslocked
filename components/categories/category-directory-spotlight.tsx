import Image from "next/image";
import Link from "next/link";
import type { CategoryDef } from "@/lib/categories";
import { CategoryIcon } from "@/components/icons/category-icon";
import { getListingsByCategorySlug } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CategoryDirectoryWidget } from "@/components/categories/category-directory-widget";

function tagsForCategory(slug: string): string[] {
  const listings = getListingsByCategorySlug(slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  const set = new Set<string>();
  for (const l of listings) {
    for (const t of l.tags.slice(0, 2)) {
      if (set.size >= 3) break;
      set.add(t);
    }
    if (set.size >= 3) break;
  }
  return Array.from(set).slice(0, 3);
}

/**
 * Compact directory card — always stacked (image on top) so narrow grid columns stay
 * readable; horizontal split was unusable at lg:grid-cols-5.
 */
export function CategoryDirectorySpotlight({
  category,
  listingCount,
}: {
  category: CategoryDef;
  listingCount: number;
}) {
  const href = `/categories/${category.slug}`;
  const eyebrow =
    category.megaMenuShortLabel ?? category.label.split(/\s+/)[0] ?? category.label;
  const tags = tagsForCategory(category.slug);

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border border-white/[0.09] bg-gradient-to-b from-slate-900/90 to-[#0a0b10]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:border-sky-500/25",
      )}
    >
      <Link
        href={href}
        className="relative block h-[76px] w-full shrink-0 sm:h-[84px]"
      >
        <Image
          src={category.coverImage}
          alt={category.label}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 20vw"
        />
        <span className="absolute left-2 top-2 inline-flex rounded-full border border-white/12 bg-black/60 px-1.5 py-px text-[8px] font-bold uppercase tracking-wide text-slate-100 backdrop-blur-sm">
          {listingCount} sites
        </span>
      </Link>

      <div className="flex min-h-0 flex-1 flex-col p-2.5 pt-2">
        <div className="flex items-center justify-between gap-1.5">
          <span className="min-w-0 truncate rounded-full border border-sky-500/20 bg-sky-500/[0.06] px-2 py-px text-[8px] font-semibold uppercase tracking-wide text-sky-100/85">
            {eyebrow}
          </span>
          <CategoryIcon slug={category.slug} size={14} className="shrink-0 text-slate-500" />
        </div>

        <Link href={href} className="group mt-1.5 no-underline">
          <h2 className="line-clamp-2 text-[12px] font-bold leading-[1.25] tracking-tight text-white group-hover:text-sky-100 sm:text-[13px]">
            {category.label}
          </h2>
        </Link>

        <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-slate-400">
          {category.description}
        </p>

        {tags.length > 0 ? (
          <ul
            className="mt-1.5 flex flex-wrap gap-1"
            aria-label="Popular tags"
          >
            {tags.map((t) => (
              <li key={t}>
                <span className="inline-block max-w-[7rem] truncate rounded-full border border-white/10 px-1.5 py-px text-[9px] text-slate-400">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-2 flex flex-wrap gap-1.5">
          <Link
            href={href}
            className="inline-flex flex-1 items-center justify-center rounded-md border border-white/14 px-2 py-1 text-[10px] font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/[0.04] sm:flex-none"
          >
            View
          </Link>
          <Link
            href={href}
            className="inline-flex flex-1 items-center justify-center rounded-md bg-sky-600/75 px-2 py-1 text-[10px] font-semibold text-white transition hover:bg-sky-500 sm:flex-none"
          >
            Browse
          </Link>
        </div>

        <CategoryDirectoryWidget slug={category.slug} />
      </div>
    </article>
  );
}

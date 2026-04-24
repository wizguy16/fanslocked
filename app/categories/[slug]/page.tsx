import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getListingsByCategorySlug,
} from "@/lib/data";
import { CATEGORIES } from "@/lib/categories";
import { CategoryListings } from "@/components/categories/category-listings";
import { getSiteUrl } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

function CategoryItemListJsonLd({
  slug,
  label,
}: {
  slug: string;
  label: string;
}) {
  const items = getListingsByCategorySlug(slug).slice(0, 12);
  const base = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${label} — The Porn Dude 2.0`,
    numberOfItems: getListingsByCategorySlug(slug).length,
    itemListElement: items.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${base}/site/${l.slug}`,
      name: l.name,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = getCategoryBySlug(params.slug);
  if (!cat)
    return { title: "Category" };
  return {
    title: cat.label,
    description: `${cat.description} Browse ${getListingsByCategorySlug(params.slug).length}+ ranked listings.`,
    alternates: { canonical: `/categories/${params.slug}` },
  };
}

export default function CategoryPage({ params }: Props) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) notFound();
  const items = getListingsByCategorySlug(params.slug);

  return (
    <>
      <CategoryItemListJsonLd slug={cat.slug} label={cat.label} />
      <div className="px-3 py-8 sm:px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <Link href="/categories" className="hover:text-amber-400">
              Categories
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-white">{cat.label}</span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-3xl" aria-hidden>
                {cat.icon}
              </p>
              <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                {cat.label}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                {cat.description}
              </p>
            </div>
            <p className="text-sm text-slate-500">
              {items.length} listing{items.length === 1 ? "" : "s"}
            </p>
          </div>
          <CategoryListings items={items} />
        </div>
      </div>
    </>
  );
}

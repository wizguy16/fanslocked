import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getListingsByCategorySlug,
} from "@/lib/data";
import { CATEGORIES } from "@/lib/categories";
import { CategoryExploreClient } from "@/components/categories/category-explore-client";
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
    name: `${label} — FansLocked`,
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
      <CategoryExploreClient cat={cat} categories={CATEGORIES} items={items} />
    </>
  );
}

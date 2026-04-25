import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  getCategoryBySlug,
  getListingsByCategorySlug,
} from "@/lib/data";
import { getSiteUrl } from "@/lib/site";
import { CategoryPrestigeShell } from "@/components/category/category-prestige-shell";

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

function heroTitle(label: string): string {
  return /^best\s/i.test(label) ? label : `Best ${label}`;
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return { title: "Category" };
  const year = new Date().getFullYear();
  const count = getListingsByCategorySlug(params.slug).length;
  const h1 = heroTitle(cat.label);
  return {
    title: `${h1} (${year})`,
    description: `${cat.description} Browse ${count}+ ranked picks with outbound-safe links.`,
    alternates: { canonical: `/category/${params.slug}` },
  };
}

export default function CategoryLandingPage({ params }: Props) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) notFound();

  return (
    <>
      <CategoryItemListJsonLd slug={cat.slug} label={cat.label} />
      <CategoryPrestigeShell cat={cat} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryData } from "@/lib/get-category-data";
import { getSiteUrl } from "@/lib/site";
import type { Listing } from "@/types/listing";
import { CategoryPrestigeShell } from "@/components/category/category-prestige-shell";

export { generateStaticParams } from "./generateStaticParams";

type Props = { params: { slug: string } };

function CategoryItemListJsonLd({
  label,
  listings,
}: {
  label: string;
  listings: Listing[];
}) {
  const items = listings.slice(0, 12);
  const base = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${label} — FansLocked`,
    numberOfItems: listings.length,
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
  const data = getCategoryData(params.slug);
  if (!data) return { title: "Category" };

  if (params.slug === "ai-generated") {
    return {
      title:
        "Best AI Porn Sites (2026) – Top AI Chat, Image & Companion Platforms",
      description:
        "Explore the best AI porn sites in 2026, including AI girlfriend chat platforms, image generators, and custom fantasy tools. Compare top AI adult platforms for chat, visuals, and personalized experiences.",
      keywords: [
        "ai porn sites",
        "ai girlfriend apps",
        "ai porn generator",
        "ai sex chat platforms",
        "ai adult content tools",
        "best ai porn sites 2026",
      ],
      alternates: { canonical: `/category/${params.slug}` },
    };
  }

  if (params.slug === "sex-chat") {
    const year = new Date().getFullYear();
    const count = data.listings.length;
    return {
      title: `Best Sex Chat & Sexting Platforms (${year})`,
      description: `Compare the best sex chat and sexting apps in ${year}: pay-per-message platforms, private adult messaging, and high-engagement chat picks. ${count}+ ranked sites with outbound-safe links.`,
      keywords: [
        "sex chat sites",
        "sexting apps",
        "adult chat platforms",
        "pay per message chat",
        "private sexting",
        `best sex chat ${year}`,
      ],
      alternates: { canonical: `/category/${params.slug}` },
    };
  }

  const year = new Date().getFullYear();
  const count = data.listings.length;
  const h1 = heroTitle(data.category.label);
  return {
    title: `${h1} (${year})`,
    description: `${data.category.description} Browse ${count}+ ranked picks with outbound-safe links.`,
    alternates: { canonical: `/category/${params.slug}` },
  };
}

export default function CategoryLandingPage({ params }: Props) {
  const data = getCategoryData(params.slug);
  if (!data) notFound();

  const { category, listings, editorial } = data;

  return (
    <>
      <CategoryItemListJsonLd
        label={category.label}
        listings={listings}
      />
      <CategoryPrestigeShell
        category={category}
        listings={listings}
        editorial={editorial}
      />
    </>
  );
}

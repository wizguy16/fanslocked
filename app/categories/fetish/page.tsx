import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryData } from "@/lib/get-category-data";
import {
  getFetishFeaturedListings,
  groupFetishListings,
} from "@/lib/fetish-page-groupings";
import { getFetishHubSectionCopy } from "@/lib/fetish-hub-routes";
import { MainHeader } from "@/components/layout/MainHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedPicksRow } from "@/components/sections/FeaturedPicksRow";
import { CategorySection } from "@/components/sections/CategorySection";
import { TrustSection } from "@/components/sections/TrustSection";
import { CTASection } from "@/components/sections/CTASection";
import { FetishExploreCategoriesIntro } from "@/components/sections/FetishExploreCategoriesIntro";
import { FetishSeoBlocks } from "@/components/sections/FetishSeoBlocks";

const CATEGORY_SLUG = "fetish-bdsm";

const HERO_SUBTITLE =
  "Explore the best fetish & BDSM sites in 2026, including femdom, bondage, hypno, and niche fetish platforms.\n\nThis curated hub helps you quickly find verified fetish content across categories — from high-production studios to community-driven platforms. Use the sections below to explore specific fetishes, compare platforms, and discover what fits your interests.";

function sliceColumnLayout(title: string): "three" | "five" {
  return title.toLowerCase().includes("bondage") ? "five" : "three";
}

export function generateMetadata(): Metadata {
  const data = getCategoryData(CATEGORY_SLUG);
  const year = new Date().getFullYear();
  if (!data) {
    return { title: `Best Fetish & BDSM Sites (${year})` };
  }
  const titleBase =
    data.editorial?.heroTitle ?? `Best ${data.category.label} Sites (${year})`;
  return {
    title: titleBase,
    description: HERO_SUBTITLE.replace(/\n\n/g, " ").replace(/\n/g, " ").trim(),
    alternates: { canonical: "/categories/fetish" },
  };
}

export default function FetishLandingPage() {
  const data = getCategoryData(CATEGORY_SLUG);
  if (!data) notFound();

  const year = new Date().getFullYear();
  const featured = getFetishFeaturedListings(data.listings, 4);
  const featuredSlugs = new Set(featured.map((l) => l.slug));
  const slices = groupFetishListings(data.listings, featuredSlugs);

  const heroTitle =
    data.editorial?.heroTitle ?? `Best ${data.category.label} (${year})`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] antialiased">
      <MainHeader />
      <HeroSection title={heroTitle} subtitle={HERO_SUBTITLE} year={year} />
      <FetishExploreCategoriesIntro />
      <FeaturedPicksRow items={featured} />

      <section
        id="fetish-browse-more"
        className="border-b border-white/[0.06] bg-[#0a0a0a] px-4 pb-4 pt-14 md:px-8 md:pt-16 lg:pt-20"
        aria-label="Browse more fetish sites"
      >
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-12 text-left text-xl font-bold tracking-[-0.02em] text-white md:mb-14 md:text-2xl lg:mb-16">
            Browse more fetish sites
          </h2>
          {slices.map((slice, i) => (
            <CategorySection
              key={slice.title}
              title={slice.title}
              items={slice.items}
              headingId={`fetish-slice-h-${i}`}
              columnLayout={sliceColumnLayout(slice.title)}
              subsection
              hub={getFetishHubSectionCopy(slice.title, year)}
            />
          ))}
        </div>
      </section>

      <FetishSeoBlocks />
      <TrustSection />
      <CTASection
        body="Browse the top fetish platforms above to find what fits your interests, then explore deeper category rankings to compare features, content styles, and user experience before choosing a site."
        buttonText="Explore top fetish sites"
        buttonHref="/categories/fetish#fetish-browse-more"
        buttonVariant="secondary"
      />
    </div>
  );
}

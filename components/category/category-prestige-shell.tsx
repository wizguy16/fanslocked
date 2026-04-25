import Link from "next/link";
import type { CategoryDef } from "@/lib/categories";
import { CategoryFinalCta } from "@/components/category/sections/category-final-cta";
import { CategoryPrestigeListings } from "@/components/category/category-prestige-listings";
import { CategorySeoBlock } from "@/components/category/sections/category-seo-block";
import { getCategoryPrestigeEditorial } from "@/lib/category-prestige-editorial";
import { getGuidePostForCategory } from "@/lib/blog-posts";
import { getListingsByCategorySlug } from "@/lib/data";

const QUICK = 4;
const SHOWCASE = 5;
const LISTINGS_CAP = 25;

function heroBlurb(description: string): string {
  const t = description.trim();
  if (!t) return "";
  const first = t.indexOf(". ");
  if (first === -1) {
    return t.length <= 280 ? t : `${t.slice(0, 277).replace(/\s+\S*$/, "")}…`;
  }
  const second = t.indexOf(". ", first + 2);
  if (second === -1) return t.slice(0, first + 1);
  const third = t.indexOf(". ", second + 2);
  if (third === -1) return t.slice(0, second + 1);
  return t.slice(0, third + 1);
}

function heroTitle(label: string): string {
  return /^best\s/i.test(label) ? label : `Best ${label}`;
}

/**
 * Category prestige page: width bands (1100 copy / 1400 listings / 1100 SEO+CTA).
 * Sections are composed in `CategoryPrestigeListings` + `sections/*`.
 */
export function CategoryPrestigeShell({ cat }: { cat: CategoryDef }) {
  const allInCat = getListingsByCategorySlug(cat.slug);
  const sorted = [...allInCat].sort((a, b) => b.rating - a.rating);
  const capped = sorted.slice(0, LISTINGS_CAP);
  const quick = capped.slice(0, QUICK);
  const showcase = capped.slice(QUICK, QUICK + SHOWCASE);
  const rising = capped.slice(QUICK + SHOWCASE);
  const year = new Date().getFullYear();
  const editorial = getCategoryPrestigeEditorial(cat.slug, year);
  const guidePostRaw = getGuidePostForCategory(cat.slug);
  const guidePost = guidePostRaw
    ? { slug: guidePostRaw.slug, title: guidePostRaw.title }
    : null;
  const defaultH1 = heroTitle(cat.label);

  return (
    <div className="min-h-[100dvh] bg-[#121318] text-[#e3e1e9]">
      <div className="py-10 pb-24 md:py-16">
        {/* Header band — max-w-[1100px] */}
        <div className="mx-auto max-w-[1100px] px-6">
          <nav
            className="mb-10 flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-500"
            aria-label="Breadcrumb"
          >
            <Link href="/categories" className="transition hover:text-[#ffb68d]">
              Categories
            </Link>
            <span className="text-zinc-700" aria-hidden>
              /
            </span>
            <span className="text-zinc-400">{cat.label}</span>
            <span className="text-zinc-600">· {allInCat.length}</span>
          </nav>

          <header className="mb-12 text-center md:mb-16">
            <h1 className="text-balance font-display text-3xl font-bold leading-tight tracking-tight text-[#e3e1e9] md:text-4xl md:leading-[1.2] md:tracking-[-0.02em]">
              {editorial ? (
                editorial.heroTitle
              ) : (
                <>
                  {defaultH1}{" "}
                  <span className="text-[#a48c7f]">({year})</span>
                </>
              )}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#ddc1b3]">
              {editorial?.heroDescription ?? heroBlurb(cat.description)}
            </p>
          </header>
        </div>

        {/* Listings band — max-w-[1400px] */}
        <div className="mx-auto mt-8 w-full max-w-[1400px] px-6 md:mt-10">
          <div id="category-listings" className="scroll-mt-28">
            <CategoryPrestigeListings
              quick={quick}
              showcase={showcase}
              rising={rising}
              listingCopy={
                editorial
                  ? {
                      showcaseBlurbs: editorial.showcaseBlurbs,
                      risingBlurbs: editorial.risingBlurbs,
                    }
                  : null
              }
            />
          </div>
        </div>

        {/* SEO + CTA band — max-w-[1100px] */}
        <div className="mx-auto max-w-[1100px] px-6">
          <CategorySeoBlock
            categoryLabel={cat.label}
            editorial={editorial}
            guidePost={guidePost}
          />
          <CategoryFinalCta editorial={editorial} />
        </div>
      </div>
    </div>
  );
}

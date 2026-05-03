import Link from "next/link";
import type { CategoryDef } from "@/lib/categories";
import { getHeroCTA } from "@/lib/get-hero-cta";
import { CategoryFinalCta } from "@/components/category/sections/category-final-cta";
import { CategoryPrestigeListings } from "@/components/category/category-prestige-listings";
import { CategorySeoBlock } from "@/components/category/sections/category-seo-block";
import type { CategoryPrestigeEditorial } from "@/lib/category-prestige-editorial";
import { BTN_SECONDARY_OUTLINE } from "@/components/category/sections/category-prestige-styles";
import { buildGamingPrestigeSlices } from "@/lib/gaming-prestige-slices";
import { buildHookupPrestigeSlices } from "@/lib/hookup-prestige-slices";
import { buildSexChatPrestigeSlices } from "@/lib/sex-chat-prestige-slices";
import { getGuidePostForCategory } from "@/lib/blog-posts";
import { selectCategoryTopPicks } from "@/lib/category-prestige-top-picks";
import type { Listing } from "@/types/listing";
import { cn } from "@/lib/utils";

const QUICK = 4;
const SHOWCASE = 5;
/** Hookup and other large verticals need >25 curated rows on prestige pages. */
const LISTINGS_CAP = 30;

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
 * Listings are split here: 4 quick picks, 5 top picks, remainder in the grid (capped at 25).
 */
export function CategoryPrestigeShell({
  category,
  listings,
  editorial,
}: {
  category: CategoryDef;
  listings: Listing[];
  editorial: CategoryPrestigeEditorial | null;
}) {
  const sorted = [...listings].sort((a, b) => b.rating - a.rating);
  const capped = sorted.slice(0, LISTINGS_CAP);
  const slices =
    category.slug === "hookup"
      ? buildHookupPrestigeSlices(capped)
      : category.slug === "sex-chat"
        ? buildSexChatPrestigeSlices(capped)
        : category.slug === "gaming"
          ? buildGamingPrestigeSlices(capped)
          : (() => {
              const quick = capped.slice(0, QUICK);
              const showcase =
                selectCategoryTopPicks(capped, category.slug, SHOWCASE) ??
                capped.slice(QUICK, QUICK + SHOWCASE);
              const used = new Set<string>();
              for (const l of quick) used.add(l.id);
              for (const l of showcase) used.add(l.id);
              const rising = capped.filter((l) => !used.has(l.id));
              return { quick, showcase, rising };
            })();
  const { quick, showcase, rising } = slices;
  const year = new Date().getFullYear();
  const guidePost = getGuidePostForCategory(category.slug) ?? null;
  const defaultH1 = heroTitle(category.label);
  const heroCta = getHeroCTA(`/categories/${category.slug}`, {
    slug: category.slug,
  });

  return (
    <div className="min-h-[100dvh] bg-[#1A1A1A] text-[#e3e1e9]">
      <div className="py-10 pb-24 md:py-16">
        {/* Header band — max-w-[1100px] */}
        <div className="mx-auto max-w-[1100px] px-6">
          <nav
            className="mb-10 flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-500"
            aria-label="Breadcrumb"
          >
            <Link href="/categories" className="transition hover:text-primary">
              Categories
            </Link>
            <span className="text-zinc-700" aria-hidden>
              /
            </span>
            <span className="text-zinc-400">{category.label}</span>
            <span className="text-zinc-600">· {listings.length}</span>
          </nav>

          {category.slug === "fetish-bdsm" ? (
            <div className="mb-8 rounded-none border border-white/[0.08] bg-[#292929] px-4 py-3 text-left md:mb-10">
              <p className="text-sm font-medium text-[#e3e1e9]">
                Looking for more specific fetish categories?
              </p>
              <p className="mt-1">
                <Link
                  href="/categories/fetish"
                  className="text-sm font-semibold text-primary underline-offset-2 transition hover:text-primary/90 hover:underline"
                >
                  Explore our full fetish hub →
                </Link>
              </p>
            </div>
          ) : null}

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
            <div className="mx-auto mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-neutral-400">
              {editorial?.heroParagraphs?.length ? (
                editorial.heroParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <p>{editorial?.heroDescription ?? heroBlurb(category.description)}</p>
              )}
            </div>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <a
                href={heroCta.primaryHref}
                className="rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
              >
                {heroCta.primary}
              </a>
              <Link
                href={heroCta.secondaryHref}
                className={cn(BTN_SECONDARY_OUTLINE, "px-6 py-3 text-sm uppercase tracking-wide")}
              >
                {heroCta.secondary}
              </Link>
            </div>
          </header>
        </div>

        {/* Listings band — max-w-[1400px] */}
        <div className="mx-auto mt-8 w-full max-w-[1400px] px-6 md:mt-10">
          <div id="category-listings" className="scroll-mt-28">
            <CategoryPrestigeListings
              categorySlug={category.slug}
              quick={quick}
              showcase={showcase}
              rising={rising}
              moreSectionHeading={editorial?.moreListingSectionHeading ?? null}
              moreSectionLimit={editorial?.moreListingGridLimit}
              listingCopy={
                editorial
                  ? {
                      quickBlurbs: editorial.quickBlurbs,
                      showcaseBlurbs: editorial.showcaseBlurbs,
                      risingBlurbs: editorial.risingBlurbs,
                    }
                  : null
              }
            />
          </div>
          <div className="mt-10 flex justify-center md:mt-12">
            <a
              href="#category-listings"
              className={cn(BTN_SECONDARY_OUTLINE, "px-6 py-3 text-sm font-semibold uppercase tracking-wide")}
            >
              Explore More Top Platforms
            </a>
          </div>
        </div>

        {/* SEO + CTA band — max-w-[1100px] */}
        <div className="mx-auto max-w-[1100px] px-6">
          <CategorySeoBlock
            categoryLabel={category.label}
            editorial={editorial}
            guidePost={guidePost}
          />
          <CategoryFinalCta editorial={editorial} />
        </div>
      </div>
    </div>
  );
}

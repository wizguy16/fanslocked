import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { notFound } from "next/navigation";
import { getListingBySlug } from "@/lib/data";
import type { Listing } from "@/types/listing";
import {
  FEMDOM_FINAL_CTA,
  FEMDOM_FREE_PREMIUM,
  FEMDOM_HERO_TRUST,
  FEMDOM_MID_INTRO,
  FEMDOM_MID_TIER_SLUGS,
  FEMDOM_RANKING_HERO,
  FEMDOM_SEO_WHAT_MAKES,
  FEMDOM_TOP_PICKS_COMPARE,
  FEMDOM_TOP_PICK_COPY,
  FEMDOM_TOP_PICK_SLUGS,
  FEMDOM_WHO_FOR,
} from "@/lib/femdom-ranking-content";
import { MainHeader } from "@/components/layout/MainHeader";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { SiteCard } from "@/components/ui/SiteCard";
import { CTASection } from "@/components/sections/CTASection";
import { FemdomRankingTopPick } from "@/components/fetish/femdom-ranking-top-pick";
import { FemdomRankingProseSection } from "@/components/fetish/femdom-ranking-prose";

const DESC_PRIMARY =
  "Explore the best femdom sites in 2026, including domination porn sites, POV control, humiliation, and female-led platforms. Rankings for femdom porn sites, domination sites, and top femdom content.";

export const metadata: Metadata = {
  title: FEMDOM_RANKING_HERO.h1,
  description: DESC_PRIMARY,
  alternates: { canonical: "/fetish/femdom-sites" },
  keywords: [
    "best femdom sites",
    "femdom porn sites",
    "domination sites",
    "domination porn sites",
    "female domination platforms",
    "femdom videos",
    "femdom content",
  ],
};

function mustListing(slug: string): Listing {
  const l = getListingBySlug(slug);
  if (!l) notFound();
  return l;
}

const internalLinkClass =
  "font-medium text-[#8c8c8c] underline-offset-2 transition hover:text-[#c4c4c4] hover:underline";

export default function FemdomRankingPage() {
  const topListings = FEMDOM_TOP_PICK_SLUGS.map((slug) => ({
    listing: mustListing(slug),
    copy: FEMDOM_TOP_PICK_COPY[slug],
  }));

  const midListings = FEMDOM_MID_TIER_SLUGS.map((slug) => mustListing(slug));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] antialiased">
      <MainHeader />
      <Breadcrumbs containerClassName="max-w-[1280px] px-4 md:px-8" />
      <main>
        <section
          id="femdom-hero"
          className="border-b border-white/[0.06] bg-[#0a0a0a] px-4 pb-14 pt-10 md:px-8 md:pb-16 md:pt-12"
        >
          <div className="mx-auto max-w-[1280px]">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#a3a3a3]">
              <Link
                href="/categories/fetish"
                className="text-[#737373] transition hover:text-[#c4c4c4] hover:underline"
              >
                Fetish hub
              </Link>
              <span className="text-[#525252]"> / </span>
              <span className="text-[#5c5c5c]">Femdom rankings</span>
            </p>
            <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white md:text-4xl lg:text-[2.5rem]">
              {FEMDOM_RANKING_HERO.h1}
            </h1>
            <div className="mx-auto mt-8 max-w-3xl space-y-4 text-left text-[15px] leading-relaxed text-[#a3a3a3] md:text-base">
              {FEMDOM_RANKING_HERO.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-8 flex flex-col gap-3 text-[13px] text-[#8a8a8a] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 md:text-sm">
              {FEMDOM_HERO_TRUST.map((label) => (
                <li key={label} className="flex items-center gap-2">
                  <Check
                    className="h-4 w-4 shrink-0 text-[#4ade80]"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="femdom-top-picks"
          aria-label="Top femdom site picks"
          className="scroll-mt-24 border-b border-white/[0.06] bg-[#0a0a0a] px-4 py-12 md:px-8 md:py-14"
        >
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-10 text-xl font-bold tracking-[-0.02em] text-white md:text-2xl">
              Top picks
            </h2>
            <div className="border-t border-white/[0.06]">
              {topListings.map(({ listing, copy }) => (
                <FemdomRankingTopPick
                  key={listing.id}
                  listing={listing}
                  sectionId={copy.sectionId}
                  body={copy.body}
                  bestFor={copy.bestFor}
                />
              ))}
            </div>
            <p className="mx-auto mt-10 max-w-3xl border-t border-white/[0.06] pt-10 text-[15px] leading-relaxed text-[#a3a3a3] md:text-base">
              {FEMDOM_TOP_PICKS_COMPARE}
            </p>
          </div>
        </section>

        <section
          id="femdom-mid"
          className="border-b border-white/[0.06] bg-[#0a0a0a] px-4 py-12 md:px-8 md:py-14"
        >
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-4 text-xl font-bold tracking-[-0.02em] text-white md:text-2xl">
              More femdom platforms
            </h2>
            <p className="mb-10 max-w-3xl text-[15px] leading-relaxed text-[#a3a3a3] md:text-base">
              {FEMDOM_MID_INTRO}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {midListings.map((listing) => (
                <SiteCard key={listing.id} listing={listing} variant="compact" />
              ))}
            </div>
          </div>
        </section>

        <FemdomRankingProseSection
          id="femdom-seo"
          title={FEMDOM_SEO_WHAT_MAKES.title}
          body={FEMDOM_SEO_WHAT_MAKES.body}
        />
        <FemdomRankingProseSection
          id="femdom-free-premium"
          title={FEMDOM_FREE_PREMIUM.title}
          body={FEMDOM_FREE_PREMIUM.body}
        />
        <FemdomRankingProseSection
          id="femdom-who"
          title={FEMDOM_WHO_FOR.title}
          body={FEMDOM_WHO_FOR.body}
        />

        <section
          id="femdom-links"
          className="border-b border-white/[0.06] bg-[#0a0a0a] px-4 py-12 md:px-8 md:py-14"
        >
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-5 text-xl font-bold tracking-[-0.02em] text-white md:text-2xl">
              Related fetish rankings
            </h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-[#a3a3a3] md:text-base">
              Looking for related fetish categories? Explore our full rankings for{" "}
              <Link href="/fetish/bondage-sites" className={internalLinkClass}>
                bondage sites
              </Link>
              ,{" "}
              <Link href="/fetish/extreme-bdsm-sites" className={internalLinkClass}>
                extreme BDSM platforms
              </Link>
              ,{" "}
              <Link href="/fetish/hypno-sites" className={internalLinkClass}>
                hypno fetish content
              </Link>
              , and{" "}
              <Link href="/fetish/feet-fetish-sites" className={internalLinkClass}>
                feet-focused fetish sites
              </Link>{" "}
              to discover more niche experiences.
            </p>
          </div>
        </section>

        <section id="femdom-cta" className="bg-[#0a0a0a]">
          <CTASection
            body={FEMDOM_FINAL_CTA.body}
            buttonText={FEMDOM_FINAL_CTA.button}
            buttonHref="/fetish/femdom-sites#femdom-top-picks"
            buttonVariant="primary"
          />
        </section>
      </main>
    </div>
  );
}

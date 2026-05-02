import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  getListingBySlug,
  getSimilar,
  listings,
} from "@/lib/data";
import { getSiteUrl } from "@/lib/site";
import { AffiliateLink } from "@/components/ui/affiliate-link";
import { clampTagline, cn } from "@/lib/utils";
import { getHeroCTA } from "@/lib/get-hero-cta";
import { ListingLogo } from "@/components/shared/listing-logo";
import { getUserSnapshotContent } from "@/lib/listing-user-snapshot";
import { resolveAffiliateDestination } from "@/lib/get-affiliate-link";
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Star,
  StarHalf,
  XCircle,
} from "lucide-react";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const listing = getListingBySlug(params.slug);
  if (!listing) return { title: "Listing" };
  return {
    title: `${listing.name} review`,
    description: clampTagline(listing.description, 40),
    alternates: {
      canonical: `/site/${listing.slug}`,
    },
    openGraph: {
      title: `${listing.name} · FansLocked`,
      description: clampTagline(listing.description, 40),
    },
  };
}

function SiteJsonLd({
  listing,
}: {
  listing: NonNullable<ReturnType<typeof getListingBySlug>>;
}) {
  const base = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: listing.name,
    url: listing.website_url,
    description: clampTagline(listing.review, 240),
    publisher: {
      "@type": "Organization",
      name: "FansLocked",
      url: base,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function StarRow({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(0, rating));
  const cells: ("full" | "half" | "empty")[] = [];
  let remaining = clamped;
  for (let i = 0; i < 5; i++) {
    if (remaining >= 1) {
      cells.push("full");
      remaining -= 1;
    } else if (remaining >= 0.5) {
      cells.push("half");
      remaining = 0;
    } else {
      cells.push("empty");
    }
  }
  return (
    <div className="flex items-center gap-0.5">
      {cells.map((kind, i) =>
        kind === "full" ? (
          <Star
            key={i}
            className="h-[18px] w-[18px] fill-[#ff2d55] text-[#ff2d55]"
            aria-hidden
          />
        ) : kind === "half" ? (
          <StarHalf
            key={i}
            className="h-[18px] w-[18px] fill-[#ff2d55] text-[#ff2d55]"
            aria-hidden
          />
        ) : (
          <Star
            key={i}
            className="h-[18px] w-[18px] text-[#98989f]"
            aria-hidden
          />
        ),
      )}
      <span className="ml-2 font-display text-sm font-bold text-[#e2e2e9]">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function SnapshotBullets({
  title,
  items,
  bulletClass,
}: {
  title: string;
  items: string[];
  bulletClass: string;
}) {
  return (
    <div className="mt-8">
      <h4 className="font-display text-lg font-semibold text-white">{title}</h4>
      <ul className="mt-3 space-y-2 font-sans text-base leading-relaxed text-[#e2e2e9]/80">
        {items.map((line) => (
          <li key={line} className="flex gap-2">
            <span className={cn("mt-2 h-1 w-1 shrink-0 rounded-full", bulletClass)} />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SitePage({ params }: Props) {
  const listing = getListingBySlug(params.slug);
  if (!listing) notFound();
  const cookieHeader = headers().get("cookie");
  const similar = getSimilar(listing, 12);
  const heroCta = getHeroCTA(`/site/${listing.slug}`, {
    siteUrl: listing.affiliate_url,
  });
  const snapshot = getUserSnapshotContent(listing);
  const reviewParagraphs = listing.review.split(/\n\n/).filter(Boolean);
  const similarShowcase = similar.slice(0, 3);
  const restSimilar = similar.slice(3);

  return (
    <>
      <SiteJsonLd listing={listing} />
      <article className="font-sans antialiased">
        <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-8 md:px-8 md:pb-20 md:pt-10">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#98989f] transition-colors hover:text-[#ff2d55]"
          >
            ← Back to directory
          </Link>

          {/* Hero */}
          <section className="mb-16 mt-6 grid items-center gap-6 md:mb-20 md:grid-cols-12 md:gap-6">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-[#2c2c2e] bg-[#121212] p-8 md:col-span-4 md:p-12">
              <ListingLogo
                listing={listing}
                fit="contain"
                screenshotFallback
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-6 md:col-span-8">
              <div className="flex flex-wrap items-center gap-4">
                {listing.topPickRank === 1 ? (
                  <span className="rounded-full border border-[#ff5167]/30 bg-[#ff5167]/10 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-[#ff2d55]">
                    Top Pick
                  </span>
                ) : null}
                <StarRow rating={listing.rating} />
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl md:leading-[1.1]">
                {listing.name}
              </h1>
              <p className="max-w-2xl font-sans text-lg leading-relaxed text-[#e2e2e9]/80">
                {listing.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                <AffiliateLink
                  href={listing.affiliate_url}
                  className="flex items-center gap-2 rounded-lg bg-[#ff2d55] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#ff2d55]/30 transition hover:scale-[1.02] active:scale-95"
                >
                  Visit Platform
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </AffiliateLink>
                <a
                  href={
                    resolveAffiliateDestination(listing.slug, cookieHeader)?.trim() ||
                    listing.website_url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[#2c2c2e] px-8 py-4 text-sm font-bold text-white transition hover:bg-white/5 active:scale-95"
                >
                  Official Website
                </a>
                <Link
                  href={`/categories/${listing.categorySlug}`}
                  className="rounded-lg border border-[#2c2c2e] px-8 py-4 text-sm font-bold text-[#e2e2e9]/60 transition hover:text-white"
                >
                  {listing.categoryLabel}
                </Link>
              </div>
            </div>
          </section>

          {/* Review + sidebar */}
          <section className="mb-16 grid gap-6 md:mb-20 md:grid-cols-12 md:gap-6">
            <div className="flex flex-col gap-8 md:col-span-7">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-[32px] md:leading-[1.2]">
                In-Depth Review
              </h2>
              <div className="space-y-4 font-sans text-base leading-relaxed text-[#e2e2e9]/70">
                {reviewParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
                <div className="rounded-xl border border-[#2c2c2e] bg-[#121212] p-6">
                  <div className="mb-6 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-500" aria-hidden />
                    <h3 className="font-display text-2xl font-semibold text-white">
                      Advantages
                    </h3>
                  </div>
                  <ul className="space-y-4 font-sans text-base leading-relaxed text-[#e2e2e9]/80">
                    {listing.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-3">
                        <span className="mt-1 text-[#ff2d55]">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-[#2c2c2e] bg-[#121212] p-6">
                  <div className="mb-6 flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" aria-hidden />
                    <h3 className="font-display text-2xl font-semibold text-white">
                      Limitations
                    </h3>
                  </div>
                  <ul className="space-y-4 font-sans text-base leading-relaxed text-[#e2e2e9]/80">
                    {listing.cons.map((con) => (
                      <li key={con} className="flex items-start gap-3">
                        <span className="mt-1 text-[#98989f]">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="sticky top-28 rounded-xl border border-[#2c2c2e] bg-[#121212] p-8">
                <h3 className="mb-6 font-display text-2xl font-semibold text-white">
                  User Snapshot
                </h3>
                <div className="space-y-0 border-y border-[#2c2c2e]">
                  {snapshot.snapshotRows.map((row, idx) => (
                    <div
                      key={row.label}
                      className={cn(
                        "flex justify-between gap-4 py-4",
                        idx < snapshot.snapshotRows.length - 1
                          ? "border-b border-[#2c2c2e]/50"
                          : "",
                      )}
                    >
                      <span className="shrink-0 font-display text-xs font-bold uppercase tracking-wide text-[#e2e2e9]/50">
                        {row.label}
                      </span>
                      <span className="text-right font-sans text-base text-white">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <SnapshotBullets
                  title="What It Feels Like"
                  items={snapshot.feelsLike}
                  bulletClass="bg-[#ff2d55]"
                />
                <SnapshotBullets
                  title="Not Ideal For"
                  items={snapshot.notIdealFor}
                  bulletClass="bg-[#98989f]"
                />
                <SnapshotBullets
                  title="Reality Check"
                  items={snapshot.realityCheck}
                  bulletClass="bg-[#e2e2e9]/50"
                />

                <div className="mt-8">
                  <AffiliateLink
                    href={listing.affiliate_url}
                    className="w-full justify-center rounded-lg bg-[#ff2d55] py-4 text-sm font-bold text-white shadow-lg shadow-[#ff2d55]/20 transition hover:scale-[1.01] active:scale-[0.98]"
                  >
                    Visit Platform
                  </AffiliateLink>
                </div>
                <p className="mt-4 text-center text-[11px] leading-snug text-[#98989f]/80">
                  Some outbound links are sponsored. We may receive compensation
                  when you sign up or purchase through partner offers.
                </p>
              </div>
            </div>
          </section>

          {/* Similar */}
          {similarShowcase.length > 0 ? (
            <section className="mb-16 md:mb-20">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="mb-2 font-display text-3xl font-semibold tracking-tight text-white md:text-[32px]">
                    Similar Platforms
                  </h2>
                  <p className="font-sans text-base text-[#e2e2e9]/50">
                    More picks in {listing.categoryLabel}.
                  </p>
                </div>
                <Link
                  href={heroCta.secondaryHref}
                  className="flex items-center gap-2 font-display text-sm font-bold text-[#ff2d55] transition-all hover:gap-3"
                >
                  {heroCta.secondary}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
                {similarShowcase.map((l) => {
                  const img = l.screenshot || l.image || l.logo;
                  return (
                    <div
                      key={l.slug}
                      className="group overflow-hidden rounded-xl border border-[#2c2c2e] bg-[#121212] transition-all duration-300 hover:border-[#ff2d55]/50"
                    >
                      <div className="h-48 overflow-hidden bg-[#1c1c1e]">
                        {/* eslint-disable-next-line @next/next/no-img-element -- remote listing art */}
                        <img
                          src={img}
                          alt={l.name}
                          className="h-full w-full scale-105 object-cover grayscale transition-all duration-500 group-hover:scale-100 group-hover:grayscale-0"
                        />
                      </div>
                      <div className="p-6">
                        <div className="mb-4 flex items-start justify-between gap-2">
                          <h4 className="font-display text-lg font-semibold text-white">
                            {l.name}
                          </h4>
                          <span className="shrink-0 font-display text-sm font-bold text-[#ff2d55]">
                            {l.rating.toFixed(1)} ★
                          </span>
                        </div>
                        <p className="mb-6 line-clamp-2 font-sans text-base text-[#e2e2e9]/60">
                          {clampTagline(l.description, 120)}
                        </p>
                        <AffiliateLink
                          href={l.affiliate_url}
                          className="w-full justify-center rounded-lg border border-[#2c2c2e] bg-transparent py-3 text-sm font-bold text-white shadow-none transition-all hover:border-[#ff2d55] hover:bg-[#ff2d55] hover:text-white"
                        >
                          Visit Platform
                        </AffiliateLink>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {restSimilar.length > 0 ? (
            <section className="border-t border-[#2c2c2e]/60 pt-10" aria-labelledby="more-similar">
              <h2
                id="more-similar"
                className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-[#98989f]"
              >
                More in this category
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {restSimilar.map((l) => (
                  <div
                    key={l.id}
                    className="group rounded-xl border border-[#2c2c2e] bg-[#121212] p-3 transition-all duration-300 hover:border-[#ff2d55]/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative isolate h-11 w-11 shrink-0 overflow-hidden rounded-md border border-[#2c2c2e] bg-[#1c1c1e]">
                        <ListingLogo listing={l} fit="cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="truncate font-display text-sm font-semibold text-white">
                            {l.name}
                          </h3>
                          <span className="shrink-0 font-display text-xs font-bold text-[#ff2d55]">
                            {l.rating.toFixed(1)} ★
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#e2e2e9]/60">
                          {clampTagline(l.description, 70)}
                        </p>
                      </div>
                    </div>
                    <AffiliateLink
                      href={l.affiliate_url}
                      className="mt-3 h-9 w-full justify-center rounded-lg border border-[#2c2c2e] bg-transparent px-3 text-xs font-bold text-white shadow-none transition-all hover:border-[#ff2d55] hover:bg-[#ff2d55] hover:text-white"
                    >
                      Visit Platform
                    </AffiliateLink>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}

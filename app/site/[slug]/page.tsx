import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getListingBySlug,
  getSimilar,
  listings,
} from "@/lib/data";
import { getSiteUrl } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { AffiliateLink } from "@/components/ui/affiliate-link";
import { StarRating } from "@/components/ui/star-rating";
import { CompactCard } from "@/components/cards/compact-card";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const listing = getListingBySlug(params.slug);
  if (!listing) return { title: "Listing" };
  return {
    title: `${listing.name} review`,
    description: listing.description,
    alternates: {
      canonical: `/site/${listing.slug}`,
    },
    openGraph: {
      title: `${listing.name} · The Porn Dude 2.0`,
      description: listing.description,
    },
  };
}

function ReviewJsonLd({
  listing,
}: {
  listing: NonNullable<ReturnType<typeof getListingBySlug>>;
}) {
  const base = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Organization",
      name: "The Porn Dude 2.0",
      url: base,
    },
    itemReviewed: {
      "@type": "WebSite",
      name: listing.name,
      url: listing.website_url,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: listing.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: listing.review,
    datePublished: listing.added_date,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function SitePage({ params }: Props) {
  const listing = getListingBySlug(params.slug);
  if (!listing) notFound();
  const similar = getSimilar(listing, 6);

  return (
    <>
      <ReviewJsonLd listing={listing} />
      <article className="px-3 py-8 sm:px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="text-xs font-medium text-slate-400 transition hover:text-amber-400"
          >
            ← Back to directory
          </Link>
          <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_32px_80px_-48px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
            <div className="relative aspect-[21/9] w-full">
              <Image
                src={listing.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/35 to-transparent" />
            </div>
            <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-start sm:gap-6 sm:p-7">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image
                  src={listing.logo}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0 flex-1 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                      {listing.name}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge tone="secondary">{listing.categoryLabel}</Badge>
                      <span className="text-xs text-slate-500">
                        Updated {listing.added_date} · Popularity{" "}
                        {listing.popularity_score}/100
                      </span>
                    </div>
                  </div>
                  <StarRating value={listing.rating} />
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  {listing.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {listing.tags.map((t) => (
                    <Badge key={t} tone="neutral">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <AffiliateLink href={listing.affiliate_url}>
                    Visit site (affiliate)
                  </AffiliateLink>
                  <a
                    href={listing.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400/40 hover:text-white"
                  >
                    Official homepage
                  </a>
                  <Link
                    href={`/categories/${listing.categorySlug}`}
                    className="inline-flex items-center rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-amber-500/35 hover:text-white"
                  >
                    More in category
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 px-4 py-6 sm:px-7">
              <h2 className="font-display text-lg font-semibold text-white">
                Editorial review
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {listing.review}
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <caption className="border-b border-white/10 bg-white/[0.03] px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Pros &amp; cons
                  </caption>
                  <thead>
                    <tr className="border-b border-white/5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <th scope="col" className="w-1/2 px-4 py-3 text-emerald-400/95">
                        Pros
                      </th>
                      <th scope="col" className="w-1/2 px-4 py-3 text-rose-400/95">
                        Cons
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="align-top">
                      <td className="border-r border-white/5 bg-white/[0.02] px-4 py-4">
                        <ul className="list-disc space-y-2 pl-4 text-slate-300">
                          {listing.pros.map((pro) => (
                            <li key={pro}>{pro}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-4">
                        <ul className="list-disc space-y-2 pl-4 text-slate-300">
                          {listing.cons.map((con) => (
                            <li key={con}>{con}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Affiliate links are labeled as sponsored. The official homepage
                link above is provided for transparency and is not necessarily
                monetized.
              </p>
            </div>
          </div>

          {similar.length > 0 ? (
            <section className="mt-10" aria-labelledby="similar-heading">
              <h2
                id="similar-heading"
                className="font-display text-lg font-bold text-white"
              >
                You might also like
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Similar high-rated picks in {listing.categoryLabel}.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-6">
                {similar.map((l) => (
                  <CompactCard key={l.id} listing={l} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}

import type { Metadata } from "next";
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
import { clampTagline } from "@/lib/utils";
import { DenseDiscoveryCard } from "@/components/cards/dense-discovery-card";
import { ListingLogo } from "@/components/shared/listing-logo";

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

export default function SitePage({ params }: Props) {
  const listing = getListingBySlug(params.slug);
  if (!listing) notFound();
  const similar = getSimilar(listing, 12);

  return (
    <>
      <SiteJsonLd listing={listing} />
      <article className="px-3 py-3 sm:px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="text-[10px] font-medium text-slate-500 hover:text-amber-400"
          >
            ← Directory
          </Link>

          <div className="mt-2 overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-2">
            <div className="flex gap-2">
              <div className="relative isolate h-10 w-10 shrink-0 overflow-hidden rounded bg-white/5">
                <ListingLogo listing={listing} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h1 className="text-sm font-bold leading-tight text-white sm:text-base">
                    {listing.name}
                  </h1>
                  {listing.tag ? (
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] text-slate-400">
                      {listing.tag}
                    </span>
                  ) : null}
                  <Badge tone="secondary" className="px-1 py-0 text-[8px]">
                    {listing.categoryLabel}
                  </Badge>
                </div>
                <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                  {clampTagline(listing.description, 40)}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {listing.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded bg-white/10 px-1 py-px text-[8px] font-medium uppercase tracking-wide text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <AffiliateLink
                    href={listing.affiliate_url}
                    className="px-2 py-1 text-[10px]"
                  >
                    Visit (affiliate)
                  </AffiliateLink>
                  <a
                    href={listing.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-2xl border border-white/10 px-2 py-1 text-[10px] font-medium text-slate-200 hover:border-cyan-400/40"
                  >
                    Official
                  </a>
                  <Link
                    href={`/categories/${listing.categorySlug}`}
                    className="inline-flex items-center rounded-2xl border border-white/10 px-2 py-1 text-[10px] text-slate-300 hover:border-amber-500/35"
                  >
                    Category
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-lg border border-white/10 p-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Review
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              {listing.review}
            </p>
            <div className="mt-2 overflow-hidden rounded-md border border-white/10 text-xs">
              <table className="w-full text-left">
                <caption className="border-b border-white/5 bg-white/[0.02] px-2 py-1 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                  Pros &amp; cons
                </caption>
                <thead>
                  <tr className="border-b border-white/5 text-[9px] font-semibold uppercase text-slate-500">
                    <th scope="col" className="w-1/2 px-2 py-1.5 text-emerald-400/95">
                      Pros
                    </th>
                    <th scope="col" className="w-1/2 px-2 py-1.5 text-rose-400/95">
                      Cons
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="align-top">
                    <td className="border-r border-white/5 bg-white/[0.02] px-2 py-2">
                      <ul className="list-disc space-y-0.5 pl-3 text-[11px] text-slate-400">
                        {listing.pros.map((pro) => (
                          <li key={pro}>{pro}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-2 py-2">
                      <ul className="list-disc space-y-0.5 pl-3 text-[11px] text-slate-400">
                        {listing.cons.map((con) => (
                          <li key={con}>{con}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-1.5 text-[9px] text-slate-600">
              Affiliate links use{" "}
              <code className="rounded bg-white/5 px-0.5">rel=sponsored</code>.
            </p>
          </div>

          {similar.length > 0 ? (
            <section className="mt-3" aria-labelledby="similar-heading">
              <h2
                id="similar-heading"
                className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
              >
                Similar
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {similar.map((l, i) => (
                  <DenseDiscoveryCard key={l.id} listing={l} index={i} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}

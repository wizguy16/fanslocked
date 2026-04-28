import Link from "next/link";
import type { Listing } from "@/types/listing";
import { SitePreview } from "@/components/shared/site-preview";

type Props = {
  listing: Listing;
  sectionId: string;
  body: string;
  bestFor: string;
};

export function FemdomRankingTopPick({
  listing,
  sectionId,
  body,
  bestFor,
}: Props) {
  const href = `/site/${listing.slug}`;

  return (
    <article
      id={sectionId}
      className="border-b border-white/[0.08] py-12 md:py-14"
    >
      <h2 className="mb-8 text-left text-xl font-bold tracking-[-0.02em] text-white md:text-2xl">
        {listing.name}
      </h2>
      <div className="grid gap-8 md:grid-cols-12 md:items-start">
        <div className="md:col-span-5">
          <SitePreview
            slug={listing.slug}
            categorySlug={listing.categorySlug}
            alt={`${listing.name} preview`}
            fallbackScreenshot={listing.screenshot}
            fallbackLogo={listing.logo}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="aspect-video rounded-xl border border-white/[0.1]"
          />
        </div>
        <div className="flex flex-col gap-5 md:col-span-7">
          <p className="text-[15px] leading-relaxed text-[#a3a3a3] md:text-base">
            {body}
          </p>
          <p className="text-[15px] leading-relaxed">
            <span className="font-semibold text-white">Best for:</span>{" "}
            <span className="text-[#a3a3a3]">{bestFor}</span>
          </p>
          <div>
            <Link
              href={href}
              className="inline-flex w-full max-w-xs items-center justify-center rounded-lg bg-[#d97706] px-6 py-3 text-[14px] font-bold text-[#0a0a0a] transition hover:bg-[#e88e12] sm:w-auto"
            >
              Visit Site
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

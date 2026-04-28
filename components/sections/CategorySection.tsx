import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Listing } from "@/types/listing";
import type { FetishHubSectionCopy } from "@/lib/fetish-hub-routes";
import { SiteCard } from "@/components/ui/SiteCard";

type CategorySectionProps = {
  title: string;
  items: Listing[];
  headingId: string;
  /** `five` = Bondage-style row in reference (wider grid). */
  columnLayout?: "three" | "five";
  subsection?: boolean;
  /** Rich SEO + hub links for fetish slice sections. */
  hub?: FetishHubSectionCopy | null;
};

const hubTextLinkClass =
  "inline-flex items-center gap-1 text-[15px] font-medium text-[#a3a3a3] underline-offset-4 transition hover:text-white hover:decoration-[rgba(255,138,0,0.6)] hover:underline";

const hubCategoryButtonClass =
  "mt-8 inline-flex w-full max-w-md items-center justify-center gap-2 rounded-lg border border-white/[0.15] bg-transparent px-6 py-3 text-[13px] font-semibold tracking-wide text-[#ccc] transition hover:border-[rgba(255,138,0,0.55)] hover:text-white sm:w-auto";

export function CategorySection({
  title,
  items,
  headingId,
  columnLayout = "three",
  subsection = false,
  hub = null,
}: CategorySectionProps) {
  if (items.length === 0) return null;

  const TitleTag = subsection ? "h3" : "h2";
  const titleClass = subsection
    ? "mb-6 text-left text-lg font-bold tracking-[-0.02em] text-white md:mb-8 md:text-xl"
    : "mb-8 text-xl font-bold tracking-[-0.02em] text-white md:text-2xl";

  const gridClass =
    columnLayout === "five"
      ? "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";

  const headingText = hub?.displayTitle ?? title;

  const inner = (
    <>
      <TitleTag id={headingId} className={titleClass}>
        {headingText}
      </TitleTag>

      {hub ? (
        <>
          <p className="mb-4 max-w-3xl text-[15px] leading-relaxed text-[#a3a3a3] md:text-base">
            {hub.description}
          </p>
          <p className="mb-8">
            <Link href={hub.textLinkHref} className={hubTextLinkClass}>
              <span aria-hidden className="text-[#737373]">
                →
              </span>
              {hub.textLinkLabel}
            </Link>
          </p>
        </>
      ) : null}

      <div className={gridClass}>
        {items.map((listing) => (
          <SiteCard key={listing.id} listing={listing} variant="compact" />
        ))}
      </div>

      {hub ? (
        <Link href={hub.ctaHref} className={hubCategoryButtonClass}>
          {hub.ctaLabel}
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
        </Link>
      ) : null}
    </>
  );

  if (subsection) {
    return (
      <div className="mb-14 md:mb-16 lg:mb-[4.5rem]" aria-labelledby={headingId}>
        {inner}
      </div>
    );
  }

  return (
    <section
      aria-labelledby={headingId}
      className="border-b border-white/[0.06] bg-[#0a0a0a] px-4 py-14 md:px-8 md:py-16"
    >
      <div className="mx-auto max-w-[1280px]">{inner}</div>
    </section>
  );
}

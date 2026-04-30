import Link from "next/link";
import type { Listing } from "@/types/listing";
import { cn } from "@/lib/utils";
import { SitePreview } from "@/components/shared/site-preview";

type SiteCardProps = {
  listing: Listing;
  variant?: "featured" | "compact";
  showTopPick?: boolean;
  highlight?: string | null;
  className?: string;
};

export function SiteCard({
  listing,
  variant = "compact",
  showTopPick = false,
  highlight,
  className,
}: SiteCardProps) {
  const href = `/site/${listing.slug}`;
  const raw = (listing.preview?.trim() || listing.description).replace(
    /\s+/g,
    " ",
  );
  const chip =
    highlight?.trim() ||
    listing.tag?.trim() ||
    listing.tags[0]?.trim() ||
    null;

  const isFeatured = variant === "featured";

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full min-h-0 flex-col rounded-2xl border border-white/[0.1] p-6 outline-none",
        "bg-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        "transition-[border-color,box-shadow] duration-200",
        "hover:border-[rgba(245,158,11,0.35)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(245,158,11,0.08)]",
        "focus-visible:ring-2 focus-visible:ring-[#d97706]/50",
        className,
      )}
    >
      <div className="relative shrink-0">
        {showTopPick ? (
          <span
            className="absolute right-0 top-0 z-[3] rounded-md bg-[#d97706] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white"
            aria-hidden
          >
            Top Pick
          </span>
        ) : null}
        <SitePreview
          slug={listing.slug}
          categorySlug={listing.categorySlug}
          alt={`${listing.name} preview`}
          fallbackScreenshot={listing.screenshot}
          fallbackLogo={listing.logo}
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 25vw"
              : "(max-width: 768px) 100vw, 20vw"
          }
          className={cn(
            "rounded-xl border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
            isFeatured ? "aspect-[16/10]" : "aspect-[4/3]",
          )}
          imageClassName={isFeatured ? "object-cover object-top" : "object-cover object-top"}
        />
      </div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <h3
          className={cn(
            "font-bold tracking-[-0.02em] text-white",
            isFeatured
              ? "text-lg leading-tight md:text-xl"
              : "text-[15px] leading-tight md:text-base",
          )}
        >
          {listing.name}
        </h3>

        <p
          className={cn(
            "mt-2 text-[#a3a3a3]",
            isFeatured
              ? "line-clamp-2 text-[14px] leading-relaxed md:text-[15px]"
              : "line-clamp-1 text-[13px] leading-snug",
          )}
        >
          {raw}
        </p>

        {chip && isFeatured ? (
          <span className="mt-2 inline-flex w-fit rounded-md border border-[rgba(245,158,11,0.45)] bg-[rgba(217,119,6,0.12)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#fbbf24]">
            {chip}
          </span>
        ) : null}

        <span
          className={cn(
            "mt-4 flex w-full items-center justify-center rounded-lg bg-[#d97706] font-bold text-[#0a0a0a] transition-colors group-hover:bg-[#e88e12]",
            isFeatured ? "py-3 text-[14px] md:text-[15px]" : "py-2.5 text-[12px] md:text-[13px]",
          )}
        >
          View Details
        </span>
      </div>
    </Link>
  );
}

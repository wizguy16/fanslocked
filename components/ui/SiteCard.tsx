import Link from "next/link";
import type { Listing } from "@/types/listing";
import { cn } from "@/lib/utils";
import { getAffiliateLink } from "@/lib/get-affiliate-link";
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
      {...(process.env.NODE_ENV === "development"
        ? {
            "data-affiliate-exit":
              getAffiliateLink(listing.slug) ?? listing.website_url,
          }
        : {})}
      className={cn(
        "group flex h-full min-h-0 flex-col rounded-none border border-white/[0.09] bg-[#292929] p-6 outline-none",
        "shadow-[0_20px_50px_-28px_rgba(0,0,0,0.95)] transition-[border-color,box-shadow] duration-200",
        "hover:border-primary/35 hover:shadow-[0_28px_60px_-24px_rgba(201,0,9,0.22)]",
        "focus-visible:ring-2 focus-visible:ring-primary/50",
        className,
      )}
    >
      <div className="relative shrink-0">
        {showTopPick ? (
          <span
            className="absolute right-0 top-0 z-[3] rounded-none border border-white/15 bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white"
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
            "rounded-none border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
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
          <span className="mt-2 inline-flex w-fit rounded-none border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-300">
            {chip}
          </span>
        ) : null}

        <span
          className={cn(
            "mt-4 flex w-full items-center justify-center rounded-none bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-lg transition-colors group-hover:bg-primary/90",
            isFeatured ? "py-3 text-[14px] md:text-[15px]" : "py-2.5 text-[12px] md:text-[13px]",
          )}
        >
          View Details
        </span>
      </div>
    </Link>
  );
}

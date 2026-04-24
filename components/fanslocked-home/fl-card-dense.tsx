"use client";

import Image from "next/image";
import Link from "next/link";
import { cn, clampTagline } from "@/lib/utils";
import { IconStarTiny } from "@/components/icons/mini-icons";
import type { Listing } from "@/types/listing";

type Props = {
  listing: Listing;
};

/**
 * Dense grid card — same footprint and interaction model as {@link FlCardFeatured}
 * (horizontal row, logo, copy, hover “Enter →”, orange stroke + lift on hover).
 */
export function FlCardDense({ listing }: Props) {
  return (
    <Link
      href={listing.affiliate_url}
      target="_blank"
      rel="sponsored noopener noreferrer"
      aria-label={`${listing.name}. Opens partner site.`}
      className={cn(
        "group relative flex h-[132px] w-full items-center gap-4 overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[var(--bg-card)] px-5 py-4 no-underline outline-none",
        "shadow-[0_2px_18px_-6px_rgba(0,0,0,0.45)]",
        "transition-[transform,box-shadow,border-color] duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-[rgba(255,122,0,0.45)]",
        "hover:shadow-[0_0_28px_-14px_rgba(255,122,0,0.1)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
      )}
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[12px] bg-[var(--bg-elevated)]">
        <Image
          src={listing.logo}
          alt=""
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-1 pr-14 sm:pr-16">
        <span className="truncate text-[18px] font-semibold leading-tight text-[var(--text-primary)]">
          {listing.name}
        </span>
        <p className="line-clamp-2 text-[13px] leading-snug text-[var(--text-secondary)]">
          {clampTagline(listing.description, 120)}
        </p>
        <div className="inline-flex min-w-0 items-center gap-1 text-[13px] text-[#A0A6B1]">
          <IconStarTiny className="h-3 w-3 shrink-0 text-[#A0A6B1]" />
          <span className="tabular-nums">{listing.rating.toFixed(1)}</span>
        </div>
      </div>

      <span
        aria-hidden
        className={cn(
          "absolute bottom-3.5 right-4 inline-flex items-center gap-1.5 text-sm font-medium tabular-nums tracking-tight transition-[opacity,color] duration-200 ease-out",
          "text-[#C49A72] group-hover:text-[#D4AA84]",
          "opacity-100",
          "lg:opacity-0 lg:group-hover:opacity-100",
        )}
      >
        Enter
        <span className="translate-y-px text-[0.95em] font-normal leading-none opacity-90">
          →
        </span>
      </span>
    </Link>
  );
}

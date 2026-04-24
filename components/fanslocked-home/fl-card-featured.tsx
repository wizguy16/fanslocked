"use client";

import Image from "next/image";
import Link from "next/link";
import { cn, clampTagline } from "@/lib/utils";
import { IconFlameBadge, IconStarTiny } from "@/components/icons/mini-icons";
import type { Listing } from "@/types/listing";

type Props = {
  listing: Listing;
  showTopBadge?: boolean;
};

export function FlCardFeatured({ listing, showTopBadge }: Props) {
  return (
    <Link
      href={listing.affiliate_url}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={cn(
        "group relative flex min-h-[140px] max-h-[160px] w-[min(100%,300px)] shrink-0 flex-col overflow-hidden rounded-xl border border-[rgba(255,255,255,0.04)] bg-[#161922] p-4 outline-none transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.08)] hover:bg-[#1a1d28]",
        "focus-visible:ring-2 focus-visible:ring-[#FF7A00]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0B10]",
      )}
    >
      {showTopBadge ? (
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-[#11131A] px-2 py-0.5 text-[10px] font-semibold text-[#A0A6B1] ring-1 ring-[rgba(255,255,255,0.04)]">
          <IconFlameBadge />
          Top
        </span>
      ) : null}
      <div className="mt-5 flex flex-1 gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#11131A] ring-1 ring-[rgba(255,255,255,0.04)]">
          <Image
            src={listing.logo}
            alt=""
            fill
            className="object-cover"
            sizes="44px"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1">
          <div>
            <p className="truncate text-sm font-semibold text-white">
              {listing.name}
            </p>
            <p className="mt-1 line-clamp-2 text-xs leading-snug text-[#A0A6B1]">
              {clampTagline(listing.description, 72)}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-[#6B7280]">
              <IconStarTiny className="text-[#6B7280]" />
              {listing.rating.toFixed(1)}
            </span>
            <span className="text-xs font-medium text-[#FF7A00] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Visit →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

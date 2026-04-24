"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconStarTiny } from "@/components/icons/mini-icons";
import type { Listing } from "@/types/listing";

type Props = {
  listing: Listing;
};

export function FlCardDense({ listing }: Props) {
  return (
    <Link
      href={listing.affiliate_url}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={cn(
        "group relative flex h-[100px] max-h-[110px] min-h-[90px] flex-col overflow-hidden rounded-xl border border-transparent bg-[#11131A] p-3 outline-none transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.06)] hover:bg-[#161922]",
        "focus-visible:ring-2 focus-visible:ring-[#FF7A00]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0B10]",
      )}
    >
      <div className="flex flex-1 gap-3">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-[#0A0B10] ring-1 ring-[rgba(255,255,255,0.04)]">
          <Image
            src={listing.logo}
            alt=""
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
          <p className="truncate text-sm font-bold text-white">{listing.name}</p>
          <p className="inline-flex items-center gap-1 text-xs text-[#6B7280]">
            <IconStarTiny className="text-[#6B7280]" />
            {listing.rating.toFixed(1)}
          </p>
        </div>
      </div>
      <span
        className="pointer-events-none absolute bottom-3 right-3 text-xs font-semibold text-[#FF7A00] opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 translate-y-1"
        aria-hidden
      >
        Visit →
      </span>
    </Link>
  );
}

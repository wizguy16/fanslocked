"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { cn, clampTagline } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { resolveVisualBadge } from "@/lib/visual-badge";
import { ListingLogo } from "@/components/shared/listing-logo";
import { VisualBadgeIcon } from "@/components/icons/mini-icons";

export function DenseDiscoveryCard({
  listing,
  index,
  highlight,
}: {
  listing: Listing;
  index: number;
  highlight?: boolean;
}) {
  const el = useRef<HTMLDivElement>(null);
  const vb = resolveVisualBadge(listing.id, index, listing.badge);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const node = el.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    node.style.transform = `perspective(640px) rotateX(${py * -2.5}deg) rotateY(${px * 3}deg) translateY(-2px)`;
  }, []);

  const onLeave = useCallback(() => {
    const node = el.current;
    if (!node) return;
    node.style.transform = "";
  }, []);

  return (
    <div
      role="article"
      ref={el}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group relative flex h-[92px] max-h-[100px] min-h-[80px] flex-row gap-2 overflow-hidden rounded-none border border-white/[0.09] bg-[#292929] p-3 transition-colors duration-200 hover:border-primary/35",
        highlight &&
          "ring-2 ring-primary/40 ring-offset-2 ring-offset-[#1A1A1A]",
      )}
      style={{ transition: "transform 0.18s ease-out" }}
    >
      <div className="relative isolate h-10 w-10 shrink-0 overflow-hidden rounded-none bg-white/5">
        <ListingLogo listing={listing} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex min-w-0 items-start justify-between gap-1">
          <Link
            href={`/site/${listing.slug}`}
            className="min-w-0 truncate text-[12px] font-semibold leading-tight text-white hover:text-primary"
          >
            {listing.name}
          </Link>
          <span className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-slate-500">
            <VisualBadgeIcon kind={vb.kind} />
            <span>{vb.label}</span>
          </span>
        </div>
        <p className="line-clamp-1 text-[10px] leading-snug text-slate-500">
          {clampTagline(listing.description, 42)}
        </p>
        <div className="flex justify-end">
          <a
            href={listing.affiliate_url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex h-8 min-w-[76px] items-center justify-center rounded-lg bg-primary px-2.5 text-[11px] font-bold text-primary-foreground shadow-lg transition-colors group-hover:bg-primary/90"
          >
            Visit →
          </a>
        </div>
      </div>
    </div>
  );
}

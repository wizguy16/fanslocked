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
        "group relative flex h-[92px] max-h-[100px] min-h-[80px] flex-row gap-2 overflow-hidden rounded-lg border border-white/[0.08] bg-[#12131a] p-3 transition-[border-color,box-shadow,background-color] duration-200",
        "hover:border-[#FF7A00]/45 hover:bg-[#171821] hover:shadow-[0_0_28px_-8px_rgba(255,122,0,0.45),0_0_0_1px_rgba(255,122,0,0.12)]",
        highlight &&
          "ring-2 ring-[#FF7A00]/70 ring-offset-2 ring-offset-[#0A0B10]",
      )}
      style={{ transition: "transform 0.18s ease-out" }}
    >
      <div className="relative isolate h-10 w-10 shrink-0 overflow-hidden rounded-md bg-white/5">
        <ListingLogo listing={listing} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex min-w-0 items-start justify-between gap-1">
          <Link
            href={`/site/${listing.slug}`}
            className="min-w-0 truncate text-[12px] font-semibold leading-tight text-white hover:text-[#FF7A00]"
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
            className="inline-flex h-8 min-w-[76px] items-center justify-center rounded-lg bg-primary px-2.5 text-[11px] font-bold text-primary-foreground transition group-hover:scale-[1.04] group-hover:shadow-[0_0_18px_-3px_rgba(255,45,85,0.5)]"
          >
            Visit →
          </a>
        </div>
      </div>
    </div>
  );
}

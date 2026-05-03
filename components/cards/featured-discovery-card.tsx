"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { clampTagline } from "@/lib/utils";
import type { VisualBadgeKind } from "@/lib/visual-badge";
import { VisualBadgeIcon } from "@/components/icons/mini-icons";
import { ListingLogo } from "@/components/shared/listing-logo";

const HIGHLIGHT: { kind: VisualBadgeKind; label: string }[] = [
  { kind: "top", label: "Best" },
  { kind: "top", label: "Top" },
  { kind: "trending", label: "Trending" },
  { kind: "new", label: "New" },
];

export function FeaturedDiscoveryCard({
  listing,
  index,
}: {
  listing: Listing;
  index: number;
}) {
  const el = useRef<HTMLDivElement>(null);
  const hl = HIGHLIGHT[index % HIGHLIGHT.length]!;

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const node = el.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    node.style.transform = `perspective(720px) rotateX(${py * -3}deg) rotateY(${px * 4}deg) translateY(-2px)`;
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
        "group relative flex min-h-[140px] max-h-[160px] w-[min(100%,280px)] shrink-0 snap-start flex-col overflow-hidden rounded-none border border-white/[0.09] bg-[#292929] p-3 transition-colors duration-200 hover:border-primary/35",
      )}
      style={{ transition: "transform 0.2s ease-out" }}
    >
      <div className="pointer-events-none absolute left-2 top-2 flex items-center gap-1 rounded-none border border-white/10 bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
        <VisualBadgeIcon kind={hl.kind} className="h-3 w-3" />
        <span>{hl.label}</span>
      </div>
      <div className="mt-6 flex flex-1 gap-3">
        <div className="relative isolate h-12 w-12 shrink-0 overflow-hidden rounded-none bg-white/5">
          <ListingLogo listing={listing} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1">
          <div>
            <Link
              href={`/site/${listing.slug}`}
              className="line-clamp-1 text-sm font-semibold text-white hover:text-primary"
            >
              {listing.name}
            </Link>
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-slate-500">
              {clampTagline(listing.description, 56)}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            {listing.tag ? (
              <span className="min-w-0 truncate text-[10px] font-medium text-slate-500">
                {listing.tag}
              </span>
            ) : null}
            <a
              href={listing.affiliate_url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="col-start-2 inline-flex h-8 min-w-[88px] shrink-0 items-center justify-center rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
            >
              Visit →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

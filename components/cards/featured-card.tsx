"use client";

import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/types/listing";
import { Badge } from "@/components/ui/badge";
import { AffiliateLink } from "@/components/ui/affiliate-link";
import { motion } from "framer-motion";

export function FeaturedCard({ listing }: { listing: Listing }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_24px_60px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl transition hover:border-amber-500/35 hover:shadow-[0_0_40px_-14px_rgba(245,158,11,0.35)]"
    >
      <Link
        href={`/site/${listing.slug}`}
        className="relative block aspect-[16/9] overflow-hidden"
      >
        <Image
          src={listing.image}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 20vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/25 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-amber-100 backdrop-blur-sm">
            ★ {listing.rating.toFixed(1)}
          </span>
          <Badge tone="primary" className="max-w-[140px] truncate">
            {listing.categoryLabel}
          </Badge>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <Image
              src={listing.logo}
              alt=""
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Link
              href={`/site/${listing.slug}`}
              className="line-clamp-1 text-base font-semibold text-white transition hover:text-amber-200 sm:text-lg"
            >
              {listing.name}
            </Link>
            <div className="mt-1 flex flex-wrap gap-1">
              {listing.tags.slice(0, 3).map((t) => (
                <Badge key={t} tone="neutral">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <p className="line-clamp-3 text-xs text-slate-400 sm:text-sm">
          {listing.description}
        </p>
        <div className="mt-auto flex gap-2 pt-1">
          <AffiliateLink href={listing.affiliate_url} className="flex-1">
            Visit site
          </AffiliateLink>
          <Link
            href={`/site/${listing.slug}`}
            className="inline-flex items-center rounded-2xl border border-white/10 px-3 text-xs font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
          >
            Review
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

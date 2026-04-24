"use client";

import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/types/listing";
import { AffiliateLink } from "@/components/ui/affiliate-link";
import { motion } from "framer-motion";

export function CompactCard({ listing }: { listing: Listing }) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_16px_50px_-36px_rgba(0,0,0,0.9)] backdrop-blur-lg transition hover:border-amber-500/35 hover:shadow-[0_0_32px_-12px_rgba(245,158,11,0.3)]"
    >
      <Link
        href={`/site/${listing.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={listing.image}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 50vw, 16vw"
        />
        <div className="absolute right-2 top-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-amber-100 backdrop-blur-sm">
          ★ {listing.rating.toFixed(1)}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-2.5 sm:p-3">
        <Link
          href={`/site/${listing.slug}`}
          className="line-clamp-1 text-sm font-semibold text-white transition hover:text-amber-200"
        >
          {listing.name}
        </Link>
        <p className="line-clamp-2 text-[11px] leading-snug text-slate-400 sm:text-xs">
          {listing.description}
        </p>
        <AffiliateLink href={listing.affiliate_url} className="w-full py-1.5 text-xs">
          Visit site
        </AffiliateLink>
      </div>
    </motion.article>
  );
}

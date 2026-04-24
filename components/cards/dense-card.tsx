"use client";

import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/types/listing";
import { Badge } from "@/components/ui/badge";
import { AffiliateLink } from "@/components/ui/affiliate-link";
import { motion } from "framer-motion";

export function DenseCard({ listing }: { listing: Listing }) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_12px_40px_-28px_rgba(0,0,0,0.95)] backdrop-blur-md transition hover:border-cyan-400/35"
    >
      <Link
        href={`/site/${listing.slug}`}
        className="relative block h-full w-full"
      >
        <Image
          src={listing.image}
          alt=""
          fill
          className="object-cover transition duration-200 group-hover:scale-[1.04] group-hover:opacity-35"
          sizes="(max-width: 640px) 50vw, 12vw"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/85 to-transparent p-2 transition group-hover:opacity-0">
          <p className="line-clamp-2 text-center text-[11px] font-semibold leading-tight text-white sm:text-xs">
            {listing.name}
          </p>
        </div>
      </Link>
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-[#0a0a0f]/92 p-2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <p className="mb-1 line-clamp-2 text-[10px] text-slate-300 sm:text-[11px]">
          {listing.description}
        </p>
        <div className="mb-2 flex flex-wrap gap-0.5">
          {listing.tags.slice(0, 3).map((t) => (
            <Badge key={t} tone="accent" className="px-1.5 py-0 text-[9px]">
              {t}
            </Badge>
          ))}
        </div>
        <AffiliateLink href={listing.affiliate_url} className="w-full py-1 text-[11px]">
          Visit site
        </AffiliateLink>
      </div>
    </motion.article>
  );
}

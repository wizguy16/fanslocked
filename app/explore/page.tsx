import type { Metadata } from "next";
import Link from "next/link";
import { listings } from "@/lib/data";
import { DenseGrid } from "@/components/sections/dense-grid";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Paginated high-density grid of every listing in The Porn Dude 2.0 directory.",
  alternates: { canonical: "/explore" },
};

const PAGE_SIZE = 48;

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ExplorePage({ searchParams }: Props) {
  const raw =
    typeof searchParams.page === "string" ? searchParams.page : "1";
  const page = Math.max(1, parseInt(raw, 10) || 1);
  const totalPages = Math.max(1, Math.ceil(listings.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const slice = listings.slice(start, start + PAGE_SIZE);

  const q = (n: number) => (n <= 1 ? "/explore" : `/explore?page=${n}`);

  return (
    <div className="border-b border-white/5 bg-[#08080c]/50 px-3 py-6 sm:px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-xl font-bold text-white sm:text-2xl">
          Explore the full index
        </h1>
        <p className="mt-1 max-w-2xl text-xs text-slate-400 sm:text-sm">
          {listings.length}+ destinations in a dense grid — optimized for power
          users who want rapid scanning and one-click affiliate visits.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 sm:text-sm">
          <span>
            Page <span className="text-slate-200">{current}</span> /{" "}
            {totalPages} · {PAGE_SIZE} per page
          </span>
          <div className="flex gap-2">
            <Link
              href={q(current - 1)}
              className={`rounded-xl border border-white/10 px-3 py-1.5 font-medium transition hover:border-amber-500/35 hover:text-white ${
                current <= 1 ? "pointer-events-none opacity-40" : ""
              }`}
              aria-disabled={current <= 1}
            >
              Previous
            </Link>
            <Link
              href={q(current + 1)}
              className={`rounded-xl border border-white/10 px-3 py-1.5 font-medium transition hover:border-amber-500/35 hover:text-white ${
                current >= totalPages ? "pointer-events-none opacity-40" : ""
              }`}
              aria-disabled={current >= totalPages}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
      <DenseGrid items={slice} />
    </div>
  );
}

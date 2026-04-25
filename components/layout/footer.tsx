import Link from "next/link";
import { listings } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.06] bg-[#06060a]/95">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-3 py-4 sm:px-4 md:flex-row md:items-start md:justify-between md:px-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-white">FansLocked</p>
          <p className="text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
            Editorial discovery directory
          </p>
          <p className="max-w-md text-[10px] leading-relaxed text-slate-500">
            FansLocked lists {listings.length}+ third-party adult websites for
            informational browsing. Some links are affiliate partnerships. We do
            not host explicit media on this domain.
          </p>
        </div>
        <div className="flex flex-col gap-1.5 text-[10px] text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1">
          <Link href="/explore" className="hover:text-[#FF7A00]">
            Explore
          </Link>
          <Link href="/categories" className="hover:text-[#FF7A00]">
            Categories
          </Link>
          <Link href="/blog" className="hover:text-[#FF7A00]">
            Guides
          </Link>
          <Link href="/privacy" className="hover:text-[#FF7A00]">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-[#FF7A00]">
            Terms
          </Link>
          <Link href="/disclosure" className="hover:text-[#FF7A00]">
            Affiliate disclosure
          </Link>
        </div>
      </div>
      <div className="border-t border-white/[0.06] py-2 text-center text-[10px] text-slate-700">
        © {new Date().getFullYear()} FansLocked · 18+ only
      </div>
    </footer>
  );
}

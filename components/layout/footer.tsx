import Link from "next/link";
import { listings } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#06060a]/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-3 py-10 sm:px-4 md:flex-row md:items-start md:justify-between md:px-6">
        <div className="space-y-2">
          <p className="font-display text-sm font-semibold text-white">
            The Porn Dude 2.0
          </p>
          <p className="max-w-md text-xs leading-relaxed text-slate-400">
            Editorial directory of {listings.length}+ third-party adult websites.
            We earn commissions from some outbound links at no extra cost to you
            — see our FTC disclosure. We never host explicit media on this
            domain.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
          <Link href="/explore" className="hover:text-amber-300">
            Explore
          </Link>
          <Link href="/categories" className="hover:text-amber-300">
            Categories
          </Link>
          <Link href="/blog" className="hover:text-amber-300">
            Blog
          </Link>
          <Link href="/privacy" className="hover:text-amber-300">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-amber-300">
            Terms
          </Link>
          <Link href="/disclosure" className="hover:text-amber-300">
            Affiliate disclosure
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-[11px] text-slate-600">
        © {new Date().getFullYear()} The Porn Dude 2.0 · 18+ only
      </div>
    </footer>
  );
}

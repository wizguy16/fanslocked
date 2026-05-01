import Link from "next/link";
import { FetishLogoMark } from "@/components/fetish/fetish-logo-mark";

const nav = [
  { href: "/explore", label: "Rankings" },
  { href: "/categories/fetish", label: "Fetish" },
  { href: "/explore", label: "Explore" },
  { href: "/blog", label: "Articles" },
  { href: "/disclosure", label: "About" },
];

export function MainHeader() {
  return (
    <header className="sticky top-0 z-[100] border-b border-white/[0.08] bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3.5 md:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-white no-underline"
        >
          <FetishLogoMark />
          <span className="text-[15px] font-bold tracking-tight text-white">
            FansLocked
          </span>
        </Link>

        <nav
          className="hidden flex-1 justify-center gap-10 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#d4d4d4] transition hover:text-[#f59e0b]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-4 md:gap-5">
          <Link
            href="/explore"
            className="hidden text-[12px] font-semibold uppercase tracking-[0.1em] text-[#d4d4d4] transition hover:text-[#f59e0b] sm:inline"
          >
            Sign in
          </Link>
          <Link
            href="/explore"
            className="rounded-lg bg-[#d97706] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0a0a0a] transition hover:bg-[#e88e12] md:px-5 md:text-[12px]"
          >
            Browse categories
          </Link>
        </div>
      </div>
    </header>
  );
}

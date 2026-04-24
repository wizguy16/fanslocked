import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/categories", label: "Categories" },
  { href: "/blog", label: "Blog" },
  { href: "/disclosure", label: "Disclosure" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-[100] border-b border-white/5 bg-[#0a0a0f]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight text-white transition hover:text-amber-200"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-bold text-black shadow-[0_0_24px_-6px_rgba(245,158,11,0.55)]"
            aria-hidden
          >
            2
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-500/90">
              The Porn Dude
            </span>
            <span className="text-base">2.0</span>
          </span>
          <span className="text-base sm:hidden">TPD 2.0</span>
        </Link>
        <nav
          className="flex items-center gap-0.5 overflow-x-auto sm:gap-1"
          aria-label="Primary"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-xl px-2 py-1.5 text-[11px] font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white sm:px-3 sm:text-sm"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/categories", label: "Categories" },
  { href: "/categories/fetish", label: "Fetish" },
  { href: "/blog", label: "Guides" },
  { href: "/disclosure", label: "Disclosure" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-[100] border-b border-white/[0.06] bg-[#0A0B10]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-1.5 sm:px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-white transition hover:text-[#FF7A00]"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF7A00] text-xs font-bold text-black"
            aria-hidden
          >
            FL
          </span>
          <span className="text-sm sm:text-base">FansLocked</span>
        </Link>
        <nav
          className="flex items-center gap-0.5 overflow-x-auto sm:gap-1"
          aria-label="Primary"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-lg px-2 py-1.5 text-[11px] font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white sm:px-3 sm:text-sm"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

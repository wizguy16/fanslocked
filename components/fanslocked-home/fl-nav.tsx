"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const center = [
  { href: "/explore", label: "Explore" },
  { href: "/categories", label: "Categories" },
  { href: "/explore?sort=trending", label: "Trending" },
];

/** Toggle account + overflow menu (login, submit site, ads, etc.). */
const showUserControls = false;

export function FlNav({ scrolled = false }: { scrolled?: boolean }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 shrink-0 border-b border-[rgba(255,255,255,0.04)] bg-[#0A0B10] px-6 transition-[box-shadow,background-color] duration-300 ease-out",
        scrolled &&
          "shadow-[0_10px_40px_-18px_rgba(0,0,0,0.85)] bg-[#0A0B10]/88 backdrop-blur-md",
      )}
    >
      <div className="mx-auto grid h-full max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 text-[14px] font-semibold tracking-tight text-white md:text-[15px]"
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#11131A] text-[11px] font-bold text-[#FF7A00] ring-1 ring-[rgba(255,255,255,0.04)]"
            aria-hidden
          >
            FL
          </span>
          <span className="truncate">FansLocked</span>
        </Link>

        <nav
          className="flex items-center justify-center gap-4 text-xs font-medium md:gap-8 md:text-sm"
          aria-label="Primary"
        >
          {center.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="whitespace-nowrap text-[#A0A6B1] transition-colors duration-200 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          {showUserControls ? (
            <>
              <button
                type="button"
                aria-label="Account"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.04)] bg-[#11131A] text-[#A0A6B1] transition hover:border-[rgba(255,255,255,0.08)] hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="More"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.04)] bg-[#11131A] text-[#A0A6B1] transition hover:border-[rgba(255,255,255,0.08)] hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="6" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="18" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </button>
            </>
          ) : (
            <span className="inline-block h-9 w-20 shrink-0" aria-hidden />
          )}
        </div>
      </div>
    </header>
  );
}

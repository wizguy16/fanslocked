"use client";

import Link from "next/link";
import { useRef } from "react";
import type { MegaMenuCategoryTile } from "@/lib/mega-menu-category-tiles";
import {
  CategoriesMegaChevron,
  CategoriesMegaMenuPanel,
  useCategoriesMegaMenu,
  type MegaMenuListingThumb,
} from "@/components/layout/categories-mega-menu";
import { cn } from "@/lib/utils";
import SiteSearch from "@/components/search/site-search";

export type NavbarListingThumb = MegaMenuListingThumb;

type NavItem =
  | { kind: "link"; href: string; label: string }
  | { kind: "categories-mega"; label: string };

const NAV_ITEMS: NavItem[] = [
  { kind: "link", href: "/", label: "Home" },
  { kind: "link", href: "/explore", label: "Explore" },
  { kind: "categories-mega", label: "Categories" },
  { kind: "link", href: "/categories/fetish", label: "Fetish" },
  { kind: "link", href: "/blog", label: "Guides" },
  { kind: "link", href: "/disclosure", label: "Disclosure" },
];

type SearchListing = {
  name: string;
  slug: string;
  category: string;
};

type Props = {
  topPicks: NavbarListingThumb[];
  popular: NavbarListingThumb[];
  megaTiles: MegaMenuCategoryTile[];
  searchListings: SearchListing[];
};

export function NavbarClient({
  topPicks,
  popular,
  megaTiles,
  searchListings,
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const mega = useCategoriesMegaMenu(rootRef, btnRef);

  return (
    <header
      ref={rootRef}
      className="relative sticky top-0 z-[100] border-b border-white/[0.08] bg-[#1a1a1a]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `repeating-linear-gradient(-36deg, transparent, transparent 4px, rgba(255,255,255,0.022) 4px, rgba(255,255,255,0.022) 5px)`,
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-7xl items-center gap-2 px-3 py-1.5 sm:gap-3 sm:px-4 md:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold tracking-tight text-white transition hover:text-[#00bcd4]"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00bcd4] text-xs font-bold text-[#0a0b10]"
            aria-hidden
          >
            FL
          </span>
          <span className="text-sm sm:text-base">FansLocked</span>
        </Link>

        <div className="mx-auto hidden min-w-0 max-w-md flex-1 px-1 md:block">
          <SiteSearch listings={searchListings} className="max-w-none" />
        </div>

        <div className="relative flex min-w-0 flex-1 justify-end md:flex-none">
          <nav
            className="flex items-center gap-0.5 overflow-x-auto sm:gap-1"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => {
              if (item.kind === "link") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="whitespace-nowrap px-2 py-2 text-[11px] font-medium text-[#b0b0b0] transition hover:text-white sm:px-3 sm:text-sm"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <button
                  key="categories-mega"
                  id={mega.triggerId}
                  ref={btnRef}
                  type="button"
                  aria-expanded={mega.megaOpen}
                  aria-controls={mega.panelId}
                  aria-haspopup="menu"
                  onClick={(e) => {
                    e.preventDefault();
                    mega.toggleMegaMenu();
                  }}
                  onMouseEnter={mega.onTriggerMouseEnter}
                  onMouseLeave={mega.onTriggerMouseLeave}
                  onKeyDown={mega.onCategoriesKeyDown}
                  className={cn(
                    "relative flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[11px] font-medium transition sm:text-sm",
                    mega.megaOpen
                      ? "text-white"
                      : "text-[#b0b0b0] hover:text-white",
                  )}
                  style={
                    mega.megaOpen
                      ? {
                          clipPath:
                            "polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)",
                          background: "rgba(255,255,255,0.14)",
                        }
                      : undefined
                  }
                >
                  <span className="relative z-[1]">{item.label}</span>
                  <CategoriesMegaChevron open={mega.megaOpen} />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl border-t border-white/[0.06] px-3 py-2 sm:px-4 md:hidden">
        <SiteSearch listings={searchListings} className="max-w-none" />
      </div>

      <CategoriesMegaMenuPanel
        megaOpen={mega.megaOpen}
        panelId={mega.panelId}
        triggerId={mega.triggerId}
        panelRef={mega.panelRef}
        topPicks={topPicks}
        popular={popular}
        megaTiles={megaTiles}
        closeMega={mega.closeMega}
        cancelHoverClose={mega.cancelHoverClose}
        scheduleHoverClose={mega.scheduleHoverClose}
      />
    </header>
  );
}

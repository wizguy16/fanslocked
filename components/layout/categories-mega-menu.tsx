"use client";

import Image from "next/image";
import Link from "next/link";
import type { MegaMenuCategoryTile } from "@/lib/mega-menu-category-tiles";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
  type RefObject,
} from "react";

export type MegaMenuListingThumb = {
  slug: string;
  name: string;
  image: string;
  screenshot?: string;
};

function thumbSrc(row: MegaMenuListingThumb) {
  return row.screenshot ?? row.image;
}

export function MegaSectionHeader({
  firstWord,
  rest = "",
  seeAllHref,
  showSeeAll = true,
  onNavigate,
}: {
  firstWord: string;
  rest?: string;
  seeAllHref?: string;
  showSeeAll?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-3 border-b border-white/[0.06] pb-2">
      <h2 className="text-left text-[13px] font-medium uppercase leading-snug tracking-[0.07em] text-[#b6bcc8]">
        <span className="inline-block border-b-2 border-primary pb-0.5">
          {firstWord}
        </span>
        {rest ? <span className="text-[#b6bcc8]">{rest}</span> : null}
      </h2>
      {showSeeAll && seeAllHref ? (
        <Link
          href={seeAllHref}
          role="menuitem"
          className="shrink-0 rounded-none border border-white/15 bg-transparent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#a3a3a3] transition-colors hover:border-primary/55 hover:text-white"
          onClick={onNavigate}
        >
          See All
        </Link>
      ) : null}
    </div>
  );
}

export function hoverMenusEnabled() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (min-width: 768px)").matches;
}

export function useCategoriesMegaMenu(
  headerRef: RefObject<HTMLElement | null>,
  btnRef: RefObject<HTMLButtonElement | null>,
) {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const triggerId = useId();
  const hoverLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusMenuOnOpenRef = useRef(false);

  const cancelHoverClose = useCallback(() => {
    if (hoverLeaveTimer.current) {
      clearTimeout(hoverLeaveTimer.current);
      hoverLeaveTimer.current = null;
    }
  }, []);

  const scheduleHoverClose = useCallback(() => {
    if (!hoverMenusEnabled()) return;
    cancelHoverClose();
    hoverLeaveTimer.current = setTimeout(() => {
      hoverLeaveTimer.current = null;
      setMegaOpen(false);
    }, 220);
  }, [cancelHoverClose]);

  const closeMega = useCallback(() => {
    cancelHoverClose();
    setMegaOpen(false);
  }, [cancelHoverClose]);

  const toggleMegaMenu = useCallback(() => {
    console.log("Categories clicked");
    focusMenuOnOpenRef.current = false;
    setMegaOpen((o) => !o);
  }, []);

  useEffect(() => {
    return () => cancelHoverClose();
  }, [cancelHoverClose]);

  useEffect(() => {
    closeMega();
  }, [pathname, closeMega]);

  useEffect(() => {
    if (!megaOpen) return;
    function onPointerDown(e: MouseEvent) {
      const t = e.target as Node;
      if (headerRef.current && !headerRef.current.contains(t)) closeMega();
    }
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        closeMega();
        btnRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen, closeMega, headerRef, btnRef]);

  useEffect(() => {
    if (!megaOpen || !focusMenuOnOpenRef.current) return;
    focusMenuOnOpenRef.current = false;
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });
  }, [megaOpen]);

  function onCategoriesKeyDown(e: ReactKeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Escape") {
      if (megaOpen) {
        e.preventDefault();
        closeMega();
        btnRef.current?.focus();
      }
      return;
    }
    if (
      !megaOpen &&
      (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")
    ) {
      e.preventDefault();
      focusMenuOnOpenRef.current = true;
      setMegaOpen(true);
      return;
    }
    if (megaOpen && e.key === "ArrowDown") {
      e.preventDefault();
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    }
  }

  return {
    megaOpen,
    toggleMegaMenu,
    closeMega,
    cancelHoverClose,
    scheduleHoverClose,
    panelId,
    triggerId,
    panelRef,
    focusMenuOnOpenRef,
    onCategoriesKeyDown,
    onTriggerMouseEnter: () => {
      cancelHoverClose();
      if (hoverMenusEnabled()) setMegaOpen(true);
    },
    onTriggerMouseLeave: scheduleHoverClose,
    onPanelMouseEnter: cancelHoverClose,
    onPanelMouseLeave: scheduleHoverClose,
  };
}

type CategoriesMegaMenuPanelProps = {
  megaOpen: boolean;
  panelId: string;
  triggerId: string;
  panelRef: RefObject<HTMLDivElement | null>;
  topPicks: MegaMenuListingThumb[];
  popular: MegaMenuListingThumb[];
  megaTiles: MegaMenuCategoryTile[];
  closeMega: () => void;
  cancelHoverClose: () => void;
  scheduleHoverClose: () => void;
};

export function CategoriesMegaMenuPanel({
  megaOpen,
  panelId,
  triggerId,
  panelRef,
  topPicks,
  popular,
  megaTiles,
  closeMega,
  cancelHoverClose,
  scheduleHoverClose,
}: CategoriesMegaMenuPanelProps) {
  if (!megaOpen) return null;

  return (
    <div
      ref={panelRef as Ref<HTMLDivElement>}
      id={panelId}
      role="menu"
      aria-labelledby={triggerId}
      onMouseEnter={cancelHoverClose}
      onMouseLeave={scheduleHoverClose}
      className="absolute left-0 right-0 top-full z-[110] border-t border-white/[0.06] bg-[#0d0d0d] shadow-[0_24px_48px_rgba(0,0,0,0.85)]"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-5 md:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.35fr)_minmax(0,1fr)] lg:gap-5 xl:gap-6">
          <section className="min-w-0" role="presentation">
            <MegaSectionHeader
              firstWord="Top"
              rest=" Picks"
              seeAllHref="/explore"
              onNavigate={closeMega}
            />
            <div className="grid grid-cols-2 gap-2">
              {topPicks.map((row) => (
                <Link
                  key={row.slug}
                  href={`/site/${row.slug}`}
                  role="menuitem"
                  className="group block min-w-0"
                  onClick={closeMega}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-none border border-white/[0.08] bg-[#111]">
                    <Image
                      src={thumbSrc(row)}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 45vw, 200px"
                      className="object-cover transition duration-200 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-1 line-clamp-2 text-left text-[11px] leading-snug text-[#a3a3a3]">
                    {row.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="min-w-0" role="presentation">
            <MegaSectionHeader firstWord="Categories" showSeeAll={false} />
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-3">
              {megaTiles.map((tile) => (
                <Link
                  key={tile.slug}
                  href={tile.href}
                  role="menuitem"
                  aria-label={tile.label}
                  className={cn(
                    "group relative block aspect-[3/2] w-full min-h-[72px] overflow-hidden rounded-none sm:min-h-0",
                    "border border-white/[0.08] transition-all duration-200 ease-out",
                    "hover:border-white/22 hover:shadow-[0_0_14px_-4px_var(--mega-glow)]",
                  )}
                  style={
                    {
                      "--mega-glow": tile.accentRgb
                        ? `rgba(${tile.accentRgb},0.42)`
                        : "rgba(255,45,85,0.38)",
                    } as CSSProperties
                  }
                  onClick={closeMega}
                >
                  <Image
                    src={tile.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 42vw, (max-width: 1024px) 18vw, 220px"
                    className="object-cover brightness-[0.88] transition-all duration-200 ease-out group-hover:scale-[1.03] group-hover:brightness-[0.96]"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-[1] w-full overflow-hidden bg-black/30 px-2 py-1">
                    <span className="line-clamp-2 text-left text-[11px] leading-snug text-[#d4d4d4]">
                      {tile.menuTitle}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Link
                href="/categories"
                role="menuitem"
                onClick={closeMega}
                className={cn(
                  "inline-flex min-w-[11rem] items-center justify-center rounded-none px-6 py-2.5",
                  "bg-primary text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground",
                  "transition-colors hover:bg-primary/90",
                )}
              >
                View all categories
              </Link>
            </div>
          </section>

          <section className="min-w-0" role="presentation">
            <MegaSectionHeader
              firstWord="Popular"
              seeAllHref="/explore"
              onNavigate={closeMega}
            />
            <div className="grid grid-cols-2 gap-2">
              {popular.map((row) => (
                <Link
                  key={row.slug}
                  href={`/site/${row.slug}`}
                  role="menuitem"
                  className="group block min-w-0"
                  onClick={closeMega}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-none border border-white/[0.08] bg-[#111]">
                    <Image
                      src={thumbSrc(row)}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 45vw, 200px"
                      className="object-cover transition duration-200 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-1 line-clamp-2 text-left text-[11px] leading-snug text-[#a3a3a3]">
                    {row.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-3 flex justify-center pb-1">
          <div className="h-0.5 w-28 bg-primary" aria-hidden />
        </div>
      </div>
    </div>
  );
}

export function CategoriesMegaChevron({ open }: { open: boolean }) {
  return open ? (
    <ChevronUp
      className="relative z-[1] size-3.5 shrink-0 opacity-90"
      aria-hidden
      strokeWidth={2.25}
    />
  ) : (
    <ChevronDown
      className="relative z-[1] size-3.5 shrink-0 opacity-90"
      aria-hidden
      strokeWidth={2.25}
    />
  );
}

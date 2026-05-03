"use client";

/**
 * Bottom-of-home “Top picks” band — dark, visual-first card + sidebar carousel.
 * Renders after the main lane spotlight; last homepage section before layout Newsletter.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Listing } from "@/types/listing";
import {
  getHomeListingTierLabels,
  type HomeIntentId,
} from "@/lib/home-intent";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";
import { listingScreenshotImageSrc } from "@/lib/listing-site-images";
import { clampTagline, cn } from "@/lib/utils";
import { BTN_SECONDARY_OUTLINE } from "@/components/category/sections/category-prestige-styles";

type Props = {
  items: Listing[];
  activeIntent: HomeIntentId;
  laneSubtitle: string;
  valueStrip: readonly [string, string, string];
};

const SUBTITLE_PEEK_MS = 5200;

function hookLine(listing: Listing): string {
  const raw = (listing.preview ?? listing.description).trim().replace(/\s+/g, " ");
  const sentenceEnd = raw.search(/[.!?](\s|$)/);
  if (sentenceEnd > 0 && sentenceEnd <= 160) {
    return raw.slice(0, sentenceEnd + 1);
  }
  return clampTagline(raw, 140);
}

function traitChips(listing: Listing): string[] {
  const chips: string[] = [];
  if (listing.tag?.trim()) chips.push(listing.tag.trim());
  for (const t of listing.tags) {
    const x = t.trim();
    if (x && !chips.includes(x) && chips.length < 4) chips.push(x);
  }
  if (chips.length === 0) chips.push(listing.categoryLabel);
  return chips.slice(0, 4);
}

function showcaseBadge(index: number, tierLabels: readonly string[]): string {
  if (index < tierLabels.length) return tierLabels[index]!;
  return `Pick ${index + 1}`;
}

/** Sidebar “location” pill — listing has no geo; use category + tag for scan-friendly context */
function contextPill(l: Listing): string {
  const tag = l.tags[0]?.trim();
  if (tag) return tag;
  return l.categoryLabel;
}

function pickSuggestionListings(
  items: Listing[],
  currentIndex: number,
  want: number,
): Listing[] {
  const n = items.length;
  const out: Listing[] = [];
  if (n <= 1) return out;
  let step = 1;
  while (out.length < want && step < n * 2) {
    const idx = (currentIndex + step) % n;
    if (idx !== currentIndex) {
      const cand = items[idx]!;
      if (!out.some((x) => x.id === cand.id)) out.push(cand);
    }
    step++;
  }
  return out;
}

function SectionRailTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span
        className="h-4 w-0.5 shrink-0 rounded-full bg-primary"
        aria-hidden
      />
      <h3 className="text-sm font-semibold tracking-tight text-white">
        {children}
      </h3>
    </div>
  );
}

function AdCornerBadge() {
  return (
    <span
      className="rounded border border-white/35 bg-black/40 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-[2px]"
      aria-label="Advertisement"
    >
      Ad
    </span>
  );
}

export function HomeTopPicksShowcase({
  items,
  activeIntent,
  laneSubtitle,
  valueStrip,
}: Props) {
  const [index, setIndex] = useState(0);
  const [peekSubtitle, setPeekSubtitle] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const tierLabels = useMemo(
    () => getHomeListingTierLabels(activeIntent),
    [activeIntent],
  );

  const ids = useMemo(() => items.map((x) => x.id).join(","), [items]);

  useEffect(() => {
    setIndex(0);
  }, [ids]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    setPeekSubtitle(true);
  }, [activeIntent, prefersReducedMotion]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReducedMotion) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setPeekSubtitle(true);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: [0, 0.05, 0.1] },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!peekSubtitle || prefersReducedMotion) return;
    const id = window.setTimeout(() => setPeekSubtitle(false), SUBTITLE_PEEK_MS);
    return () => clearTimeout(id);
  }, [peekSubtitle, activeIntent, prefersReducedMotion]);

  const n = items.length;
  const safeIndex = n === 0 ? 0 : ((index % n) + n) % n;
  const listing = items[safeIndex];
  const link = listing ? outboundLinkProps(listing) : null;
  const badge = showcaseBadge(safeIndex, tierLabels);
  const traits = listing ? traitChips(listing) : [];
  const hook = listing ? hookLine(listing) : "";

  const screenshotSrc = listing
    ? listingScreenshotImageSrc(
        listing.slug,
        listing.categorySlug,
        listing.image,
      )
    : "";

  const suggestionListings = useMemo(
    () => pickSuggestionListings(items, safeIndex, 2),
    [items, safeIndex],
  );

  const bottomAdListing = useMemo(() => {
    if (n < 4) return null;
    const idx = (safeIndex + 3) % n;
    const cand = items[idx]!;
    if (cand.id === listing.id) return null;
    return cand;
  }, [n, safeIndex, items, listing.id]);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (n === 0) return;
      setIndex((i) => (i + dir + n) % n);
    },
    [n],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    },
    [go],
  );

  if (n === 0) return null;

  const slideTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-[1600px] px-6 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
      aria-label="Top picks for this lane"
      aria-describedby="home-top-picks-subtitle"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <span id="home-top-picks-subtitle" className="sr-only">
        {laneSubtitle}
      </span>

      <header className="mb-8 text-center md:mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
          Top picks
        </h2>
        {prefersReducedMotion ? (
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
            {laneSubtitle}
          </p>
        ) : (
          <motion.div
            className="mx-auto max-w-2xl overflow-hidden"
            initial={false}
            animate={{
              maxHeight: peekSubtitle ? 120 : 0,
              opacity: peekSubtitle ? 1 : 0,
              marginTop: peekSubtitle ? 12 : 0,
            }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm leading-relaxed text-neutral-400 md:text-base">
              {laneSubtitle}
            </p>
          </motion.div>
        )}
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="relative isolate lg:col-span-8">
          {/* Carousel shell: card + floating controls share one positioning context */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-none border border-white/[0.09] bg-[#292929] shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)]">
            {/* Pagination — top-center on the card, compact (matches reference) */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center px-3 pt-2"
              role="group"
              aria-label="Top picks slides"
            >
              <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/[0.08] bg-black/50 px-2 py-1 shadow-lg backdrop-blur-sm">
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={i === safeIndex ? "true" : undefined}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i === safeIndex
                        ? "h-1 w-5 bg-primary"
                        : "h-1 w-1 bg-white/30 hover:bg-white/45",
                    )}
                    onClick={() => setIndex(i)}
                    aria-label={`Show listing ${i + 1} of ${n}`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={listing.id}
                className="flex min-h-0 flex-col md:flex-row"
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, x: 18 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: -14 }
                }
                transition={slideTransition}
              >
                <div className="relative h-[min(52vw,280px)] shrink-0 overflow-hidden md:h-auto md:min-h-[360px] md:w-[44%]">
                  <div className="group relative h-full min-h-[inherit] w-full">
                    {/* Screenshots: local manifest + remote URLs */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={screenshotSrc}
                      alt={`${listing.name} preview`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/85 via-[#1A1A1A]/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#292929]/95"
                      aria-hidden
                    />
                    <div className="absolute left-3 top-9 z-10 flex flex-wrap gap-2 md:left-4 md:top-10">
                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow-md sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.2em]"
                        style={{ backgroundColor: "rgba(0,0,0,0.72)" }}
                      >
                        {badge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6 md:p-8">
                  <div className="space-y-4">
                    <span className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
                      {listing.categoryLabel}
                    </span>
                    <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
                      {listing.name}
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                      {hook}
                    </p>
                    {traits.length > 0 ? (
                      <div
                        className="flex flex-wrap gap-2 pt-1"
                        aria-label="Listing details"
                      >
                        {traits.map((t) => (
                          <span
                            key={t}
                            className="rounded-none border border-white/10 bg-black/30 px-2.5 py-1 text-xs font-medium text-neutral-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-end">
                    <Link
                      href={`/site/${listing.slug}`}
                      className={cn(
                        BTN_SECONDARY_OUTLINE,
                        "inline-flex min-h-[44px] items-center justify-center px-5 py-2.5 text-center text-xs uppercase tracking-[0.14em]",
                      )}
                    >
                      View more
                    </Link>
                    {link ? (
                      <a
                        {...link}
                        className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-2.5 text-center text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
                      >
                        Visit
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-40 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-[#292929]/90 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-black md:h-9 md:w-9 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
              aria-label="Previous listing"
            >
              <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-40 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-[#292929]/90 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-black md:h-9 md:w-9 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
              aria-label="Next listing"
            >
              <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        <aside className="flex flex-col gap-6 lg:col-span-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={listing.id}
              className="flex flex-col gap-6"
              initial={
                prefersReducedMotion ? false : { opacity: 0.85, y: 8 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 0, y: -6 }
              }
              transition={{
                duration: prefersReducedMotion ? 0.12 : 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Premium slot — full-bleed image, syncs with carousel */}
              <div>
                <SectionRailTitle>Featured partner</SectionRailTitle>
                {link ? (
                  <a
                    {...link}
                    className="group relative block overflow-hidden rounded-none border border-white/[0.12] bg-[#292929] shadow-[0_20px_50px_-28px_rgba(0,0,0,0.95)] outline-none transition-[transform,box-shadow,border-color] hover:border-primary/35 hover:shadow-[0_28px_60px_-24px_rgba(201,0,9,0.22)] focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
                    aria-label={`Visit ${listing.name} — sponsored`}
                  >
                    <div className="relative aspect-[3/4] max-h-[min(72vw,340px)] w-full sm:aspect-[4/5] sm:max-h-[380px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={screenshotSrc}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent"
                        aria-hidden
                      />
                      <p className="absolute bottom-14 left-4 right-4 text-center font-display text-xl font-extrabold italic leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] sm:text-2xl">
                        {clampTagline(listing.name, 42)}
                      </p>
                      <span className="absolute bottom-4 left-4 rounded-full bg-black/75 px-2.5 py-1 text-[11px] font-medium text-white/95 backdrop-blur-[2px]">
                        {contextPill(listing)}
                      </span>
                      <span className="absolute bottom-4 right-4">
                        <AdCornerBadge />
                      </span>
                    </div>
                  </a>
                ) : null}
              </div>

              {/* Smart suggestions — rotate with carousel */}
              <div>
                <SectionRailTitle>More like this</SectionRailTitle>
                <div className="grid grid-cols-2 gap-3">
                  {[0, 1].map((slot) => {
                    const sug = suggestionListings[slot];
                    if (!sug) {
                      return (
                        <Link
                          key={`placeholder-${slot}`}
                          href={`/category/${listing.categorySlug}`}
                          className="flex aspect-square flex-col justify-end rounded-none border border-dashed border-white/18 bg-[#292929] p-3 transition-colors hover:border-primary/35"
                        >
                          <span className="text-[11px] font-semibold text-white/90">
                            Explore lane
                          </span>
                          <span className="mt-1 text-[10px] leading-snug text-white/45">
                            Similar picks in{" "}
                            <span className="text-white/70">
                              {listing.categoryLabel}
                            </span>
                          </span>
                        </Link>
                      );
                    }
                    const sugSrc = listingScreenshotImageSrc(
                      sug.slug,
                      sug.categorySlug,
                      sug.image,
                    );
                    const sugLink = outboundLinkProps(sug);
                    return (
                      <a
                        key={sug.id}
                        {...sugLink}
                        className="group relative aspect-square overflow-hidden rounded-none border border-white/[0.1] bg-[#292929] outline-none transition-[transform,border-color] hover:z-[1] hover:-translate-y-0.5 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/50"
                        aria-label={`Visit ${sug.name}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sugSrc}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                          aria-hidden
                        />
                        <div className="absolute inset-x-0 bottom-0 p-2.5">
                          <p className="line-clamp-2 text-left text-[11px] font-bold leading-tight text-white">
                            {sug.name}
                          </p>
                          <p className="mt-0.5 text-left text-[9px] font-medium uppercase tracking-wider text-white/50">
                            Tap to visit
                          </p>
                        </div>
                        <span className="absolute right-2 top-2">
                          <AdCornerBadge />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Trending / monetization tail */}
              <div className="rounded-none border border-white/[0.08] bg-[#292929] p-4">
                <SectionRailTitle>Trending now</SectionRailTitle>
                <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                  {valueStrip[2]}
                </p>
                {bottomAdListing ? (
                  <a
                    {...outboundLinkProps(bottomAdListing)}
                    className="group relative mb-4 block overflow-hidden rounded-none border border-white/10"
                  >
                    <div className="relative aspect-[21/9] w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={listingScreenshotImageSrc(
                          bottomAdListing.slug,
                          bottomAdListing.categorySlug,
                          bottomAdListing.image,
                        )}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                      <div className="absolute inset-y-0 left-3 flex max-w-[70%] flex-col justify-center">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                          Hot pick
                        </span>
                        <span className="mt-0.5 line-clamp-2 text-sm font-bold text-white">
                          {bottomAdListing.name}
                        </span>
                      </div>
                      <span className="absolute bottom-2 right-2">
                        <AdCornerBadge />
                      </span>
                    </div>
                  </a>
                ) : null}
                <Link
                  href={`/category/${listing.categorySlug}`}
                  className={cn(
                    BTN_SECONDARY_OUTLINE,
                    "flex w-full items-center justify-center py-3 text-center text-sm font-semibold",
                  )}
                >
                  Browse all in {listing.categoryLabel}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>
    </section>
  );
}

"use client";

/**
 * Unified homepage lane spotlight — single decision card per intent.
 * Outer shell + inner card; backdrop shifts with carousel index.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ScrollText,
} from "lucide-react";
import type { Listing } from "@/types/listing";
import {
  getHomeListingTierLabels,
  type HomeIntentId,
} from "@/lib/home-intent";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";
import { ListingLogo } from "@/components/shared/listing-logo";
import { clampTagline, cn } from "@/lib/utils";

type Props = {
  items: Listing[];
  activeIntent: HomeIntentId;
  laneTitle: string;
  laneSubtitle: string;
  valueStrip: readonly [string, string, string];
};

/** Warm outer frames — contrasts with inner dark card (Slam Dunk–style rim). */
const OUTER_SHELL_BG = [
  "#4a3020",
  "#352028",
  "#283040",
  "#383018",
  "#302828",
  "#223028",
  "#402428",
  "#283818",
] as const;

/** Radial washes behind listing — keyed by carousel index. */
const INNER_BACKDROP = [
  "radial-gradient(ellipse 75% 60% at 50% 38%, rgba(255,77,128,0.20), transparent 58%)",
  "radial-gradient(ellipse 75% 60% at 50% 38%, rgba(254,107,0,0.18), transparent 58%)",
  "radial-gradient(ellipse 75% 60% at 50% 38%, rgba(168,85,247,0.14), transparent 58%)",
  "radial-gradient(ellipse 75% 60% at 50% 38%, rgba(56,189,248,0.12), transparent 58%)",
  "radial-gradient(ellipse 75% 60% at 50% 38%, rgba(251,191,36,0.10), transparent 58%)",
  "radial-gradient(ellipse 75% 60% at 50% 38%, rgba(244,114,182,0.16), transparent 58%)",
  "radial-gradient(ellipse 75% 60% at 50% 38%, rgba(52,211,153,0.10), transparent 58%)",
  "radial-gradient(ellipse 75% 60% at 50% 38%, rgba(248,113,113,0.12), transparent 58%)",
] as const;

const SUBTITLE_PEEK_MS = 5200;

/**
 * Full-bleed “mural” watermark — reference-scale type; only eases down slightly for long names.
 */
function muralWatermarkFontSize(name: string): string {
  const len = name.trim().length;
  const over = Math.max(0, len - 8);
  const vw = Math.max(17, 30 - over * 0.48);
  const maxRem = Math.max(7, 15 - over * 0.14);
  return `clamp(4.75rem, ${vw}vw, ${maxRem}rem)`;
}

function spotlightBadge(index: number, tierLabels: readonly string[]): string {
  if (index < tierLabels.length) return tierLabels[index]!;
  return `#${index + 1}`;
}

const VALUE_STRIP_ICONS: LucideIcon[] = [Boxes, MessageCircle, ScrollText];

function CreatorLaneValueExpandPills({
  labels,
}: {
  labels: readonly [string, string, string];
}) {
  const reduced = useReducedMotion();

  return (
    <div
      className="mt-3 flex w-full shrink-0 flex-col items-start gap-2 sm:mt-4 sm:gap-2.5"
      role="list"
      aria-label="What you get in this lane"
    >
      {labels.map((text, i) => (
        <CreatorValueExpandPill
          key={text}
          text={text}
          Icon={VALUE_STRIP_ICONS[i] ?? Boxes}
          prefersReducedMotion={reduced}
        />
      ))}
    </div>
  );
}

function CreatorValueExpandPill({
  text,
  Icon,
  prefersReducedMotion,
}: {
  text: string;
  Icon: LucideIcon;
  prefersReducedMotion: boolean | null;
}) {
  const [open, setOpen] = useState(false);

  const spring = prefersReducedMotion
    ? { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const }
    : {
        type: "spring" as const,
        stiffness: 420,
        damping: 36,
        mass: 0.82,
      };

  const fade = prefersReducedMotion
    ? { duration: 0.12 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.button
      type="button"
      role="listitem"
      layout
      className={cn(
        "relative flex max-w-[min(100%,380px)] cursor-pointer items-center overflow-hidden rounded-full border bg-white/[0.06] text-left outline-none",
        "ring-offset-2 ring-offset-[#14161c] focus-visible:ring-2 focus-visible:ring-[#ff4d80]/70",
      )}
      initial={false}
      animate={{
        maxWidth: open ? 380 : 48,
        borderColor: open ? "rgba(255,122,0,0.5)" : "rgba(255,255,255,0.1)",
        boxShadow: open
          ? "0 0 22px -6px rgba(255,77,128,0.45), inset 0 1px 0 rgba(255,255,255,0.07)"
          : "0 2px 12px -8px rgba(0,0,0,0.45)",
        scale: open ? 1.02 : 1,
      }}
      transition={spring}
      whileTap={{ scale: open ? 0.995 : 0.97 }}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-expanded={open}
      aria-label={text}
    >
      <span
        className="flex h-10 w-12 shrink-0 items-center justify-center self-center rounded-full bg-white/[0.05] pl-0.5"
        aria-hidden
      >
        <Icon className="h-4 w-4 text-[#FF7A00]" strokeWidth={2} />
      </span>
      <motion.span
        className="min-w-0 whitespace-nowrap py-2 pr-4 text-left text-sm leading-snug text-neutral-200"
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          x: open ? 0 : -10,
        }}
        transition={fade}
      >
        {text}
      </motion.span>
    </motion.button>
  );
}

export function HomeLaneSpotlight({
  items,
  activeIntent,
  laneTitle,
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

  /** Peek lane subtitle when intent changes or section enters view — then auto-hide (saves space). */
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
  const badge = spotlightBadge(safeIndex, tierLabels);
  const blurb = listing
    ? clampTagline(listing.description, 200)
    : "";

  const backdropIdx = safeIndex % INNER_BACKDROP.length;
  const shellIdx = safeIndex % OUTER_SHELL_BG.length;

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

  return (
    <section
      ref={sectionRef}
      className="relative mt-6 outline-none sm:mt-8 focus-visible:ring-2 focus-visible:ring-[#ff4d80]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0B10]"
      aria-label={`${laneTitle} spotlight`}
      aria-describedby="home-lane-subtitle-live"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {/* Always expose subtitle text for AT / SEO while visually tucking the paragraph */}
      <span id="home-lane-subtitle-live" className="sr-only">
        {laneSubtitle}
      </span>

      <motion.div
        className="rounded-[28px] p-[10px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.65)] sm:p-3 md:p-4"
        initial={false}
        animate={{
          backgroundColor: OUTER_SHELL_BG[shellIdx],
        }}
        transition={{ duration: prefersReducedMotion ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={cn(
            "relative flex max-h-[min(92dvh,920px)] min-h-0 flex-col overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#121318] shadow-inner",
            "p-4 sm:p-5 md:p-7 lg:p-8",
          )}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden
            initial={false}
            animate={{
              background: INNER_BACKDROP[backdropIdx],
            }}
            transition={{
              duration: prefersReducedMotion ? 0.15 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* No header-only bg/blur — that read as a horizontal opacity seam against the mural */}
          <header className="relative z-10 shrink-0 px-3 py-3 text-center sm:px-5 sm:py-4">
            <h2 className="text-xl font-semibold tracking-tight text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.92),0_1px_2px_rgba(0,0,0,0.9)] sm:text-2xl md:text-3xl lg:text-4xl">
              {laneTitle}
            </h2>

            {prefersReducedMotion ? (
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-neutral-300 [text-shadow:0_2px_20px_rgba(0,0,0,0.85)] md:text-base lg:text-lg">
                {laneSubtitle}
              </p>
            ) : (
              <motion.div
                className="mx-auto max-w-3xl overflow-hidden"
                initial={false}
                animate={{
                  maxHeight: peekSubtitle ? 160 : 0,
                  opacity: peekSubtitle ? 1 : 0,
                  marginTop: peekSubtitle ? 12 : 0,
                }}
                transition={{
                  duration: 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="text-sm leading-relaxed text-neutral-300 [text-shadow:0_2px_18px_rgba(0,0,0,0.88)] md:text-base lg:text-lg">
                  {laneSubtitle}
                </p>
              </motion.div>
            )}

            <CreatorLaneValueExpandPills labels={valueStrip} />
          </header>

          {/* Mural-scale background word — centered in card, behind hero; not tied to icon position */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
            aria-hidden
          >
            <span
              className="block w-full max-w-[108%] overflow-hidden whitespace-nowrap px-2 text-center font-black uppercase leading-[0.92] tracking-[-0.04em] text-white/[0.06] sm:px-3"
              style={{ fontSize: muralWatermarkFontSize(listing.name) }}
            >
              {listing.name}
            </span>
          </div>

          <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6 md:right-8 md:top-8">
            <span className="inline-block rounded-full bg-[#fe6b00] px-3 py-1 font-semibold uppercase tracking-[0.12em] text-black shadow-[0_0_15px_rgba(254,107,0,0.3)] [font-size:10px] sm:px-4 sm:py-1.5 sm:text-xs">
              {badge}
            </span>
          </div>

          {/* Hero — above footer row (z-10) so outbound link stays clickable */}
          <div className="relative z-30 flex min-h-0 flex-1 flex-col items-center justify-center gap-5 py-5 sm:gap-6 sm:py-6 md:py-8">
            <div className="pointer-events-none absolute h-[min(52vw,260px)] w-[min(52vw,260px)] rounded-full bg-[#ff4d80]/10 blur-[80px]" />
            {/* mode="wait": previous logo exits before next mounts — avoids stacked imgs when paging */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={listing.id}
                className="relative isolate flex h-[min(28vw,7.5rem)] w-[min(28vw,7.5rem)] shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 shadow-2xl shadow-black/50 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40"
                initial={
                  prefersReducedMotion ? false : { opacity: 0 }
                }
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <ListingLogo
                  listing={listing}
                  slotShape="circle"
                  className="h-full w-full"
                />
              </motion.div>
            </AnimatePresence>

            {link ? (
              <a
                key={listing.id}
                {...link}
                className={cn(
                  "pointer-events-auto group relative z-40 inline-flex max-w-[min(100%,17rem)] items-center justify-center gap-1.5 overflow-hidden rounded-full",
                  "border border-[#FF7A00]/50 bg-transparent px-6 py-3",
                  "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF7A00]",
                  "transition-[transform,box-shadow,border-color,background-color,color] duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:border-[#FF7A00] hover:bg-[#FF7A00]/[0.08] hover:text-[#FFA04D]",
                  "hover:shadow-[0_0_20px_-6px_rgba(255,122,0,0.4)] active:translate-y-0 active:scale-[0.98]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7A00]/70",
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#FF7A00]/10 to-transparent opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:translate-x-full group-hover:opacity-100"
                />
                <span className="relative">Visit site</span>
                <span
                  aria-hidden
                  className="relative transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            ) : null}
          </div>

          <div className="relative z-10 mt-auto flex min-h-0 w-full shrink-0 flex-col gap-5 pt-3 sm:gap-6 sm:pt-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:pt-5">
            <div className="min-w-0 max-w-xl flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={listing.id}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 14, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -10, filter: "blur(4px)" }
                  }
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="mb-2 text-2xl font-extrabold uppercase tracking-tight text-[#e2e2e8] drop-shadow-lg sm:mb-3 sm:text-3xl md:text-4xl lg:text-5xl lg:leading-[3.25rem]">
                    {listing.name}
                  </h3>
                  <p className="max-w-md border-l-2 border-[#5d3f44] pl-3 text-sm leading-relaxed text-[#e6bcc2] sm:pl-4 sm:text-base md:text-lg md:leading-7">
                    {blurb}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex w-full shrink-0 justify-end gap-2 sm:gap-3 lg:w-auto lg:self-end">
              <button
                type="button"
                onClick={() => go(-1)}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#282a2e] text-[#e2e2e8] transition-all duration-300 hover:border-white/20 hover:bg-[#37393e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4d80]/50 sm:h-12 sm:w-12 md:h-14 md:w-14"
                aria-label="Previous platform"
              >
                <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1 sm:h-6 sm:w-6" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#282a2e] text-[#e2e2e8] transition-all duration-300 hover:border-white/20 hover:bg-[#37393e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4d80]/50 sm:h-12 sm:w-12 md:h-14 md:w-14"
                aria-label="Next platform"
              >
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

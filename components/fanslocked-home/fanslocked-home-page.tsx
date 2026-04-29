"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  getCategorySlugForIntent,
  getHeroKeywordForIntent,
  getHomeLaneExperience,
  getLaneListingCap,
  HOME_HERO_KEYWORD_CYCLE,
  isTrafficAcquisitionLane,
} from "@/lib/home-intent";
import { CATEGORIES } from "@/lib/categories";
import { getCategoryBySlug, getListingsByCategorySlug } from "@/lib/data";
import { FlNav } from "@/components/fanslocked-home/fl-nav";
import { FlHero } from "@/components/fanslocked-home/fl-hero";
import { FlCategoryStrip } from "@/components/fanslocked-home/fl-category-strip";
import { HomeLaneSpotlight } from "@/components/fanslocked-home/home-lane-spotlight";
import { HomeLaneTubeFunnel } from "@/components/fanslocked-home/home-lane-tube-funnel";
import { HomeTopPicksShowcase } from "@/components/fanslocked-home/home-top-picks-showcase";
import { useHomePageIntent } from "@/components/fanslocked-home/use-home-page-intent";

const STRIP = CATEGORIES;

export function FanslockedHomePage() {
  const { activeIntent, heroKeywordIdle, handleIntentChange } =
    useHomePageIntent();
  const [scrolled, setScrolled] = useState(false);
  const [idleCycleIndex, setIdleCycleIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const contentSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const allowIdle = heroKeywordIdle && !reduceMotion;
    if (!allowIdle) return;
    const t = window.setInterval(() => {
      setIdleCycleIndex(
        (i) => (i + 1) % HOME_HERO_KEYWORD_CYCLE.length,
      );
    }, 2800);
    return () => clearInterval(t);
  }, [heroKeywordIdle, reduceMotion]);

  const activeSlug = useMemo(
    () => getCategorySlugForIntent(activeIntent),
    [activeIntent],
  );

  const listingCap = useMemo(
    () => getLaneListingCap(activeIntent),
    [activeIntent],
  );

  const laneXp = useMemo(
    () => getHomeLaneExperience(activeIntent),
    [activeIntent],
  );

  const heroKeyword = useMemo(() => {
    const idle =
      heroKeywordIdle && !reduceMotion;
    if (!idle) {
      return getHeroKeywordForIntent(activeIntent);
    }
    const id = HOME_HERO_KEYWORD_CYCLE[idleCycleIndex]!;
    return getHeroKeywordForIntent(id);
  }, [heroKeywordIdle, reduceMotion, activeIntent, idleCycleIndex]);

  const sectionBlock = useMemo(() => {
    const base = getListingsByCategorySlug(activeSlug);
    const sorted = [...base].sort((a, b) => b.rating - a.rating);
    const meta = getCategoryBySlug(activeSlug);
    const picks = sorted.slice(0, listingCap);
    return {
      slug: activeSlug,
      label: meta?.label ?? activeSlug,
      picks,
      empty: picks.length === 0,
    };
  }, [activeSlug, listingCap]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setupReveal = useCallback(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".section-reveal");
    if (!nodes.length) return () => {};

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "24px 0px -6% 0px", threshold: [0, 0.08, 0.15] },
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let disposeReveal: (() => void) | undefined;
    const rafId = requestAnimationFrame(() => {
      disposeReveal = setupReveal();
    });
    return () => {
      cancelAnimationFrame(rafId);
      disposeReveal?.();
    };
  }, [sectionBlock, setupReveal]);

  const { slug, label, picks, empty } = sectionBlock;
  const showTubeFunnel = isTrafficAcquisitionLane(activeIntent);

  return (
    <div className="min-h-[100dvh] bg-[#0A0B10] text-white">
      <FlNav scrolled={scrolled} />
      <FlHero
        activeIntent={activeIntent}
        heroKeyword={heroKeyword}
        onIntentChange={handleIntentChange}
      />
      <FlCategoryStrip categories={STRIP} scrolled={scrolled} />
      
      <div className="mx-auto max-w-[1600px] pb-16 pt-8">
        <div ref={contentSectionRef} className="relative z-0 isolate">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIntent}
              className="section-reveal relative z-0 scroll-mt-[7.75rem]"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                id="lane-section"
                className="scroll-mt-[7.75rem]"
                role="region"
                aria-label={label}
              >
                <div className="border-t border-white/5 py-16 md:py-20">
                  <div id={slug} className="space-y-0 px-6">
                    {empty ? (
                      <p className="text-center text-sm text-[#6B7280]">
                        No listings in{" "}
                        <span className="text-[#A0A6B1]">{label}</span> yet.
                      </p>
                    ) : (
                      <HomeLaneSpotlight
                        activeIntent={activeIntent}
                        items={picks}
                        laneTitle={laneXp.contextTitle}
                        laneSubtitle={laneXp.contextDescription}
                        valueStrip={laneXp.valueStrip}
                      />
                    )}
                  </div>
                </div>

                {!showTubeFunnel && !empty && picks.length > 0 ? (
                  <div className="border-t border-white/5 py-16 md:py-20">
                    <HomeTopPicksShowcase
                      activeIntent={activeIntent}
                      items={picks}
                      laneSubtitle={laneXp.contextDescription}
                      valueStrip={laneXp.valueStrip}
                    />
                  </div>
                ) : null}
                {showTubeFunnel ? (
                  <div className="border-t border-white/5 py-16 md:py-20">
                    <HomeLaneTubeFunnel onSwitchLane={handleIntentChange} />
                  </div>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

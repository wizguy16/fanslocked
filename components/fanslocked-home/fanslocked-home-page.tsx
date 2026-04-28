"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_HOME_INTENT,
  getCategorySlugForIntent,
  getHomeLaneExperience,
  getLaneListingCap,
  HOME_INTENT_STORAGE_KEY,
  isHomeIntentId,
  isTrafficAcquisitionLane,
  type HomeIntentId,
} from "@/lib/home-intent";
import { CATEGORIES } from "@/lib/categories";
import { getCategoryBySlug, getListingsByCategorySlug } from "@/lib/data";
import { FlNav } from "@/components/fanslocked-home/fl-nav";
import { FlHero } from "@/components/fanslocked-home/fl-hero";
import { FlCategoryStrip } from "@/components/fanslocked-home/fl-category-strip";
import { FlFeaturedRow } from "@/components/fanslocked-home/fl-featured-row";
import { SectionHeader } from "@/components/ui/section-header";
import { HomeLaneTubeFunnel } from "@/components/fanslocked-home/home-lane-tube-funnel";
import { HomeLaneUpgradePaths } from "@/components/fanslocked-home/home-lane-upgrade-paths";
import { HomeLaneValueStrip } from "@/components/fanslocked-home/home-lane-value-strip";

const STRIP = CATEGORIES;

export function FanslockedHomePage() {
  const [activeIntent, setActiveIntent] =
    useState<HomeIntentId>(DEFAULT_HOME_INTENT);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HOME_INTENT_STORAGE_KEY);
      if (stored && isHomeIntentId(stored)) {
        setActiveIntent(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

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

  function persistIntent(id: HomeIntentId) {
    try {
      localStorage.setItem(HOME_INTENT_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }

  function handleIntentChange(id: HomeIntentId) {
    const changed = id !== activeIntent;
    setActiveIntent(id);
    persistIntent(id);
    if (changed && typeof document !== "undefined") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById("lane-section")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      });
    }
  }

  const { slug, label, picks, empty } = sectionBlock;
  const showTubeFunnel = isTrafficAcquisitionLane(activeIntent);

  return (
    <div className="min-h-[100dvh] bg-[#0A0B10] text-white">
      <FlNav scrolled={scrolled} />
      <FlHero activeIntent={activeIntent} onIntentChange={handleIntentChange} />
      <FlCategoryStrip categories={STRIP} scrolled={scrolled} />

      <div className="mx-auto max-w-[1600px] pb-16 pt-8">
        <div
          key={activeIntent}
          className="animate-home-intent-fade section-reveal scroll-mt-[7.75rem]"
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
                  <>
                    <SectionHeader
                      variant="centered"
                      title={laneXp.contextTitle}
                      subtitle={laneXp.contextDescription}
                      viewAllHref={`/categories/${slug}`}
                    />
                    <HomeLaneValueStrip items={laneXp.valueStrip} />
                    <FlFeaturedRow items={picks} tieredHomeBadges />
                  </>
                )}
              </div>
            </div>

            {!showTubeFunnel ? (
              <div className="border-t border-white/5 py-16 md:py-20">
                <HomeLaneUpgradePaths
                  activeIntent={activeIntent}
                  onSwitchLane={handleIntentChange}
                />
              </div>
            ) : null}
            {showTubeFunnel ? (
              <div className="border-t border-white/5 py-16 md:py-20">
                <HomeLaneTubeFunnel onSwitchLane={handleIntentChange} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import { getCategoryBySlug, getListingsByCategorySlug } from "@/lib/data";
import type { Listing } from "@/types/listing";
import { FlNav } from "@/components/fanslocked-home/fl-nav";
import { FlHero } from "@/components/fanslocked-home/fl-hero";
import { FlCategoryStrip } from "@/components/fanslocked-home/fl-category-strip";
import { FlFeaturedRow } from "@/components/fanslocked-home/fl-featured-row";
import { FlDenseGrid } from "@/components/fanslocked-home/fl-dense-grid";
import { SectionHeader } from "@/components/ui/section-header";

const STRIP = CATEGORIES.slice(0, 14);
const SCROLL_OFFSET = 118;
const DENSE_PREVIEW = 28;

function leadSubtitle(description: string): string {
  const t = description.trim();
  const i = t.indexOf(". ");
  if (i > 0 && i < 140) return t.slice(0, i + 1);
  if (t.length <= 140) return t;
  return `${t.slice(0, 139).replace(/\s+\S*$/, "")}…`;
}

function filterListings(list: Listing[], q: string): Listing[] {
  const s = q.trim().toLowerCase();
  if (!s) return list;
  return list.filter((l) => {
    const hay = [l.name, l.description, l.categoryLabel, ...l.tags]
      .join(" ")
      .toLowerCase();
    return hay.includes(s);
  });
}

function scrollToCategorySection(slug: string) {
  const el = document.getElementById(slug);
  if (!el) return;
  const y =
    el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

export function FanslockedHomePage() {
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(STRIP[0]!.slug);

  const sectionsData = useMemo(() => {
    return STRIP.map((c) => {
      const base = getListingsByCategorySlug(c.slug);
      const sorted = [...base].sort((a, b) => b.rating - a.rating);
      const filtered = filterListings(sorted, query);
      const meta = getCategoryBySlug(c.slug);
      return {
        slug: c.slug,
        label: c.label,
        meta,
        featured: filtered.slice(0, 4),
        dense: filtered.slice(4, 4 + DENSE_PREVIEW),
        empty: filtered.length === 0,
      };
    });
  }, [query]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setupSectionSpy = useCallback(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-category-section]");
    if (!nodes.length) return () => {};

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const best = visible.reduce((a, b) =>
          a.intersectionRatio >= b.intersectionRatio ? a : b,
        );
        const id = best.target.id;
        if (id) setActiveSection(id);
      },
      {
        root: null,
        rootMargin: "-110px 0px -52% 0px",
        threshold: [0, 0.08, 0.15, 0.25, 0.4],
      },
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
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
    let disposeSpy: (() => void) | undefined;
    let disposeReveal: (() => void) | undefined;
    const rafId = requestAnimationFrame(() => {
      disposeSpy = setupSectionSpy();
      disposeReveal = setupReveal();
    });
    return () => {
      cancelAnimationFrame(rafId);
      disposeSpy?.();
      disposeReveal?.();
    };
  }, [sectionsData, setupSectionSpy, setupReveal]);

  function onSelectCategory(slug: string) {
    setActiveSection(slug);
    scrollToCategorySection(slug);
  }

  return (
    <div className="min-h-[100dvh] bg-[#0A0B10] text-white">
      <FlNav scrolled={scrolled} />
      <FlHero value={query} onChange={setQuery} />
      <FlCategoryStrip
        categories={STRIP}
        activeSlug={activeSection}
        onSelect={onSelectCategory}
        scrolled={scrolled}
      />

      <div className="mx-auto max-w-[1600px] space-y-10 pb-16 pt-8">
        {sectionsData.map(
          ({ slug, label, meta, featured, dense, empty }) => (
            <div
              key={slug}
              id={slug}
              role="region"
              aria-label={label}
              data-category-section
              className="section-reveal scroll-mt-[7.75rem] space-y-6"
            >
              {empty ? (
                <p className="px-6 text-center text-sm text-[#6B7280]">
                  No matches in <span className="text-[#A0A6B1]">{label}</span>
                  . Try another search.
                </p>
              ) : (
                <>
                  <div className="px-6">
                    <SectionHeader
                      title={meta?.label ?? label}
                      subtitle={
                        meta ? leadSubtitle(meta.description) : undefined
                      }
                      viewAllHref={`/categories/${slug}`}
                    />
                  </div>
                  <FlFeaturedRow items={featured} />
                  {dense.length > 0 ? (
                    <>
                      <div
                        className="h-px bg-[rgba(255,255,255,0.04)]"
                        aria-hidden
                      />
                      <FlDenseGrid items={dense} eager />
                    </>
                  ) : null}
                </>
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

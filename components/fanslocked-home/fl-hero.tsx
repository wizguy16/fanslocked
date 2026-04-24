"use client";

import { useEffect, useRef, useState } from "react";

const PREFIX = "Search ";

/** Short hints that cycle with a typewriter-style reveal (category-aligned). */
const HINTS = [
  "tubes, VR, cams & premium…",
  "VR & 4K libraries…",
  "live cams & tipping…",
  "premium studios…",
  "amateur & creator hubs…",
  "hentai, anime & toons…",
  "dating & hookup picks…",
  "fetish & niche catalogs…",
];

type Props = {
  value: string;
  onChange: (v: string) => void;
};

function useTypewriterHint(active: boolean) {
  const [hint, setHint] = useState("");
  const cancelledRef = useRef(false);
  const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    cancelledRef.current = false;
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];

    if (!active) {
      setHint("");
      return;
    }

    const schedule = (ms: number, fn: () => void) => {
      const id = setTimeout(() => {
        if (!cancelledRef.current) fn();
      }, ms);
      timeoutIds.current.push(id);
    };

    let line = 0;

    function typeLine() {
      if (cancelledRef.current) return;
      const target = HINTS[line % HINTS.length]!;
      let i = 0;

      function tickType() {
        if (cancelledRef.current) return;
        setHint(PREFIX + target.slice(0, i));
        if (i < target.length) {
          i += 1;
          schedule(32 + Math.random() * 26, tickType);
        } else {
          schedule(2000 + Math.random() * 400, tickErase);
        }
      }

      function tickErase() {
        if (cancelledRef.current) return;
        let j = target.length;

        function tickDel() {
          if (cancelledRef.current) return;
          j -= 1;
          if (j >= 0) {
            setHint(PREFIX + target.slice(0, j));
            schedule(16 + Math.random() * 14, tickDel);
          } else {
            setHint(PREFIX);
            line += 1;
            schedule(480 + Math.random() * 200, typeLine);
          }
        }

        tickDel();
      }

      tickType();
    }

    schedule(400, typeLine);

    return () => {
      cancelledRef.current = true;
      timeoutIds.current.forEach(clearTimeout);
      timeoutIds.current = [];
    };
  }, [active]);

  return hint;
}

export function FlHero({ value, onChange }: Props) {
  const showOverlay = value.length === 0;
  const hint = useTypewriterHint(showOverlay);

  return (
    <section className="relative overflow-hidden border-b border-[rgba(255,255,255,0.04)] px-6 pb-14 pt-10 md:pb-16 md:pt-14">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-15%,rgba(255,122,0,0.14),transparent_58%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF6A]">
          FansLocked · 2026 edition
        </p>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.65rem] lg:leading-tight">
          The curated directory for smarter clicks.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[#A0A6B1] md:text-[15px] md:leading-7">
          750+ adult destinations ranked by editorial testing, transparent
          disclosures, and conversion-ready CTAs — built for readers who want
          fewer surprises at checkout.
        </p>

        <div className="mx-auto mt-9 w-full max-w-[720px]">
          <label htmlFor="fl-hero-search" className="sr-only">
            Search listings and categories
          </label>
          <div className="relative">
            {showOverlay ? (
              <div
                className="pointer-events-none absolute inset-y-0 left-0 flex max-w-[calc(100%-3rem)] items-center pl-5 text-left text-sm text-[#6B7280] md:text-[15px]"
                aria-hidden
              >
                <span className="truncate">
                  {hint}
                  <span className="ml-0.5 inline-block h-[1.05em] w-px translate-y-[0.08em] bg-[#FF7A00]/70 animate-pulse" />
                </span>
              </div>
            ) : null}
            <input
              id="fl-hero-search"
              type="search"
              autoComplete="off"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder=""
              className={`h-14 w-full rounded-full border border-[rgba(255,255,255,0.08)] bg-[#11131A]/95 px-5 pr-12 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-md transition focus:border-[rgba(255,122,0,0.35)] focus:outline-none focus:ring-2 focus:ring-[rgba(255,122,0,0.2)] md:text-[15px] ${
                value ? "text-white" : "text-transparent caret-[#FF7A00]"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

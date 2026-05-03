"use client";

import { cn } from "@/lib/utils";
import { HOME_INTENT_OPTIONS, type HomeIntentId } from "@/lib/home-intent";
import { FlDynamicWord } from "@/components/fanslocked-home/fl-dynamic-word";
import { motion } from "framer-motion";

type Props = {
  activeIntent: HomeIntentId;
  /** Resolved in parent — idle rotation or locked to selected lane. */
  heroKeyword: string;
  onIntentChange: (id: HomeIntentId) => void;
};

/** Primary on-page intent switcher — updates listings in place with motion feedback. */
export function FlHero({ activeIntent, heroKeyword, onIntentChange }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-[rgba(255,255,255,0.04)] px-6 pb-14 pt-10 md:pb-16 md:pt-14">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-15%,rgba(201,0,9,0.14),transparent_58%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF6A]">
          FansLocked · 2026 edition
        </p>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.65rem] lg:leading-tight">
          Find what you&apos;re actually looking for.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[#A0A6B1] md:text-[15px] md:leading-7">
          Start free, then jump straight to{" "}
          <FlDynamicWord word={heroKeyword} />.
        </p>

        <div className="mx-auto mt-7 w-full max-w-[920px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6B7280]">
            Pick your lane
          </p>
          <div
            className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3"
            role="group"
            aria-label="Filter homepage listings by lane"
          >
            {HOME_INTENT_OPTIONS.map(({ id, label }) => {
              const isActive = activeIntent === id;
              return (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => onIntentChange(id)}
                  aria-pressed={isActive}
                  whileTap={{ scale: 0.985 }}
                  animate={{
                    scale: isActive ? 1.03 : 1,
                    opacity: isActive ? 1 : 0.72,
                    boxShadow: isActive
                      ? "0 0 0 2px rgba(255,255,255,0.42), 0 12px 28px -14px rgba(0,0,0,0.55)"
                      : "0 0 0 1px rgba(255,255,255,0.08), 0 4px 14px -10px rgba(0,0,0,0.5)",
                  }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "relative rounded-full border px-3 py-2.5 text-center text-xs font-semibold leading-snug transition-[border-color,background-color,color,opacity] duration-200 sm:text-[13px]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                    isActive
                      ? "z-[1] border-white/45 bg-white/[0.14] text-white"
                      : "border-white/12 bg-white/[0.04] text-[#A0A6B1] hover:border-white/28 hover:bg-white/[0.09] hover:text-white",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(95%_120%_at_50%_0%,rgba(255,255,255,0.14),transparent_72%)] transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

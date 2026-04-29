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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-15%,rgba(255,122,0,0.14),transparent_58%)]"
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
            className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2.5"
            role="group"
            aria-label="Filter homepage listings by lane"
          >
            {HOME_INTENT_OPTIONS.map(({ id, label, tier }) => {
              const isActive = activeIntent === id;
              const revenue = tier === "revenue";
              return (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => onIntentChange(id)}
                  aria-pressed={isActive}
                  whileTap={{ scale: 0.985 }}
                  animate={{
                    scale: isActive ? 1.04 : 0.985,
                    opacity: isActive ? 1 : 0.68,
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(255,122,0,0.42), 0 10px 26px -12px rgba(255,122,0,0.72)"
                      : "0 0 0 1px rgba(255,255,255,0.04), 0 2px 10px -8px rgba(0,0,0,0.55)",
                  }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "relative rounded-xl border px-2.5 py-2.5 text-left text-xs font-semibold transition-[border-color,background-color,color,opacity] duration-200 sm:text-center md:py-3 md:text-[13px]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                    revenue &&
                      !isActive &&
                      "border-[#FF7A00]/12 bg-[rgba(255,122,0,0.04)]",
                    !revenue &&
                      !isActive &&
                      "border-white/10 bg-white/[0.04]",
                    isActive
                      ? "z-[1] border-[#FF7A00]/80 bg-[rgba(255,122,0,0.24)] text-white"
                      : "text-[#E6E8ED] hover:border-[#FF7A00]/35 hover:bg-white/[0.07] hover:text-white",
                  )}
                >
                  {isActive ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(95%_120%_at_50%_0%,rgba(255,122,0,0.28),transparent_72%)]"
                    />
                  ) : null}
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

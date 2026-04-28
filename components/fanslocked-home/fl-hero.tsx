"use client";

import { cn } from "@/lib/utils";
import {
  getHomeLaneExperience,
  HOME_INTENT_OPTIONS,
  type HomeIntentId,
} from "@/lib/home-intent";

type Props = {
  activeIntent: HomeIntentId;
  onIntentChange: (id: HomeIntentId) => void;
};

/** Primary on-page intent switcher — updates listings (parent scrolls to `#lane-section`). */
export function FlHero({ activeIntent, onIntentChange }: Props) {
  const lane = getHomeLaneExperience(activeIntent);

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
        <p
          key={activeIntent}
          className="mx-auto mt-4 max-w-2xl animate-home-intent-fade text-pretty text-sm leading-relaxed text-[#A0A6B1] md:text-[15px] md:leading-7"
        >
          {lane.heroSubtitle}
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
                <button
                  key={id}
                  type="button"
                  onClick={() => onIntentChange(id)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-xl border px-2.5 py-2.5 text-left text-xs font-semibold transition-colors duration-150 sm:text-center md:py-3 md:text-[13px]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                    revenue &&
                      !isActive &&
                      "border-[#FF7A00]/12 bg-[rgba(255,122,0,0.04)]",
                    !revenue &&
                      !isActive &&
                      "border-white/10 bg-white/[0.04]",
                    isActive
                      ? "border-[#FF7A00]/55 bg-[rgba(255,122,0,0.14)] text-white"
                      : "text-[#E6E8ED] hover:border-[#FF7A00]/35 hover:bg-white/[0.07] hover:text-white",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

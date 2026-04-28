"use client";

import { cn } from "@/lib/utils";
import {
  getHomeUpgradePathIntents,
  getIntentLabel,
  type HomeIntentId,
} from "@/lib/home-intent";

type Props = {
  activeIntent: HomeIntentId;
  onSwitchLane: (id: HomeIntentId) => void;
};

/** Post-listing lane suggestions — conversion bridge without leaving the homepage. */
export function HomeLaneUpgradePaths({ activeIntent, onSwitchLane }: Props) {
  const intents = getHomeUpgradePathIntents(activeIntent);
  if (intents.length === 0) return null;

  return (
    <section
      className="mx-auto max-w-[1600px] px-6"
      aria-labelledby="home-upgrade-paths-heading"
    >
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-6 md:px-8 md:py-7">
        <h2
          id="home-upgrade-paths-heading"
          className="text-base font-semibold tracking-tight text-white md:text-lg"
        >
          Want more control?
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#A0A6B1]">
          Explore adjacent lanes for a different interaction model — same page,
          new picks; one click to switch.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {intents.map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => onSwitchLane(id)}
                className={cn(
                  "flex h-full w-full flex-col rounded-xl border border-[#FF7A00]/25 bg-[#0A0B10]/80 px-4 py-3.5 text-left transition-colors duration-150",
                  "hover:border-[#FF7A00]/45 hover:bg-[#0A0B10]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                )}
              >
                <span className="text-sm font-semibold text-white">
                  Try {getIntentLabel(id)}
                </span>
                <span className="mt-2 text-xs font-medium text-[#FF7A00]">
                  Switch lane →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import type { Listing } from "@/types/listing";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";
import { ListingLogo } from "@/components/shared/listing-logo";
import { cn } from "@/lib/utils";

type Props = {
  listing: Listing;
  className?: string;
};

/** Matches reference card: black panel, #D35400 frame */
const FRAME_ORANGE = "#D35400";

const EYEBROW = "LIMITED EDITION";
const HEADLINE = "THE PICK";

const LEFT_RANK = "#1 CHOICE";
const LEFT_TITLE = "Elite Tier";
const LEFT_DESC = "Top scored pick in this category.";

const RIGHT_RANK = "TRUSTED";
const RIGHT_TITLE = "Gold Standard";
const RIGHT_DESC = "Affiliate-safe links you can trust.";

/**
 * 3D trophy staircase: perspective + stacked treads/risers with rim highlights.
 * Reads as stepped podium under the logo (CSS-only; no image assets).
 */
function TrophyStaircase() {
  return (
    <div
      className="relative mt-2 flex w-full justify-center [perspective:820px]"
      style={{ perspectiveOrigin: "50% 115%" }}
      aria-hidden
    >
      <div
        className="flex origin-bottom flex-col items-center will-change-transform"
        style={{
          transform: "rotateX(46deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top step — narrowest; bright lip like a lit trophy lip */}
        <div className="relative z-[30] flex w-[min(88vw,7.25rem)] flex-col items-center">
          <div
            className="h-[7px] w-full rounded-t-[999px] border border-white/10 shadow-[0_-4px_14px_rgba(255,255,255,0.35),inset_0_3px_6px_rgba(255,255,255,0.22)]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(120,120,125,0.35) 28%, #141417 72%, #030303 100%)",
            }}
          />
          <div
            className="h-[11px] w-full rounded-b-md shadow-[inset_0_-6px_14px_rgba(0,0,0,0.95),0_10px_18px_rgba(0,0,0,0.85)]"
            style={{
              background:
                "linear-gradient(90deg, #050505 0%, #2c2c30 48%, #050505 100%)",
            }}
          />
        </div>

        {/* Middle step */}
        <div className="relative z-[20] -mt-[3px] flex w-[min(92vw,9.75rem)] flex-col items-center">
          <div
            className="h-[8px] w-full rounded-t-[999px] border-t border-white/15 shadow-[inset_0_2px_5px_rgba(255,255,255,0.08)]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, #232328 55%, #0b0b0c 100%)",
            }}
          />
          <div
            className="h-[14px] w-full shadow-[inset_0_-8px_16px_rgba(0,0,0,0.92)]"
            style={{
              background:
                "linear-gradient(90deg, #020202 0%, #3a3a40 50%, #020202 100%)",
              clipPath: "polygon(4% 0, 96% 0, 100% 100%, 0 100%)",
            }}
          />
        </div>

        {/* Base step — widest; heavy shadow anchors the stack */}
        <div className="relative z-[10] -mt-[4px] flex w-[min(96vw,12.5rem)] flex-col items-center">
          <div
            className="h-[9px] w-full rounded-t-[999px] border-t border-white/12"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, #1a1a1f 45%, #080809 100%)",
            }}
          />
          <div
            className="h-[18px] w-full rounded-b-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.95),inset_0_-12px_24px_rgba(0,0,0,0.65)]"
            style={{
              background:
                "linear-gradient(90deg, #000 0%, #45454d 50%, #000 100%)",
              clipPath: "polygon(3% 0, 97% 0, 100% 100%, 0 100%)",
            }}
          />
        </div>

        {/* Ground plane — sells depth under the stairs */}
        <div
          className="relative z-[5] -mt-[2px] h-[14px] w-[min(100vw,14rem)] rounded-[999px] opacity-90"
          style={{
            background:
              "radial-gradient(ellipse 80% 90% at 50% 0%, rgba(255,255,255,0.07), transparent 62%), rgba(0,0,0,0.85)",
            boxShadow:
              "0 18px 42px rgba(0,0,0,1), inset 0 2px 0 rgba(255,255,255,0.04)",
          }}
        />
      </div>
    </div>
  );
}

/**
 * Authority showcase — eyebrow, hero title, flanking rank blocks, logo on a 3D trophy staircase.
 */
export function HomeLaneAuthorityBlock({ listing, className }: Props) {
  const { href, ...linkRest } = outboundLinkProps(listing);
  return (
    <section
      className={cn("mx-auto max-w-[1600px] px-6", className)}
      aria-label="Top pick for this lane"
    >
      <div
        className="overflow-hidden rounded-[22px] bg-black shadow-[0_28px_80px_-36px_rgba(0,0,0,1)]"
        style={{
          borderWidth: 5,
          borderStyle: "solid",
          borderColor: FRAME_ORANGE,
        }}
      >
        {/* Subtle center wash so the focal logo reads like the reference */}
        <div
          className="relative px-5 pb-10 pt-9 sm:px-8 sm:pb-12 sm:pt-11 md:px-12 md:pb-14 md:pt-12"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 50% 42%, rgba(38,38,42,0.55) 0%, rgba(0,0,0,0.92) 52%, #000000 100%)",
          }}
        >
          <header className="text-center">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.42em] text-white sm:text-[11px]">
              {EYEBROW}
            </p>
            <h2
              className="font-display mt-3 text-[clamp(2.25rem,7.5vw,4rem)] font-extrabold leading-[0.92] tracking-[0.06em] text-white uppercase"
              style={{ textShadow: "0 4px 36px rgba(0,0,0,0.85)" }}
            >
              {HEADLINE}
            </h2>
          </header>

          <div className="mt-10 grid grid-cols-1 items-center gap-12 md:mt-12 md:grid-cols-[1fr_minmax(200px,280px)_1fr] md:gap-6 lg:gap-10">
            {/* Left feature block — same stack as reference */}
            <div className="mx-auto max-w-sm text-center md:mx-0 md:max-w-none md:text-left">
              <p
                className="font-sans text-[11px] font-bold uppercase tracking-[0.28em]"
                style={{ color: FRAME_ORANGE }}
              >
                {LEFT_RANK}
              </p>
              <p className="mt-3 font-sans text-lg font-bold leading-tight tracking-tight text-white md:text-xl">
                {LEFT_TITLE}
              </p>
              <div className="mx-auto mt-4 h-px w-full max-w-[13rem] bg-white/35 md:mx-0" />
              <p className="mt-4 font-sans text-sm leading-relaxed text-white/75">
                {LEFT_DESC}
              </p>
            </div>

            {/* Center — logo over pedestal */}
            <div className="flex flex-col items-center justify-center">
              <a
                href={href}
                {...linkRest}
                className="group relative flex w-full flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-[#D35400] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label={`Visit ${listing.name} — top pick`}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 -top-8 bottom-1/3 bg-[radial-gradient(circle_at_50%_45%,rgba(211,84,0,0.18),transparent_62%)] blur-2xl opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative z-[2] flex flex-col items-center">
                  <div
                    className="relative flex h-[7.5rem] w-[7.5rem] items-center justify-center sm:h-36 sm:w-36 md:h-40 md:w-40"
                    style={{
                      filter:
                        "drop-shadow(0 18px 28px rgba(0,0,0,0.9)) drop-shadow(0 -4px 20px rgba(255,255,255,0.06))",
                    }}
                  >
                    <span
                      className="pointer-events-none absolute -inset-3 rounded-full bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.2),transparent_55%)] opacity-80"
                      aria-hidden
                    />
                    <div className="relative z-[1] isolate h-[78%] w-[78%] min-h-0 min-w-0 overflow-hidden">
                      <ListingLogo
                        listing={listing}
                        slotShape="circle"
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <TrophyStaircase />
                </div>
              </a>
            </div>

            {/* Right feature block */}
            <div className="mx-auto max-w-sm text-center md:mx-0 md:max-w-none md:text-right">
              <p
                className="font-sans text-[11px] font-bold uppercase tracking-[0.28em]"
                style={{ color: FRAME_ORANGE }}
              >
                {RIGHT_RANK}
              </p>
              <p className="mt-3 font-sans text-lg font-bold leading-tight tracking-tight text-white md:text-xl">
                {RIGHT_TITLE}
              </p>
              <div className="mx-auto mt-4 h-px w-full max-w-[13rem] bg-white/35 md:ml-auto md:mr-0" />
              <p className="mt-4 font-sans text-sm leading-relaxed text-white/75">
                {RIGHT_DESC}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

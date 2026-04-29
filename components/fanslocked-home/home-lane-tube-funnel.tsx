"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { HomeIntentId } from "@/lib/home-intent";

type Props = {
  onSwitchLane: (id: HomeIntentId) => void;
};

const UPGRADES: {
  title: string;
  body: string;
  intent?: HomeIntentId;
  href?: string;
  emphasis?: boolean;
}[] = [
  {
    title: "Live cams",
    body: "Interactive rooms, tips, and private shows — higher engagement than passive tubes.",
    intent: "live-cams",
    emphasis: true,
  },
  {
    title: "Chat & sexting",
    body: "Pay-per-message and real-time adult chat built for conversion.",
    intent: "chat-sexting",
    emphasis: true,
  },
  {
    title: "AI companions",
    body: "Always-on characters, chat, and image tools with recurring commissions.",
    intent: "ai-companions",
    emphasis: true,
  },
  {
    title: "Premium studios",
    body: "Fewer ads, licensed scenes, and cleaner playback than most free tubes.",
    href: "/categories/premium-porn",
  },
];

/**
 * Traffic lane upsell: keeps users on-site while nudging toward higher-EPC verticals.
 */
export function HomeLaneTubeFunnel({ onSwitchLane }: Props) {
  return (
    <section
      className="mx-auto max-w-[1600px] px-6"
      aria-labelledby="tube-funnel-heading"
    >
      <div className="rounded-2xl border border-[rgba(255,122,0,0.18)] bg-[rgba(255,122,0,0.06)] px-5 py-6 md:px-8 md:py-7">
        <h2
          id="tube-funnel-heading"
          className="text-base font-semibold tracking-tight text-white md:text-lg"
        >
          Ready for more than just scrolling?
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#A0A6B1]">
          Start with free videos, then switch when you want real interaction,
          better quality, or faster results.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {UPGRADES.map((item) => (
            <li key={item.title}>
              {item.intent ? (
                <button
                  type="button"
                  onClick={() => onSwitchLane(item.intent!)}
                  className={cn(
                    "flex h-full w-full flex-col rounded-xl border px-4 py-3.5 text-left transition-[transform,border-color,background-color,box-shadow] duration-200",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    item.emphasis
                      ? "border-[#FF7A00]/35 bg-[#0A0B10]/80 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[#FF7A00]/55 hover:bg-[#0A0B10] hover:shadow-[0_10px_24px_-16px_rgba(255,122,0,0.65)]"
                      : "border-white/10 bg-[#0A0B10]/60 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-white/18 hover:shadow-[0_10px_20px_-16px_rgba(0,0,0,0.55)]",
                  )}
                >
                  <span className="text-sm font-semibold text-white">
                    {item.title}
                  </span>
                  <span className="mt-1 text-xs leading-relaxed text-[#8B909A]">
                    {item.body}
                  </span>
                  <span className="mt-2 text-xs font-medium text-[#FF7A00]">
                    View picks →
                  </span>
                </button>
              ) : (
                <Link
                  href={item.href!}
                  className={cn(
                    "flex h-full flex-col rounded-xl border border-white/10 bg-[#0A0B10]/60 px-4 py-3.5 text-left transition-[transform,border-color,background-color,box-shadow] duration-200",
                    "hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[#FF7A00]/35 hover:bg-[#0A0B10]/80 hover:shadow-[0_10px_24px_-16px_rgba(255,122,0,0.45)]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  )}
                >
                  <span className="text-sm font-semibold text-white">
                    {item.title}
                  </span>
                  <span className="mt-1 text-xs leading-relaxed text-[#8B909A]">
                    {item.body}
                  </span>
                  <span className="mt-2 text-xs font-medium text-[#FF7A00]">
                    Open category →
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

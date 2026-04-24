"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "ok" : "err");
      if (res.ok) setEmail("");
    } catch {
      setStatus("err");
    }
  }

  return (
    <section
      className="relative w-full overflow-hidden border-t border-[rgba(255,255,255,0.05)]"
      aria-labelledby="newsletter-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0B0A10_0%,#08070E_45%,#07060C_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-screen bg-[radial-gradient(ellipse_55%_45%_at_15%_50%,rgba(124,58,237,0.12),transparent_60%),radial-gradient(ellipse_50%_40%_at_88%_55%,rgba(255,122,0,0.07),transparent_58%)]"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[900px] px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12 lg:gap-14">
          <div className="text-left">
            <h2
              id="newsletter-heading"
              className="text-balance text-2xl font-semibold tracking-tight text-white md:text-[1.65rem] md:leading-snug"
            >
              Exclusive Drops & Weekly Picks
            </h2>
            <p className="mt-3 max-w-[38ch] text-pretty text-sm leading-relaxed text-[#A0A6B1] md:text-[15px] md:leading-7">
              Get the best platforms, private deals, and trending picks before
              everyone else.
            </p>
          </div>

          <div>
            <form onSubmit={onSubmit} className="space-y-2.5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <label htmlFor="nl-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="nl-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Enter your email…"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-h-12 min-w-0 flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#11131A] px-4 text-sm text-white placeholder:text-[#5C6370] focus:border-[rgba(255,122,0,0.35)] focus:outline-none focus:ring-2 focus:ring-[rgba(255,122,0,0.15)]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "h-12 shrink-0 rounded-xl bg-[#FF7A00] px-6 text-sm font-semibold text-black transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60 sm:px-8",
                  )}
                >
                  {status === "loading" ? "…" : "Get Access"}
                </button>
              </div>
              <p className="text-[11px] leading-relaxed text-[#6B7280]">
                No spam. Only top picks. Unsubscribe anytime.
              </p>
              {status === "ok" ? (
                <p className="text-xs text-emerald-500/90" role="status">
                  You&apos;re on the list. Check your inbox soon.
                </p>
              ) : null}
              {status === "err" ? (
                <p className="text-xs text-rose-500/90" role="alert">
                  Something went wrong. Please try again.
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

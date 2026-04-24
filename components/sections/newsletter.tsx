"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
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
    <Reveal>
      <section
        className="border-y border-white/5 bg-gradient-to-r from-amber-500/10 via-transparent to-cyan-500/10 px-3 py-10 sm:px-4 md:px-6"
        aria-labelledby="newsletter-heading"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <h2
            id="newsletter-heading"
            className="font-display text-xl font-bold text-white sm:text-2xl"
          >
            Deals & weekly picks
          </h2>
          <p className="text-sm text-slate-400">
            One short email with editor-tested highlights and limited-time
            partner offers. Unsubscribe anytime.
          </p>
          <form
            onSubmit={onSubmit}
            className="mx-auto flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="nl-email" className="sr-only">
              Email address
            </label>
            <input
              id="nl-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#0a0a0f]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/40"
            />
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "rounded-2xl px-5 py-3 text-sm font-semibold text-black transition",
                "bg-gradient-to-r from-amber-500 to-amber-600 shadow-[0_0_24px_-8px_rgba(245,158,11,0.55)]",
                "disabled:opacity-60",
              )}
            >
              {status === "loading" ? "Joining…" : "Subscribe"}
            </motion.button>
          </form>
          {status === "ok" ? (
            <p className="text-xs text-emerald-400" role="status">
              You are on the list. Watch your inbox.
            </p>
          ) : null}
          {status === "err" ? (
            <p className="text-xs text-rose-400" role="alert">
              Something went wrong. Please try again shortly.
            </p>
          ) : null}
        </div>
      </section>
    </Reveal>
  );
}

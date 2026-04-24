"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "tpd2-age-ok";

export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const ok = localStorage.getItem(STORAGE_KEY);
      if (ok !== "1") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function confirm() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  function exit() {
    if (typeof window !== "undefined") {
      window.location.href = "https://www.google.com";
    }
  }

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050508]/95 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
          aria-describedby="age-gate-desc"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_80px_-20px_rgba(245,158,11,0.35)] sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/90">
              Adults only (18+)
            </p>
            <h2
              id="age-gate-title"
              className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Age verification
            </h2>
            <div
              id="age-gate-desc"
              className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300"
            >
              <p>
                The Porn Dude 2.0 is an informational review platform. We do not
                host, stream, or distribute explicit media on this domain.
              </p>
              <p>
                Outbound links may lead to third-party adult services subject to
                age verification where you live. By continuing you confirm you are
                18+ and legally allowed to view this directory in your region.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={exit}
                className="rounded-2xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                I am under 18 — Exit
              </button>
              <button
                type="button"
                onClick={confirm}
                className="rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_-6px_rgba(245,158,11,0.65)] transition hover:brightness-105 active:scale-[0.98]"
              >
                I am 18 or older — Enter
              </button>
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
              RTA-labeled. Use parental controls to restrict access on shared
              devices.
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

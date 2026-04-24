"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "fanslocked-age-ok";

export function AgeGate() {
  const [open, setOpen] = useState(true);

  useLayoutEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        setOpen(false);
        return;
      }
      /* Legacy key from prior build — drop so the new consent key applies. */
      if (localStorage.getItem("tpd2-age-ok") === "1") {
        localStorage.removeItem("tpd2-age-ok");
      }
    } catch {
      /* leave open */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050508]/95 p-4 backdrop-blur-xl"
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
            className="max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_80px_-20px_rgba(255,122,0,0.28)] sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00]">
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
                FansLocked is an informational review platform. We do not host,
                stream, or distribute explicit media on this domain.
              </p>
              <p>
                Outbound links may lead to third-party adult services subject to
                age verification where you live. By continuing you confirm you
                are 18+ and legally allowed to view this directory in your
                region.
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
                className="rounded-2xl bg-[#FF7A00] px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_-6px_rgba(255,122,0,0.55)] transition hover:brightness-110 active:scale-[0.98]"
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

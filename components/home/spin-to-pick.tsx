"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Listing } from "@/types/listing";
import { DenseDiscoveryCard } from "@/components/cards/dense-discovery-card";

export function SpinToPick({ pool }: { pool: Listing[] }) {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [picked, setPicked] = useState<Listing | null>(null);

  const canSpin = pool.length > 0;

  const run = useCallback(() => {
    if (!canSpin) return;
    setOpen(true);
    setSpinning(true);
    setPicked(null);
    const duration = 1200 + Math.random() * 600;
    const interval = 80;
    let elapsed = 0;
    const tick = () => {
      const idx = Math.floor(Math.random() * pool.length);
      setPicked(pool[idx]!);
      elapsed += interval;
      if (elapsed < duration) {
        window.setTimeout(tick, interval);
      } else {
        const final = pool[Math.floor(Math.random() * pool.length)]!;
        setPicked(final);
        setSpinning(false);
      }
    };
    tick();
  }, [canSpin, pool]);

  return (
    <div className="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-2">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            className="w-[min(100vw-2rem,320px)] rounded-lg border border-white/10 bg-[#12131a] p-3 shadow-lg"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              {spinning ? "Spinning…" : "Try this"}
            </p>
            {picked ? (
              <div className="mt-2">
                <DenseDiscoveryCard listing={picked} index={0} highlight />
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-2 w-full rounded-md border border-white/10 py-1 text-[11px] text-slate-400 hover:text-white"
            >
              Close
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        type="button"
        disabled={!canSpin || spinning}
        onClick={() => {
          if (spinning) return;
          if (open) setOpen(false);
          else run();
        }}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0A0B10]/95 px-3 py-1.5 text-[11px] font-semibold text-slate-200 shadow-md backdrop-blur-sm transition hover:border-[#FF7A00]/40 hover:text-white disabled:opacity-40"
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-dashed border-[#FF7A00]"
          aria-hidden
        />
        Can&apos;t decide?
      </button>
    </div>
  );
}

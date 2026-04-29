"use client";

/**
 * Ambient orange cursor halo + soft hover ping on interactive targets.
 * Fine pointers only; disabled when `prefers-reduced-motion: reduce`.
 */

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SEL =
  [
    "a[href]",
    'button:not([disabled])',
    '[role="button"]:not([disabled])',
    '[role="link"]',
    'input:not([disabled]):not([type="hidden"])',
    "select:not([disabled])",
    "textarea:not([disabled])",
    "summary",
    "label[for]",
  ].join(",");

const HTML_CLASS = "fl-custom-pointer";

function playHoverPing(audioRef: React.MutableRefObject<AudioContext | null>) {
  try {
    const AC =
      window.AudioContext ||
      (
        window as unknown as {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;
    if (!AC) return;

    if (!audioRef.current) {
      audioRef.current = new AC();
    }
    const ctx = audioRef.current;
    void ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(980, t);
    osc.frequency.exponentialRampToValueAtTime(2200, t + 0.028);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.038, t + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.052);
  } catch {
    /* autoplay / privacy */
  }
}

export function CustomPointer() {
  const [show, setShow] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const audioRef = useRef<AudioContext | null>(null);
  const lastHit = useRef<Element | null>(null);
  const snapped = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    setShow(true);
    document.documentElement.classList.add(HTML_CLASS);

    const lerp = 0.22;

    const loop = () => {
      vel.current.x += (pos.current.x - vel.current.x) * lerp;
      vel.current.y += (pos.current.y - vel.current.y) * lerp;

      const el = dotRef.current;
      if (el) {
        const hit = document.elementFromPoint(
          pos.current.x,
          pos.current.y,
        )?.closest(INTERACTIVE_SEL);
        const scale = hit ? 1.18 : 1;
        el.style.transform = `translate3d(${vel.current.x}px,${vel.current.y}px,0) translate(-50%,-50%) scale(${scale})`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!snapped.current) {
        snapped.current = true;
        vel.current.x = e.clientX;
        vel.current.y = e.clientY;
      }

      const under = document.elementFromPoint(e.clientX, e.clientY);
      const hit = under?.closest(INTERACTIVE_SEL) ?? null;

      if (hit && hit !== lastHit.current) {
        playHoverPing(audioRef);
        lastHit.current = hit;
      }
      if (!hit) {
        lastHit.current = null;
      }
    };

    const onLeave = () => {
      lastHit.current = null;
    };

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove(HTML_CLASS);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      try {
        void audioRef.current?.close();
      } catch {
        /* ignore */
      }
      audioRef.current = null;
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[2147483647] h-11 w-11 rounded-full border border-[#FF7A00]/40 bg-[#FF7A00]/[0.14] shadow-[0_0_28px_-6px_rgba(255,122,0,0.35)] will-change-transform"
      aria-hidden
    />
  );
}

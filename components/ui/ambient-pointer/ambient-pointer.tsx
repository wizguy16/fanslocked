"use client";

/**
 * Subtle brand-red cursor ring (low-opacity fill + stroke, no box-shadow). Client-only — see root `dynamic(..., { ssr: false })`.
 * When pointer mode is off, the node stays in the tree with opacity 0.
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

function hasAnyFinePointer(): boolean {
  return window.matchMedia("(any-pointer: fine)").matches;
}

function createAudioContext(): AudioContext | null {
  try {
    const AC =
      window.AudioContext ||
      (
        window as unknown as {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;
    return AC ? new AC() : null;
  } catch {
    return null;
  }
}

function playHoverPing(audioRef: React.MutableRefObject<AudioContext | null>) {
  try {
    if (!audioRef.current) {
      audioRef.current = createAudioContext();
    }
    const ctx = audioRef.current;
    if (!ctx) return;
    void ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(980, t);
    osc.frequency.exponentialRampToValueAtTime(2200, t + 0.028);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.055, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.052);
  } catch {
    /* autoplay / privacy */
  }
}

export function AmbientPointer() {
  const [active, setActive] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const audioRef = useRef<AudioContext | null>(null);
  const lastHit = useRef<Element | null>(null);
  const snapped = useRef(false);
  const cancelled = useRef(false);

  useEffect(() => {
    if (hasAnyFinePointer()) {
      setActive(true);
    }

    const mq = window.matchMedia("(any-pointer: fine)");
    const onChange = () => {
      if (mq.matches) setActive(true);
    };
    mq.addEventListener("change", onChange);

    const onFirstMouseMove = () => setActive(true);
    window.addEventListener("mousemove", onFirstMouseMove, {
      passive: true,
      once: true,
    });

    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const unlock = () => {
      if (!audioRef.current) {
        audioRef.current = createAudioContext();
      }
      void audioRef.current?.resume();
    };

    window.addEventListener("pointerdown", unlock, true);
    window.addEventListener("click", unlock, true);
    window.addEventListener("keydown", unlock, true);

    return () => {
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("click", unlock, true);
      window.removeEventListener("keydown", unlock, true);
    };
  }, []);

  useEffect(() => {
    return () => {
      try {
        void audioRef.current?.close();
      } catch {
        /* ignore */
      }
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!active) {
      document.documentElement.classList.remove(HTML_CLASS);
      return;
    }

    snapped.current = false;
    cancelled.current = false;
    document.documentElement.classList.add(HTML_CLASS);

    const lerp = 0.22;

    const loop = () => {
      if (cancelled.current) return;
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
      cancelled.current = true;
      document.documentElement.classList.remove(HTML_CLASS);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [active]);

  return createPortal(
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[9998] h-12 w-12 rounded-full border border-primary/35 bg-primary/[0.07] will-change-transform [box-shadow:none]"
      style={{
        pointerEvents: "none",
        opacity: active ? 0.5 : 0,
        visibility: active ? "visible" : "hidden",
      }}
      aria-hidden
    />,
    document.body,
  );
}

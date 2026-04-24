"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Pointer-drag horizontal scroll (desktop). Touch keeps native momentum.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const state = useRef({ active: false, startX: 0, startScroll: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent<T>) => {
    if (e.button !== 0) return;
    const t = e.target as HTMLElement | null;
    if (t?.closest("a,button")) return;
    const el = ref.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    state.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<T>) => {
    if (!state.current.active) return;
    const el = ref.current;
    if (!el) return;
    const dx = e.clientX - state.current.startX;
    el.scrollLeft = state.current.startScroll - dx;
  }, []);

  const end = useCallback(() => {
    state.current.active = false;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prevent = (e: Event) => {
      if (state.current.active) e.preventDefault();
    };
    el.addEventListener("dragstart", prevent);
    return () => el.removeEventListener("dragstart", prevent);
  }, []);

  return {
    ref,
    dragScrollProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: end,
      onPointerCancel: end,
      onPointerLeave: end,
    },
  };
}

/**
 * Custom eased scroll — avoids browser `scrollIntoView({ behavior: "smooth" })` jerkiness.
 */

/** Matches `#lane-section` `scroll-mt-[7.75rem]` at default 16px root (124px). */
export const HOME_LANE_SCROLL_OFFSET_PX = 124;

const DEFAULT_DURATION_MS = 700;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type ScrollAbort = { abort: () => void };

let activeLaneScroll: ScrollAbort | null = null;

export function abortHomeLaneScroll(): void {
  activeLaneScroll?.abort();
  activeLaneScroll = null;
}

/**
 * Scrolls `window` to `targetY` with cubic easing. Cancels any in-flight home lane scroll.
 */
export function smoothScrollWindowToY(
  targetY: number,
  options?: { durationMs?: number; respectReducedMotion?: boolean },
): void {
  if (typeof window === "undefined") return;

  const durationMs = options?.durationMs ?? DEFAULT_DURATION_MS;
  const respectReducedMotion = options?.respectReducedMotion ?? true;

  if (
    respectReducedMotion &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    window.scrollTo(0, targetY);
    return;
  }

  activeLaneScroll?.abort();

  let aborted = false;
  const controller: ScrollAbort = {
    abort() {
      aborted = true;
    },
  };
  activeLaneScroll = controller;

  const maxY = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const clampedTarget = Math.max(0, Math.min(targetY, maxY));

  const startY = window.scrollY;
  const diff = clampedTarget - startY;
  if (Math.abs(diff) < 0.5) {
    activeLaneScroll = null;
    return;
  }

  let startTime: number | null = null;

  function step(timestamp: number) {
    if (aborted) return;
    if (startTime === null) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / durationMs, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + diff * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else if (activeLaneScroll === controller) {
      activeLaneScroll = null;
    }
  }

  requestAnimationFrame(step);
}

/** Document Y so the element’s top sits `offsetPx` below the viewport top. */
export function getScrollYForElementTopOffset(
  el: Element,
  offsetPx: number,
): number {
  const rect = el.getBoundingClientRect();
  return rect.top + window.scrollY - offsetPx;
}

export function smoothScrollToElementById(
  id: string,
  options?: { offsetPx?: number; durationMs?: number },
): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const offsetPx = options?.offsetPx ?? HOME_LANE_SCROLL_OFFSET_PX;
  const y = getScrollYForElementTopOffset(el, offsetPx);
  smoothScrollWindowToY(y, { durationMs: options?.durationMs });
  return true;
}

"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_HOME_INTENT,
  getIntentStateFromSearchParamsOnly,
  HOME_INTENT_STORAGE_KEY,
  isHomeIntentId,
  type HomeIntentId,
  type HomeIntentInitialState,
} from "@/lib/home-intent";

function laneQueryFromSearchParams(
  searchParams: ReturnType<typeof useSearchParams>,
): string {
  return (
    searchParams.get("lane")?.trim() ??
    searchParams.get("intent")?.trim() ??
    ""
  );
}

/**
 * Homepage lane selection — initial state matches SSR (URL + defaults only).
 * `localStorage` is applied after mount so server and client trees match on first paint.
 */
export function useHomePageIntent() {
  const searchParams = useSearchParams();
  const [home, setHome] = useState<HomeIntentInitialState>(() =>
    getIntentStateFromSearchParamsOnly(searchParams),
  );

  useEffect(() => {
    const q = laneQueryFromSearchParams(searchParams);
    if (q && isHomeIntentId(q)) {
      setHome({
        activeIntent: q,
        heroKeywordIdle: q === DEFAULT_HOME_INTENT,
      });
      return;
    }
    try {
      const stored = localStorage.getItem(HOME_INTENT_STORAGE_KEY);
      if (stored && isHomeIntentId(stored)) {
        setHome({
          activeIntent: stored,
          heroKeywordIdle: stored === DEFAULT_HOME_INTENT,
        });
      }
    } catch {
      /* ignore */
    }
  }, [searchParams]);

  const persistIntent = useCallback((id: HomeIntentId) => {
    try {
      localStorage.setItem(HOME_INTENT_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const handleIntentChange = useCallback(
    (id: HomeIntentId) => {
      setHome((prev) => {
        if (id !== prev.activeIntent) persistIntent(id);
        return { activeIntent: id, heroKeywordIdle: false };
      });
    },
    [persistIntent],
  );

  return {
    activeIntent: home.activeIntent,
    heroKeywordIdle: home.heroKeywordIdle,
    handleIntentChange,
  };
}

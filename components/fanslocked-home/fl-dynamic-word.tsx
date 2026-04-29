"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  word: string;
};

const wordClass =
  "col-start-1 row-start-1 bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text font-semibold text-transparent";

/** Single-line animated swap for hero intent keyword (crossfade + slight rise). */
export function FlDynamicWord({ word }: Props) {
  return (
    <span className="inline-grid min-w-[5.5ch] grid-cols-1 grid-rows-1 items-baseline leading-none">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={word}
          className={wordClass}
          initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -4, filter: "blur(3px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

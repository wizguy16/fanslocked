"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function StarGlyph({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(
        "h-4 w-4 leading-none",
        filled ? "text-amber-400" : "text-white/12",
      )}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 2.2l2.9 6.9 7.5.6-5.7 5 1.8 7.3L12 18.9 5.5 22.8l1.8-7.3-5.7-5 7.5-.6L12 2.2z"
      />
    </svg>
  );
}

export function StarRating({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const rounded = Math.round(value);
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`Rating ${value.toFixed(1)} out of 5 stars`}
      role="img"
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, type: "spring", stiffness: 380 }}
          className="inline-flex leading-none"
          aria-hidden
        >
          <StarGlyph filled={i <= rounded} />
        </motion.span>
      ))}
      <span className="ml-1.5 text-sm font-semibold tabular-nums text-amber-100/90">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

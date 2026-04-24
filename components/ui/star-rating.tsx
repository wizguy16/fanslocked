"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
          className={cn(
            "text-lg leading-none",
            i <= rounded ? "text-amber-400" : "text-white/12",
          )}
          aria-hidden
        >
          ★
        </motion.span>
      ))}
      <span className="ml-1.5 text-sm font-semibold tabular-nums text-amber-100/90">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

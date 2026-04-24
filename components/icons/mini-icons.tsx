import { cn } from "@/lib/utils";
import type { VisualBadgeKind } from "@/lib/visual-badge";

const svgBase = "shrink-0";

/** Small filled star for numeric ratings (replaces ★). */
export function IconStarTiny({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={cn(svgBase, "h-3 w-3 text-[#D4A574]", className)}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M6 0.8l1.2 2.7 3 .3-2.3 2 0.7 2.9L6 7.8 3.4 8.7l0.7-2.9-2.3-2 3-.3L6 0.8z"
      />
    </svg>
  );
}

/** Featured “Top” badge (flame mark). */
export function IconFlameBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 16"
      className={cn(svgBase, "h-3.5 w-3 text-[#FF7A00]", className)}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M7 0c0 2.1-1.4 3-2.1 5.1-.3 1 .1 2.1 1 2.7-.6-2.3 1.5-4.5 1.1-6.8C4.3 2.5 3 4.5 3 6.5 3 9.5 4.8 12 7 12s4-2.5 4-5.5C11 3.8 9.2 1.2 7 0z"
      />
    </svg>
  );
}

export function VisualBadgeIcon({
  kind,
  className,
}: {
  kind: VisualBadgeKind;
  className?: string;
}) {
  const c = cn(svgBase, "h-3.5 w-3.5", className);
  switch (kind) {
    case "trending":
      return (
        <svg viewBox="0 0 16 16" className={cn(c, "text-[#FF7A00]")} aria-hidden>
          <path fill="currentColor" d="M8 2L14 13H2L8 2z" />
        </svg>
      );
    case "live":
      return (
        <svg viewBox="0 0 16 16" className={cn(c, "text-emerald-500")} aria-hidden>
          <circle cx="8" cy="8" r="5" fill="currentColor" opacity="0.25" />
          <circle cx="8" cy="8" r="2.5" fill="currentColor" />
        </svg>
      );
    case "new":
      return (
        <svg viewBox="0 0 16 16" className={cn(c, "text-sky-400")} aria-hidden>
          <rect
            x="3"
            y="6"
            width="10"
            height="4"
            rx="1"
            fill="currentColor"
            opacity="0.35"
          />
          <rect x="6" y="3" width="4" height="10" rx="1" fill="currentColor" />
        </svg>
      );
    case "top":
      return (
        <svg viewBox="0 0 16 16" className={cn(c, "text-[#D4A574]")} aria-hidden>
          <path
            fill="currentColor"
            d="M8 1.2l1.8 3.6 4 .6-2.9 2.8 0.7 4L8 11.9 4.4 12.8l0.7-4L2.2 5.4l4-.6L8 1.2z"
          />
        </svg>
      );
    default:
      return null;
  }
}

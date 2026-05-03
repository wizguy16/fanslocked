import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Canonical FansLocked mark used site-wide (header, footer, etc.).
 * Red “FL” monogram + wordmark — single visual identity per page.
 */
export function FansLockedLogoLink({
  className,
  wordmarkClassName,
}: {
  className?: string;
  /** Optional override for the “FansLocked” text (e.g. footer contrast). */
  wordmarkClassName?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "flex min-w-0 items-center gap-2 text-[14px] font-semibold tracking-tight md:text-[15px]",
        className,
      )}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#11131A] text-[11px] font-bold text-primary ring-1 ring-[rgba(255,255,255,0.06)]"
        aria-hidden
      >
        FL
      </span>
      <span className={cn("truncate text-white", wordmarkClassName)}>FansLocked</span>
    </Link>
  );
}

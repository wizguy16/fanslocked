import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export function AffiliateLink({
  className,
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      data-affiliate="true"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-semibold text-black shadow-[0_0_28px_-10px_rgba(245,158,11,0.55)] transition hover:brightness-105 active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

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
        "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7A00] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_20px_-8px_rgba(255,122,0,0.45)] transition hover:brightness-105 hover:shadow-[0_0_24px_-6px_rgba(255,122,0,0.55)] active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

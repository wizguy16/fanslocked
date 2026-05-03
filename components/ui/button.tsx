import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-soft-glow hover:bg-primary/90 active:scale-[0.98]",
  secondary:
    "bg-secondary text-white shadow-soft hover:shadow-[0_0_20px_-6px_rgba(124,92,255,0.55)] active:scale-[0.98]",
  ghost:
    "bg-transparent text-slate-200 hover:bg-card-hover hover:text-white",
  outline:
    "border border-white bg-transparent font-semibold text-white hover:bg-white hover:text-black active:scale-[0.98]",
};

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm transition-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

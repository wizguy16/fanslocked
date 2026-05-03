import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type StackProps = {
  children: ReactNode;
  className?: string;
};

export function Stack({ children, className }: StackProps) {
  return (
    <div className={cn("flex flex-col gap-6 md:gap-8", className)}>
      {children}
    </div>
  );
}

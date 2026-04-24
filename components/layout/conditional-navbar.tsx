"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";

/** Homepage ships its own chrome; other routes keep the shared navbar. */
export function ConditionalNavbar() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/explore") return null;
  return <Navbar />;
}

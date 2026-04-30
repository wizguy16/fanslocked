"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { usesGlobalSiteNavbar } from "@/lib/site-layout";

/** Homepage, Explore, and Fetish hubs ship their own chrome; others use the shared navbar. */
export function ConditionalNavbar() {
  const pathname = usePathname() ?? "/";
  if (!usesGlobalSiteNavbar(pathname)) return null;
  return <Navbar />;
}

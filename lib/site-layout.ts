/**
 * Routes that ship their own top chrome (FlNav, MainHeader, etc.) instead of
 * the shared sticky `Navbar`. Layout-level breadcrumbs must be omitted here and
 * placed after the local header inside the page.
 */
export function usesGlobalSiteNavbar(pathname: string): boolean {
  if (!pathname || pathname === "/") return false;
  if (
    pathname === "/explore" ||
    pathname === "/categories/fetish" ||
    pathname.startsWith("/fetish/")
  ) {
    return false;
  }
  return true;
}

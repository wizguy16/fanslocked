export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Single-line tagline for dense listing cards (max 40 chars). */
export function clampTagline(text: string, max = 40): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1).trimEnd();
  return `${cut}…`;
}

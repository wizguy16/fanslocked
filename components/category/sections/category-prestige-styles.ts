/**
 * Directory surfaces — page `#1A1A1A`, cards `#292929`, primary CTA `#C90009` (Tailwind `primary`).
 */

/** Quick picks, compact grids, sidebar tiles. */
export const DIRECTORY_CARD_TILE =
  "rounded-none border border-white/[0.09] bg-[#292929] transition-colors duration-200 hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

/** Large showcase rows — subtle lift + primary-tinted hover shadow. */
export const DIRECTORY_CARD_HERO =
  "rounded-none border border-white/[0.09] bg-[#292929] shadow-[0_20px_50px_-28px_rgba(0,0,0,0.95)] transition-[border-color,box-shadow] duration-200 hover:border-primary/35 hover:shadow-[0_28px_60px_-24px_rgba(201,0,9,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

/** Inset / supporting panels. */
export const DIRECTORY_CARD_INSET =
  "rounded-none border border-white/[0.08] bg-[#292929]";

/**
 * Low-emphasis actions: white outline, hover inverts to white fill + black text (reference UI).
 * Use with appropriate padding classes, e.g. `px-6 py-2.5`.
 */
export const BTN_SECONDARY_OUTLINE =
  "rounded-full border border-white bg-transparent font-semibold text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50";

/** @deprecated Alias — use DIRECTORY_CARD_TILE */
export const CATEGORY_GLASS_PANEL = DIRECTORY_CARD_TILE;

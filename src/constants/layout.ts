/**
 * CSS variables set on <html> for the sticky header and the sticky announcements ticker
 * (set by useHeaderOffsets and useHeightVar; read by Header.styles, Announcements.styles
 * and global.styles).
 */
export const HEADER_VARS = {
  /** Height of the part that scrolls away (desktop government bar; 0 on mobile). */
  scrollAway: '--bv-header-scroll-away',
  /** Height of the part that stays on screen (desktop nav bar / mobile header bar). */
  sticky: '--bv-header-sticky',
  /** Height of the announcements ticker, which sticks just under the header. */
  ticker: '--bv-ticker-height',
} as const;

/** `var(--name, 0px)`: a header height, or 0 before it has been measured. */
export const headerVar = (name: (typeof HEADER_VARS)[keyof typeof HEADER_VARS]) =>
  `var(${name}, 0px)`;

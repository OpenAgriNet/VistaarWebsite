/**
 * CSS variables set on <html> by useHeaderOffsets for the sticky header
 * (read by Header.styles and global.styles).
 */
export const HEADER_VARS = {
  /** Height of the part that scrolls away (desktop government bar; 0 on mobile). */
  scrollAway: '--bv-header-scroll-away',
  /** Height of the part that stays on screen (desktop nav bar / mobile header bar). */
  sticky: '--bv-header-sticky',
} as const;

/** `var(--name, 0px)`: a header height, or 0 before it has been measured. */
export const headerVar = (name: (typeof HEADER_VARS)[keyof typeof HEADER_VARS]) =>
  `var(${name}, 0px)`;

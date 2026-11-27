'use client';

import { styled } from '@mui/material/styles';
import { marqueeScroll } from '@/theme/animations';
import { borderWidth, motion, radius, shadow, size } from '@/theme/tokens';

/**
 * Figma "Final-Home" → Backed by Trust & Data (1440×400 fixed, white, content centred).
 * Header, then logo tiles (≈192×135, 24px apart, 1px #E5E5E5 border, 8px radius), each
 * logo at its Figma size.
 * Client request (not in the Figma): the tiles move continuously like the announcements
 * bar, stop on hover, and a hovered tile lifts with a green border.
 * Reduced motion: the Figma's still row (2 per row on mobile, 3 on tablets).
 */

export const Root = styled('section')(({ theme }) => ({
  paddingBlock: theme.spacing(10),
  backgroundColor: (theme.vars ?? theme).palette.surface.page,
  [theme.breakpoints.up('lg')]: { paddingBlock: theme.spacing(22.5) },
}));

export const Inner = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  [theme.breakpoints.up('lg')]: { gap: theme.spacing(10) },
}));

/* ---------------- Moving strip ---------------- */

/** Clips the moving track; room above and below so a lifted tile is not cut off. */
export const Viewport = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  paddingBlock: theme.spacing(2),
}));

/** Pauses while hovered or while keyboard focus is inside. */
export const Track = styled('div')({
  display: 'flex',
  width: 'max-content',
  animation: `${marqueeScroll} ${motion.trustLoopSeconds}s linear infinite`,
  '&:hover, &:focus-within': { animationPlayState: 'paused' },
});

export const List = styled('ul')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  margin: 0,
  // Same gap after the last tile, so the two copies join seamlessly.
  paddingInlineEnd: theme.spacing(4),
  paddingInlineStart: 0,
  listStyle: 'none',
  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(6),
    paddingInlineEnd: theme.spacing(6),
  },
}));

/* ---------------- Still grid (reduced motion) ---------------- */

export const Grid = styled('ul')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(4),
  margin: 0,
  padding: 0,
  listStyle: 'none',
  [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(3, 1fr)' },
  [theme.breakpoints.up('lg')]: { gridTemplateColumns: 'repeat(6, 1fr)', gap: theme.spacing(6) },
}));

/* ---------------- Tile ---------------- */

/** `moving`: fixed width in the moving strip; the still grid sizes tiles by its columns. */
export const Tile = styled('li', {
  shouldForwardProp: (prop) => prop !== 'moving',
})<{ moving?: boolean }>(({ theme, moving }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: moving ? size.trustCardWidthMobile : undefined,
    height: size.trustCardHeightMobile,
    padding: theme.spacing(3),
    border: `${borderWidth.thin}px solid ${palette.border.control}`,
    borderRadius: radius.sm,
    backgroundColor: palette.surface.card,
    transition: theme.transitions.create(['transform', 'border-color', 'box-shadow']),
    '&:hover': {
      transform: `translateY(${theme.spacing(-1)})`,
      borderColor: palette.brand.primary,
      boxShadow: shadow.raised,
    },
    [theme.breakpoints.up('lg')]: {
      width: moving ? size.trustCardWidth : undefined,
      height: size.trustCardHeight,
    },
  };
});

export const Logo = styled('img')({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
});

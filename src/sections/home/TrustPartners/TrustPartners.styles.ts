'use client';

import { styled } from '@mui/material/styles';
import { borderWidth, radius, size } from '@/theme/tokens';

/**
 * Figma "Final-Home" → Backed by Trust & Data (1440×400 fixed, white, content centred).
 * Header, then six logo tiles in a row (≈192×135, 24px apart, 1px #E5E5E5 border,
 * 8px radius), each logo at its Figma size.
 * Tiles are not links in the Figma, so they have no hover state.
 * Mobile: 2 per row, 3 on tablets (estimated).
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

export const Tile = styled('li')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: size.trustCardHeightMobile,
    padding: theme.spacing(3),
    border: `${borderWidth.thin}px solid ${palette.border.control}`,
    borderRadius: radius.sm,
    backgroundColor: palette.surface.card,
    [theme.breakpoints.up('lg')]: { height: size.trustCardHeight },
  };
});

export const Logo = styled('img')({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
});

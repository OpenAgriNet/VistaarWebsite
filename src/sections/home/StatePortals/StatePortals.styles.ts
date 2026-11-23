'use client';

import { styled } from '@mui/material/styles';
import { coverBackground } from '@/styles/background';
import { borderWidth, fontWeight, radius, size } from '@/theme/tokens';

/**
 * Figma "Final-Home" → Active State Portals (1440×435, padding 50/80, wavy green picture).
 * White header text, then three white cards (≈410×238, 24px apart, 8px radius), each a
 * centred logo + name (18 bold #171717).
 * Mobile: cards stacked, 120px tall (estimated).
 */

interface BackgroundProps {
  backgroundSrc: string;
}

export const Root = styled('section', {
  shouldForwardProp: (prop) => prop !== 'backgroundSrc',
})<BackgroundProps>(({ theme, backgroundSrc }) => ({
  paddingBlock: theme.spacing(6),
  backgroundColor: (theme.vars ?? theme).palette.brand.primary,
  ...coverBackground(backgroundSrc),
  [theme.breakpoints.up('lg')]: { paddingBlock: theme.spacing(12.5) },
}));

export const Inner = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  [theme.breakpoints.up('lg')]: { gap: theme.spacing(10) },
}));

export const Grid = styled('ul')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(4),
  margin: 0,
  padding: 0,
  listStyle: 'none',
  [theme.breakpoints.up('md')]: { gridTemplateColumns: 'repeat(3, 1fr)', gap: theme.spacing(6) },
}));

export const Card = styled('a')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    height: size.statePortalCardHeightMobile,
    paddingInline: theme.spacing(4),
    borderRadius: radius.sm,
    backgroundColor: palette.surface.card,
    textDecoration: 'none',
    '&:focus-visible': {
      outline: `${borderWidth.thick}px solid ${palette.surface.card}`,
      outlineOffset: theme.spacing(1),
    },
    [theme.breakpoints.up('lg')]: { height: size.statePortalCardHeight },
  };
});

export const Logo = styled('img')({
  flexShrink: 0,
  objectFit: 'contain',
});

export const Name = styled('span')(({ theme }) => ({
  ...theme.typography.portalName,
  fontWeight: fontWeight.bold,
  color: (theme.vars ?? theme).palette.text.primary,
}));

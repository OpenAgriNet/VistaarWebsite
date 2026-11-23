'use client';

import { styled } from '@mui/material/styles';
import { coverBackground } from '@/styles/background';

/**
 * Figma: "Bharat VISTAAR at a Glance"
 * - Mobile (375): padding 24 / 16, cards stacked, 27px gaps
 * - Desktop (1440): padding 80, 4 cards in a row, 27px gap, 41px below the header
 * - Background: the Figma wavy green picture (shared with State Portals) over brand green.
 */
interface BackgroundProps {
  backgroundSrc: string;
}

export const Section = styled('section', {
  shouldForwardProp: (prop) => prop !== 'backgroundSrc',
})<BackgroundProps>(({ theme, backgroundSrc }) => ({
  backgroundColor: (theme.vars ?? theme).palette.brand.primary,
  ...coverBackground(backgroundSrc),
  paddingBlock: theme.spacing(6),
  [theme.breakpoints.up('lg')]: {
    paddingBlock: theme.spacing(20),
  },
}));

export const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(7),
  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(10),
  },
}));

export const StatGrid = styled('ul')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(7),
  margin: 0,
  padding: 0,
  listStyle: 'none',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

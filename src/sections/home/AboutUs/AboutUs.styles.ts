'use client';

import { styled } from '@mui/material/styles';
import { coverBackground } from '@/styles/background';
import { fontWeight, radius, size } from '@/theme/tokens';

/**
 * Figma "Final-Home" → About Us (1440×532, 80px padding, faint field photo behind).
 * Left: "About Us" (20 bold) · heading 24/120% black · three paragraphs 16/160%, all #171717,
 *   736px column. Right: 494×372 photo, 12px radius, vertically centred.
 * Mobile: stacked, 24/16 padding, smaller heading (estimated from the mobile frame).
 */

interface BackgroundProps {
  backgroundSrc: string;
}

export const Root = styled('section', {
  shouldForwardProp: (prop) => prop !== 'backgroundSrc',
})<BackgroundProps>(({ theme, backgroundSrc }) => ({
  paddingBlock: theme.spacing(6),
  backgroundColor: (theme.vars ?? theme).palette.surface.page,
  // The asset is pre-cropped and pre-faded to match the Figma (3.4× zoom into the field
  // strip of the source fill at 50% opacity), so it simply covers the section.
  ...coverBackground(backgroundSrc),
  [theme.breakpoints.up('lg')]: { paddingBlock: theme.spacing(20) },
}));

export const Inner = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(12),
  },
}));

export const Text = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  maxWidth: size.aboutTextWidth,
}));

export const Heading = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const Label = styled('h2')(({ theme }) => ({
  ...theme.typography.bodyL,
  margin: 0,
  fontWeight: fontWeight.bold,
  color: (theme.vars ?? theme).palette.text.primary,
  [theme.breakpoints.up('lg')]: { ...theme.typography.headingS, fontWeight: fontWeight.bold },
}));

export const Title = styled('p')(({ theme }) => ({
  ...theme.typography.aboutHeadingMobile,
  margin: 0,
  maxWidth: size.aboutHeadingWidth,
  fontWeight: fontWeight.black,
  color: (theme.vars ?? theme).palette.text.primary,
  [theme.breakpoints.up('lg')]: { ...theme.typography.aboutHeading, fontWeight: fontWeight.black },
}));

export const Body = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  [theme.breakpoints.up('lg')]: { gap: theme.spacing(6) },
}));

export const Paragraph = styled('p')(({ theme }) => ({
  ...theme.typography.bodyS,
  margin: 0,
  color: (theme.vars ?? theme).palette.text.primary,
  [theme.breakpoints.up('lg')]: { ...theme.typography.aboutBody },
}));

export const Photo = styled('img')(({ theme }) => ({
  flexShrink: 0,
  width: '100%',
  height: 'auto',
  aspectRatio: `${size.aboutPhoto.width} / ${size.aboutPhoto.height}`,
  objectFit: 'cover',
  borderRadius: radius.image,
  [theme.breakpoints.up('lg')]: { width: size.aboutPhoto.width },
}));

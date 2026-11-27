'use client';

import { styled } from '@mui/material/styles';
import { borderWidth, fontWeight, radius, size } from '@/theme/tokens';

/**
 * Figma "Final-Home" → Component 11 (PM quote), directly after the hero.
 * Desktop 1440×350: padding 50/80, lavender tint (#F2EFFF 30%); row = 250px round photo,
 *   34px gap, 944px column (quote 16/160% medium · 1px #C0B3FF divider · "Vision statement"),
 *   16px between column items.
 * Mobile: centred stack (photo, quote, divider, link) — sizes estimated from the mobile frame.
 */

export const Root = styled('section')(({ theme }) => ({
  paddingBlock: theme.spacing(6),
  backgroundColor: (theme.vars ?? theme).palette.surface.quote,
  [theme.breakpoints.up('lg')]: { paddingBlock: theme.spacing(12.5) },
}));

export const Figure = styled('figure')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(4),
  margin: 0,
  textAlign: 'center',
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    gap: theme.spacing(8.5),
    textAlign: 'left',
  },
}));

export const Photo = styled('img')(({ theme }) => ({
  flexShrink: 0,
  width: size.quotePhotoMobile,
  height: size.quotePhotoMobile,
  objectFit: 'cover',
  borderRadius: radius.full,
  [theme.breakpoints.up('lg')]: { width: size.quotePhoto, height: size.quotePhoto },
}));

export const Column = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  width: '100%',
  maxWidth: size.quoteTextWidth,
}));

export const Quote = styled('blockquote')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  // One blank 16/160% line between paragraphs, as in the Figma text.
  gap: theme.spacing(6.5),
  margin: 0,
}));

export const Paragraph = styled('p')(({ theme }) => ({
  ...theme.typography.quoteBodyMobile,
  margin: 0,
  fontWeight: fontWeight.medium,
  color: (theme.vars ?? theme).palette.text.secondary,
  [theme.breakpoints.up('lg')]: { ...theme.typography.quoteBody },
}));

export const Divider = styled('hr')(({ theme }) => ({
  width: '100%',
  margin: 0,
  border: 0,
  borderTop: `${borderWidth.thin}px solid ${(theme.vars ?? theme).palette.border.quote}`,
}));

export const Link = styled('a')(({ theme }) => ({
  ...theme.typography.headingXS,
  alignSelf: 'center',
  fontWeight: fontWeight.medium,
  color: (theme.vars ?? theme).palette.brand.primary,
  textDecoration: 'none',
  [theme.breakpoints.up('lg')]: { alignSelf: 'flex-start' },
}));

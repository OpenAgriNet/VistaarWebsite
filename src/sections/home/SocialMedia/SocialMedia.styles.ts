'use client';

import { styled } from '@mui/material/styles';
import { borderWidth, fontWeight, radius, size } from '@/theme/tokens';

/**
 * Figma "Final-Home" → Connect With Us on Social Media (1440×503, brand green at 5%,
 * padding 50/80). Four cards (≈302 wide, 24px apart): white, 8px radius, 12px padding;
 * header row (24px platform logo · name 16 semibold · external-link icon in green) over a
 * hairline; 156px post picture; caption 14/18 medium; meta 11/14 grey.
 * The whole card links to the platform (new tab).
 * Mobile: 1 per row, 2 on tablets.
 */

export const Root = styled('section')(({ theme }) => ({
  paddingBlock: theme.spacing(6),
  backgroundColor: (theme.vars ?? theme).palette.surface.brandTint,
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
  [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
  [theme.breakpoints.up('lg')]: { gridTemplateColumns: 'repeat(4, 1fr)', gap: theme.spacing(6) },
}));

export const Card = styled('a')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(3),
    borderRadius: radius.sm,
    backgroundColor: palette.surface.card,
    textDecoration: 'none',
    '&:focus-visible': {
      outline: `${borderWidth.thick}px solid ${palette.brand.primary}`,
      outlineOffset: theme.spacing(0.5),
    },
  };
});

export const CardHeader = styled('span')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  borderBottom: `${borderWidth.thin}px solid ${(theme.vars ?? theme).palette.border.hairline}`,
  color: (theme.vars ?? theme).palette.brand.primary,
}));

export const PlatformIcon = styled('img')({
  width: size.socialPlatformIcon,
  height: size.socialPlatformIcon,
  objectFit: 'contain',
});

export const PlatformName = styled('span')(({ theme }) => ({
  ...theme.typography.headingXS,
  flex: 1,
  fontWeight: fontWeight.semibold,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const Media = styled('span')({
  display: 'block',
  height: size.socialImageHeight,
  overflow: 'hidden',
  borderRadius: radius.xs,
});

export const Picture = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const Caption = styled('span')(({ theme }) => ({
  ...theme.typography.labelL,
  fontWeight: fontWeight.medium,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const Meta = styled('span')(({ theme }) => ({
  ...theme.typography.labelS,
  marginTop: `-${theme.spacing(2)}`,
  color: (theme.vars ?? theme).palette.text.muted,
}));

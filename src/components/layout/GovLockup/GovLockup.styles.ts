'use client';

import { styled } from '@mui/material/styles';
import NextLink from 'next/link';
import { borderWidth, fontWeight, size } from '@/theme/tokens';

/**
 * Figma: State Emblem · 3-line ministry text · divider · Bharat VISTAAR logo.
 * Desktop: emblem 30×51, text 14px/120%, logo 107×47, 12px gaps.
 * Mobile (52px bar): same lockup scaled down.
 */
export const Root = styled(NextLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  color: 'inherit',
  textDecoration: 'none',
  [theme.breakpoints.up('lg')]: { gap: theme.spacing(3) },
}));

export const Emblem = styled('img')(({ theme }) => ({
  width: size.emblemMobile.width,
  height: size.emblemMobile.height,
  objectFit: 'contain',
  [theme.breakpoints.up('lg')]: {
    width: size.emblem.width,
    height: size.emblem.height,
  },
}));

export const Text = styled('span')(({ theme }) => ({
  ...theme.typography.lockupMobile,
  whiteSpace: 'nowrap',
  display: 'flex',
  flexDirection: 'column',
  color: (theme.vars ?? theme).palette.text.primary,
  [theme.breakpoints.up('lg')]: {
    ...theme.typography.headingXXS,
    maxWidth: size.lockupTextWidth,
  },
}));

export const Strong = styled('span')({
  fontWeight: fontWeight.bold,
});

export const Divider = styled('span')(({ theme }) => ({
  alignSelf: 'stretch',
  borderInlineStart: `${borderWidth.thin}px solid ${(theme.vars ?? theme).palette.border.subtle}`,
}));

export const Logo = styled('img')(({ theme }) => ({
  width: size.brandLogoMobile.width,
  height: size.brandLogoMobile.height,
  objectFit: 'contain',
  [theme.breakpoints.up('lg')]: {
    width: size.brandLogo.width,
    height: size.brandLogo.height,
  },
}));

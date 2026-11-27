'use client';

import { styled } from '@mui/material/styles';
import { borderWidth, fontWeight, radius, shadow, size } from '@/theme/tokens';

/**
 * Figma "Final-Home" → fixed Frame (119×140, bottom-right): green pill "Hi, I'm Bharati"
 * (11/14, white) above a 112px speech-bubble avatar. Mobile: 72px avatar (estimated).
 */

export const Root = styled('button')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
    zIndex: theme.zIndex.speedDial,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: 0,
    border: 0,
    background: 'none',
    cursor: 'pointer',
    '&:focus-visible': {
      outline: `${borderWidth.thick}px solid ${palette.brand.primary}`,
      outlineOffset: theme.spacing(1),
      borderRadius: radius.md,
    },
    [theme.breakpoints.up('lg')]: { right: theme.spacing(10), bottom: theme.spacing(6) },
  };
});

export const Label = styled('span')(({ theme }) => ({
  ...theme.typography.labelS,
  paddingBlock: theme.spacing(0.75),
  paddingInline: theme.spacing(2.5),
  borderRadius: radius.full,
  fontWeight: fontWeight.medium,
  whiteSpace: 'nowrap',
  color: (theme.vars ?? theme).palette.text.inverse,
  backgroundColor: (theme.vars ?? theme).palette.brand.primary,
}));

export const Avatar = styled('img')(({ theme }) => ({
  width: size.chatbotImageMobile,
  height: size.chatbotImageMobile,
  filter: `drop-shadow(${shadow.floating})`,
  [theme.breakpoints.up('lg')]: { width: size.chatbotImage, height: size.chatbotImage },
}));

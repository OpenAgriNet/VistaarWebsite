'use client';

import { styled } from '@mui/material/styles';
import { borderWidth, fontWeight, radius, size } from '@/theme/tokens';

/** Figma: 260px tall, 16px radius, 2px brand border, white fill, content centred. */
export const Root = styled('div')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: size.statCardHeight,
    padding: theme.spacing(4),
    backgroundColor: palette.surface.card,
    border: `${borderWidth.thick}px solid ${palette.border.brand}`,
    borderRadius: radius.md,
    textAlign: 'center',
  };
});

/** 42px / 120% bold (custom size, not in the Figma style library). */
export const Value = styled('p')(({ theme }) => ({
  ...theme.typography.statValue,
  fontWeight: fontWeight.bold,
  margin: 0,
  color: (theme.vars ?? theme).palette.text.primary,
}));

/** 16px / 140% regular. */
export const Label = styled('p')(({ theme }) => ({
  ...theme.typography.headingXS,
  fontWeight: fontWeight.regular,
  margin: 0,
  color: (theme.vars ?? theme).palette.text.secondary,
}));

'use client';

import { styled } from '@mui/material/styles';
import { borderWidth, size } from '@/theme/tokens';

interface FluidProps {
  fluid: boolean;
}

/** Figma: 225×38, white field, brand underline, search button on the right. */
export const Form = styled('form', {
  shouldForwardProp: (prop) => prop !== 'fluid',
})<FluidProps>(({ theme, fluid }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'flex',
    alignItems: 'stretch',
    // Fluid: grow to fill the row next to other controls (mobile menu).
    ...(fluid ? { flex: 1, minWidth: 0 } : { width: size.searchWidth }),
    height: size.searchHeight,
    backgroundColor: palette.surface.page,
    border: `${borderWidth.thin}px solid ${palette.border.control}`,
    borderBottom: `${borderWidth.thick}px solid ${palette.brand.primary}`,
  };
});

export const Input = styled('input')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.labelL,
    flex: 1,
    minWidth: 0,
    padding: theme.spacing(0, 2.5),
    border: 0,
    background: 'transparent',
    color: palette.text.primary,
    '&::placeholder': { color: palette.text.secondary, opacity: 1 },
    '&:focus-visible': { outlineOffset: -borderWidth.thick },
  };
});

export const Submit = styled('button')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size.searchHeight,
    padding: 0,
    border: 0,
    borderInlineStart: `${borderWidth.thin}px solid ${palette.border.control}`,
    background: 'transparent',
    color: palette.brand.accent,
    cursor: 'pointer',
  };
});

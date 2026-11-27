'use client';

import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import { borderWidth, fontWeight, radius, size } from '@/theme/tokens';

/**
 * Figma: Final-Home → "Accessibility Control" panel
 * 382px wide, full height, padding 16 / 24, title 24px bold,
 * rows 80px tall · 8px radius · #EDF0F0 · 12px padding, 24px radio on the right.
 */

export const Panel = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  width: '100vw',
  maxWidth: size.a11yPanelWidth,
  height: '100%',
  padding: theme.spacing(4, 6, 6),
  backgroundColor: (theme.vars ?? theme).palette.surface.page,
}));

export const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Title = styled('h2')(({ theme }) => ({
  ...theme.typography.titleL,
  fontWeight: fontWeight.bold,
  margin: 0,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const List = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

export const Row = styled(ButtonBase)(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    width: '100%',
    minHeight: size.a11yRowHeight,
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.sm,
    backgroundColor: palette.surface.control,
    textAlign: 'left',
    '&.Mui-focusVisible': {
      outline: `${borderWidth.thick}px solid ${palette.border.brand}`,
      outlineOffset: borderWidth.thick,
    },
  };
});

export const RowStart = styled('span')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

/** A+ / A− glyphs in the Figma are text, sized to match the 40px icons. */

export const IconSlot = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  width: size.a11yIcon,
  height: size.a11yIcon,
  color: (theme.vars ?? theme).palette.brand.primary,
  '& > svg': { width: '100%', height: '100%' },
}));

/** Thin divider between icon and label, then the label (14px semibold, uppercase). */
export const Label = styled('span')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.labelL,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
    color: palette.text.control,
    paddingInlineStart: theme.spacing(3),
    borderInlineStart: `${borderWidth.thin}px solid ${palette.border.control}`,
  };
});

interface RadioProps {
  on: boolean;
}

/** 24px circle. Off: light fill + 1px border. On: brand fill + 12px light dot. */
export const Radio = styled('span', {
  shouldForwardProp: (prop) => prop !== 'on',
})<RadioProps>(({ theme, on }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: size.radio,
    height: size.radio,
    borderRadius: radius.full,
    border: `${borderWidth.thin}px solid ${on ? palette.brand.primary : palette.border.control}`,
    backgroundColor: on ? palette.brand.primary : palette.control.background,
    '&::after': {
      content: '""',
      width: size.radioDot,
      height: size.radioDot,
      borderRadius: radius.full,
      backgroundColor: on ? palette.control.indicatorOn : 'transparent',
    },
  };
});

'use client';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { borderWidth, fontWeight, radius, size } from '@/theme/tokens';

/**
 * Figma "Success Pop-Up": 584px white card centred over the dimmed form — tick
 * illustration (71×78) · title Body M Strong (16/24 semibold) · text 14 regular #404040 ·
 * close ✕ top-right.
 */

export const Root = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': { backgroundColor: (theme.vars ?? theme).palette.overlay },
  '& .MuiDialog-paper': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(4),
    width: '100%',
    maxWidth: size.successDialogWidth,
    margin: theme.spacing(4),
    padding: theme.spacing(3, 12, 3, 4),
    borderRadius: radius.sm,
    backgroundColor: (theme.vars ?? theme).palette.surface.card,
  },
}));

export const Illustration = styled('img')({
  flexShrink: 0,
  width: size.successIconWidth,
  height: size.successIconHeight,
});

export const Text = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const Title = styled('h2')(({ theme }) => ({
  ...theme.typography.bodyM,
  margin: 0,
  fontWeight: fontWeight.semibold,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const Message = styled('p')(({ theme }) => ({
  ...theme.typography.bodyS,
  margin: 0,
  color: (theme.vars ?? theme).palette.text.secondary,
}));

export const CloseButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(4),
  right: theme.spacing(4),
  display: 'inline-flex',
  padding: 0,
  border: 0,
  background: 'none',
  color: (theme.vars ?? theme).palette.text.primary,
  cursor: 'pointer',
  '&:focus-visible': {
    outline: `${borderWidth.thick}px solid ${(theme.vars ?? theme).palette.brand.primary}`,
    outlineOffset: theme.spacing(0.5),
  },
}));

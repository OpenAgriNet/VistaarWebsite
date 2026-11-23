'use client';

import { styled } from '@mui/material/styles';
import { borderWidth } from '@/theme/tokens';

/** Figma: three 24px DBIM icons separated by thin vertical lines, #404040. */
export const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: (theme.vars ?? theme).palette.text.secondary,
}));

export const Separator = styled('span')(({ theme }) => ({
  alignSelf: 'center',
  height: theme.spacing(5),
  borderInlineStart: `${borderWidth.thin}px solid ${(theme.vars ?? theme).palette.text.secondary}`,
}));

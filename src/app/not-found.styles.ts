'use client';

import { styled } from '@mui/material/styles';
import { fontWeight } from '@/theme/tokens';

export const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(4),
  paddingBlock: theme.spacing(20),
}));

export const Title = styled('h1')(({ theme }) => ({
  ...theme.typography.headingL,
  fontWeight: fontWeight.bold,
  margin: 0,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const Link = styled('a')(({ theme }) => ({
  ...theme.typography.bodyM,
  color: (theme.vars ?? theme).palette.brand.primary,
  textDecoration: 'underline',
}));

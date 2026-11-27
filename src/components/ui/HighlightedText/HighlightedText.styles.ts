'use client';

import { styled } from '@mui/material/styles';
import { fontWeight } from '@/theme/tokens';

/** Highlighted phrase: bold, brand green (PM quote, testimonials). */
export const Highlight = styled('strong')(({ theme }) => ({
  fontWeight: fontWeight.bold,
  color: (theme.vars ?? theme).palette.brand.primary,
}));

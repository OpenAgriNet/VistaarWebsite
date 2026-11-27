'use client';

import { styled } from '@mui/material/styles';
import { radius, size } from '@/theme/tokens';

/**
 * Figma "Final-Home" → Frame 45 (1440×587, #F9F9F9, padding 60/80).
 * Two panels side by side on desktop (Figma 542 + 714; personas narrowed to 440 and
 * capabilities takes the rest, per client request, to avoid empty space under personas; 24px apart),
 * each brand-green at 5%, 16px radius, 24px padding. Stacked on mobile.
 */

export const Root = styled('section')(({ theme }) => ({
  paddingBlock: theme.spacing(6),
  backgroundColor: (theme.vars ?? theme).palette.surface.sectionAlt,
  [theme.breakpoints.up('lg')]: { paddingBlock: theme.spacing(15) },
}));

export const Inner = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  [theme.breakpoints.up('lg')]: { flexDirection: 'row', alignItems: 'stretch' },
}));

interface PanelProps {
  variant: 'personas' | 'capabilities';
}

export const Panel = styled('div', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<PanelProps>(({ theme, variant }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  minWidth: 0,
  padding: theme.spacing(4),
  borderRadius: radius.md,
  backgroundColor: (theme.vars ?? theme).palette.surface.brandTint,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(6),
    ...(variant === 'personas' ? { flex: `0 0 ${size.personasPanelWidth}px` } : { flex: 1 }),
  },
}));

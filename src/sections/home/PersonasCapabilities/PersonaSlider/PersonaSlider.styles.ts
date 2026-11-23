'use client';

import { styled } from '@mui/material/styles';
import { borderWidth, fontWeight, radius, size } from '@/theme/tokens';

/**
 * Figma Frame 45 → persona card: white, 8px radius, padding 15 top / 12 bottom, 32px gap,
 * centred. 172px round illustration on a light grey circle; name Heading XS Strong
 * (16/22 bold); description 14/20 regular, 324px wide; ‹ dots › controls in brand green
 * (active dot a 12px rounded square, others 8px circles).
 */

export const Card = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  paddingBlock: theme.spacing(3.75, 3),
  paddingInline: theme.spacing(4),
  borderRadius: radius.sm,
  backgroundColor: (theme.vars ?? theme).palette.surface.card,
}));

export const Viewport = styled('div')({
  overflow: 'hidden',
  flex: 1,
});

export const Track = styled('ul')({
  display: 'flex',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  touchAction: 'pan-y pinch-zoom',
});

/** Figma persona component, hover variant: green ring round the picture, green name. */
export const Slide = styled('li')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    flex: '0 0 100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(4),
    paddingTop: theme.spacing(0.5),
    textAlign: 'center',
    '&:hover img': { boxShadow: `0 0 0 ${borderWidth.thick}px ${palette.brand.primary}` },
    '&:hover h3': { color: palette.brand.primary },
  };
});

export const Image = styled('img')(({ theme }) => ({
  width: size.personaImage,
  height: size.personaImage,
  objectFit: 'cover',
  borderRadius: radius.full,
  backgroundColor: (theme.vars ?? theme).palette.surface.subtle,
  transition: theme.transitions.create('box-shadow'),
}));

export const Text = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: size.personaTextWidth,
}));

export const Name = styled('h3')(({ theme }) => ({
  ...theme.typography.headingXS,
  margin: 0,
  fontWeight: fontWeight.bold,
  color: (theme.vars ?? theme).palette.text.primary,
  transition: theme.transitions.create('color'),
}));

export const Description = styled('p')(({ theme }) => ({
  ...theme.typography.headingXXS, // 14/20
  margin: 0,
  color: (theme.vars ?? theme).palette.text.secondary,
}));

export const Controls = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
}));

export const Arrow = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  padding: 0,
  border: 0,
  background: 'none',
  cursor: 'pointer',
  color: (theme.vars ?? theme).palette.brand.primary,
  '&:disabled': { cursor: 'default', opacity: theme.palette.action.disabledOpacity },
  '&:focus-visible': {
    outline: `${theme.spacing(0.5)} solid ${(theme.vars ?? theme).palette.brand.primary}`,
    outlineOffset: theme.spacing(0.5),
    borderRadius: radius.xs,
  },
}));

export const Dots = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

interface DotProps {
  active: boolean;
}

export const Dot = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<DotProps>(({ theme, active }) => ({
  width: active ? size.sliderDotActive : size.sliderDot,
  height: active ? size.sliderDotActive : size.sliderDot,
  padding: 0,
  border: 0,
  cursor: 'pointer',
  borderRadius: active ? radius.dot : radius.full,
  backgroundColor: active
    ? (theme.vars ?? theme).palette.brand.primary
    : (theme.vars ?? theme).palette.control.dotInactive,
  transition: theme.transitions.create(['width', 'height', 'border-radius']),
  '&:focus-visible': {
    outline: `${theme.spacing(0.5)} solid ${(theme.vars ?? theme).palette.brand.primary}`,
    outlineOffset: theme.spacing(0.5),
  },
}));

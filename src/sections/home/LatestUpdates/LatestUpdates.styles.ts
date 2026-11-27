'use client';

import { styled } from '@mui/material/styles';
import { borderWidth, fontWeight, radius, size } from '@/theme/tokens';

/**
 * Figma "Final-Home" → Latest Updates & Activities (1440×574, #F9F9F9, padding 50/80).
 * Header with ‹ ›, then cards 3-up (30px apart): white, 1px #E5E5E5, 12px radius,
 * 16px padding; 196px picture (8px radius); meta row (category 12 medium green ·
 * date 12 #404040); title 16/20 semibold; description 12/18; link 16 medium green.
 * Videos get a play badge over the picture.
 * Mobile: one card per view, swipeable; two on tablets.
 */

export const Root = styled('section')(({ theme }) => ({
  paddingBlock: theme.spacing(6),
  backgroundColor: (theme.vars ?? theme).palette.surface.sectionAlt,
  [theme.breakpoints.up('lg')]: { paddingBlock: theme.spacing(12.5) },
}));

export const Inner = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  [theme.breakpoints.up('lg')]: { gap: theme.spacing(10) },
}));

export const HeaderRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
}));

export const Viewport = styled('div')({
  overflow: 'hidden',
});

export const Track = styled('ul')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  margin: 0,
  padding: 0,
  listStyle: 'none',
  touchAction: 'pan-y pinch-zoom',
  [theme.breakpoints.up('lg')]: { gap: theme.spacing(7.5) },
}));

export const Slide = styled('li')(({ theme }) => ({
  flex: '0 0 100%',
  minWidth: 0,
  display: 'flex',
  [theme.breakpoints.up('sm')]: { flex: `0 0 calc((100% - ${theme.spacing(4)}) / 2)` },
  [theme.breakpoints.up('lg')]: { flex: `0 0 calc((100% - ${theme.spacing(15)}) / 3)` },
}));

export const Card = styled('article')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    padding: theme.spacing(3, 3, 4),
    border: `${borderWidth.thin}px solid ${palette.border.control}`,
    borderRadius: radius.image,
    backgroundColor: palette.surface.card,
  };
});

export const Media = styled('div')({
  position: 'relative',
  height: size.updateImageHeight,
  overflow: 'hidden',
  borderRadius: radius.sm,
});

export const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

/** Linked social post without a copied image: platform icon on the brand tint. */
export const Placeholder = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: (theme.vars ?? theme).palette.surface.brandTint,
}));

export const PlayBadge = styled('span')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: size.playBadge,
  height: size.playBadge,
  borderRadius: radius.full,
  backgroundColor: (theme.vars ?? theme).palette.overlay,
  color: (theme.vars ?? theme).palette.text.inverse,
}));

export const Body = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const Meta = styled('p')(({ theme }) => ({
  ...theme.typography.labelM,
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  margin: 0,
}));

export const Category = styled('span')(({ theme }) => ({
  fontWeight: fontWeight.medium,
  color: (theme.vars ?? theme).palette.brand.primary,
}));

export const DateText = styled('span')(({ theme }) => ({
  color: (theme.vars ?? theme).palette.text.secondary,
}));

export const Title = styled('h3')(({ theme }) => ({
  ...theme.typography.titleS,
  margin: 0,
  fontWeight: fontWeight.semibold,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const Description = styled('p')(({ theme }) => ({
  ...theme.typography.bodyXS,
  margin: 0,
  color: (theme.vars ?? theme).palette.text.secondary,
}));

export const Link = styled('a')(({ theme }) => ({
  ...theme.typography.headingXS,
  marginTop: 'auto',
  paddingTop: theme.spacing(2),
  fontWeight: fontWeight.medium,
  color: (theme.vars ?? theme).palette.brand.primary,
  textDecoration: 'none',
}));

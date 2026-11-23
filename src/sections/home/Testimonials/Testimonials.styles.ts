'use client';

import { styled } from '@mui/material/styles';
import { coverBackground } from '@/styles/background';
import { borderWidth, fontWeight, radius, size } from '@/theme/tokens';

/**
 * Figma "Final-Home" → Testimonials (1440×462, padding 60/80, About Us field picture).
 * Header (icon + title + subtitle) with ‹ › on the right, 32px gap, then a 1080px column
 * (100px side padding): quote 16/160% medium with a bold green phrase, 1px divider, and an
 * author row (70px round avatar · name 16 medium green · place 16 regular #404040 ·
 * "Watch Video" outlined button on the right).
 * Mobile: same stack, smaller avatar, button below the author (estimated).
 */

interface BackgroundProps {
  backgroundSrc: string;
}

export const Root = styled('section', {
  shouldForwardProp: (prop) => prop !== 'backgroundSrc',
})<BackgroundProps>(({ theme, backgroundSrc }) => ({
  paddingBlock: theme.spacing(6),
  backgroundColor: (theme.vars ?? theme).palette.surface.sectionAlt,
  ...coverBackground(backgroundSrc),
  [theme.breakpoints.up('lg')]: { paddingBlock: theme.spacing(15) },
}));

export const Inner = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  [theme.breakpoints.up('lg')]: { gap: theme.spacing(8) },
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

export const Track = styled('ul')({
  display: 'flex',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  touchAction: 'pan-y pinch-zoom',
});

export const Slide = styled('li')(({ theme }) => ({
  flex: '0 0 100%',
  minWidth: 0,
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('lg')]: { paddingInline: theme.spacing(25) },
}));

export const Figure = styled('figure')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  width: '100%',
  maxWidth: size.testimonialTextWidth,
  margin: 0,
}));

export const Quote = styled('blockquote')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  // One blank 16/160% line between paragraphs, as in the Figma text.
  gap: theme.spacing(6.5),
  margin: 0,
}));

export const Paragraph = styled('p')(({ theme }) => ({
  ...theme.typography.quoteBodyMobile,
  margin: 0,
  fontWeight: fontWeight.medium,
  color: (theme.vars ?? theme).palette.text.secondary,
  [theme.breakpoints.up('lg')]: { ...theme.typography.quoteBody },
}));

export const Divider = styled('hr')(({ theme }) => ({
  width: '100%',
  margin: 0,
  border: 0,
  borderTop: `${borderWidth.thin}px solid ${(theme.vars ?? theme).palette.border.subtle}`,
}));

export const Footer = styled('figcaption')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export const Author = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const Avatar = styled('img')(({ theme }) => ({
  flexShrink: 0,
  width: size.testimonialAvatarMobile,
  height: size.testimonialAvatarMobile,
  objectFit: 'cover',
  borderRadius: radius.full,
  [theme.breakpoints.up('lg')]: {
    width: size.testimonialAvatar,
    height: size.testimonialAvatar,
  },
}));

export const AuthorText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const Name = styled('cite')(({ theme }) => ({
  ...theme.typography.headingXS,
  fontStyle: 'normal',
  fontWeight: fontWeight.medium,
  color: (theme.vars ?? theme).palette.brand.primary,
}));

export const Location = styled('span')(({ theme }) => ({
  ...theme.typography.headingXS,
  color: (theme.vars ?? theme).palette.text.secondary,
}));

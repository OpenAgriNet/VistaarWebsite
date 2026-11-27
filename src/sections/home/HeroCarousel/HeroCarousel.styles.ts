'use client';

import { styled, type Theme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { borderWidth, fontWeight, gradient, radius, size } from '@/theme/tokens';
import type { HeroSlide } from '@/types/content';

/**
 * Figma "Banner-1" (two variants, alternating every 3 s in the prototype)
 * Desktop 1440×480: text block 47px inside the content column, vertically centred;
 *   32px arrows 50px from the edges; dots pill (65×18) + 38px pause button bottom-right.
 * Mobile 375×166: smaller text, no button or arrows.
 *
 * `tone` follows the slide picture:
 *   light → dark text, filled green button, dark controls
 *   dark  → light text, outlined button, light controls with violet icons
 */

type Tone = HeroSlide['tone'];

interface ToneProps {
  tone: Tone;
}

const forwardTone = { shouldForwardProp: (prop: PropertyKey) => prop !== 'tone' };

export const Root = styled('section')(({ theme }) => ({
  position: 'relative',
  height: size.heroHeightMobile,
  overflow: 'hidden',
  backgroundColor: (theme.vars ?? theme).palette.surface.page,
  [theme.breakpoints.up('lg')]: { height: size.heroHeight },
}));

export const Viewport = styled('div')({
  height: '100%',
  overflow: 'hidden',
});

export const Track = styled('div')({
  display: 'flex',
  height: '100%',
  touchAction: 'pan-y pinch-zoom',
});

export const Slide = styled('div')({
  position: 'relative',
  flex: '0 0 100%',
  minWidth: 0,
  height: '100%',
});

export const Image = styled('img')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  maxWidth: 'none',
  objectFit: 'cover',
  // Mobile crops the left of the picture so the right-hand subject stays in view.
  objectPosition: 'right center',
  [theme.breakpoints.up('lg')]: { objectPosition: 'center' },
}));

/** Mobile, light slides only: light wash so the text stays readable over the picture. */
export const Wash = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  backgroundImage: gradient.heroTextWash,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));

export const ContentColumn = styled('div')({
  position: 'relative',
  height: '100%',
});

export const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  height: '100%',
  maxWidth: size.heroTextWidthMobile,
  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(4),
    maxWidth: size.heroTextWidth,
    marginInlineStart: theme.spacing(12),
  },
}));

/** Desktop: one line per part, like the Figma (the dark slide's title, 585px, overflows the 530px block). */
export const Title = styled('h2')(({ theme }) => ({
  ...theme.typography.heroTitleMobile,
  margin: 0,
  [theme.breakpoints.up('lg')]: { ...theme.typography.heroTitle, whiteSpace: 'nowrap' },
}));

export const TitleLead = styled(
  'span',
  forwardTone,
)<ToneProps>(({ theme, tone }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'block',
    fontWeight: fontWeight.regular,
    color: tone === 'dark' ? palette.text.inverse : palette.text.primary,
  };
});

export const TitleEmphasis = styled(
  'span',
  forwardTone,
)<ToneProps>(({ theme, tone }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'block',
    fontWeight: fontWeight.black,
    textTransform: 'uppercase',
    color: tone === 'dark' ? palette.text.inverse : palette.brand.primary,
  };
});

export const Description = styled(
  'p',
  forwardTone,
)<ToneProps>(({ theme, tone }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.heroBodyMobile,
    margin: 0,
    color: tone === 'dark' ? palette.text.onDarkMuted : palette.text.secondary,
    [theme.breakpoints.up('lg')]: { ...theme.typography.titleS },
  };
});

/**
 * 48px button. Light slide: filled green ("Filled"). Dark slide: 1px light outline
 * ("Outlined – Neutral"). Not shown in the mobile frame.
 * A plain <a>, not Next.js <Link>: the CTA opens the chat via "#chat-with-bharati", and
 * <Link> changes the hash with history.pushState, which fires no `hashchange`.
 */
export const Cta = styled(
  'a',
  forwardTone,
)<ToneProps>(({ theme, tone }) => {
  const palette = (theme.vars ?? theme).palette;
  const dark = tone === 'dark';
  return {
    ...theme.typography.labelXL,
    display: 'none',
    alignItems: 'center',
    height: size.heroButtonHeight,
    paddingInline: theme.spacing(6),
    borderRadius: radius.sm,
    border: `${borderWidth.thin}px solid ${dark ? palette.border.subtle : palette.brand.primary}`,
    backgroundColor: dark ? 'transparent' : palette.brand.primary,
    color: palette.text.inverse,
    fontWeight: fontWeight.medium,
    textDecoration: 'none',
    transition: theme.transitions.create(['background-color', 'color', 'border-color']),
    // Same hover as the Figma Button set: outlined fills in, filled goes a step darker.
    '&:hover': dark
      ? {
          backgroundColor: palette.surface.card,
          borderColor: palette.surface.card,
          color: palette.brand.primary,
        }
      : { backgroundColor: palette.brand.primaryHover, borderColor: palette.brand.primaryHover },
    [theme.breakpoints.up('lg')]: { display: 'inline-flex' },
  };
});

/* ---------------- Controls (follow the current slide's tone) ---------------- */

const mediaControl = (theme: Theme, tone: Tone) => {
  const palette = (theme.vars ?? theme).palette;
  const dark = tone === 'dark';
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: dark ? palette.surface.mediaControlInverse : palette.surface.mediaControl,
    color: dark ? palette.brand.highlight : palette.text.inverse,
    transition: theme.transitions.create(['background-color', 'color']),
  };
};

interface ArrowProps extends ToneProps {
  side: 'prev' | 'next';
}

/** 32px square arrows, desktop only (DBIM: contrasting icon on a solid overlay). */
export const Arrow = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'side' && prop !== 'tone',
})<ArrowProps>(({ theme, side, tone }) => ({
  ...mediaControl(theme, tone),
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  [side === 'prev' ? 'left' : 'right']: theme.spacing(12.5),
  width: size.heroArrow,
  height: size.heroArrow,
  borderRadius: radius.xs,
  display: 'none',
  [theme.breakpoints.up('lg')]: { display: 'inline-flex' },
}));

export const Controls = styled('div')(({ theme }) => ({
  position: 'absolute',
  insetInlineEnd: theme.spacing(2),
  bottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    insetInlineEnd: theme.spacing(19.5),
    bottom: theme.spacing(8),
    gap: theme.spacing(3),
  },
}));

/** Figma: 65×18 pill holding 10px dots, 5px apart. */
export const DotsPill = styled(
  'div',
  forwardTone,
)<ToneProps>(({ theme, tone }) => ({
  ...mediaControl(theme, tone),
  gap: theme.spacing(1.25),
  padding: theme.spacing(1, 3),
  borderRadius: radius.full,
}));

interface ActiveProps {
  active: boolean;
}

export const Dot = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<ActiveProps>(({ theme, active }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    position: 'relative',
    width: size.carouselDot,
    height: size.carouselDot,
    padding: 0,
    border: 0,
    borderRadius: radius.full,
    backgroundColor: active ? palette.control.dotActive : palette.control.dotInactive,
    cursor: 'pointer',
    // Bigger invisible hit area than the 10px dot.
    '&::before': { content: '""', position: 'absolute', inset: theme.spacing(-1.5) },
  };
});

/** 38px circle (28px on mobile) with a 24px pause/play icon. */
export const PlayPause = styled(
  ButtonBase,
  forwardTone,
)<ToneProps>(({ theme, tone }) => ({
  ...mediaControl(theme, tone),
  width: size.heroPauseMobile,
  height: size.heroPauseMobile,
  borderRadius: radius.full,
  [theme.breakpoints.up('lg')]: { width: size.heroPause, height: size.heroPause },
}));

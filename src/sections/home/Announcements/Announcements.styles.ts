'use client';

import { keyframes, styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { borderWidth, fontWeight, motion, radius, size } from '@/theme/tokens';

/**
 * Figma announcements bar (under the hero carousel, as in the "Search" and mobile frames;
 * styling from "Final-Home")
 * Desktop: 61px, #EAEAEA · "Announcements" 18px extra-bold green · 19px green separator ·
 *   scrolling items (24px megaphone + 16px medium #404040, 8px gap, separators 20px apart) ·
 *   36px white circle with a green pause icon.
 * Mobile: same pieces, smaller (sizes estimated from the mobile frame).
 */

const scroll = keyframes({
  from: { transform: 'translateX(0)' },
  // The track holds the list twice, so moving by half loops seamlessly.
  to: { transform: 'translateX(-50%)' },
});

export const Bar = styled('section')(({ theme }) => ({
  backgroundColor: (theme.vars ?? theme).palette.surface.announcement,
}));

export const Inner = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  minHeight: size.announcementHeightMobile,
  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(5),
    minHeight: size.announcementHeight,
  },
}));

export const Label = styled('h2')(({ theme }) => ({
  ...theme.typography.announcementLabelMobile,
  flexShrink: 0,
  margin: 0,
  fontWeight: fontWeight.extrabold,
  color: (theme.vars ?? theme).palette.brand.primary,
  [theme.breakpoints.up('lg')]: { ...theme.typography.announcementLabel },
}));

export const Separator = styled('span')(({ theme }) => ({
  flexShrink: 0,
  height: size.announcementSeparator,
  borderInlineStart: `${borderWidth.thin}px solid ${(theme.vars ?? theme).palette.brand.primary}`,
}));

export const Viewport = styled('div')({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
});

interface TrackProps {
  animated: boolean;
  paused: boolean;
}

/** Pauses while hovered or while keyboard focus is inside, as well as on the Pause button. */
export const Track = styled('div', {
  shouldForwardProp: (prop) => prop !== 'animated' && prop !== 'paused',
})<TrackProps>(({ animated, paused }) => ({
  display: 'flex',
  width: 'max-content',
  ...(animated
    ? {
        animation: `${scroll} ${motion.tickerLoopSeconds}s linear infinite`,
        animationPlayState: paused ? 'paused' : 'running',
        '&:hover, &:focus-within': { animationPlayState: 'paused' },
      }
    : {}),
}));

/** Reduced motion: no animation — the list scrolls sideways by hand instead. */
export const StaticViewport = styled(Viewport)({
  overflowX: 'auto',
});

export const List = styled('ul')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(5),
  margin: 0,
  paddingInlineEnd: theme.spacing(5),
  paddingInlineStart: 0,
  listStyle: 'none',
}));

export const Item = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(5),
  flexShrink: 0,
}));

export const Message = styled('span')(({ theme }) => ({
  ...theme.typography.announcementTextMobile,
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  whiteSpace: 'nowrap',
  fontWeight: fontWeight.medium,
  color: (theme.vars ?? theme).palette.text.secondary,
  [theme.breakpoints.up('lg')]: { ...theme.typography.headingXS },
  '& a': { color: 'inherit' },
}));

/** 36px white circle (24px on mobile) with a green pause/play icon. */
export const PlayPause = styled(ButtonBase)(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    flexShrink: 0,
    width: size.announcementPauseMobile,
    height: size.announcementPauseMobile,
    borderRadius: radius.full,
    backgroundColor: palette.surface.mediaControlInverse,
    color: palette.brand.primary,
    [theme.breakpoints.up('lg')]: {
      width: size.announcementPause,
      height: size.announcementPause,
    },
  };
});

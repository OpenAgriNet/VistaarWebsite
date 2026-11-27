'use client';

import { styled } from '@mui/material/styles';
import { borderWidth, fontWeight, radius, size } from '@/theme/tokens';

/**
 * Figma Frame 45 → capabilities card: white, 1px #D9D9D9 border, 12px radius,
 * padding 24/16, 24px gap. Left: vertical tab list (176×36 tabs, 8px radius, padding 8/12,
 * label + chevron; active brand green with 14 semibold white text, inactive #EDF0F0 with
 * 14 regular #2F2E41). Right: content card (1px border, 12px radius, padding 16/16/24/16)
 * with title 16/120% extrabold, description 13/120%, ‹ › 24px buttons top-right,
 * hairline divider, "What you can explore" 16 bold and features (14 semibold + 13 regular).
 * Mobile (estimated): tabs become a horizontally scrolling row above the content card.
 */

export const Card = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  minWidth: 0,
  padding: theme.spacing(4),
  border: `${borderWidth.thin}px solid ${(theme.vars ?? theme).palette.border.subtle}`,
  borderRadius: radius.image,
  backgroundColor: (theme.vars ?? theme).palette.surface.card,
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    gap: theme.spacing(6),
    paddingBlock: theme.spacing(6),
  },
}));

export const TabList = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  overflowX: 'auto',
  scrollbarWidth: 'none',
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'column',
    flexShrink: 0,
    overflowX: 'visible',
  },
}));

interface TabProps {
  selected: boolean;
}

export const Tab = styled('button', {
  shouldForwardProp: (prop) => prop !== 'selected',
})<TabProps>(({ theme, selected }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.labelL,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    flexShrink: 0,
    height: size.capabilityTabHeight,
    paddingBlock: theme.spacing(2),
    paddingInline: theme.spacing(3),
    border: 0,
    borderRadius: radius.sm,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textAlign: 'left',
    fontWeight: selected ? fontWeight.semibold : fontWeight.regular,
    color: selected ? palette.text.inverse : palette.text.control,
    backgroundColor: selected ? palette.brand.primary : palette.surface.control,
    transition: theme.transitions.create(['background-color', 'color']),
    '&:focus-visible': {
      outline: `${theme.spacing(0.5)} solid ${palette.brand.primary}`,
      outlineOffset: theme.spacing(0.5),
    },
    [theme.breakpoints.up('lg')]: { width: size.capabilityTabWidth },
  };
});

/**
 * Every panel sits in the same grid cell, so the box is always as tall as the longest
 * capability (in any language or text size) and does not grow or shrink when switching tabs.
 */
export const Panels = styled('div')({
  flex: 1,
  display: 'grid',
  minWidth: 0,
});

/** Panels that are not selected keep their space but are invisible and out of the a11y tree. */
export const Content = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  gridArea: '1 / 1',
  visibility: active ? 'visible' : 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  minWidth: 0,
  padding: theme.spacing(4, 4, 6),
  border: `${borderWidth.thin}px solid ${(theme.vars ?? theme).palette.border.subtle}`,
  borderRadius: radius.image,
}));

export const ContentHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(3),
}));

export const Intro = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const Title = styled('h3')(({ theme }) => ({
  ...theme.typography.capabilityTitle,
  margin: 0,
  fontWeight: fontWeight.extrabold,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const Body = styled('p')(({ theme }) => ({
  ...theme.typography.capabilityBody,
  margin: 0,
  color: (theme.vars ?? theme).palette.text.control,
}));

export const Divider = styled('hr')(({ theme }) => ({
  width: '100%',
  margin: 0,
  border: 0,
  borderTop: `${borderWidth.thin}px solid ${(theme.vars ?? theme).palette.border.hairline}`,
}));

export const ExploreHeading = styled('h4')(({ theme }) => ({
  ...theme.typography.capabilityTitle,
  margin: 0,
  fontWeight: fontWeight.bold,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const Features = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

export const Feature = styled('li')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const FeatureTitle = styled('span')(({ theme }) => ({
  ...theme.typography.labelL,
  fontWeight: fontWeight.semibold,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const FeatureBody = styled('span')(({ theme }) => ({
  ...theme.typography.capabilityBody,
  color: (theme.vars ?? theme).palette.text.control,
}));

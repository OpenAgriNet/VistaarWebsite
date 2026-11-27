'use client';

import { styled, type Theme } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import ButtonBase from '@mui/material/ButtonBase';
import NextLink from 'next/link';
import { borderWidth, fontWeight, headerLayer, radius, shadow, size } from '@/theme/tokens';

/**
 * Figma (mobile): the menu drops down under the 52px header — search + utility icons,
 * then the nav list (42px rows, 1px separators, active row brand at 10% with brand underline).
 */

/** Portalled to <body>: dims the page, stays just under the header (appBar level). */
export const Scrim = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.appBar - 1,
  backgroundColor: (theme.vars ?? theme).palette.overlay,
}));

export const Panel = styled('div')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    position: 'absolute',
    insetInline: 0,
    top: '100%',
    zIndex: headerLayer.raised,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    paddingBlock: theme.spacing(4),
    backgroundColor: palette.surface.page,
    borderEndStartRadius: radius.md,
    borderEndEndRadius: radius.md,
    boxShadow: shadow.menu,
    maxHeight: `calc(100dvh - ${size.mobileHeaderHeight}px)`,
    overflowY: 'auto',
  };
});

export const Tools = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  paddingInline: theme.spacing(4),
}));

export const List = styled('ul')({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

interface ActiveProps {
  active: boolean;
}

const rowStyles = ({ theme, active }: { theme: Theme } & ActiveProps) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.headingXS,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left' as const,
    gap: theme.spacing(1.5),
    width: '100%',
    minHeight: size.mobileMenuRowHeight,
    paddingInline: theme.spacing(5),
    color: active ? palette.brand.primary : palette.text.secondary,
    fontWeight: active ? fontWeight.bold : fontWeight.regular,
    textDecoration: 'none',
    backgroundColor: active ? palette.surface.navActive : 'transparent',
    borderBottom: `${active ? borderWidth.thick : borderWidth.thin}px solid ${
      active ? palette.brand.primary : palette.border.subtle
    }`,
  };
};

const forwardActive = { shouldForwardProp: (prop: PropertyKey) => prop !== 'active' };

export const RowLink = styled(NextLink, forwardActive)<ActiveProps>(rowStyles);

/** Row that expands its sub-items (Connect). */
export const RowButton = styled(ButtonBase, forwardActive)<ActiveProps>(rowStyles);

interface OpenProps {
  open: boolean;
}

export const Chevron = styled('span', {
  shouldForwardProp: (prop) => prop !== 'open',
})<OpenProps>(({ theme, open }) => ({
  display: 'inline-flex',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
  }),
  transform: open ? 'rotate(180deg)' : 'none',
}));

/** Connect's items, indented under the row. */
export const SubList = styled('ul')(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(1, 0, 1, 3),
  listStyle: 'none',
  borderBottom: `${borderWidth.thin}px solid ${(theme.vars ?? theme).palette.border.subtle}`,
}));

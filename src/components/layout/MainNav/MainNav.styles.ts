'use client';

import { styled, type Theme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Menu from '@mui/material/Menu';
import NextLink from 'next/link';
import { borderWidth, fontWeight, radius, shadow, size } from '@/theme/tokens';

/**
 * Figma (desktop): 55px bar, 1px #D9D9D9 bottom line, 16px text (#404040 regular · active:
 * brand, bold, 3px underline). Items 52px apart on the left and the "Partner With Us"
 * button on the right (Figma "Search" frame: space-between, 80px side padding).
 */
export const Bar = styled('nav')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    backgroundColor: palette.surface.page,
    borderBottom: `${borderWidth.thin}px solid ${palette.border.subtle}`,
  };
});

export const Inner = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(6),
  minHeight: size.navHeight,
}));

export const List = styled('ul')(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  alignSelf: 'stretch',
  gap: theme.spacing(13),
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

export const ListItem = styled('li')({
  display: 'flex',
});

interface ActiveProps {
  active: boolean;
}

const itemStyles = ({ theme, active }: { theme: Theme } & ActiveProps) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.headingXS,
    position: 'relative' as const,
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    color: active ? palette.brand.primary : palette.text.secondary,
    fontWeight: active ? fontWeight.bold : fontWeight.regular,
    textDecoration: 'none',
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      insetInline: 0,
      bottom: 0,
      height: borderWidth.navIndicator,
      backgroundColor: active ? palette.brand.primary : 'transparent',
    },
  };
};

const forwardActive = { shouldForwardProp: (prop: PropertyKey) => prop !== 'active' };

export const ItemLink = styled(NextLink, forwardActive)<ActiveProps>(itemStyles);

export const ItemButton = styled(ButtonBase, forwardActive)<ActiveProps>(itemStyles);

interface OpenProps {
  open: boolean;
}

/** Chevron flips when the dropdown is open. */
export const Chevron = styled('span', {
  shouldForwardProp: (prop) => prop !== 'open',
})<OpenProps>(({ theme, open }) => ({
  display: 'inline-flex',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
  }),
  transform: open ? 'rotate(180deg)' : 'none',
}));

/** Figma "Action menu": 225px, white, rounded, Shadows/Raised, 4px vertical padding. */
export const DropdownMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: size.dropdownWidth,
    marginTop: theme.spacing(2),
    borderRadius: radius.sm,
    boxShadow: shadow.raised,
    backgroundColor: (theme.vars ?? theme).palette.surface.page,
  },
  '& .MuiList-root': { paddingBlock: theme.spacing(1) },
}));

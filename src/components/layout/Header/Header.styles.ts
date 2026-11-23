'use client';

import { styled } from '@mui/material/styles';
import { headerLayer, size } from '@/theme/tokens';
import { HEADER_VARS, headerVar } from '@/constants/layout';

/**
 * Figma: desktop = 90px government top bar (#FAFAFA) + 55px nav bar;
 * mobile = 52px bar with the lockup and a menu button.
 *
 * DBIM (homepage header): "The header/navigation menu (depending on screen size) should
 * stay sticky while scrolling." The header is sticky with a negative top equal to the part
 * that scrolls away (measured by useHeaderOffsets): on desktop the government bar scrolls
 * off and the navigation bar stays; on mobile the whole header bar stays.
 * It sits below MUI menus/dialogs (modal level) and above page content.
 */
export const Root = styled('header')(({ theme }) => ({
  position: 'sticky',
  top: `calc(-1 * ${headerVar(HEADER_VARS.scrollAway)})`,
  zIndex: theme.zIndex.appBar,
  '@media print': { position: 'static' },
}));

/** Raised so it stays visible above the mobile menu scrim. */
export const TopBar = styled('div')(({ theme }) => ({
  position: 'relative',
  zIndex: headerLayer.raised,
  backgroundColor: (theme.vars ?? theme).palette.surface.topBar,
}));

export const TopBarInner = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
  minHeight: size.mobileHeaderHeight,
  [theme.breakpoints.up('lg')]: {
    minHeight: size.topBarHeight,
  },
}));

/** Search + utility icons (desktop top bar). Figma: 24px apart. */
export const DesktopTools = styled('div')(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: theme.spacing(6),
  [theme.breakpoints.up('lg')]: { display: 'flex' },
}));

export const MobileOnly = styled('div')(({ theme }) => ({
  display: 'flex',
  color: (theme.vars ?? theme).palette.text.primary,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));

export const DesktopOnly = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: { display: 'block' },
}));

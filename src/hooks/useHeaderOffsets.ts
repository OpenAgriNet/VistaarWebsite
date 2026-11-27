'use client';

import { useEffect, type RefObject } from 'react';
import { useTheme } from '@mui/material/styles';
import { HEADER_VARS } from '@/constants/layout';

/**
 * Measures the header so the sticky behaviour is exact at any text size or language
 * (both change the bar heights):
 *   desktop (lg+): the government top bar scrolls away, the navigation bar sticks;
 *   mobile: the whole 52px header bar sticks.
 * Header.styles uses the scroll-away height as a negative `top`; global.styles uses the
 * sticky height as `scroll-padding-top`, so anchor links, the skip link and keyboard focus
 * never land underneath the bar (WCAG 2.4.11).
 */
export function useHeaderOffsets(
  headerRef: RefObject<HTMLElement | null>,
  topBarRef: RefObject<HTMLElement | null>,
) {
  const theme = useTheme();
  const desktopQuery = theme.breakpoints.up('lg').replace(/^@media\s*/, '');

  useEffect(() => {
    const header = headerRef.current;
    const topBar = topBarRef.current;
    if (!header || !topBar) return;

    const root = document.documentElement;
    const desktop = window.matchMedia(desktopQuery);

    const update = () => {
      const scrollAway = desktop.matches ? topBar.offsetHeight : 0;
      root.style.setProperty(HEADER_VARS.scrollAway, `${scrollAway}px`);
      root.style.setProperty(HEADER_VARS.sticky, `${header.offsetHeight - scrollAway}px`);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    observer.observe(topBar);
    desktop.addEventListener('change', update);

    return () => {
      observer.disconnect();
      desktop.removeEventListener('change', update);
      root.style.removeProperty(HEADER_VARS.scrollAway);
      root.style.removeProperty(HEADER_VARS.sticky);
    };
  }, [headerRef, topBarRef, desktopQuery]);
}

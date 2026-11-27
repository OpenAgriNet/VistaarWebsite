import type { Theme } from '@mui/material/styles';
import { borderWidth, size } from '@/theme/tokens';
import { HEADER_VARS, headerVar } from '@/constants/layout';

/**
 * Site-wide CSS (used by <GlobalStyles> in AppProviders).
 * MUI's <CssBaseline> already provides the reset.
 */
export const globalStyles = (theme: Theme) => {
  const palette = (theme.vars ?? theme).palette;

  return {
    // Text size +/- (accessibility package) changes the root font-size in %;
    // all typography is rem-based, so everything scales with it.
    // Sticky header + ticker: anchor links, the skip link and keyboard focus stop below them.
    html: {
      fontSize: '100%',
      scrollBehavior: 'smooth' as const,
      scrollPaddingTop: `calc(${headerVar(HEADER_VARS.sticky)} + ${headerVar(HEADER_VARS.ticker)} + ${theme.spacing(4)})`,
    },
    body: {
      backgroundColor: palette.background.default,
      color: palette.text.primary,
      textAlign: 'left' as const,
    },
    'img, svg, video': { maxWidth: '100%', display: 'block' },
    a: { color: 'inherit' },

    // DBIM: tables → text left-aligned, numbers right-aligned, column names centred.
    table: { borderCollapse: 'collapse' as const },
    th: { textAlign: 'center' as const },
    td: { textAlign: 'left' as const },
    'td[data-numeric]': { textAlign: 'right' as const, fontVariantNumeric: 'tabular-nums' },

    // Page in another language: letter-spacing tuned for Latin headings pulls apart Indic
    // conjuncts and breaks Arabic-script joining (Urdu, Kashmiri, Sindhi), so drop it.
    'html:not([lang="en"]) body *:not([translate="no"])': {
      letterSpacing: 'normal !important',
    },

    ':focus-visible': {
      outline: `${borderWidth.thick}px solid ${palette.brand.primary}`,
      outlineOffset: borderWidth.thick,
    },

    '@media (prefers-reduced-motion: reduce)': {
      '*, *::before, *::after': {
        animationDuration: '0.01ms !important',
        transitionDuration: '0.01ms !important',
        scrollBehavior: 'auto !important',
      },
    },

    // Visually hidden but available to screen readers.
    '.sr-only': {
      position: 'absolute' as const,
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap' as const,
      border: 0,
    },

    '.skip-link': {
      position: 'absolute' as const,
      left: theme.spacing(4),
      top: theme.spacing(-20),
      zIndex: theme.zIndex.tooltip,
      padding: theme.spacing(2, 4),
      backgroundColor: palette.brand.primary,
      color: palette.text.inverse,
      '&:focus': { top: theme.spacing(4) },
    },

    // Page content column: 1280px wide on the 1440 desktop frame (80px gutters),
    // 16px gutters on the 375 mobile frame.
    '.container': {
      // border-box (inherited by children): 1280 content + 2 × 80 desktop gutters.
      maxWidth: `calc(${size.contentMaxWidth}px + ${theme.spacing(40)})`,
      marginInline: 'auto',
      paddingInline: theme.spacing(4),
      [theme.breakpoints.up('lg')]: { paddingInline: theme.spacing(20) },
    },
  };
};

'use client';

import { styled } from '@mui/material/styles';
import { borderWidth, radius, size } from '@/theme/tokens';

/**
 * The small ‹ › pair at the top-right of Capabilities, Testimonials and Latest Updates:
 * 24px squares, 1px #D9D9D9 border, 4px radius, white, green chevron, 8px apart.
 */
export const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexShrink: 0,
  gap: theme.spacing(2),
}));

export const Arrow = styled('button')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size.capabilityArrow,
    height: size.capabilityArrow,
    padding: 0,
    border: `${borderWidth.thin}px solid ${palette.border.subtle}`,
    borderRadius: radius.xs,
    backgroundColor: palette.surface.card,
    color: palette.brand.primary,
    cursor: 'pointer',
    '&:disabled': { cursor: 'default', opacity: theme.palette.action.disabledOpacity },
    '&:focus-visible': {
      outline: `${borderWidth.thick}px solid ${palette.brand.primary}`,
      outlineOffset: theme.spacing(0.5),
    },
  };
});

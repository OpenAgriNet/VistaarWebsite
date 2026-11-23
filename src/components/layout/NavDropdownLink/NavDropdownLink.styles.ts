'use client';

import { styled } from '@mui/material/styles';
import { fontWeight, size } from '@/theme/tokens';

/**
 * Figma "_Action menu item": min 40px tall, 8/16 padding, 10px gap,
 * 16px external-link icon + Body S (14/22) label in #171717, transparent until hovered.
 */
export const Root = styled('a')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.bodyS,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2.5),
    width: '100%',
    minHeight: size.dropdownItemHeight,
    padding: theme.spacing(2, 4),
    color: palette.text.primary,
    fontWeight: fontWeight.regular,
    textDecoration: 'none',
    '&:hover, &:focus-visible': {
      backgroundColor: palette.surface.subtle,
      textDecoration: 'underline',
    },
  };
});

export const IconSlot = styled('span')({
  display: 'inline-flex',
  flexShrink: 0,
  width: size.dropdownIcon,
  height: size.dropdownIcon,
  '& > svg': { width: '100%', height: '100%' },
});

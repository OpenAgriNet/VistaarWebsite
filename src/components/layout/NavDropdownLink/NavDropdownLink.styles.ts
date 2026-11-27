'use client';

import { styled } from '@mui/material/styles';
import { fontWeight, size } from '@/theme/tokens';

/**
 * Figma "_Action menu item": min 40px tall, 8/16 padding, 10px gap,
 * 16px external-link icon + Body S (14/22) label in #171717, transparent until hovered.
 * Optional byline under the label (client request): smaller (Body XS) and greyer
 * (#404040, still 10:1 contrast on white) than the label.
 */
export const Root = styled('a')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(2.5),
    width: '100%',
    minHeight: size.dropdownItemHeight,
    padding: theme.spacing(2, 4),
    color: palette.text.primary,
    textDecoration: 'none',
    '&:hover, &:focus-visible': {
      backgroundColor: palette.surface.subtle,
      // Underline the label only, not the byline.
      '& [data-label]': { textDecoration: 'underline' },
    },
  };
});

/** Lines the icon up with the first (label) line: (22px line − 16px icon) / 2. */
export const IconSlot = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  flexShrink: 0,
  width: size.dropdownIcon,
  height: size.dropdownIcon,
  marginTop: theme.spacing(0.75),
  '& > svg': { width: '100%', height: '100%' },
}));

export const Text = styled('span')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  minWidth: 0,
}));

export const Label = styled('span')(({ theme }) => ({
  ...theme.typography.bodyS,
  fontWeight: fontWeight.regular,
}));

export const Description = styled('span')(({ theme }) => ({
  ...theme.typography.bodyXS,
  color: (theme.vars ?? theme).palette.text.secondary,
}));

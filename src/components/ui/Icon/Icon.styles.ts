'use client';

import { styled } from '@mui/material/styles';
import { iconSize } from '@/theme/tokens';

export type IconSize = keyof typeof iconSize;
export type IconTone = 'brand' | 'inverse' | 'inherit';

interface RootProps {
  size: IconSize;
  tone: IconTone;
}

export const Root = styled('span', {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'tone',
})<RootProps>(({ theme, size, tone }) => {
  const palette = (theme.vars ?? theme).palette;
  const toneColor = {
    brand: palette.brand.primary,
    inverse: palette.text.inverse,
    inherit: 'inherit',
  }[tone];

  return {
    display: 'inline-flex',
    flexShrink: 0,
    width: iconSize[size],
    height: iconSize[size],
    color: toneColor,
    '& > svg': { width: '100%', height: '100%', fontSize: 'inherit' },
  };
});

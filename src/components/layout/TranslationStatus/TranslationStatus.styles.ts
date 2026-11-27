'use client';

import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

/** Thin bar across the top of the window while a language's files are loading. */
export const Progress = styled(LinearProgress)(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    position: 'fixed',
    insetInline: 0,
    top: 0,
    zIndex: theme.zIndex.tooltip,
    backgroundColor: palette.surface.brandTint,
    '& .MuiLinearProgress-bar': {
      backgroundColor: palette.brand.primary,
    },
  };
});

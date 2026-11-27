'use client';

import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import { size } from '@/theme/tokens';

/** 23 languages: the list scrolls instead of running off the screen. */
export const LanguageMenu = styled(Menu)({
  '& .MuiMenu-paper': {
    maxHeight: size.languageMenuMaxHeight,
  },
});

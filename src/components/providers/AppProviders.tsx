'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { theme } from '@/theme/theme';
import { globalStyles } from '@/styles/global.styles';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { AccessibilityProvider } from '@/accessibility/AccessibilityProvider';
import { CONTRAST_MODE_STORAGE_KEY } from '@/accessibility/accessibility.config';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      theme={theme}
      defaultMode="light"
      modeStorageKey={CONTRAST_MODE_STORAGE_KEY}
      disableTransitionOnChange
    >
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <LanguageProvider>
        <AccessibilityProvider>{children}</AccessibilityProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

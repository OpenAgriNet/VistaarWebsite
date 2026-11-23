'use client';

import IconButton from '@mui/material/IconButton';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { AccessibilityPanel } from '@/components/layout/AccessibilityPanel';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import * as S from './TopBarActions.styles';
import { DbimSkipToContent } from '@/components/ui/Icon/dbim';

/**
 * DBIM header utilities: Skip to main content · Language · Accessibility.
 */
export function TopBarActions() {
  const t = useTranslations();

  return (
    <S.Root>
      <IconButton color="inherit" href="#main-content" aria-label={t('skipToContent')}>
        <Icon icon={DbimSkipToContent} size="sm" tone="inherit" />
      </IconButton>
      <S.Separator aria-hidden />
      <LanguageSwitcher />
      <S.Separator aria-hidden />
      <AccessibilityPanel />
    </S.Root>
  );
}

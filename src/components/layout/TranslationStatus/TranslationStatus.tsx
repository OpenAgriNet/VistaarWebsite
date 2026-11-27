'use client';

import { useTranslations } from 'next-intl';
import { useLanguage } from '@/i18n/LanguageProvider';
import { defaultLocale, getLanguageLabel } from '@/i18n/config';
import * as S from './TranslationStatus.styles';

/**
 * Feedback while a language's files are loading: a progress bar for sighted visitors and a
 * polite announcement for screen readers. Language names are shown in their own script, so
 * they are never translated.
 */
export function TranslationStatus() {
  const t = useTranslations('language');
  const { lang, shownLang, status } = useLanguage();
  const language = getLanguageLabel(lang);

  let message = '';
  if (status === 'loading') message = t('translating', { language });
  else if (status === 'error') message = t('error');
  else if (shownLang !== defaultLocale)
    message = t('done', { language: getLanguageLabel(shownLang) });

  return (
    <>
      {status === 'loading' && <S.Progress aria-hidden="true" />}
      <p className="sr-only" role="status" aria-live="polite" translate="no">
        {message}
      </p>
    </>
  );
}

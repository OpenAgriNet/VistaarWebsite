'use client';

import { useTranslations } from 'next-intl';
import { useLanguage } from '@/i18n/LanguageProvider';
import { defaultLocale, getLanguageLabel } from '@/i18n/config';
import * as S from './TranslationStatus.styles';

/**
 * Feedback while the page is being translated: a progress bar for sighted visitors and a
 * polite announcement for screen readers. The messages are left untranslated on purpose
 * (they describe the translation itself and show before it is ready).
 */
export function TranslationStatus() {
  const t = useTranslations('language');
  const { lang, status } = useLanguage();
  const language = getLanguageLabel(lang);

  let message = '';
  if (status === 'translating') message = t('translating', { language });
  else if (status === 'error') message = t('error');
  else if (lang !== defaultLocale) message = t('done', { language });

  return (
    <>
      {status === 'translating' && <S.Progress aria-hidden="true" />}
      <p className="sr-only" role="status" aria-live="polite" translate="no">
        {message}
      </p>
    </>
  );
}

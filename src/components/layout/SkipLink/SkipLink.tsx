'use client';

import { useTranslations } from 'next-intl';

/** "Skip to main content" — first focusable element on every page (styles: .skip-link). */
export function SkipLink() {
  const t = useTranslations();
  return (
    <a href="#main-content" className="skip-link">
      {t('skipToContent')}
    </a>
  );
}

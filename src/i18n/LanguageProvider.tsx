'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { NextIntlClientProvider } from 'next-intl';
import enCommon from '@locales/en/common.json';
import { defaultLocale, languages, type Locale } from './config';
import { languageStore } from './languageStore';
import { PageTranslator, type TranslationStatus } from './translation/PageTranslator';

interface LanguageContextValue {
  lang: Locale;
  languages: typeof languages;
  status: TranslationStatus;
  setLanguage: (lang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: defaultLocale,
  languages,
  status: 'idle',
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

/**
 * Language for the whole site, same URL for every language.
 *
 * English labels (common.json) are rendered by next-intl and pre-rendered into the static
 * HTML. Other languages are applied after load by translating the rendered page live
 * through Bhashini (PageTranslator), exactly like vistaar.da.gov.in. The choice is kept in
 * localStorage and re-applied on every page.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(
    languageStore.subscribe,
    languageStore.getSnapshot,
    languageStore.getServerSnapshot,
  );
  const [status, setStatus] = useState<TranslationStatus>('idle');
  const translatorRef = useRef<PageTranslator | null>(null);

  // Create the translator once the page has hydrated.
  useEffect(() => {
    const translator = new PageTranslator(document.body, setStatus);
    translatorRef.current = translator;
    return () => translator.destroy();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    void translatorRef.current?.setLanguage(lang);
  }, [lang]);

  const setLanguage = useCallback((next: Locale) => languageStore.set(next), []);

  const value = useMemo(
    () => ({ lang, languages, status, setLanguage }),
    [lang, status, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      <NextIntlClientProvider locale={defaultLocale} messages={enCommon} timeZone="Asia/Kolkata">
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

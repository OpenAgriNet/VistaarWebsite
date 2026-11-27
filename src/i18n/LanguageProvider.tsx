'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { NextIntlClientProvider } from 'next-intl';
import enCommon from '@locales/en/common.json';
import { defaultLocale, languages, type Locale } from './config';
import { languageStore } from './languageStore';
import { fetchLocaleFile, mergeTranslation, type LocaleFile } from './localeFiles';

export type LanguageStatus = 'idle' | 'loading' | 'error';

interface LanguageContextValue {
  /** The language the visitor picked. */
  lang: Locale;
  /** The language on screen (stays on the previous one until the new files have loaded). */
  shownLang: Locale;
  languages: typeof languages;
  status: LanguageStatus;
  setLanguage: (lang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: defaultLocale,
  shownLang: defaultLocale,
  languages,
  status: 'idle',
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

/** Loaded translations: bundles[lang][file] = the raw translated JSON. */
type Bundles = Partial<Record<Locale, Partial<Record<LocaleFile, unknown>>>>;

interface ContentContextValue {
  shownLang: Locale;
  bundles: Bundles;
  requireFile: (file: LocaleFile) => void;
}

const ContentContext = createContext<ContentContextValue>({
  shownLang: defaultLocale,
  bundles: {},
  requireFile: () => {},
});

/**
 * Page content in the visitor's language. `english` is the content the page was built with
 * (pre-rendered into the static HTML); the translated file is laid over it once loaded.
 * `section` picks one top-level entry of the file (e.g. one legal document).
 */
export function useLocalizedContent<T>(file: LocaleFile, english: T, section?: string): T {
  const { shownLang, bundles, requireFile } = useContext(ContentContext);

  useEffect(() => {
    requireFile(file);
  }, [file, requireFile]);

  const bundle = shownLang === defaultLocale ? undefined : bundles[shownLang]?.[file];
  const translated =
    bundle !== undefined && section !== undefined
      ? (bundle as Record<string, unknown>)[section]
      : bundle;

  return useMemo(
    () => (translated === undefined ? english : mergeTranslation(english, translated)),
    [english, translated],
  );
}

/**
 * Language for the whole site, same URL for every language.
 *
 * English is pre-rendered into the static HTML. Every other language comes from the
 * pre-translated files in public/locales/<lang>/ (generated with Bhashini, reviewed and
 * editable): picking a language loads that language's files — common.json for the labels,
 * plus whatever the page uses (home.json, legal.json) — and the page re-renders in it.
 * Nothing is translated live. The choice is kept in localStorage and re-applied on every page.
 * If a file cannot be loaded, the page stays in the language it was in.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(
    languageStore.subscribe,
    languageStore.getSnapshot,
    languageStore.getServerSnapshot,
  );
  const [shownLang, setShownLang] = useState<Locale>(defaultLocale);
  const [failedLang, setFailedLang] = useState<Locale | null>(null);
  const [bundles, setBundles] = useState<Bundles>({});
  /** Files the current page uses; pages add theirs through useLocalizedContent. */
  const [files, setFiles] = useState<LocaleFile[]>(['common']);

  const requireFile = useCallback((file: LocaleFile) => {
    setFiles((current) => (current.includes(file) ? current : [...current, file]));
  }, []);

  // Load every file the page needs in the chosen language, then switch to it in one go.
  useEffect(() => {
    let cancelled = false;
    const needed = lang === defaultLocale ? [] : files;
    Promise.all(
      needed.map((file) => fetchLocaleFile(lang, file).then((data) => [file, data] as const)),
    )
      .then((entries) => {
        if (cancelled) return;
        if (entries.length) {
          setBundles((current) => ({
            ...current,
            [lang]: { ...current[lang], ...Object.fromEntries(entries) },
          }));
        }
        setShownLang(lang);
        setFailedLang(null);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        console.error(error);
        setFailedLang(lang);
      });
    return () => {
      cancelled = true;
    };
  }, [lang, files]);

  useEffect(() => {
    document.documentElement.lang = shownLang;
  }, [shownLang]);

  const setLanguage = useCallback((next: Locale) => languageStore.set(next), []);

  const status: LanguageStatus =
    failedLang === lang ? 'error' : lang !== shownLang ? 'loading' : 'idle';

  const messages = useMemo(
    () =>
      shownLang === defaultLocale
        ? enCommon
        : mergeTranslation(enCommon, bundles[shownLang]?.common),
    [shownLang, bundles],
  );

  const languageValue = useMemo(
    () => ({ lang, shownLang, languages, status, setLanguage }),
    [lang, shownLang, status, setLanguage],
  );
  const contentValue = useMemo(
    () => ({ shownLang, bundles, requireFile }),
    [shownLang, bundles, requireFile],
  );

  return (
    <LanguageContext.Provider value={languageValue}>
      <ContentContext.Provider value={contentValue}>
        <NextIntlClientProvider locale={shownLang} messages={messages} timeZone="Asia/Kolkata">
          {children}
        </NextIntlClientProvider>
      </ContentContext.Provider>
    </LanguageContext.Provider>
  );
}

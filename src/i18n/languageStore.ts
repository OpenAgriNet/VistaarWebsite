import { defaultLocale, isLocale, LANGUAGE_STORAGE_KEY, type Locale } from './config';

/**
 * The visitor's language, kept in localStorage (same URL for every language).
 * Used through useSyncExternalStore: the server and the first client render use English
 * (matching the pre-rendered HTML), then the stored language takes over after hydration.
 */
const listeners = new Set<() => void>();
let current: Locale | null = null;

const readStored = (): Locale => {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLocale(stored) ? stored : defaultLocale;
  } catch {
    return defaultLocale;
  }
};

export const languageStore = {
  getSnapshot(): Locale {
    current ??= readStored();
    return current;
  },
  getServerSnapshot(): Locale {
    return defaultLocale;
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  set(lang: Locale) {
    current = lang;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Not remembered in this browser; the page still switches.
    }
    listeners.forEach((listener) => listener());
  },
};

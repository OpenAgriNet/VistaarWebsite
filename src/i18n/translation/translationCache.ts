import type { Locale } from '../config';
import { translationConfig } from './translation.config';

/**
 * Per-browser cache of Bhashini results, so a returning visitor (or a second page) does not
 * wait for the API again. Version and key prefix: translation.config.ts.
 * Storage can be unavailable (private mode, blocked site data) — everything still works,
 * just without the cache.
 */
const cacheKey = (lang: Locale) =>
  `${translationConfig.cacheKeyPrefix}:v${translationConfig.cacheVersion}:${lang}`;

const memory = new Map<Locale, Map<string, string>>();

export function getCache(lang: Locale): Map<string, string> {
  const cached = memory.get(lang);
  if (cached) return cached;

  let stored = new Map<string, string>();
  try {
    const raw = window.localStorage.getItem(cacheKey(lang));
    if (raw) stored = new Map(Object.entries(JSON.parse(raw) as Record<string, string>));
  } catch {
    // No cache available.
  }
  memory.set(lang, stored);
  return stored;
}

export function saveCache(lang: Locale, entries: Map<string, string>) {
  const cache = getCache(lang);
  entries.forEach((value, key) => cache.set(key, value));
  try {
    window.localStorage.setItem(cacheKey(lang), JSON.stringify(Object.fromEntries(cache)));
  } catch {
    // Storage full or blocked: keep the in-memory copy only.
  }
}

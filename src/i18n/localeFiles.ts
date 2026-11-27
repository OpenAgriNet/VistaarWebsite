import type { Locale } from './config';

/**
 * Pre-translated content files: public/locales/<lang>/<file>.json, generated from the English
 * files with Bhashini (translate-locales script) and editable by hand. Served as static files
 * next to the site, so switching language is one small download per file — no live API.
 */
export type LocaleFile = 'common' | 'home' | 'legal';

/**
 * Keys whose values are data, not text (links, images, ids…). These always come from the
 * English file, so a changed link or image applies to every language without regenerating
 * the translations. Keep in sync with SKIP_KEYS in the translate-locales script.
 */
const NON_TEXT_KEYS = new Set([
  'id',
  'href',
  'src',
  'backgroundImage',
  'badge',
  'logo',
  'icon',
  'platform',
  'tone',
  'type',
  'contactEmail',
  'value',
]);

const requests = new Map<string, Promise<unknown>>();

/**
 * Fetches one translated file, once per page visit (repeat calls share the request).
 * Rejects on a network or HTTP error; a failed file is fetched again next time.
 */
export function fetchLocaleFile(lang: Locale, file: LocaleFile): Promise<unknown> {
  const key = `${lang}/${file}`;
  let request = requests.get(key);
  if (!request) {
    request = fetch(`/locales/${key}.json`).then((response) => {
      if (!response.ok) throw new Error(`Could not load ${key}.json (${response.status})`);
      return response.json() as Promise<unknown>;
    });
    request.catch(() => requests.delete(key));
    requests.set(key, request);
  }
  return request;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * English content with the translated text laid over it. The English file decides the shape:
 * text missing from the translation (new or not yet translated) stays in English, and
 * non-text values (NON_TEXT_KEYS) are always the English ones.
 */
export function mergeTranslation<T>(english: T, translated: unknown, key = ''): T {
  if (typeof english === 'string') {
    return (
      !NON_TEXT_KEYS.has(key) && typeof translated === 'string' && translated.trim()
        ? translated
        : english
    ) as T;
  }
  if (Array.isArray(english)) {
    const list = Array.isArray(translated) ? translated : [];
    return english.map((item, index) => mergeTranslation(item, list[index], key)) as T;
  }
  if (isRecord(english)) {
    const source = isRecord(translated) ? translated : {};
    return Object.fromEntries(
      Object.entries(english).map(([k, v]) => [k, mergeTranslation(v, source[k], k)]),
    ) as T;
  }
  return english;
}

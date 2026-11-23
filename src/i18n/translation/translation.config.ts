/**
 * Live translation (Bhashini) settings, in one place.
 *
 * Only the endpoint comes from the environment (it can differ per deployment). The rest
 * describes how Bhashini behaves and is the same everywhere. Note: NEXT_PUBLIC_* values are
 * fixed into the static export at build time, so changing any of these needs a rebuild.
 */
export const translationConfig = {
  /** Bhashini translate endpoint. Set NEXT_PUBLIC_BHASHINI_TRANSLATE_URL to override. */
  endpoint:
    process.env.NEXT_PUBLIC_BHASHINI_TRANSLATE_URL ||
    'https://translation-plugin.bhashini.co.in/v2/translate-text',

  /** Strings sent per request. */
  batchSize: 25,
  /** Requests running at the same time. */
  maxParallelRequests: 4,
  /** Bhashini occasionally drops requests under load: retry a batch after these delays. */
  retryDelaysMs: [600, 1800],

  /** Browser cache of translations. Bump after large content changes to drop old caches. */
  cacheVersion: 1,
  cacheKeyPrefix: 'bv-translations',

  /** Wait for React to finish a burst of DOM updates before translating them. */
  mutationDebounceMs: 120,
} as const;

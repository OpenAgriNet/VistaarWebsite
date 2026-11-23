import { defaultLocale, type Locale } from '@/i18n/config';

import { translationConfig } from '@/i18n/translation/translation.config';

/**
 * Bhashini live translation (the endpoint vistaar.da.gov.in uses).
 * Request:  { sourceLanguage, targetLanguage, textData: string[] }
 * Response: [{ source, target }]
 * Endpoint, batch size, parallelism and retries: i18n/translation/translation.config.ts
 */
const { endpoint, batchSize, maxParallelRequests, retryDelaysMs } = translationConfig;

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      resolve();
    });
  });

interface BhashiniItem {
  source: string;
  target: string;
}

const isBhashiniItem = (value: unknown): value is BhashiniItem =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as BhashiniItem).source === 'string' &&
  typeof (value as BhashiniItem).target === 'string';

async function translateBatchWithRetry(
  texts: string[],
  target: Locale,
  signal?: AbortSignal,
): Promise<BhashiniItem[]> {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await translateBatch(texts, target, signal);
    } catch (error) {
      const delay = retryDelaysMs[attempt];
      if (signal?.aborted || delay === undefined) throw error;
      await wait(delay, signal);
    }
  }
}

async function translateBatch(
  texts: string[],
  target: Locale,
  signal?: AbortSignal,
): Promise<BhashiniItem[]> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sourceLanguage: defaultLocale,
      targetLanguage: target,
      textData: texts,
    }),
    signal,
  });
  if (!response.ok) throw new Error(`Bhashini translation failed: ${response.status}`);
  const data: unknown = await response.json();
  return Array.isArray(data) ? data.filter(isBhashiniItem) : [];
}

/**
 * Translates English strings into `target`. Returns source → translation for every string
 * that came back; failed batches are skipped (that text stays in English) and reported
 * through `failed`.
 */
export async function translateTexts(
  texts: string[],
  target: Locale,
  signal?: AbortSignal,
): Promise<{ translations: Map<string, string>; failed: boolean }> {
  const batches: string[][] = [];
  for (let start = 0; start < texts.length; start += batchSize) {
    batches.push(texts.slice(start, start + batchSize));
  }

  const translations = new Map<string, string>();
  let failed = false;
  let next = 0;

  const worker = async () => {
    while (next < batches.length && !signal?.aborted) {
      const batch = batches[next++];
      if (!batch) return;
      try {
        const items = await translateBatchWithRetry(batch, target, signal);
        items.forEach(({ source, target: text }) => {
          if (text.trim()) translations.set(source, text);
        });
      } catch (error) {
        if (signal?.aborted) return;
        failed = true;
        console.error(error);
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(maxParallelRequests, batches.length) }, worker));
  return { translations, failed };
}

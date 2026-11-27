import type { Locale } from '@/i18n/config';
import type { HomeContent } from '@/types/content';

/**
 * The ONLY place that knows where Home content comes from.
 *
 * Today: static JSON, read at build time and baked into the exported HTML.
 * Later:  `fetch(`${process.env.NEXT_PUBLIC_API_BASE}/home?lang=${lang}`)` — same return type.
 */
export async function getHomeContent(lang: Locale): Promise<HomeContent> {
  const content = await import(`../../public/locales/${lang}/home.json`);
  return content.default as HomeContent;
}

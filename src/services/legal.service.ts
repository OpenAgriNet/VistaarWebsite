import type { Locale } from '@/i18n/config';
import type { LegalDocument, LegalDocumentKey } from '@/types/content';

/**
 * The ONLY place that knows where the legal pages' text comes from.
 * Today: public/locales/<lang>/legal.json (copied from vistaar.da.gov.in), baked into the
 * exported HTML at build time. Later: a CMS/API call with the same return type.
 */
export async function getLegalDocument(
  lang: Locale,
  key: LegalDocumentKey,
): Promise<LegalDocument> {
  const content = await import(`../../public/locales/${lang}/legal.json`);
  return (content.default as Record<LegalDocumentKey, LegalDocument>)[key];
}

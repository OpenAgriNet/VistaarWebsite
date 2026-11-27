import type { Metadata } from 'next';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { defaultLocale } from '@/i18n/config';
import { getLegalDocument } from '@/services/legal.service';

export const metadata: Metadata = { title: 'Disclaimer | BharatVistaar' };

/** /disclaimer/ — text copied from vistaar.da.gov.in (legal.json). */
export default async function DisclaimerPage() {
  const content = await getLegalDocument(defaultLocale, 'disclaimer');
  return <LegalDocument content={content} documentKey="disclaimer" />;
}

import type { Metadata } from 'next';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { defaultLocale } from '@/i18n/config';
import { getLegalDocument } from '@/services/legal.service';

export const metadata: Metadata = { title: 'Terms and Conditions | BharatVistaar' };

/** /terms-and-conditions/ — text copied from vistaar.da.gov.in (legal.json). */
export default async function TermsAndConditionsPage() {
  const content = await getLegalDocument(defaultLocale, 'termsAndConditions');
  return <LegalDocument content={content} documentKey="termsAndConditions" />;
}

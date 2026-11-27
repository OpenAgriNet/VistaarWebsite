import type { Metadata } from 'next';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { defaultLocale } from '@/i18n/config';
import { getLegalDocument } from '@/services/legal.service';

export const metadata: Metadata = { title: 'Privacy Policy | BharatVistaar' };

/** /privacy-policy/ — text copied from vistaar.da.gov.in (legal.json). */
export default async function PrivacyPolicyPage() {
  const content = await getLegalDocument(defaultLocale, 'privacyPolicy');
  return <LegalDocument content={content} documentKey="privacyPolicy" />;
}

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppProviders } from '@/components/providers/AppProviders';
import { CONTRAST_MODE_STORAGE_KEY } from '@/accessibility/accessibility.config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PartnerWithUs } from '@/components/layout/PartnerWithUs';
import { TranslationStatus } from '@/components/layout/TranslationStatus';
import { SkipLink } from '@/components/layout/SkipLink';
import { defaultLocale } from '@/i18n/config';
import { fontVariables } from './fonts';

export const metadata: Metadata = {
  title: 'BharatVistaar',
  description:
    'BharatVistaar connects farmers with agricultural knowledge, technology and digital services.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale} dir="ltr" className={fontVariables} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          attribute="data-bv-scheme"
          defaultMode="light"
          modeStorageKey={CONTRAST_MODE_STORAGE_KEY}
        />
        <AppRouterCacheProvider>
          <AppProviders>
            <SkipLink />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <PartnerWithUs />
            <TranslationStatus />
          </AppProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

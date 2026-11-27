'use client';

import type { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { size } from '@/theme/tokens';
import type { LinkItem, PartnerLink, StoreLink } from '@/types/content';
import * as S from './Footer.styles';
import {
  DbimFacebook,
  DbimInstagram,
  DbimLinkedin,
  DbimX,
  DbimYoutube,
} from '@/components/ui/Icon/dbim';
import { isExternalUrl, newTabProps } from '@/utils/links';

const SOCIAL_ICONS: Record<string, ComponentType> = {
  x: DbimX,
  youtube: DbimYoutube,
  facebook: DbimFacebook,
  instagram: DbimInstagram,
  linkedin: DbimLinkedin,
};

/** Desktop column order (Figma): Legal · Contact · Download Our App · Subscribe. */
const DESKTOP_ORDER = { legal: 1, contact: 2, download: 3, subscribe: 4 } as const;

/**
 * Site footer (Figma "Final-Home"): one layout for every screen size.
 */
export function Footer() {
  const t = useTranslations('footer');
  const legalLinks = t.raw('legalLinks') as LinkItem[];
  const socials = t.raw('socials') as LinkItem[];
  const partners = t.raw('partners') as PartnerLink[];
  const stores = t.raw('stores') as StoreLink[];
  const newTab = t('opensInNewTab');

  return (
    <S.Root>
      <S.Inner className="container">
        <S.Columns>
          <S.Group desktopOrder={DESKTOP_ORDER.legal} aria-labelledby="footer-legal">
            <S.Heading id="footer-legal">{t('legalTitle')}</S.Heading>
            <S.LinkStack>
              {legalLinks.map((link) => (
                <li key={link.id}>
                  <S.FooterLink href={link.href}>{link.label}</S.FooterLink>
                </li>
              ))}
            </S.LinkStack>
          </S.Group>

          <S.Group desktopOrder={DESKTOP_ORDER.contact} aria-labelledby="footer-contact">
            <S.Heading id="footer-contact">{t('contactTitle')}</S.Heading>
            {/* Plain text, not a mailto link (client request); never machine-translated. */}
            <S.ContactEmail translate="no">{t('contactEmail')}</S.ContactEmail>
          </S.Group>

          <S.Group
            desktopOrder={DESKTOP_ORDER.subscribe}
            alignEnd
            aria-labelledby="footer-subscribe"
          >
            <S.Heading id="footer-subscribe">{t('subscribeTitle')}</S.Heading>
            <S.Socials>
              {socials.map((social) => {
                const SocialIcon = SOCIAL_ICONS[social.id];
                return (
                  <li key={social.id}>
                    <S.IconLink
                      href={social.href}
                      {...newTabProps(social.href)}
                      aria-label={
                        isExternalUrl(social.href) ? `${social.label} ${newTab}` : social.label
                      }
                    >
                      {SocialIcon && <Icon icon={SocialIcon} size="sm" tone="inverse" />}
                    </S.IconLink>
                  </li>
                );
              })}
            </S.Socials>
            <S.LogoRow>
              {partners.map((partner) => (
                <li key={partner.id}>
                  <S.LogoTile
                    href={partner.href}
                    {...newTabProps(partner.href)}
                    aria-label={
                      isExternalUrl(partner.href) ? `${partner.label} ${newTab}` : partner.label
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- static export, SVG asset */}
                    <img src={partner.logo} alt="" />
                  </S.LogoTile>
                </li>
              ))}
            </S.LogoRow>
          </S.Group>

          <S.Group desktopOrder={DESKTOP_ORDER.download} aria-labelledby="footer-app">
            <S.Heading id="footer-app">{t('downloadAppTitle')}</S.Heading>
            <S.LogoRow>
              {stores.map((store) => (
                <li key={store.id}>
                  <a href={store.href} {...newTabProps(store.href)}>
                    <S.StoreBadge
                      src={store.badge}
                      alt={isExternalUrl(store.href) ? `${store.label} ${newTab}` : store.label}
                      width={size.storeBadge.width}
                      height={size.storeBadge.height}
                    />
                  </a>
                </li>
              ))}
            </S.LogoRow>
          </S.Group>
        </S.Columns>

        <S.BottomRow>
          <S.Meta>{t('lastUpdated')}</S.Meta>
          <S.Ownership>{t('ownership')}</S.Ownership>
        </S.BottomRow>
      </S.Inner>
    </S.Root>
  );
}

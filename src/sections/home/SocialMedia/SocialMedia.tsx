'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SECTION_ID } from '@/constants/sections';
import { size } from '@/theme/tokens';
import type { SocialContent } from '@/types/content';
import * as S from './SocialMedia.styles';
import { DbimExternalLink, DbimShare } from '@/components/ui/Icon/dbim';
import { isExternalUrl, newTabProps } from '@/utils/links';

const TITLE_ID = 'social-title';

/**
 * "Connect With Us on Social Media" (nav: Connect → /#connect). Latest post per platform;
 * each card opens the platform's BharatVistaar profile in a new tab. TODO(content): live posts
 * (API); a LinkedIn card needs a post image and platform icon from the design.
 */
export function SocialMedia({ content }: { content: SocialContent }) {
  const t = useTranslations('nav');
  return (
    <S.Root id={SECTION_ID.connect} aria-labelledby={TITLE_ID}>
      <S.Inner className="container">
        <SectionHeader
          icon={DbimShare}
          title={content.title}
          subtitle={content.subtitle}
          titleId={TITLE_ID}
        />
        <S.Grid>
          {content.items.map((post) => (
            <li key={post.id}>
              <S.Card href={post.href} {...newTabProps(post.href)}>
                <S.CardHeader>
                  <S.PlatformIcon
                    src={post.icon}
                    alt=""
                    width={size.socialPlatformIcon}
                    height={size.socialPlatformIcon}
                    loading="lazy"
                  />
                  <S.PlatformName>{post.platform}</S.PlatformName>
                  <Icon icon={DbimExternalLink} size="sm" tone="inherit" />
                  {isExternalUrl(post.href) && (
                    <span className="sr-only"> {t('opensInNewTab')}</span>
                  )}
                </S.CardHeader>
                <S.Media>
                  <S.Picture
                    src={post.image.src}
                    alt={post.image.alt}
                    width={size.socialImageHeight * 2}
                    height={size.socialImageHeight}
                    loading="lazy"
                    decoding="async"
                  />
                </S.Media>
                <S.Caption>{post.caption}</S.Caption>
                <S.Meta>{post.meta}</S.Meta>
              </S.Card>
            </li>
          ))}
        </S.Grid>
      </S.Inner>
    </S.Root>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SECTION_ID } from '@/constants/sections';
import type { StatePortalsContent } from '@/types/content';
import * as S from './StatePortals.styles';
import { DbimOfferings } from '@/components/ui/Icon/dbim';
import { isExternalUrl, newTabProps } from '@/utils/links';

const TITLE_ID = 'state-portals-title';

/**
 * "Active State Portals" (nav: States → /#states). Each card opens the state's portal
 * in a new tab. TODO(content): real portal URLs.
 */
export function StatePortals({ content }: { content: StatePortalsContent }) {
  const t = useTranslations('nav');
  return (
    <S.Root
      id={SECTION_ID.states}
      aria-labelledby={TITLE_ID}
      backgroundSrc={content.backgroundImage}
    >
      <S.Inner className="container">
        <SectionHeader
          icon={DbimOfferings}
          title={content.title}
          subtitle={content.subtitle}
          tone="onDark"
          titleId={TITLE_ID}
        />
        <S.Grid>
          {content.items.map((portal) => (
            <li key={portal.id}>
              <S.Card href={portal.href} {...newTabProps(portal.href)}>
                {/* The name is the link text, so the logo is decorative here. */}
                <S.Logo
                  src={portal.logo.src}
                  alt=""
                  width={portal.logo.width}
                  height={portal.logo.height}
                  loading="lazy"
                  decoding="async"
                />
                <S.Name>{portal.name}</S.Name>
                {isExternalUrl(portal.href) && (
                  <span className="sr-only"> {t('opensInNewTab')}</span>
                )}
              </S.Card>
            </li>
          ))}
        </S.Grid>
      </S.Inner>
    </S.Root>
  );
}

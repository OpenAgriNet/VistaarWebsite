'use client';

import { useTranslations } from 'next-intl';
import { size } from '@/theme/tokens';
import * as S from './GovLockup.styles';

/**
 * DBIM generic header lockup for a Department under a Ministry.
 * Assets: State Emblem from the DBIM Toolkit logo library; Bharat VISTAAR logo exported
 * from the Figma (both SVG-optimised, under the DBIM 100 KB logo limit).
 */
export function GovLockup() {
  const t = useTranslations('header');

  return (
    <S.Root href="/" aria-label={t('homeLink')}>
      <S.Emblem
        src="/logos/state-emblem.svg"
        alt={t('emblemAlt')}
        width={size.emblem.width}
        height={size.emblem.height}
      />
      <S.Text>
        <span>{t('government')}</span>
        <span>{t('ministry')}</span>
        <S.Strong>{t('department')}</S.Strong>
      </S.Text>
      <S.Divider aria-hidden />
      <S.Logo
        src="/logos/bharat-vistaar.svg"
        alt={t('logoAlt')}
        width={size.brandLogo.width}
        height={size.brandLogo.height}
      />
    </S.Root>
  );
}

'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { size } from '@/theme/tokens';
import * as S from './SuccessMessage.styles';
import { DbimClose } from '@/components/ui/Icon/dbim';

const ILLUSTRATION_SRC = '/images/partner/success.webp';

/** "Inquiry Submitted Successfully!" confirmation shown after the Partner form is sent. */
export function SuccessMessage({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('partner.success');
  const titleId = useId();
  const textId = useId();
  return (
    <S.Root open={open} onClose={onClose} aria-labelledby={titleId} aria-describedby={textId}>
      <S.Illustration
        src={ILLUSTRATION_SRC}
        alt=""
        width={size.successIconWidth}
        height={size.successIconHeight}
      />
      <S.Text>
        <S.Title id={titleId}>{t('title')}</S.Title>
        <S.Message id={textId}>{t('text')}</S.Message>
      </S.Text>
      <S.CloseButton type="button" onClick={onClose} aria-label={t('close')}>
        <Icon icon={DbimClose} size="sm" tone="inherit" />
      </S.CloseButton>
    </S.Root>
  );
}

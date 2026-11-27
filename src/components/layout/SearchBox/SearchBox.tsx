'use client';

import { useId, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import * as S from './SearchBox.styles';
import { DbimSearch } from '@/components/ui/Icon/dbim';

interface SearchBoxProps {
  /** Full width (mobile menu) instead of the fixed 225px desktop size. */
  fluid?: boolean;
}

/**
 * Search field — UI only for now.
 * TODO(search): wire `onSubmit` to the search service when search is built.
 */
export function SearchBox({ fluid = false }: SearchBoxProps) {
  const t = useTranslations('search');
  const inputId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <S.Form role="search" fluid={fluid} onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr-only">
        {t('label')}
      </label>
      <S.Input id={inputId} type="search" name="q" placeholder={t('placeholder')} />
      <S.Submit type="submit" aria-label={t('submit')}>
        <Icon icon={DbimSearch} size="sm" tone="inherit" />
      </S.Submit>
    </S.Form>
  );
}

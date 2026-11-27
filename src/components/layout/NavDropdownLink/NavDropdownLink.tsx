'use client';

import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { useTranslations } from 'next-intl';
import type { LinkItem } from '@/types/content';
import * as S from './NavDropdownLink.styles';
import { DbimExternalLink } from '@/components/ui/Icon/dbim';
import { isExternalUrl, newTabProps } from '@/utils/links';

type NavDropdownLinkProps = { item: LinkItem } & AnchorHTMLAttributes<HTMLAnchorElement>;

/** One item of the Connect dropdown (desktop menu and mobile accordion). */
export const NavDropdownLink = forwardRef<HTMLAnchorElement, NavDropdownLinkProps>(
  function NavDropdownLink({ item, ...rest }, ref) {
    const t = useTranslations('nav');

    return (
      <S.Root ref={ref} href={item.href} {...newTabProps(item.href)} {...rest}>
        {item.external && (
          <S.IconSlot aria-hidden>
            <DbimExternalLink />
          </S.IconSlot>
        )}
        <S.Text>
          <S.Label data-label>{item.label}</S.Label>
          {item.description && <S.Description>{item.description}</S.Description>}
        </S.Text>
        {isExternalUrl(item.href) && <span className="sr-only">{t('opensInNewTab')}</span>}
      </S.Root>
    );
  },
);

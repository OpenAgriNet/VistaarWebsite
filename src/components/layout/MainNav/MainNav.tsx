'use client';

import { useId, useState, type MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { NavDropdownLink } from '@/components/layout/NavDropdownLink';
// "Partner With Us" hidden for now (client request) — restore with the button below.
// import { ActionLink } from '@/components/ui/ActionLink';
// import { DIALOG_HASH } from '@/constants/dialogs';
import type { NavItem } from '@/types/content';
import { useNavItems } from './useNavItems';
import * as S from './MainNav.styles';
import { DbimChevronDown } from '@/components/ui/Icon/dbim';

/** "Connect" — the only nav item with a dropdown in the design. */
function DropdownItem({ item, active }: { item: NavItem; active: boolean }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const menuId = useId();
  const open = Boolean(anchor);
  const close = () => setAnchor(null);

  return (
    <>
      <S.ItemButton
        active={active}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        aria-expanded={open}
        onClick={(event: MouseEvent<HTMLElement>) => setAnchor(event.currentTarget)}
      >
        {item.label}
        <S.Chevron open={open} aria-hidden>
          <Icon icon={DbimChevronDown} size="sm" tone="inherit" />
        </S.Chevron>
      </S.ItemButton>
      <S.DropdownMenu
        id={menuId}
        anchorEl={anchor}
        open={open}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {(item.children ?? []).map((child) => (
          <NavDropdownLink key={child.id} item={child} role="menuitem" onClick={close} />
        ))}
      </S.DropdownMenu>
    </>
  );
}

/** Desktop main navigation (lg and up): links on the left ("Partner With Us" on the right is hidden for now). */
export function MainNav() {
  const t = useTranslations('header');
  const { items, isActive } = useNavItems();

  return (
    <S.Bar aria-label={t('mainNav')}>
      <S.Inner className="container">
        <S.List>
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <S.ListItem key={item.id}>
                {item.children ? (
                  <DropdownItem item={item} active={active} />
                ) : (
                  <S.ItemLink
                    href={item.href}
                    active={active}
                    aria-current={active ? 'location' : undefined}
                  >
                    {item.label}
                  </S.ItemLink>
                )}
              </S.ListItem>
            );
          })}
        </S.List>
        {/* <ActionLink href={`#${DIALOG_HASH.partnerWithUs}`} size="compact">
          {t('partnerWithUs')}
        </ActionLink> */}
      </S.Inner>
    </S.Bar>
  );
}

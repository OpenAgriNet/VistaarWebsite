'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Collapse from '@mui/material/Collapse';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { SearchBox } from '@/components/layout/SearchBox';
import { TopBarActions } from '@/components/layout/TopBarActions';
import { useNavItems } from '@/components/layout/MainNav';
import { NavDropdownLink } from '@/components/layout/NavDropdownLink';
import * as S from './MobileMenu.styles';
import { DbimChevronDown, DbimClose, DbimMenu } from '@/components/ui/Icon/dbim';

/**
 * Hamburger + drop-down menu for screens below `lg`.
 * The panel is positioned under the nearest positioned ancestor (the header top bar);
 * the scrim is portalled to <body> so it dims the page but not the header.
 */
export function MobileMenu() {
  const t = useTranslations('header');
  const { items, isActive } = useNavItems();
  const [open, setOpen] = useState(false);
  /** Which dropdown row (Connect) is expanded inside the menu. */
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  // Close on Escape (links close it on click).
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <>
      <IconButton
        ref={buttonRef}
        color="inherit"
        aria-label={open ? t('closeMenu') : t('openMenu')}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : setOpen(true))}
      >
        <Icon icon={open ? DbimClose : DbimMenu} size="sm" tone="inherit" />
      </IconButton>

      {open && createPortal(<S.Scrim open onClick={close} />, document.body)}

      <Fade in={open} unmountOnExit>
        <S.Panel id={panelId}>
          <S.Tools>
            <SearchBox fluid />
            <TopBarActions />
          </S.Tools>
          <nav aria-label={t('mainNav')}>
            <S.List>
              {items.map((item) => {
                const active = isActive(item.href);

                if (item.children) {
                  const expanded = expandedId === item.id;
                  const subListId = `${panelId}-${item.id}`;
                  return (
                    <li key={item.id}>
                      <S.RowButton
                        active={active}
                        aria-expanded={expanded}
                        aria-controls={subListId}
                        onClick={() => setExpandedId(expanded ? null : item.id)}
                      >
                        {item.label}
                        <S.Chevron open={expanded} aria-hidden>
                          <Icon icon={DbimChevronDown} size="sm" tone="inherit" />
                        </S.Chevron>
                      </S.RowButton>
                      <Collapse in={expanded} unmountOnExit>
                        <S.SubList id={subListId}>
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <NavDropdownLink item={child} onClick={() => setOpen(false)} />
                            </li>
                          ))}
                        </S.SubList>
                      </Collapse>
                    </li>
                  );
                }

                return (
                  <li key={item.id}>
                    <S.RowLink
                      href={item.href}
                      active={active}
                      aria-current={active ? 'location' : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </S.RowLink>
                  </li>
                );
              })}
            </S.List>
          </nav>
        </S.Panel>
      </Fade>
    </>
  );
}

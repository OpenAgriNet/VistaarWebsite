'use client';

import { useId, useState, type MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { useLanguage } from '@/i18n/LanguageProvider';
import type { Locale } from '@/i18n/config';
import { DbimLanguage } from '@/components/ui/Icon/dbim';
import * as S from './LanguageSwitcher.styles';

/**
 * Language menu (same URL for every language). Picking a language translates the page live
 * through Bhashini; English restores the original text. Language names are written in their
 * own script and marked translate="no" so they are never translated.
 */
export function LanguageSwitcher() {
  const t = useTranslations('language');
  const { lang, languages, setLanguage } = useLanguage();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const menuId = useId();

  const open = (event: MouseEvent<HTMLElement>) => setAnchor(event.currentTarget);
  const close = () => setAnchor(null);
  const choose = (code: Locale) => {
    close();
    if (code !== lang) setLanguage(code);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label={t('label')}
        aria-haspopup="menu"
        aria-controls={anchor ? menuId : undefined}
        aria-expanded={Boolean(anchor)}
        onClick={open}
      >
        <Icon icon={DbimLanguage} size="sm" tone="inherit" />
      </IconButton>
      <S.LanguageMenu id={menuId} anchorEl={anchor} open={Boolean(anchor)} onClose={close}>
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            lang={language.code}
            translate="no"
            selected={language.code === lang}
            aria-current={language.code === lang ? 'true' : undefined}
            onClick={() => choose(language.code)}
          >
            {language.label}
          </MenuItem>
        ))}
      </S.LanguageMenu>
    </>
  );
}

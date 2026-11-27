'use client';

import { useState, type ReactNode } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useTranslations } from 'next-intl';
import { useAccessibility } from '@/accessibility/useAccessibility';
import { Icon } from '@/components/ui/Icon';
import * as S from './AccessibilityPanel.styles';
import {
  DbimAccessibility,
  DbimClose,
  DbimDarkContrast,
  DbimInvert,
  DbimTextSizeDecrease,
  DbimTextSizeIncrease,
} from '@/components/ui/Icon/dbim';

interface OptionRowProps {
  visual: ReactNode;
  label: string;
  on: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

function OptionRow({ visual, label, on, disabled, onToggle }: OptionRowProps) {
  return (
    <li>
      <S.Row role="switch" aria-checked={on} disabled={disabled} onClick={onToggle}>
        <S.RowStart>
          {visual}
          <S.Label>{label}</S.Label>
        </S.RowStart>
        <S.Radio on={on} aria-hidden />
      </S.Row>
    </li>
  );
}

/**
 * Trigger button + the "Accessibility Control" drawer from the Figma.
 * The trigger will move into the GovTopBar when the header is built.
 */
export function AccessibilityPanel() {
  const t = useTranslations('accessibility');
  const a11y = useAccessibility();
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => setOpen(true)}
        aria-label={t('open')}
        aria-haspopup="dialog"
      >
        <Icon icon={DbimAccessibility} size="sm" tone="inherit" />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <S.Panel role="dialog" aria-labelledby="a11y-panel-title">
          <S.Header>
            <S.Title id="a11y-panel-title">{t('title')}</S.Title>
            <S.CloseButton onClick={() => setOpen(false)} aria-label={t('close')}>
              <Icon icon={DbimClose} size="sm" tone="inherit" />
            </S.CloseButton>
          </S.Header>

          <S.List>
            <OptionRow
              visual={
                <S.IconSlot>
                  <DbimDarkContrast />
                </S.IconSlot>
              }
              label={t('darkContrast')}
              on={a11y.darkContrast}
              onToggle={a11y.toggleDarkContrast}
            />
            <OptionRow
              visual={
                <S.IconSlot>
                  <DbimInvert />
                </S.IconSlot>
              }
              label={t('invert')}
              on={a11y.invert}
              disabled={!a11y.ready}
              onToggle={a11y.toggleInvert}
            />
            <OptionRow
              visual={
                <S.IconSlot>
                  <DbimTextSizeIncrease />
                </S.IconSlot>
              }
              label={t('textSizeIncrease')}
              on={a11y.textSizeSteps > 0}
              disabled={!a11y.ready}
              onToggle={a11y.increaseText}
            />
            <OptionRow
              visual={
                <S.IconSlot>
                  <DbimTextSizeDecrease />
                </S.IconSlot>
              }
              label={t('textSizeDecrease')}
              on={a11y.textSizeSteps < 0}
              disabled={!a11y.ready}
              onToggle={a11y.decreaseText}
            />
          </S.List>
        </S.Panel>
      </Drawer>
    </>
  );
}

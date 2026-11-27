'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { size } from '@/theme/tokens';
import { EXTERNAL_LINKS } from '@/constants/links';
import { newTabProps } from '@/utils/links';
import * as S from './ChatPanel.styles';
import {
  DbimAdd,
  DbimChevronDown,
  DbimChevronRight,
  DbimClose,
  DbimExternalLink,
  DbimLanguage,
  DbimMicrophone,
  DbimNotifications,
  DbimSend,
  DbimSettings,
} from '@/components/ui/Icon/dbim';

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
}

const AVATAR_SRC = '/images/chatbot/bharati-avatar.webp';
const LOGO_SRC = '/logos/bharat-vistaar-color.svg';

/**
 * Bharati chat panel — initial state from the Figma (welcome + suggested questions).
 * MUI Drawer gives the dialog semantics, focus trap, Escape to close and focus return.
 * The external-link button opens the full-page chat (chat-vistaar.da.gov.in) in a new tab.
 * TODO(api): send questions to the Bharati service and show the conversation;
 * the bell, language and settings buttons are UI only for now.
 */
export function ChatPanel({ open, onClose }: ChatPanelProps) {
  const t = useTranslations('chatbot');
  const suggestions = t.raw('suggestions') as string[];
  const [question, setQuestion] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const inputId = useId();

  const askSuggestion = (text: string) => {
    setQuestion(text);
    inputRef.current?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO(api): send `question` to Bharati.
  };

  return (
    <S.Panel
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { role: 'dialog', 'aria-labelledby': titleId } }}
    >
      <S.Top>
        <S.Row>
          <S.Title id={titleId}>{t('title')}</S.Title>
          <S.Tools>
            <S.ToolLink
              href={EXTERNAL_LINKS.bharatiChat}
              aria-label={t('openFullPage')}
              {...newTabProps(EXTERNAL_LINKS.bharatiChat)}
            >
              <Icon icon={DbimExternalLink} size="xs" tone="inherit" />
            </S.ToolLink>
            <S.CloseButton type="button" onClick={onClose} aria-label={t('close')}>
              <Icon icon={DbimClose} size="xs" tone="inherit" />
            </S.CloseButton>
          </S.Tools>
        </S.Row>

        <S.Banner>
          <S.BannerLabel>
            {t('featureLabel')}
            <S.NewBadge>{t('newBadge')}</S.NewBadge>
          </S.BannerLabel>
          <S.BannerText>{t('featureText')}</S.BannerText>
        </S.Banner>

        <S.Row>
          <S.Logo src={LOGO_SRC} alt="BharatVistaar" />
          <S.Tools>
            <S.ToolButton type="button" aria-label={t('notifications')}>
              <Icon icon={DbimNotifications} size="xs" tone="inherit" />
            </S.ToolButton>
            <S.ToolButton type="button" aria-label={t('language')}>
              <Icon icon={DbimLanguage} size="xs" tone="inherit" />
              <span aria-hidden>{t('languageShort')}</span>
              <Icon icon={DbimChevronDown} size="xs" tone="inherit" />
            </S.ToolButton>
            <S.ToolButton type="button" aria-label={t('settings')}>
              <Icon icon={DbimSettings} size="xs" tone="inherit" />
            </S.ToolButton>
          </S.Tools>
        </S.Row>
      </S.Top>

      <S.Welcome>
        <S.Avatar src={AVATAR_SRC} alt="" width={size.chatAvatar} height={size.chatAvatar} />
        <S.AssistantName>{t('assistantName')}</S.AssistantName>
        <S.Greeting>{t('greeting')}</S.Greeting>
      </S.Welcome>

      <S.Bottom>
        <S.Suggestions aria-label={t('suggestionsLabel')}>
          {suggestions.map((text) => (
            <li key={text}>
              <S.Suggestion type="button" onClick={() => askSuggestion(text)}>
                {text}
                <Icon icon={DbimChevronRight} size="xs" tone="inherit" />
              </S.Suggestion>
            </li>
          ))}
        </S.Suggestions>

        <S.Composer onSubmit={handleSubmit}>
          <label htmlFor={inputId} className="sr-only">
            {t('inputLabel')}
          </label>
          <S.Input
            ref={inputRef}
            id={inputId}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder={t('inputPlaceholder')}
            autoComplete="off"
          />
          <S.IconButton type="button" aria-label={t('attach')}>
            <Icon icon={DbimAdd} size="xs" tone="inherit" />
          </S.IconButton>
          <S.IconButton type="button" aria-label={t('voice')}>
            <Icon icon={DbimMicrophone} size="xs" tone="inherit" />
          </S.IconButton>
          <S.SendButton type="submit" aria-label={t('send')}>
            <Icon icon={DbimSend} size="xs" tone="inherit" />
          </S.SendButton>
        </S.Composer>

        <S.Disclaimer>{t('disclaimer')}</S.Disclaimer>
      </S.Bottom>
    </S.Panel>
  );
}

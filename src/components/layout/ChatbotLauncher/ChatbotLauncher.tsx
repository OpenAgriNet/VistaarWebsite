'use client';

import { ChatPanel } from '@/components/layout/ChatPanel';
import { DIALOG_HASH } from '@/constants/dialogs';
import { useHashDialog } from '@/hooks/useHashDialog';
import { size } from '@/theme/tokens';
import type { ChatbotContent } from '@/types/content';
import * as S from './ChatbotLauncher.styles';

/**
 * Floating "Hi, I'm Bharati" button, fixed bottom-right on every scroll position.
 * Opens the Bharati chat panel (Figma "Bharati Chat"). The panel is also opened by any link
 * to #chat-with-bharati, e.g. the hero carousel's "Explore Bharati" buttons.
 */
export function ChatbotLauncher({ content }: { content: ChatbotContent }) {
  const { open, show, close } = useHashDialog(DIALOG_HASH.chat);
  return (
    <>
      <S.Root
        type="button"
        aria-label={content.openLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={show}
      >
        <S.Label aria-hidden>{content.label}</S.Label>
        <S.Avatar
          src={content.image.src}
          alt=""
          width={size.chatbotImage}
          height={size.chatbotImage}
          loading="lazy"
          decoding="async"
        />
      </S.Root>
      <ChatPanel open={open} onClose={close} />
    </>
  );
}

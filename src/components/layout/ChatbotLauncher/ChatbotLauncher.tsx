'use client';

import { useState } from 'react';
import { ChatPanel } from '@/components/layout/ChatPanel';
import { size } from '@/theme/tokens';
import type { ChatbotContent } from '@/types/content';
import * as S from './ChatbotLauncher.styles';

/**
 * Floating "Hi, I'm Bharati" button, fixed bottom-right on every scroll position.
 * Opens the Bharati chat panel (Figma "Bharati Chat").
 */
export function ChatbotLauncher({ content }: { content: ChatbotContent }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <S.Root
        type="button"
        aria-label={content.openLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
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
      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

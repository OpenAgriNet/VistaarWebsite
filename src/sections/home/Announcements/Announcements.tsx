'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useHeightVar } from '@/hooks/useHeightVar';
import { HEADER_VARS } from '@/constants/layout';
import type { Announcement, AnnouncementsContent } from '@/types/content';
import * as S from './Announcements.styles';
import { DbimAnnouncement, DbimPause, DbimPlay } from '@/components/ui/Icon/dbim';

const TITLE_ID = 'announcements-title';

function Items({ items, hidden }: { items: Announcement[]; hidden?: boolean }) {
  return (
    // The second copy only exists for the seamless loop — hidden from assistive tech and Tab.
    // Not `inert`: that also blocks the mouse, so hovering it would not pause the ticker.
    <S.List aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <S.Item key={item.id}>
          <S.Message>
            <Icon icon={DbimAnnouncement} size="sm" tone="brand" />
            {item.href ? (
              <a href={item.href} tabIndex={hidden ? -1 : undefined}>
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </S.Message>
          <S.Separator aria-hidden />
        </S.Item>
      ))}
    </S.List>
  );
}

/**
 * Scrolling announcements bar (CSS animation, no library).
 * GIGW: moving content has a visible Pause/Play button, pauses on hover/keyboard focus,
 * and does not move at all for visitors who prefer reduced motion.
 * Sticks just under the header while scrolling (client request); its height is published
 * so anchor links and keyboard focus also stop below it.
 */
export function Announcements({ content }: { content: AnnouncementsContent }) {
  const t = useTranslations('announcements');
  const reducedMotion = usePrefersReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  const animated = !reducedMotion;
  const barRef = useRef<HTMLElement>(null);
  useHeightVar(barRef, HEADER_VARS.ticker);

  return (
    <S.Bar ref={barRef} aria-labelledby={TITLE_ID}>
      <S.Inner className="container">
        <S.Label id={TITLE_ID}>{content.title}</S.Label>
        <S.Separator aria-hidden />

        {animated ? (
          <S.Viewport>
            <S.Track animated paused={userPaused}>
              <Items items={content.items} />
              <Items items={content.items} hidden />
            </S.Track>
          </S.Viewport>
        ) : (
          <S.StaticViewport>
            <S.Track animated={false} paused>
              <Items items={content.items} />
            </S.Track>
          </S.StaticViewport>
        )}

        {animated && (
          <S.PlayPause
            onClick={() => setUserPaused((paused) => !paused)}
            aria-label={userPaused ? t('play') : t('pause')}
            aria-pressed={userPaused}
          >
            <Icon icon={userPaused ? DbimPlay : DbimPause} size="sm" tone="inherit" />
          </S.PlayPause>
        )}
      </S.Inner>
    </S.Bar>
  );
}

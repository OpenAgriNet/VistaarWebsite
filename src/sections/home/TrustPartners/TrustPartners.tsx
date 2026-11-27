'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { TrustContent, TrustPartner } from '@/types/content';
import * as S from './TrustPartners.styles';
import { DbimSchemes } from '@/components/ui/Icon/dbim';

const TITLE_ID = 'trust-title';

function Logos({ items, hidden }: { items: TrustPartner[]; hidden?: boolean }) {
  return (
    // The second copy only exists for the seamless loop — hidden from assistive tech.
    // Not `inert`: that also blocks the mouse, so hover (pause + lift) would not work on it.
    <S.List aria-hidden={hidden || undefined}>
      {items.map((partner) => (
        <S.Tile key={partner.id} moving>
          <S.Logo
            src={partner.logo.src}
            alt={partner.name}
            width={partner.logo.width}
            height={partner.logo.height}
            loading="lazy"
            decoding="async"
          />
        </S.Tile>
      ))}
    </S.List>
  );
}

/**
 * "Backed by Trust & Data": partner institution logos, moving continuously like the
 * announcements bar (client request). Stops on hover or keyboard focus; no separate
 * Pause button (client decision). Visitors who prefer reduced motion get a still grid.
 * TODO(content): name of the sixth institution; links if they should open the partners.
 */
export function TrustPartners({ content }: { content: TrustContent }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <S.Root aria-labelledby={TITLE_ID}>
      <S.Inner className="container">
        <SectionHeader
          icon={DbimSchemes}
          title={content.title}
          subtitle={content.subtitle}
          titleId={TITLE_ID}
        />
        {reducedMotion ? (
          <S.Grid>
            {content.items.map((partner) => (
              <S.Tile key={partner.id}>
                <S.Logo
                  src={partner.logo.src}
                  alt={partner.name}
                  width={partner.logo.width}
                  height={partner.logo.height}
                  loading="lazy"
                  decoding="async"
                />
              </S.Tile>
            ))}
          </S.Grid>
        ) : (
          <S.Viewport>
            <S.Track>
              <Logos items={content.items} />
              <Logos items={content.items} hidden />
            </S.Track>
          </S.Viewport>
        )}
      </S.Inner>
    </S.Root>
  );
}

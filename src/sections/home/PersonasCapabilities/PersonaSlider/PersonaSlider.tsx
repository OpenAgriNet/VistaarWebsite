'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { useSliderControls } from '@/hooks/useSliderControls';
import { size } from '@/theme/tokens';
import type { Persona } from '@/types/content';
import * as S from './PersonaSlider.styles';
import { DbimChevronLeft, DbimChevronRight } from '@/components/ui/Icon/dbim';

/**
 * One persona at a time, changed with ‹ › or the dots (swipe on touch). No auto-play,
 * so no Pause control is needed. Personas that are not shown are `inert`.
 */
export function PersonaSlider({ items }: { items: Persona[] }) {
  const t = useTranslations('slider');
  const { viewportRef, selected, canPrevious, canNext, previous, next, scrollTo } =
    useSliderControls();

  return (
    <S.Card>
      <S.Viewport ref={viewportRef}>
        <S.Track>
          {items.map((persona, index) => (
            <S.Slide
              key={persona.id}
              inert={index !== selected}
              aria-roledescription="slide"
              aria-label={t('goTo', { number: index + 1, total: items.length })}
            >
              <S.Image
                src={persona.image.src}
                alt={persona.image.alt}
                width={size.personaImage}
                height={size.personaImage}
                loading="lazy"
                decoding="async"
              />
              <S.Text>
                <S.Name>{persona.name}</S.Name>
                <S.Description>{persona.description}</S.Description>
              </S.Text>
            </S.Slide>
          ))}
        </S.Track>
      </S.Viewport>

      <S.Controls>
        <S.Arrow
          type="button"
          aria-label={t('previousPersona')}
          disabled={!canPrevious}
          onClick={previous}
        >
          <Icon icon={DbimChevronLeft} size="sm" tone="brand" />
        </S.Arrow>
        <S.Dots>
          {items.map((persona, index) => (
            <S.Dot
              key={persona.id}
              type="button"
              active={index === selected}
              aria-label={t('goTo', { number: index + 1, total: items.length })}
              aria-current={index === selected}
              onClick={() => scrollTo(index)}
            />
          ))}
        </S.Dots>
        <S.Arrow type="button" aria-label={t('nextPersona')} disabled={!canNext} onClick={next}>
          <Icon icon={DbimChevronRight} size="sm" tone="brand" />
        </S.Arrow>
      </S.Controls>
    </S.Card>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState, type FocusEvent } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { motion } from '@/theme/tokens';
import type { HeroContent } from '@/types/content';
import * as S from './HeroCarousel.styles';
import { DbimChevronLeft, DbimChevronRight, DbimPause, DbimPlay } from '@/components/ui/Icon/dbim';

/**
 * Home hero carousel (Figma "Banner-1").
 *
 * DBIM / GIGW behaviour:
 * - Slide text is HTML over the image (never baked into the picture).
 * - Slides cross-fade in place, as in the Figma prototype (Fade plugin, not a sideways slide).
 * - Each slide is "light" or "dark" (Figma's two Banner variants); text, button and
 *   controls switch colours to match.
 * - Auto-play has a visible Pause/Play button; it also pauses on hover and keyboard focus,
 *   and does not start at all when the visitor prefers reduced motion.
 * - Arrows and dots are real buttons; slides that are not shown are `inert`, so keyboard
 *   and screen-reader users only meet the visible slide.
 */
export function HeroCarousel({ content }: { content: HeroContent }) {
  const t = useTranslations('carousel');
  const slides = content.slides;
  const multiple = slides.length > 1;

  // The plugin only advances slides; *when* it plays is decided here (its own hover/focus
  // handling would restart auto-play even after the visitor pressed Pause).
  const [viewportRef, embla] = useEmblaCarousel({ loop: multiple, duration: 30 }, [
    Autoplay({ delay: motion.heroSlideDelayMs, playOnInit: false, stopOnInteraction: true }),
    Fade(),
  ]);

  const [selected, setSelected] = useState(0);
  /** The visitor's choice from the Pause/Play button. */
  const [userPaused, setUserPaused] = useState(false);
  /** Temporary pauses while the pointer is over, or keyboard focus is inside, the carousel. */
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const shouldPlay = multiple && !userPaused && !hovered && !focused && !reducedMotion;
  const shouldPlayRef = useRef(shouldPlay);
  useEffect(() => {
    shouldPlayRef.current = shouldPlay;
  }, [shouldPlay]);

  // Track the visible slide; resume after a swipe if playing is allowed.
  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    const onPointerUp = () => {
      if (shouldPlayRef.current) embla.plugins().autoplay?.play();
    };
    embla.on('select', onSelect).on('reInit', onSelect).on('pointerUp', onPointerUp);
    return () => {
      embla.off('select', onSelect).off('reInit', onSelect).off('pointerUp', onPointerUp);
    };
  }, [embla]);

  // Play or stop whenever the conditions change.
  useEffect(() => {
    const autoplay = embla?.plugins().autoplay;
    if (!autoplay) return;
    if (shouldPlay) autoplay.play();
    else autoplay.stop();
  }, [embla, shouldPlay]);

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  };

  /** Arrows, dots and pause take the colours of the slide on screen. */
  const controlsTone = slides[selected]?.tone ?? 'light';

  const goTo = useCallback((index: number) => embla?.scrollTo(index), [embla]);
  const previous = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <S.Root
      aria-roledescription="carousel"
      aria-label={t('label')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Keyboard focus only — a mouse click on Play must not keep it paused.
      onFocus={(event) => setFocused(event.target.matches(':focus-visible'))}
      onBlur={handleBlur}
    >
      <S.Viewport ref={viewportRef}>
        {/* Announce slide changes only when not auto-playing. */}
        <S.Track aria-live={userPaused ? 'polite' : 'off'}>
          {slides.map((slide, index) => {
            const current = index === selected;
            return (
              <S.Slide
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={t('slide', { current: index + 1, total: slides.length })}
                inert={!current}
              >
                <S.Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
                {slide.tone === 'light' && <S.Wash aria-hidden />}
                <S.ContentColumn className="container">
                  <S.Content>
                    <S.Title>
                      <S.TitleLead tone={slide.tone}>{slide.titleLead}</S.TitleLead>
                      <S.TitleEmphasis tone={slide.tone}>{slide.titleEmphasis}</S.TitleEmphasis>
                    </S.Title>
                    <S.Description tone={slide.tone}>{slide.description}</S.Description>
                    <S.Cta tone={slide.tone} href={slide.cta.href}>
                      {slide.cta.label}
                    </S.Cta>
                  </S.Content>
                </S.ContentColumn>
              </S.Slide>
            );
          })}
        </S.Track>
      </S.Viewport>

      {multiple && (
        <>
          <S.Arrow side="prev" tone={controlsTone} onClick={previous} aria-label={t('previous')}>
            <Icon icon={DbimChevronLeft} size="sm" tone="inherit" />
          </S.Arrow>
          <S.Arrow side="next" tone={controlsTone} onClick={next} aria-label={t('next')}>
            <Icon icon={DbimChevronRight} size="sm" tone="inherit" />
          </S.Arrow>

          <S.Controls>
            <S.DotsPill tone={controlsTone}>
              {slides.map((slide, index) => (
                <S.Dot
                  key={slide.id}
                  type="button"
                  active={index === selected}
                  aria-label={t('goTo', { number: index + 1 })}
                  aria-current={index === selected ? 'true' : undefined}
                  onClick={() => goTo(index)}
                />
              ))}
            </S.DotsPill>
            <S.PlayPause
              tone={controlsTone}
              onClick={() => setUserPaused((paused) => !paused)}
              aria-label={userPaused ? t('play') : t('pause')}
              aria-pressed={userPaused}
            >
              <Icon icon={userPaused ? DbimPlay : DbimPause} size="sm" tone="inherit" />
            </S.PlayPause>
          </S.Controls>
        </>
      )}
    </S.Root>
  );
}

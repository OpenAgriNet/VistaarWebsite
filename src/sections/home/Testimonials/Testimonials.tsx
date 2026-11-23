'use client';

import { useTranslations } from 'next-intl';
import { ActionLink } from '@/components/ui/ActionLink';
import { HighlightedText } from '@/components/ui/HighlightedText';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SliderArrows } from '@/components/ui/SliderArrows';
import { useSliderControls } from '@/hooks/useSliderControls';
import { size } from '@/theme/tokens';
import type { TestimonialsContent } from '@/types/content';
import * as S from './Testimonials.styles';
import { DbimSpeakerGroup } from '@/components/ui/Icon/dbim';

const TITLE_ID = 'testimonials-title';

/**
 * Farmer testimonials, one at a time, changed with ‹ › (swipe on touch). No auto-play.
 */
export function Testimonials({ content }: { content: TestimonialsContent }) {
  const t = useTranslations('slider');
  const { viewportRef, selected, canPrevious, canNext, previous, next } = useSliderControls();

  return (
    <S.Root aria-labelledby={TITLE_ID} backgroundSrc={content.backgroundImage}>
      <S.Inner className="container">
        <S.HeaderRow>
          <SectionHeader
            icon={DbimSpeakerGroup}
            title={content.title}
            subtitle={content.subtitle}
            titleId={TITLE_ID}
          />
          <SliderArrows
            previousLabel={t('previousTestimonial')}
            nextLabel={t('nextTestimonial')}
            onPrevious={previous}
            onNext={next}
            previousDisabled={!canPrevious}
            nextDisabled={!canNext}
          />
        </S.HeaderRow>

        <S.Viewport ref={viewportRef}>
          <S.Track>
            {content.items.map((item, index) => (
              <S.Slide
                key={item.id}
                inert={index !== selected}
                aria-roledescription="slide"
                aria-label={t('goTo', { number: index + 1, total: content.items.length })}
              >
                <S.Figure>
                  <S.Quote>
                    {item.paragraphs.map((segments, i) => (
                      <S.Paragraph key={i}>
                        <HighlightedText segments={segments} />
                      </S.Paragraph>
                    ))}
                  </S.Quote>
                  <S.Divider />
                  <S.Footer>
                    <S.Author>
                      <S.Avatar
                        src={item.image.src}
                        alt={item.image.alt}
                        width={size.testimonialAvatar}
                        height={size.testimonialAvatar}
                        loading="lazy"
                        decoding="async"
                      />
                      <S.AuthorText>
                        <S.Name>{item.name}</S.Name>
                        <S.Location>{item.location}</S.Location>
                      </S.AuthorText>
                    </S.Author>
                    <ActionLink href={item.cta.href}>{item.cta.label}</ActionLink>
                  </S.Footer>
                </S.Figure>
              </S.Slide>
            ))}
          </S.Track>
        </S.Viewport>
      </S.Inner>
    </S.Root>
  );
}

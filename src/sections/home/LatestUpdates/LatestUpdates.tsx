'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SliderArrows } from '@/components/ui/SliderArrows';
import { useSliderControls } from '@/hooks/useSliderControls';
import { size } from '@/theme/tokens';
import type { UpdatesContent } from '@/types/content';
import * as S from './LatestUpdates.styles';
import { DbimForms, DbimPlayCircle } from '@/components/ui/Icon/dbim';

const TITLE_ID = 'latest-updates-title';

/**
 * Events, posts and videos: three cards on desktop, swipeable on smaller screens, with
 * ‹ › to page through when there are more cards than fit. Cards out of view are `inert`.
 * TODO(content): links.
 */
export function LatestUpdates({ content }: { content: UpdatesContent }) {
  const t = useTranslations('slider');
  const tMedia = useTranslations('media');
  const { viewportRef, canPrevious, canNext, inView, previous, next } = useSliderControls({
    slidesToScroll: 'auto',
  });

  return (
    <S.Root aria-labelledby={TITLE_ID}>
      <S.Inner className="container">
        <S.HeaderRow>
          <SectionHeader
            icon={DbimForms}
            title={content.title}
            subtitle={content.subtitle}
            titleId={TITLE_ID}
          />
          <SliderArrows
            previousLabel={t('previousUpdate')}
            nextLabel={t('nextUpdate')}
            onPrevious={previous}
            onNext={next}
            previousDisabled={!canPrevious}
            nextDisabled={!canNext}
          />
        </S.HeaderRow>

        <S.Viewport ref={viewportRef}>
          <S.Track>
            {content.items.map((item, index) => (
              <S.Slide key={item.id} inert={!inView.includes(index)}>
                <S.Card aria-labelledby={`update-${item.id}`}>
                  <S.Media>
                    <S.Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={size.updateImageHeight * 2}
                      height={size.updateImageHeight}
                      loading="lazy"
                      decoding="async"
                    />
                    {item.video && (
                      <S.PlayBadge role="img" aria-label={tMedia('video')}>
                        <Icon icon={DbimPlayCircle} size="sm" tone="inherit" />
                      </S.PlayBadge>
                    )}
                  </S.Media>
                  <S.Body>
                    <S.Meta>
                      <S.Category>{item.category}</S.Category>
                      {item.date && <S.DateText>{item.date}</S.DateText>}
                    </S.Meta>
                    <S.Title id={`update-${item.id}`}>{item.title}</S.Title>
                    <S.Description>{item.description}</S.Description>
                    <S.Link href={item.link.href}>{item.link.label}</S.Link>
                  </S.Body>
                </S.Card>
              </S.Slide>
            ))}
          </S.Track>
        </S.Viewport>
      </S.Inner>
    </S.Root>
  );
}

'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

/**
 * Embla slider without auto-play: tracks the visible slide and whether ‹ / › can move.
 * Used by the persona, testimonial and latest-updates sliders.
 */
type SliderOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;

export function useSliderControls(options: SliderOptions = {}) {
  const [viewportRef, embla] = useEmblaCarousel({ align: 'start', ...options });
  const [selected, setSelected] = useState(0);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);
  /** Slides currently in view (several on wide screens for the updates row). */
  const [inView, setInView] = useState<number[]>([0]);

  useEffect(() => {
    if (!embla) return;
    const update = () => {
      setSelected(embla.selectedScrollSnap());
      setCanPrevious(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
      setInView(embla.slidesInView());
    };
    update();
    embla.on('select', update).on('reInit', update).on('slidesInView', update);
    return () => {
      embla.off('select', update).off('reInit', update).off('slidesInView', update);
    };
  }, [embla]);

  const previous = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);
  const scrollTo = useCallback((index: number) => embla?.scrollTo(index), [embla]);

  return { viewportRef, selected, canPrevious, canNext, inView, previous, next, scrollTo };
}

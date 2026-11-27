'use client';

import { useEffect, type RefObject } from 'react';
import type { HEADER_VARS } from '@/constants/layout';

/**
 * Keeps a CSS variable on <html> equal to an element's height (it changes with text size
 * and language), and removes it when the element unmounts.
 */
export function useHeightVar(
  ref: RefObject<HTMLElement | null>,
  name: (typeof HEADER_VARS)[keyof typeof HEADER_VARS],
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const root = document.documentElement;
    const update = () => root.style.setProperty(name, `${element.offsetHeight}px`);

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => {
      observer.disconnect();
      root.style.removeProperty(name);
    };
  }, [ref, name]);
}

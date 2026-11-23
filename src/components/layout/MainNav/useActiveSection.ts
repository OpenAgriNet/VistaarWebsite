'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-spy: returns the id of the section currently in the middle band of the
 * viewport, or null when none is (e.g. at the top of the page, over the hero).
 * Sections that are not built yet are simply ignored.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const visible = useRef(new Set<string>());
  const key = ids.join('|');

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const order = elements.map((el) => el.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.add(entry.target.id);
          else visible.current.delete(entry.target.id);
        }
        // First section in page order that crosses the band wins.
        setActive(order.find((id) => visible.current.has(id)) ?? null);
      },
      // A thin band ~40% down the viewport.
      { rootMargin: '-40% 0px -55% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    const tracked = visible.current;
    return () => {
      observer.disconnect();
      tracked.clear();
    };
  }, [key]);

  return active;
}

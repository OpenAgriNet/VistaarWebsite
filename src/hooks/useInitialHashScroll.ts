'use client';

import { useEffect } from 'react';

/**
 * Opening a link such as /#capabilities: the browser jumps to the section before our
 * script has measured the sticky header and ticker, so the section heading ends up under
 * them. Once everything has mounted (next frame), scroll to the target again so
 * `scroll-padding-top` applies. Hashes without a matching element (pop-ups such as
 * #chat-with-bharati) are left alone.
 */
export function useInitialHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
}

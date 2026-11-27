'use client';

import { useCallback, useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
};

/**
 * A pop-up that is open while the URL hash is `#<id>`, so any plain link can open it
 * (<a href="#chat-with-bharati">) and the URL can be shared. `close` clears the hash
 * without adding a history entry. Ids: constants/dialogs.ts.
 */
export function useHashDialog(id: string) {
  const hash = `#${id}`;
  const open = useSyncExternalStore(
    subscribe,
    () => window.location.hash === hash,
    () => false,
  );

  const show = useCallback(() => {
    window.location.hash = id;
  }, [id]);

  const close = useCallback(() => {
    if (window.location.hash !== hash) return;
    const { pathname, search } = window.location;
    window.history.replaceState(window.history.state, '', `${pathname}${search}`);
    // replaceState does not fire hashchange; tell subscribers ourselves.
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }, [hash]);

  return { open, show, close };
}

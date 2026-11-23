'use client';

import { useCallback, useEffect, useState } from 'react';
import { DIALOG_HASH } from '@/constants/dialogs';
import { PartnerForm } from './PartnerForm';
import { SuccessMessage } from './SuccessMessage';

const HASH = `#${DIALOG_HASH.partnerWithUs}`;

/**
 * Partner With Us flow: inquiry form → success message.
 * Opens whenever the URL hash is #partner-with-us (any link can open it, and the URL can
 * be shared); closing clears the hash without adding a history entry.
 */
export function PartnerWithUs() {
  const [formOpen, setFormOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    const sync = () => setFormOpen(window.location.hash === HASH);
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const clearHash = useCallback(() => {
    if (window.location.hash === HASH) {
      const { pathname, search } = window.location;
      window.history.replaceState(window.history.state, '', `${pathname}${search}`);
    }
  }, []);

  const closeForm = () => {
    setFormOpen(false);
    clearHash();
  };

  const handleSubmitted = () => {
    // TODO(api): send the inquiry to the backend before confirming.
    closeForm();
    setSuccessOpen(true);
  };

  return (
    <>
      <PartnerForm open={formOpen} onClose={closeForm} onSubmitted={handleSubmitted} />
      <SuccessMessage open={successOpen} onClose={() => setSuccessOpen(false)} />
    </>
  );
}

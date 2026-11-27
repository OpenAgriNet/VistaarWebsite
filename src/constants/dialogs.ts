/**
 * Pop-ups opened by URL hash, so any link can open them: <a href="#partner-with-us">.
 */
export const DIALOG_HASH = {
  /** Trigger: the "Partner With Us" button in the desktop nav bar (hidden for now). */
  partnerWithUs: 'partner-with-us',
  /** Bharati chat. Triggers: the hero carousel "Explore Bharati" buttons and the floating launcher. */
  chat: 'chat-with-bharati',
} as const;

import type { IAccessibilityOptions } from 'accessibility';

/**
 * Options for the `accessibility` package (github.com/ranbuch/accessibility).
 *
 * The package runs headless: it injects no widget or menu. Our AccessibilityPanel
 * (built from the Figma) calls its actions. Dark Contrast is handled by the MUI
 * colour scheme, not the package (the package has no such feature).
 */
export const accessibilityOptions: IAccessibilityOptions = {
  suppressDomInjection: true,
  // Emoji mode = the package never loads its Google-hosted icon font (no external requests).
  // (Keyboard hotkeys are only registered with the package's own menu, so none are active here.)
  icon: { useEmojis: true },
  // Invert + text size survive page reloads (stored in localStorage by the package).
  session: { persistent: true },
  // Text size changes the root font-size in %, which scales our rem-based typography.
  textEmlMode: true,
  modules: {
    increaseText: true,
    decreaseText: true,
    invertColors: true,
    increaseTextSpacing: false,
    decreaseTextSpacing: false,
    increaseLineHeight: false,
    decreaseLineHeight: false,
    grayHues: false,
    underlineLinks: false,
    bigCursor: false,
    readingGuide: false,
    textToSpeech: false,
    speechToText: false,
    disableAnimations: false,
  },
};

/**
 * localStorage key for the Dark Contrast choice. Used by MUI's ThemeProvider and by
 * InitColorSchemeScript (applies the saved choice before the first paint — no flash).
 */
export const CONTRAST_MODE_STORAGE_KEY = 'bv-contrast-mode';

/** How many Text Size +/- steps a visitor can take in each direction. */
export const MAX_TEXT_SIZE_STEPS = 4;

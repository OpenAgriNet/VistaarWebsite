import {
  Noto_Sans,
  Noto_Sans_Arabic,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
  Noto_Sans_Gurmukhi,
  Noto_Sans_Kannada,
  Noto_Sans_Malayalam,
  Noto_Sans_Meetei_Mayek,
  Noto_Sans_Ol_Chiki,
  Noto_Sans_Oriya,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
} from 'next/font/google';

/**
 * DBIM typeface: the Noto Sans family. Downloaded at build time, served from our own domain.
 *
 * Noto Sans (Latin) is preloaded for the English page. The Indian-script fonts are only
 * needed when the page is shown in another language, so they are not preloaded: each one only
 * covers its own script (unicode-range), and the browser downloads it the first time text
 * in that script appears. English visitors download none of them.
 *
 * (next/font needs each option written out literally, hence the repetition.)
 * They also skip the generated Arial fallback, which would otherwise render Indian scripts
 * with system fonts (e.g. unjoined Urdu letters) before the Noto font arrives.
 */
export const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
});

/** Hindi, Marathi, Nepali, Sanskrit, Maithili, Dogri, Bodo, Konkani. */
const devanagari = Noto_Sans_Devanagari({
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  subsets: ['devanagari'],
  variable: '--font-noto-devanagari',
});
/** Bengali, Assamese. */
const bengali = Noto_Sans_Bengali({
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  subsets: ['bengali'],
  variable: '--font-noto-bengali',
});
const gujarati = Noto_Sans_Gujarati({
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  subsets: ['gujarati'],
  variable: '--font-noto-gujarati',
});
/** Punjabi. */
const gurmukhi = Noto_Sans_Gurmukhi({
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  subsets: ['gurmukhi'],
  variable: '--font-noto-gurmukhi',
});
const kannada = Noto_Sans_Kannada({
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  subsets: ['kannada'],
  variable: '--font-noto-kannada',
});
const malayalam = Noto_Sans_Malayalam({
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  subsets: ['malayalam'],
  variable: '--font-noto-malayalam',
});
/** Odia. */
const oriya = Noto_Sans_Oriya({
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  subsets: ['oriya'],
  variable: '--font-noto-oriya',
});
const tamil = Noto_Sans_Tamil({
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  subsets: ['tamil'],
  variable: '--font-noto-tamil',
});
const telugu = Noto_Sans_Telugu({
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  subsets: ['telugu'],
  variable: '--font-noto-telugu',
});
/** Urdu, Kashmiri, Sindhi. */
const arabic = Noto_Sans_Arabic({
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
});
/** Santali (the translations are in Ol Chiki script). */
const olChiki = Noto_Sans_Ol_Chiki({
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  subsets: ['ol-chiki'],
  variable: '--font-noto-ol-chiki',
});
/** Manipuri (the translations are in Meetei Mayek script). */
const meeteiMayek = Noto_Sans_Meetei_Mayek({
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  subsets: ['meetei-mayek'],
  variable: '--font-noto-meetei-mayek',
});

/** All font CSS variables, for the <html> className. */
export const fontVariables = [
  notoSans,
  devanagari,
  bengali,
  gujarati,
  gurmukhi,
  kannada,
  malayalam,
  oriya,
  tamil,
  telugu,
  arabic,
  olChiki,
  meeteiMayek,
]
  .map((font) => font.variable)
  .join(' ');

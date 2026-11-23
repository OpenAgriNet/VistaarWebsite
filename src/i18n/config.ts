/**
 * Language configuration.
 *
 * English is the source language: the content is authored in English (public/locales/en)
 * and pre-rendered into the static HTML. Every other language is translated live in the
 * browser through Bhashini (see i18n/translation), the same way vistaar.da.gov.in works.
 * URLs never change — the choice is kept in localStorage.
 *
 * `label` is shown in the language menu in its own script, so it is never translated.
 */
export const languages = [
  { code: 'en', label: 'English' },
  { code: 'as', label: 'Assamese (অসমীয়া)' },
  { code: 'bn', label: 'Bengali (বাংলা)' },
  { code: 'brx', label: 'Bodo (बड़ो)' },
  { code: 'doi', label: 'Dogri (डोगरी)' },
  { code: 'gom', label: 'Goan Konkani (गोवा कोंकणी)' },
  { code: 'gu', label: 'Gujarati (ગુજરાતી)' },
  { code: 'hi', label: 'Hindi (हिन्दी)' },
  { code: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
  { code: 'ks', label: 'Kashmiri (کٲشُر)' },
  { code: 'mai', label: 'Maithili (मैथिली)' },
  { code: 'ml', label: 'Malayalam (മലയാളം)' },
  { code: 'mni', label: 'Manipuri (মণিপুরী)' },
  { code: 'mr', label: 'Marathi (मराठी)' },
  { code: 'ne', label: 'Nepali (नेपाली)' },
  { code: 'or', label: 'Odia (ଓଡ଼ିଆ)' },
  { code: 'pa', label: 'Punjabi (ਪੰਜਾਬੀ)' },
  { code: 'sa', label: 'Sanskrit (संस्कृत)' },
  { code: 'sat', label: 'Santali (संताली)' },
  { code: 'sd', label: 'Sindhi (سنڌي)' },
  { code: 'ta', label: 'Tamil (தமிழ்)' },
  { code: 'te', label: 'Telugu (తెలుగు)' },
  { code: 'ur', label: 'Urdu (اردو)' },
] as const;

export type Locale = (typeof languages)[number]['code'];

export const defaultLocale: Locale = 'en';

/** localStorage key that holds the visitor's chosen language. */
export const LANGUAGE_STORAGE_KEY = 'bv-lang';

export const isLocale = (value: unknown): value is Locale =>
  languages.some((language) => language.code === value);

export const getLanguageLabel = (code: Locale) =>
  languages.find((language) => language.code === code)?.label ?? code;

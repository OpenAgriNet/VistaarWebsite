/**
 * Design tokens: the ONLY place in the codebase where raw values (hex, px, weights) live.
 *
 * Source: Figma "BV Website" → Home Page-Development (1440) + Home Page-Mobile (375).
 * Tokens are named by ROLE (what the value is for), never by colour, so a future
 * switch to DBIM values only changes the values below — not their names or any component.
 *
 * `DBIM:` comments mark values that differ from the GoI DBIM guidelines
 * (https://dbimtoolkit.digifootprint.gov.in). Swap them in when asked to comply.
 */

export const color = {
  brand: {
    /** Buttons, card borders, footer background. DBIM (Green group, darkest): #0F5757 */
    primary: '#024B3C',
    /** Filled buttons on hover. Not in the Figma — a darker step of primary. */
    primaryHover: '#013A2E',
    /** Header search icon (DBIM_Search_24d_#6C1340 — DBIM Burgundy key colour in the Figma). */
    accent: '#6C1340',
    /** Icons on light media controls (hero dark slide: arrows, pause). Figma Text/Brand/Primary. */
    highlight: '#4A2BC2',
  },
  text: {
    /** Headings and numbers on light backgrounds. */
    primary: '#171717',
    /** Body text on light backgrounds. DBIM (Deep Earthy Brown): #150202 */
    secondary: '#404040',
    /** Text and icons on dark backgrounds. DBIM (Inclusive White): #FFFFFF */
    inverse: '#FAFAFA',
    /** Labels inside controls (accessibility panel rows). */
    control: '#2F2E41',
    /** Secondary text on dark images (hero dark slide description). */
    onDarkMuted: '#ACACAC',
    /** Small meta lines (social post time / tagline). */
    muted: '#8A8A8A',
    /** Required-field asterisk and form errors. */
    error: '#D92D20',
  },
  surface: {
    page: '#FFFFFF',
    card: '#FFFFFF',
    /** Accessibility panel rows. */
    control: '#EDF0F0',
    subtle: '#F0F0F0',
    /** Government top bar (desktop) and mobile header. */
    topBar: '#FAFAFA',
    /** Active item in the mobile menu (brand colour at 10%). */
    navActive: 'rgba(2, 75, 60, 0.1)',
    /** Dark controls placed over images (hero arrows, pause, dots pill). */
    mediaControl: '#171717',
    /** Light controls placed over dark images (hero dark slide). */
    mediaControlInverse: '#FAFAFA',
    /** Announcements bar. */
    announcement: '#EAEAEA',
    /** PM quote section (Figma #F2EFFF at 30%). */
    quote: 'rgba(242, 239, 255, 0.3)',
    /** Personas + Capabilities section background. */
    sectionAlt: '#F9F9F9',
    /** Personas / Capabilities panels (brand green at 5%). */
    brandTint: 'rgba(2, 75, 60, 0.05)',
    /** "NEW" pill and the left edge of the chat feature banner. */
    badge: '#F5B700',
  },
  border: {
    brand: '#024B3C',
    control: '#E5E5E5',
    /** Line under the main navigation, menu separators. */
    subtle: '#D9D9D9',
    /** Divider in the PM quote section. */
    quote: '#C0B3FF',
    /** Hairline inside cards (Figma #232323 at 10%). */
    hairline: 'rgba(35, 35, 35, 0.1)',
    /** Form inputs (Partner With Us). */
    input: '#D4D7E3',
  },
  control: {
    background: '#FAFAFA',
    indicatorOn: '#FAFAFA',
    /** Carousel dots (Figma: Text/Status/Information/Default and #D9D9D9). */
    dotActive: '#006D75',
    dotInactive: '#D9D9D9',
  },
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

/**
 * "Dark Contrast" scheme (accessibility panel). Not designed in Figma yet —
 * high-contrast defaults (WCAG AAA on black). Replace when the designer provides it.
 */
export const contrastColor = {
  brand: { primary: '#FFD600', primaryHover: '#FFEA70', accent: '#FFD600', highlight: '#000000' },
  text: {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    inverse: '#000000',
    control: '#FFFFFF',
    onDarkMuted: '#FFFFFF',
    muted: '#FFFFFF',
    error: '#FF8A80',
  },
  surface: {
    page: '#000000',
    card: '#000000',
    control: '#1A1A1A',
    subtle: '#0D0D0D',
    topBar: '#000000',
    navActive: '#1A1A1A',
    mediaControl: '#000000',
    mediaControlInverse: '#FFD600',
    announcement: '#0D0D0D',
    quote: '#000000',
    sectionAlt: '#000000',
    brandTint: '#0D0D0D',
    badge: '#FFD600',
  },
  border: {
    brand: '#FFD600',
    control: '#FFFFFF',
    subtle: '#FFFFFF',
    quote: '#FFFFFF',
    hairline: '#FFFFFF',
    input: '#FFFFFF',
  },
  control: {
    background: '#000000',
    indicatorOn: '#000000',
    dotActive: '#FFD600',
    dotInactive: '#FFFFFF',
  },
  overlay: 'rgba(255, 255, 255, 0.2)',
} as const;

export const fontFamily = {
  /**
   * Noto Sans family, loaded with next/font in app/fonts.ts. The script fonts come first:
   * each covers only its own script, so Latin text falls through to Noto Sans.
   */
  base: [
    'var(--font-noto-devanagari)',
    'var(--font-noto-bengali)',
    'var(--font-noto-gujarati)',
    'var(--font-noto-gurmukhi)',
    'var(--font-noto-kannada)',
    'var(--font-noto-malayalam)',
    'var(--font-noto-oriya)',
    'var(--font-noto-tamil)',
    'var(--font-noto-telugu)',
    'var(--font-noto-arabic)',
    'var(--font-noto-ol-chiki)',
    'var(--font-noto-meetei-mayek)',
    'var(--font-noto-sans)',
    '"Noto Sans"',
    'system-ui',
    'sans-serif',
  ].join(', '),
} as const;

/**
 * Weights used in the Figma. DBIM: headings Bold/Semi Bold/Medium only,
 * paragraphs Bold/Regular only (hero uses 400/900, body text uses 500).
 */
export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  /** "Announcements" label (Display ExtraBold). */
  extrabold: 800,
  black: 900,
} as const;

/** Figma text styles: [fontSize px, lineHeight px]. */
export const typeScale = {
  displayL: [60, 64],
  displayM: [52, 56],
  displayS: [40, 44],
  displayXS: [36, 40],
  headingXXL: [40, 48],
  headingXL: [32, 40],
  headingL: [28, 36],
  headingM: [24, 32],
  headingS: [20, 26],
  headingXS: [16, 22],
  headingXXS: [14, 20],
  titleL: [24, 28],
  titleM: [20, 24],
  titleS: [16, 20],
  bodyL: [18, 26],
  bodyM: [16, 24],
  bodyS: [14, 22],
  bodyXS: [12, 18],
  labelXL: [16, 20],
  labelL: [14, 18],
  labelM: [12, 16],
  labelS: [11, 14],
  /** Not in the Figma style library — used for "At a Glance" numbers (42px / 120%). */
  statValue: [42, 50],
  /** Not in the style library — ministry lockup text in the 52px mobile header (measured ≈8px). */
  lockupMobile: [8, 10],
  /** Hero heading: 36px / 120% desktop, 14px / 120% mobile. */
  heroTitle: [36, 43],
  heroTitleMobile: [14, 17],
  /** Hero description on mobile: 9px / 140% (Figma). */
  heroBodyMobile: [9, 13],
  /** Announcements bar: label 18/20 (desktop); mobile sizes estimated from the mobile frame. */
  announcementLabel: [18, 20],
  announcementLabelMobile: [12, 16],
  announcementTextMobile: [12, 16],
  /** About Us heading 24px / 120%; body 16px / 160%. Mobile sizes estimated. */
  aboutHeading: [24, 29],
  aboutHeadingMobile: [18, 22],
  aboutBody: [16, 26],
  /** PM quote: 16px / 160% (mobile 14/160%, estimated). */
  quoteBody: [16, 26],
  quoteBodyMobile: [14, 22],
  /** Capabilities card: title/heading 16/120%, body 13/120%. */
  capabilityTitle: [16, 19],
  capabilityBody: [13, 16],
  /** State portal card name (Figma ≈18 bold). */
  portalName: [18, 22],
  /** Pop-up titles ("Chatbot", "Inquiry form"): Heading XL 24/120% bold. */
  dialogTitle: [24, 29],
  /** "Bharati" under the chat avatar (estimated). */
  assistantName: [26, 32],
} as const;

export type TypeScaleKey = keyof typeof typeScale;

/** theme.spacing(n) = n × 4px */
export const spacingUnit = 4;

export const radius = {
  /** Hero arrow buttons. */
  xs: 4,
  sm: 8,
  /** Content images (About Us photo). */
  image: 12,
  /** Active slider dot (rounded square). */
  dot: 2,
  md: 16,
  full: 9999,
} as const;

export const borderWidth = {
  thin: 1,
  thick: 2,
  /** Underline under the active desktop nav item. */
  navIndicator: 3,
} as const;

/** Stacking order inside the header (header itself sits at MUI's appBar level). */
export const headerLayer = {
  raised: 1,
} as const;

export const opacity = {
  /** Footer ownership line. */
  muted: 0.7,
} as const;

/** Mobile hero: light wash behind the text (Figma: linear gradient, hard light, ending #F3F8FC). */
export const gradient = {
  heroTextWash: 'linear-gradient(90deg, rgba(243, 248, 252, 0.9) 0%, rgba(243, 248, 252, 0) 70%)',
  /** Chat panel "New feature" banner (Figma: brand green fading to a lighter green). */
  featureBanner: 'linear-gradient(90deg, #024B3C 0%, #4A9B78 100%)',
} as const;

export const motion = {
  /** Hero: time per slide (Figma prototype: "After delay 3000ms"). */
  heroSlideDelayMs: 3000,
  /** Announcements ticker: one full loop. */
  tickerLoopSeconds: 40,
  /** "Backed by Trust & Data" logo strip: one full loop (client request; not in the Figma). */
  trustLoopSeconds: 30,
} as const;

export const shadow = {
  /** Mobile menu panel. Not specified in the Figma — subtle default. */
  menu: '0 8px 24px rgba(0, 0, 0, 0.12)',
  /** Figma "Shadows/Raised" (Level 2 ambient + key) — Connect dropdown. */
  raised: '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.08)',
  /** Floating Bharati chat button (Figma drop shadow under the avatar). */
  floating: '0 6px 16px rgba(74, 43, 194, 0.18)',
} as const;

/** DBIM icon sizes. The Icon component only accepts these. */
export const iconSize = {
  /** Inline chevrons inside small controls (capability tabs and arrows) — Figma, not DBIM. */
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
} as const;

/** xs = Home Page-Mobile frame (375), xl = Home Page-Development frame (1440). */
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1440,
} as const;

/** Fixed component dimensions taken from the Figma. */
export const size = {
  contentMaxWidth: 1280,
  statCardHeight: 260,
  a11yPanelWidth: 382,
  a11yRowHeight: 80,
  a11yIcon: 40,
  radio: 24,
  radioDot: 12,

  // Header (desktop: 90px government top bar + 55px nav; mobile: 52px bar)
  topBarHeight: 90,
  navHeight: 55,
  mobileHeaderHeight: 52,
  emblem: { width: 30, height: 51 },
  emblemMobile: { width: 18, height: 31 },
  brandLogo: { width: 107, height: 47 },
  brandLogoMobile: { width: 64, height: 28 },
  lockupTextWidth: 320,
  searchWidth: 225,
  searchHeight: 38,
  buttonHeight: 42,
  mobileMenuRowHeight: 42,
  /** Connect dropdown ("Action menu"): Figma 225px wide, widened to 280 for the item
   *  bylines (client request); 40px rows, 16px external-link icon. */
  dropdownWidth: 280,
  dropdownItemHeight: 40,
  /** DBIM: smallest icon is 24px; the Figma dropdown uses 16px. */
  dropdownIcon: 16,

  // Hero carousel (desktop 1440×480 · mobile 375×166)
  heroHeight: 480,
  heroHeightMobile: 166,
  heroTextWidth: 530,
  heroTextWidthMobile: 211,
  heroButtonHeight: 48,
  heroArrow: 32,
  heroPause: 38,
  heroPauseMobile: 28,
  carouselDot: 10,

  // Announcements bar (desktop 61px; mobile estimated)
  announcementHeight: 61,
  announcementHeightMobile: 40,
  announcementSeparator: 19,
  announcementPause: 36,
  announcementPauseMobile: 24,

  // About Us
  aboutTextWidth: 736,
  aboutHeadingWidth: 470,
  aboutPhoto: { width: 494, height: 372 },

  // PM quote (desktop 1440×350; mobile estimated)
  quotePhoto: 250,
  quotePhotoMobile: 160,
  quoteTextWidth: 944,

  // Personas + Capabilities (Figma: desktop panels 542 + 714, 24px apart).
  // Personas narrowed to 440 (client request) so Capabilities gets the rest (816) and its
  // longest tab wraps into fewer lines; the two panels then end at almost the same height.
  personasPanelWidth: 440,
  personaImage: 172,
  personaTextWidth: 324,
  capabilityTabWidth: 176,
  capabilityTabHeight: 36,
  capabilityArrow: 24,
  sliderDot: 8,
  sliderDotActive: 12,
  /** Testimonials: 1080px text column (100px side padding inside the 1280 container). */
  testimonialTextWidth: 1080,
  /** Legal pages (Privacy, Terms, Disclaimer): readable text column, as on the current site. */
  legalTextWidth: 896,
  testimonialAvatar: 70,
  testimonialAvatarMobile: 56,
  /** Outlined / filled 48px action buttons ("Watch Video", "Partner With Us"). */
  actionButtonHeight: 48,
  /** Compact button in the nav bar (Figma: "Partner With Us", 42px). */
  actionButtonHeightCompact: 42,
  statePortalCardHeight: 238,
  statePortalCardHeightMobile: 120,
  trustCardHeight: 135,
  trustCardHeightMobile: 104,
  /** Logo tile width in the moving strip (Figma ≈192 on desktop). */
  trustCardWidth: 192,
  trustCardWidthMobile: 150,
  updateImageHeight: 196,
  socialImageHeight: 156,
  socialPlatformIcon: 24,
  /** Play badge drawn over video thumbnails. */
  playBadge: 40,
  /** Floating "Hi, I'm Bharati" button: 112px avatar (72 on mobile). */
  chatbotImage: 112,
  chatbotImageMobile: 72,
  /** Bharati chat panel (Figma 628×900, right-hand drawer). */
  chatPanelWidth: 628,
  chatAvatar: 110,
  chatToolButton: 36,
  chatCloseButton: 32,
  chatSendButton: 32,
  chatLogoWidth: 107,
  chatLogoHeight: 47,
  /** Partner With Us pop-up: 493px picture + form column (460px fields). */
  partnerDialogWidth: 1038,
  partnerImageWidth: 493,
  formControlHeight: 48,
  textareaHeight: 80,
  /** "Inquiry Submitted Successfully!" message. */
  successDialogWidth: 584,
  successIconWidth: 71,
  successIconHeight: 78,

  // Language menu
  /** 23 languages: the menu scrolls after this height. */
  languageMenuMaxHeight: 360,

  // Footer
  partnerLogo: { width: 78, height: 38 },
  partnerLogoMobile: { width: 91, height: 42 },
  storeBadge: { width: 120, height: 36 },
} as const;

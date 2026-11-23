/**
 * Content contract for the Home page.
 * Today it is read from `public/locales/{lang}/home.json`; later the backend API
 * returns the same shape, so components do not change.
 */

/* ---------- Site chrome (header / footer), from common.json ---------- */

export interface LinkItem {
  id: string;
  label: string;
  href: string;
  /** Opens in a new tab (shown with an external-link icon). */
  external?: boolean;
}

export interface NavItem extends LinkItem {
  /** Dropdown items (only "Connect" has a dropdown in the design). */
  children?: LinkItem[];
}

export interface PartnerLink extends LinkItem {
  logo: string;
}

export interface StoreLink extends LinkItem {
  badge: string;
}

/* ---------- Home page content, from home.json ---------- */

export interface HeroSlide {
  id: string;
  /** Light picture → dark text and dark controls; dark picture → light text and light controls. */
  tone: 'light' | 'dark';
  /** First line, regular weight ("Empowering"). */
  titleLead: string;
  /** Second line, black weight, shown uppercase ("Digital Agriculture"). */
  titleEmphasis: string;
  description: string;
  cta: { label: string; href: string };
  /** Background picture only — DBIM: banner text is HTML, never part of the image. */
  image: { src: string; alt: string };
}

export interface HeroContent {
  slides: HeroSlide[];
}

export interface Announcement {
  id: string;
  text: string;
  /** Optional link for the announcement. */
  href?: string;
}

export interface AnnouncementsContent {
  title: string;
  items: Announcement[];
}

/** A run of text; `strong` renders it bold and green (Figma highlight). */
export interface TextSegment {
  text: string;
  strong?: boolean;
}

export interface QuoteContent {
  /** Who is being quoted (read by screen readers; not shown in the design). */
  attribution: string;
  image: { src: string; alt: string };
  /** Each paragraph is a list of text runs so parts can be highlighted. */
  paragraphs: TextSegment[][];
  link: { label: string; href: string };
}

export interface AboutContent {
  label: string;
  heading: string;
  paragraphs: string[];
  image: { src: string; alt: string };
  /** Faint full-width field photo behind the section (decorative). */
  backgroundImage: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface AtAGlanceContent {
  title: string;
  subtitle: string;
  /** Wavy green section background (shared with State Portals). */
  backgroundImage: string;
  stats: Stat[];
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  image: { src: string; alt: string };
}

export interface PersonasContent {
  title: string;
  items: Persona[];
}

export interface CapabilityFeature {
  title: string;
  description: string;
}

export interface Capability {
  id: string;
  /** Short tab label ("FFS"). */
  label: string;
  title: string;
  description?: string;
  features?: CapabilityFeature[];
}

export interface CapabilitiesContent {
  title: string;
  exploreHeading: string;
  items: Capability[];
}

/** A picture with its intrinsic display size (logos are drawn at their Figma size). */
export interface SizedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Testimonial {
  id: string;
  paragraphs: TextSegment[][];
  name: string;
  location: string;
  image: { src: string; alt: string };
  cta: LinkItem;
}

export interface TestimonialsContent {
  title: string;
  subtitle: string;
  /** Same faint field picture as About Us. */
  backgroundImage: string;
  items: Testimonial[];
}

export interface StatePortal {
  id: string;
  name: string;
  href: string;
  logo: SizedImage;
}

export interface StatePortalsContent {
  title: string;
  subtitle: string;
  backgroundImage: string;
  items: StatePortal[];
}

export interface TrustPartner {
  id: string;
  name: string;
  href?: string;
  logo: SizedImage;
}

export interface TrustContent {
  title: string;
  subtitle: string;
  items: TrustPartner[];
}

export interface UpdateItem {
  id: string;
  /** "Events", "Posts", "Videos". */
  category: string;
  /** Shown top-right of the card when present (events). */
  date?: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  /** Video cards get a play badge over the picture. */
  video?: boolean;
  link: LinkItem;
}

export interface UpdatesContent {
  title: string;
  subtitle: string;
  items: UpdateItem[];
}

export interface SocialPost {
  id: string;
  platform: string;
  href: string;
  icon: string;
  image: { src: string; alt: string };
  caption: string;
  meta: string;
}

export interface SocialContent {
  title: string;
  subtitle: string;
  items: SocialPost[];
}

export interface ChatbotContent {
  label: string;
  /** Accessible name of the button. */
  openLabel: string;
  image: { src: string; alt: string };
}

export interface HomeContent {
  /** Visually hidden <h1> of the Home page. */
  pageHeading: string;
  announcements: AnnouncementsContent;
  hero: HeroContent;
  quote: QuoteContent;
  about: AboutContent;
  atAGlance: AtAGlanceContent;
  personas: PersonasContent;
  capabilities: CapabilitiesContent;
  testimonials: TestimonialsContent;
  statePortals: StatePortalsContent;
  trust: TrustContent;
  updates: UpdatesContent;
  social: SocialContent;
  chatbot: ChatbotContent;
}

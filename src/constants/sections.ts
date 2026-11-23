/**
 * Home page section anchors. The main navigation links to these (`/#about`, …) —
 * About, Capabilities, Impact, States and Connect are sections of the Home page,
 * not separate pages. Keep in sync with the `href`s in public/locales/{lang}/common.json.
 */
export const SECTION_ID = {
  about: 'about',
  capabilities: 'capabilities',
  /** "Bharat VISTAAR at a Glance" (impact numbers). */
  impact: 'impact',
  /** "Active State Portals". */
  states: 'states',
  /** "Connect With Us on Social Media". */
  connect: 'connect',
} as const;

export type SectionId = (typeof SECTION_ID)[keyof typeof SECTION_ID];

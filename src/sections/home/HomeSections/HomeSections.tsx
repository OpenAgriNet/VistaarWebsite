'use client';

import { ChatbotLauncher } from '@/components/layout/ChatbotLauncher';
import { useLocalizedContent } from '@/i18n/LanguageProvider';
import type { HomeContent } from '@/types/content';
import { Announcements } from '../Announcements';
import { HeroCarousel } from '../HeroCarousel';
import { LeaderQuote } from '../LeaderQuote';
import { AboutUs } from '../AboutUs';
import { AtAGlance } from '../AtAGlance';
import { PersonasCapabilities } from '../PersonasCapabilities';
import { Testimonials } from '../Testimonials';
import { StatePortals } from '../StatePortals';
import { TrustPartners } from '../TrustPartners';
import { LatestUpdates } from '../LatestUpdates';
import { SocialMedia } from '../SocialMedia';

/**
 * The Home sections in the order of the Figma "Final Development → Final-Home" frame, except
 * the announcements ticker: it sits directly above the hero carousel (client request).
 * Receives the English content (pre-rendered) and shows home.json in the visitor's language
 * once it has loaded.
 */
export function HomeSections({ content: english }: { content: HomeContent }) {
  const content = useLocalizedContent('home', english);

  return (
    <>
      {/* The page's main heading for screen readers; the visible slide titles are h2s. */}
      <h1 className="sr-only">{content.pageHeading}</h1>
      <Announcements content={content.announcements} />
      <HeroCarousel content={content.hero} />
      <LeaderQuote content={content.quote} />
      <AboutUs content={content.about} />
      <AtAGlance content={content.atAGlance} />
      <PersonasCapabilities personas={content.personas} capabilities={content.capabilities} />
      <Testimonials content={content.testimonials} />
      <StatePortals content={content.statePortals} />
      <TrustPartners content={content.trust} />
      <LatestUpdates content={content.updates} />
      <SocialMedia content={content.social} />
      <ChatbotLauncher content={content.chatbot} />
    </>
  );
}

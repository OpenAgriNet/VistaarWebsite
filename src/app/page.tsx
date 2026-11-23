import { getHomeContent } from '@/services/home.service';
import { defaultLocale } from '@/i18n/config';
import { ChatbotLauncher } from '@/components/layout/ChatbotLauncher';
import { Announcements } from '@/sections/home/Announcements';
import { HeroCarousel } from '@/sections/home/HeroCarousel';
import { LeaderQuote } from '@/sections/home/LeaderQuote';
import { AboutUs } from '@/sections/home/AboutUs';
import { AtAGlance } from '@/sections/home/AtAGlance';
import { PersonasCapabilities } from '@/sections/home/PersonasCapabilities';
import { Testimonials } from '@/sections/home/Testimonials';
import { StatePortals } from '@/sections/home/StatePortals';
import { TrustPartners } from '@/sections/home/TrustPartners';
import { LatestUpdates } from '@/sections/home/LatestUpdates';
import { SocialMedia } from '@/sections/home/SocialMedia';

/**
 * Home page: fetches content and composes sections in the order of the Figma
 * "Final Development → Final-Home" frame, except the announcements ticker: it sits under
 * the hero carousel, as in the later desktop "Search" frame and the mobile home frame.
 * No styling here — section styles live in each section folder.
 */
export default async function HomePage() {
  const content = await getHomeContent(defaultLocale);

  return (
    <>
      {/* The page's main heading for screen readers; the visible slide titles are h2s. */}
      <h1 className="sr-only">{content.pageHeading}</h1>
      <HeroCarousel content={content.hero} />
      <Announcements content={content.announcements} />
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

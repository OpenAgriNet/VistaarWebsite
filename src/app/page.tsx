import { getHomeContent } from '@/services/home.service';
import { defaultLocale } from '@/i18n/config';
import { HomeSections } from '@/sections/home/HomeSections';

/**
 * Home page: fetches the English content at build time (pre-rendered into the HTML) and hands
 * it to the sections, which switch to the visitor's language on the client.
 * No styling here — section styles live in each section folder.
 */
export default async function HomePage() {
  const content = await getHomeContent(defaultLocale);
  return <HomeSections content={content} />;
}

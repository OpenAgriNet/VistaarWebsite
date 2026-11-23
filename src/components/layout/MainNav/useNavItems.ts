'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { NavItem } from '@/types/content';
import { useActiveSection } from './useActiveSection';

const normalise = (path: string) => (path.endsWith('/') ? path : `${path}/`);

/** Section id from an in-page href like "/#about" (null for plain page links). */
const sectionOf = (href: string) => (href.includes('#') ? (href.split('#')[1] ?? null) : null);

/**
 * Nav data from common.json + which item is active. Shared by desktop and mobile nav.
 * On the Home page, items link to sections (`/#about` …) and the active item follows
 * the section in view; "Home" is active at the top of the page.
 */
export function useNavItems() {
  const t = useTranslations('nav');
  const pathname = normalise(usePathname() ?? '/');

  const items = t.raw('items') as NavItem[];

  const sectionIds = useMemo(
    () => items.map((item) => sectionOf(item.href)).filter((id): id is string => id !== null),
    [items],
  );
  const activeSection = useActiveSection(sectionIds);
  const onHome = pathname === '/';

  const isActive = (href: string) => {
    const section = sectionOf(href);
    if (section) return onHome && activeSection === section;
    const target = normalise(href);
    if (target === '/') return onHome && activeSection === null;
    return pathname.startsWith(target);
  };

  return { items, isActive };
}

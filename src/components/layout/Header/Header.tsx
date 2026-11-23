'use client';

import { useRef } from 'react';
import { GovLockup } from '@/components/layout/GovLockup';
import { SearchBox } from '@/components/layout/SearchBox';
import { TopBarActions } from '@/components/layout/TopBarActions';
import { MainNav } from '@/components/layout/MainNav';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useHeaderOffsets } from '@/hooks/useHeaderOffsets';
import * as S from './Header.styles';

/**
 * Site header (DBIM generic header for a Department under a Ministry).
 * Desktop and mobile markup both render; CSS shows the right one, so there is
 * no device detection and no layout jump on load.
 * Sticky per DBIM: desktop keeps the navigation bar on screen, mobile the header bar.
 */
export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  useHeaderOffsets(headerRef, topBarRef);

  return (
    <S.Root ref={headerRef}>
      <S.TopBar ref={topBarRef}>
        <S.TopBarInner className="container">
          <GovLockup />
          <S.DesktopTools>
            <SearchBox />
            <TopBarActions />
          </S.DesktopTools>
          <S.MobileOnly>
            <MobileMenu />
          </S.MobileOnly>
        </S.TopBarInner>
      </S.TopBar>
      <S.DesktopOnly>
        <MainNav />
      </S.DesktopOnly>
    </S.Root>
  );
}

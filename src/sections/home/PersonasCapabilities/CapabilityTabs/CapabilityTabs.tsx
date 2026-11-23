'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { SliderArrows } from '@/components/ui/SliderArrows';
import type { CapabilitiesContent } from '@/types/content';
import * as S from './CapabilityTabs.styles';
import { DbimChevronRight } from '@/components/ui/Icon/dbim';

const tabId = (id: string) => `capability-tab-${id}`;
const panelId = (id: string) => `capability-panel-${id}`;

/**
 * ARIA tabs: a tab list (vertical on desktop, a scrolling row on mobile) and one panel.
 * Arrow keys / Home / End move between tabs (automatic activation); the ‹ › buttons in the
 * panel step to the previous / next capability, wrapping around.
 */
export function CapabilityTabs({ content }: { content: CapabilitiesContent }) {
  const t = useTranslations('slider');
  const { items } = content;
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, moveFocus = false) => {
    const next = (index + items.length) % items.length;
    setSelected(next);
    const tab = tabRefs.current[next];
    tab?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    if (moveFocus) tab?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowDown: selected + 1,
      ArrowRight: selected + 1,
      ArrowUp: selected - 1,
      ArrowLeft: selected - 1,
      Home: 0,
      End: items.length - 1,
    };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target, true);
  };

  const current = items[selected];
  if (!current) return null;

  return (
    <S.Card>
      <S.TabList role="tablist" aria-label={content.title} onKeyDown={onKeyDown}>
        {items.map((item, index) => {
          const isSelected = index === selected;
          return (
            <S.Tab
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={tabId(item.id)}
              aria-selected={isSelected}
              aria-controls={panelId(item.id)}
              tabIndex={isSelected ? 0 : -1}
              selected={isSelected}
              onClick={() => select(index)}
            >
              {item.label}
              <Icon icon={DbimChevronRight} size="xs" tone="inherit" />
            </S.Tab>
          );
        })}
      </S.TabList>

      <S.Content
        role="tabpanel"
        id={panelId(current.id)}
        aria-labelledby={tabId(current.id)}
        tabIndex={0}
      >
        <S.ContentHeader>
          <S.Intro>
            <S.Title>{current.title}</S.Title>
            {current.description && <S.Body>{current.description}</S.Body>}
          </S.Intro>
          <SliderArrows
            previousLabel={t('previousCapability')}
            nextLabel={t('nextCapability')}
            onPrevious={() => select(selected - 1)}
            onNext={() => select(selected + 1)}
          />
        </S.ContentHeader>

        {current.features && current.features.length > 0 && (
          <>
            <S.Divider />
            <S.ExploreHeading>{content.exploreHeading}</S.ExploreHeading>
            <S.Features>
              {current.features.map((feature) => (
                <S.Feature key={feature.title}>
                  <S.FeatureTitle>{feature.title}</S.FeatureTitle>
                  <S.FeatureBody>{feature.description}</S.FeatureBody>
                </S.Feature>
              ))}
            </S.Features>
          </>
        )}
      </S.Content>
    </S.Card>
  );
}

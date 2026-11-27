import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatCard } from '@/components/ui/StatCard';
import { SECTION_ID } from '@/constants/sections';
import type { AtAGlanceContent } from '@/types/content';
import * as S from './AtAGlance.styles';
import { DbimOrganization } from '@/components/ui/Icon/dbim';

const TITLE_ID = 'at-a-glance-title';

export function AtAGlance({ content }: { content: AtAGlanceContent }) {
  return (
    <S.Section
      id={SECTION_ID.impact}
      aria-labelledby={TITLE_ID}
      backgroundSrc={content.backgroundImage}
    >
      <S.Content className="container">
        <SectionHeader
          icon={DbimOrganization}
          title={content.title}
          subtitle={content.subtitle}
          tone="onDark"
          titleId={TITLE_ID}
        />
        <S.StatGrid>
          {content.stats.map((stat) => (
            <li key={stat.id}>
              <StatCard value={stat.value} label={stat.label} />
            </li>
          ))}
        </S.StatGrid>
      </S.Content>
    </S.Section>
  );
}

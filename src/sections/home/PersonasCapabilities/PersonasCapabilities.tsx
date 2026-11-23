import { SectionHeader } from '@/components/ui/SectionHeader';
import { SECTION_ID } from '@/constants/sections';
import type { CapabilitiesContent, PersonasContent } from '@/types/content';
import { PersonaSlider } from './PersonaSlider';
import { CapabilityTabs } from './CapabilityTabs';
import * as S from './PersonasCapabilities.styles';
import { DbimMinistry, DbimUserPersonas } from '@/components/ui/Icon/dbim';

interface Props {
  personas: PersonasContent;
  capabilities: CapabilitiesContent;
}

/**
 * "Explore User Personas" + "Capabilities" (nav: Capabilities → /#capabilities).
 */
export function PersonasCapabilities({ personas, capabilities }: Props) {
  return (
    <S.Root aria-label={`${personas.title} · ${capabilities.title}`}>
      <S.Inner className="container">
        <S.Panel variant="personas" as="section" aria-labelledby="personas-title">
          <SectionHeader icon={DbimUserPersonas} title={personas.title} titleId="personas-title" />
          <PersonaSlider items={personas.items} />
        </S.Panel>

        <S.Panel
          variant="capabilities"
          as="section"
          id={SECTION_ID.capabilities}
          aria-labelledby="capabilities-title"
        >
          <SectionHeader
            icon={DbimMinistry}
            title={capabilities.title}
            titleId="capabilities-title"
          />
          <CapabilityTabs content={capabilities} />
        </S.Panel>
      </S.Inner>
    </S.Root>
  );
}

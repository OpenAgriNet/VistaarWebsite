import { SectionHeader } from '@/components/ui/SectionHeader';
import type { TrustContent } from '@/types/content';
import * as S from './TrustPartners.styles';
import { DbimSchemes } from '@/components/ui/Icon/dbim';

const TITLE_ID = 'trust-title';

/**
 * "Backed by Trust & Data": partner institution logos. Not links in the Figma.
 * TODO(content): name of the sixth institution; links if they should open the partners.
 */
export function TrustPartners({ content }: { content: TrustContent }) {
  return (
    <S.Root aria-labelledby={TITLE_ID}>
      <S.Inner className="container">
        <SectionHeader
          icon={DbimSchemes}
          title={content.title}
          subtitle={content.subtitle}
          titleId={TITLE_ID}
        />
        <S.Grid>
          {content.items.map((partner) => (
            <S.Tile key={partner.id}>
              <S.Logo
                src={partner.logo.src}
                alt={partner.name}
                width={partner.logo.width}
                height={partner.logo.height}
                loading="lazy"
                decoding="async"
              />
            </S.Tile>
          ))}
        </S.Grid>
      </S.Inner>
    </S.Root>
  );
}

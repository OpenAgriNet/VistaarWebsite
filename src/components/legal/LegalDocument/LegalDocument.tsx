'use client';

import { useLocalizedContent } from '@/i18n/LanguageProvider';
import type {
  LegalBlock,
  LegalDocument as LegalDocumentContent,
  LegalDocumentKey,
} from '@/types/content';
import * as S from './LegalDocument.styles';

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <S.Paragraph>{block.text}</S.Paragraph>;
    case 'subheading':
      return <S.Subheading>{block.text}</S.Subheading>;
    case 'list':
      return (
        <S.List>
          {block.items.map((item) => (
            <li key={`${item.term ?? ''}${item.text}`}>
              {item.term && <strong>{item.term}</strong>} {item.text}
            </li>
          ))}
        </S.List>
      );
    case 'address':
      return (
        <S.Address>
          {block.title && <strong>{block.title}</strong>}
          {block.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </S.Address>
      );
  }
}

/**
 * One legal page (Privacy Policy, Terms and Conditions, Disclaimer): title, effective
 * date, intro, then numbered sections. Text comes from legal.json; not in the Figma, so
 * the layout follows the current vistaar.da.gov.in pages with our theme.
 * Receives the English text (pre-rendered) and shows legal.json in the visitor's language
 * once it has loaded.
 */
export function LegalDocument({
  content: english,
  documentKey,
}: {
  content: LegalDocumentContent;
  documentKey: LegalDocumentKey;
}) {
  const content = useLocalizedContent('legal', english, documentKey);
  return (
    <S.Root className="container">
      <S.Article>
        <S.Header>
          <S.Title>{content.title}</S.Title>
          <S.EffectiveDate>{content.effectiveDate}</S.EffectiveDate>
        </S.Header>
        {content.intro.map((block, index) => (
          <Block key={index} block={block} />
        ))}
        {content.sections.map((section) => (
          <S.Section key={section.heading}>
            <S.SectionHeading>{section.heading}</S.SectionHeading>
            {section.blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </S.Section>
        ))}
      </S.Article>
    </S.Root>
  );
}

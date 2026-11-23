import { size } from '@/theme/tokens';
import { HighlightedText } from '@/components/ui/HighlightedText';
import type { QuoteContent } from '@/types/content';
import * as S from './LeaderQuote.styles';

/** PM quote with a highlighted phrase and a "Vision statement" link (Figma: Component 11). */
export function LeaderQuote({ content }: { content: QuoteContent }) {
  return (
    <S.Root aria-label={content.attribution}>
      <div className="container">
        <S.Figure>
          <S.Photo
            src={content.image.src}
            alt={content.image.alt}
            width={size.quotePhoto}
            height={size.quotePhoto}
            loading="lazy"
            decoding="async"
          />
          <S.Column>
            <S.Quote>
              {content.paragraphs.map((segments, index) => (
                <S.Paragraph key={index}>
                  <HighlightedText segments={segments} />
                </S.Paragraph>
              ))}
            </S.Quote>
            <S.Divider />
            <S.Link href={content.link.href}>{content.link.label}</S.Link>
          </S.Column>
          {/* Attribution for assistive tech; the design shows only the photo. */}
          <figcaption className="sr-only">{content.attribution}</figcaption>
        </S.Figure>
      </div>
    </S.Root>
  );
}

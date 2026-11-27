import type { TextSegment } from '@/types/content';
import * as S from './HighlightedText.styles';

/** Renders text runs, with `strong` runs in bold brand green. Place inside a <p>. */
export function HighlightedText({ segments }: { segments: TextSegment[] }) {
  return segments.map((segment, index) =>
    segment.strong ? (
      <S.Highlight key={index}>{segment.text}</S.Highlight>
    ) : (
      <span key={index}>{segment.text}</span>
    ),
  );
}

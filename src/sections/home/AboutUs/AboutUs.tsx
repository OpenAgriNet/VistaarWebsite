import { SECTION_ID } from '@/constants/sections';
import { size } from '@/theme/tokens';
import type { AboutContent } from '@/types/content';
import * as S from './AboutUs.styles';

const TITLE_ID = 'about-title';

/** About Us (nav: "About" → /#about). */
export function AboutUs({ content }: { content: AboutContent }) {
  return (
    <S.Root
      id={SECTION_ID.about}
      aria-labelledby={TITLE_ID}
      backgroundSrc={content.backgroundImage}
    >
      <S.Inner className="container">
        <S.Text>
          <S.Heading>
            <S.Label id={TITLE_ID}>{content.label}</S.Label>
            <S.Title>{content.heading}</S.Title>
          </S.Heading>
          <S.Body>
            {content.paragraphs.map((paragraph) => (
              <S.Paragraph key={paragraph.slice(0, 32)}>{paragraph}</S.Paragraph>
            ))}
          </S.Body>
        </S.Text>
        <S.Photo
          src={content.image.src}
          alt={content.image.alt}
          width={size.aboutPhoto.width}
          height={size.aboutPhoto.height}
          loading="lazy"
          decoding="async"
        />
      </S.Inner>
    </S.Root>
  );
}

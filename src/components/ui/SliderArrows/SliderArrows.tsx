import { Icon } from '@/components/ui/Icon';
import * as S from './SliderArrows.styles';
import { DbimChevronLeft, DbimChevronRight } from '@/components/ui/Icon/dbim';

interface SliderArrowsProps {
  previousLabel: string;
  nextLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
}

/** Previous / next buttons for the section sliders. */
export function SliderArrows({
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
  previousDisabled,
  nextDisabled,
}: SliderArrowsProps) {
  return (
    <S.Root>
      <S.Arrow
        type="button"
        aria-label={previousLabel}
        disabled={previousDisabled}
        onClick={onPrevious}
      >
        <Icon icon={DbimChevronLeft} size="xs" tone="inherit" />
      </S.Arrow>
      <S.Arrow type="button" aria-label={nextLabel} disabled={nextDisabled} onClick={onNext}>
        <Icon icon={DbimChevronRight} size="xs" tone="inherit" />
      </S.Arrow>
    </S.Root>
  );
}

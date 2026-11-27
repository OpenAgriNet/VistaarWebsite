import type { ComponentType } from 'react';
import { Icon, type IconSize } from '@/components/ui/Icon';
import * as S from './SectionHeader.styles';

interface SectionHeaderProps {
  icon: ComponentType;
  title: string;
  subtitle?: string;
  tone?: S.SectionHeaderTone;
  /** id for the heading, so the section can use aria-labelledby. */
  titleId?: string;
  /** DBIM icon size; most section headers use md (32), panel headers sm (24). */
  iconSize?: IconSize;
}

/** The icon + title + subtitle block repeated at the top of most Home sections. */
export function SectionHeader({
  icon,
  title,
  subtitle,
  tone = 'onLight',
  titleId,
  iconSize = 'md',
}: SectionHeaderProps) {
  return (
    <S.Root>
      <Icon icon={icon} size={iconSize} tone={tone === 'onDark' ? 'inverse' : 'brand'} />
      <S.Text>
        <S.Title id={titleId} tone={tone}>
          {title}
        </S.Title>
        {subtitle && <S.Subtitle tone={tone}>{subtitle}</S.Subtitle>}
      </S.Text>
    </S.Root>
  );
}

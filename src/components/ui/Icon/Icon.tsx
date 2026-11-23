import type { ComponentType } from 'react';
import * as S from './Icon.styles';

interface IconProps {
  /** A DBIM Toolkit icon component, e.g. `DbimSearch` from '@/components/ui/Icon/dbim'. */
  icon: ComponentType;
  /** DBIM sizes only: sm 24 · md 32 · lg 48 · xl 64. */
  size?: S.IconSize;
  /** DBIM: icons use the brand colour or (on dark backgrounds) inverse white. */
  tone?: S.IconTone;
  /** Accessible name. Omit for decorative icons next to visible text. */
  label?: string;
}

export function Icon({ icon: SvgIcon, size = 'sm', tone = 'brand', label }: IconProps) {
  return (
    <S.Root
      size={size}
      tone={tone}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <SvgIcon />
    </S.Root>
  );
}

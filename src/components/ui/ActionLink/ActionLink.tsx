import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import * as S from './ActionLink.styles';
import { DbimChevronRight } from '@/components/ui/Icon/dbim';
import { isExternalUrl, newTabProps } from '@/utils/links';

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  variant?: S.ActionLinkVariant;
  size?: S.ActionLinkSize;
  /** Opens in a new tab; `newTabLabel` is read by screen readers after the label. */
  external?: boolean;
  newTabLabel?: string;
}

/** Link styled as the Figma button (label + chevron). */
export function ActionLink({
  href,
  children,
  variant = 'outlined',
  size = 'medium',
  external,
  newTabLabel,
}: ActionLinkProps) {
  return (
    <S.Root href={href} variant={variant} size={size} {...(external && newTabProps(href))}>
      {children}
      {external && newTabLabel && isExternalUrl(href) && (
        <span className="sr-only"> {newTabLabel}</span>
      )}
      <Icon icon={DbimChevronRight} size="sm" tone="inherit" />
    </S.Root>
  );
}

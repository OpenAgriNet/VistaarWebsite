'use client';

import { styled } from '@mui/material/styles';
import { borderWidth, fontWeight, radius, size } from '@/theme/tokens';

export type ActionLinkVariant = 'outlined' | 'filled';
/** medium: 48px (page sections) · compact: 42px (nav bar). */
export type ActionLinkSize = 'medium' | 'compact';

interface VariantProps {
  variant: ActionLinkVariant;
  size: ActionLinkSize;
}

/**
 * Figma "Button" component set (Dump page): 48px high (42px compact in the nav bar), 8px radius, 1px brand border,
 * 16px side padding, label 16 medium + chevron.
 *   outlined: white with green text → on hover it fills green with white text (Figma variant 2)
 *   filled:   green with white text → on hover a darker green (not in the Figma)
 */
export const Root = styled('a', {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size',
})<VariantProps>(({ theme, variant, size: buttonSize }) => {
  const palette = (theme.vars ?? theme).palette;
  const filled = variant === 'filled';
  return {
    ...theme.typography.labelXL,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    flexShrink: 0,
    height: buttonSize === 'compact' ? size.actionButtonHeightCompact : size.actionButtonHeight,
    paddingInline: theme.spacing(4),
    border: `${borderWidth.thin}px solid ${palette.brand.primary}`,
    borderRadius: radius.sm,
    fontWeight: fontWeight.medium,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    color: filled ? palette.text.inverse : palette.brand.primary,
    backgroundColor: filled ? palette.brand.primary : palette.surface.card,
    transition: theme.transitions.create(['background-color', 'color', 'border-color']),
    '&:hover': filled
      ? { backgroundColor: palette.brand.primaryHover, borderColor: palette.brand.primaryHover }
      : { backgroundColor: palette.brand.primary, color: palette.text.inverse },
    '&:focus-visible': {
      outline: `${borderWidth.thick}px solid ${palette.brand.primary}`,
      outlineOffset: theme.spacing(0.5),
    },
  };
});

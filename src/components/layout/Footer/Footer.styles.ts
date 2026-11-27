'use client';

import { styled } from '@mui/material/styles';
import { fontWeight, opacity, size } from '@/theme/tokens';

/**
 * Figma "Final-Home" footer (brand green, #FAFAFA text). Same content on all screens:
 *   Desktop 1440×250: Legal · Contact · Download Our App · Subscribe for Updates (right-aligned),
 *                     then ownership (left) and last updated (right).
 *   Mobile 375: stacked — Legal · Contact · Subscribe · logos · Download Our App ·
 *               last updated · ownership (24/16 padding).
 * DOM follows the mobile order; `order` rearranges the desktop columns.
 */

export const Root = styled('footer')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    backgroundColor: palette.brand.primary,
    color: palette.text.inverse,
    paddingBlock: theme.spacing(6),
    [theme.breakpoints.up('lg')]: { paddingBlock: theme.spacing(8, 6) },
  };
});

export const Inner = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  [theme.breakpoints.up('lg')]: { gap: theme.spacing(10) },
}));

export const Columns = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
}));

interface OrderProps {
  /** Position in the desktop row (mobile keeps DOM order). */
  desktopOrder?: number;
  alignEnd?: boolean;
}

export const Group = styled('section', {
  shouldForwardProp: (prop) => prop !== 'desktopOrder' && prop !== 'alignEnd',
})<OrderProps>(({ theme, desktopOrder, alignEnd }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  [theme.breakpoints.up('lg')]: {
    order: desktopOrder,
    gap: theme.spacing(4),
    alignItems: alignEnd ? 'flex-end' : 'flex-start',
  },
}));

/** 16px bold uppercase heading. */
export const Heading = styled('h2')(({ theme }) => ({
  ...theme.typography.headingXS,
  fontWeight: fontWeight.bold,
  textTransform: 'uppercase',
  margin: 0,
}));

export const LinkStack = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

export const FooterLink = styled('a')(({ theme }) => ({
  ...theme.typography.bodyS,
  color: 'inherit',
  textDecoration: 'none',
}));

export const Socials = styled('ul')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(6),
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

export const IconLink = styled('a')({
  display: 'inline-flex',
  color: 'inherit',
});

export const LogoRow = styled('ul')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

/** White tile holding a partner logo (MyGov, Digital India). */
export const LogoTile = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: size.partnerLogoMobile.width,
  height: size.partnerLogoMobile.height,
  backgroundColor: (theme.vars ?? theme).palette.surface.page,
  [theme.breakpoints.up('lg')]: {
    width: size.partnerLogo.width,
    height: size.partnerLogo.height,
  },
  '& img': { maxWidth: '90%', maxHeight: '70%', objectFit: 'contain' },
}));

export const StoreBadge = styled('img')({
  display: 'block',
  width: size.storeBadge.width,
  height: size.storeBadge.height,
});

/** Last updated + ownership. Desktop: one row, ownership left, date right. */
export const BottomRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export const Meta = styled('p')(({ theme }) => ({
  ...theme.typography.bodyS,
  margin: 0,
  [theme.breakpoints.up('lg')]: { ...theme.typography.bodyXS },
}));

export const Ownership = styled(Meta)({
  opacity: opacity.muted,
});

/* ---------- Contact ---------- */

/** The contact email address as plain text (no mailto action, client request). */
export const ContactEmail = styled('p')(({ theme }) => ({
  ...theme.typography.bodyS,
  margin: 0,
  overflowWrap: 'anywhere',
}));

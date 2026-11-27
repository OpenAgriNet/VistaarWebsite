'use client';

import { styled } from '@mui/material/styles';
import { fontWeight, size } from '@/theme/tokens';

/**
 * Legal pages: not in the Figma. Same structure as the current vistaar.da.gov.in pages
 * (896px text column, green title, numbered section headings), in our type scale.
 */

export const Root = styled('div')(({ theme }) => ({
  paddingBlock: theme.spacing(10),
  [theme.breakpoints.up('lg')]: { paddingBlock: theme.spacing(20) },
}));

export const Article = styled('article')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  maxWidth: size.legalTextWidth,
  color: (theme.vars ?? theme).palette.text.secondary,
}));

export const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

export const Title = styled('h1')(({ theme }) => ({
  ...theme.typography.headingM,
  margin: 0,
  fontWeight: fontWeight.bold,
  color: (theme.vars ?? theme).palette.brand.primary,
  [theme.breakpoints.up('lg')]: { ...theme.typography.headingL },
}));

export const EffectiveDate = styled('p')(({ theme }) => ({
  ...theme.typography.bodyM,
  margin: 0,
  fontWeight: fontWeight.medium,
}));

export const Section = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
}));

export const SectionHeading = styled('h2')(({ theme }) => ({
  ...theme.typography.headingXS,
  margin: 0,
  fontWeight: fontWeight.semibold,
  color: (theme.vars ?? theme).palette.text.primary,
  [theme.breakpoints.up('lg')]: { ...theme.typography.headingS },
}));

export const Subheading = styled('h3')(({ theme }) => ({
  ...theme.typography.titleM,
  margin: 0,
  marginTop: theme.spacing(1),
  fontWeight: fontWeight.semibold,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const Paragraph = styled('p')(({ theme }) => ({
  ...theme.typography.bodyM,
  margin: 0,
}));

export const List = styled('ul')(({ theme }) => ({
  ...theme.typography.bodyM,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  margin: 0,
  paddingInlineStart: theme.spacing(6),
  listStyleType: 'disc',
}));

export const Address = styled('address')(({ theme }) => ({
  ...theme.typography.bodyM,
  display: 'flex',
  flexDirection: 'column',
  fontStyle: 'normal',
}));

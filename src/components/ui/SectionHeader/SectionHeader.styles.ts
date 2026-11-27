'use client';

import { styled } from '@mui/material/styles';
import { fontWeight } from '@/theme/tokens';

export type SectionHeaderTone = 'onLight' | 'onDark';

interface ToneProps {
  tone: SectionHeaderTone;
}

const forwardTone = { shouldForwardProp: (prop: PropertyKey) => prop !== 'tone' };

export const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3.5),
}));

export const Text = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

/** Mobile: Body L bold (18/26) · Desktop: Heading S Strong (20/26). */
export const Title = styled(
  'h2',
  forwardTone,
)<ToneProps>(({ theme, tone }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.bodyL,
    fontWeight: fontWeight.bold,
    margin: 0,
    color: tone === 'onDark' ? palette.text.inverse : palette.text.primary,
    [theme.breakpoints.up('lg')]: {
      ...theme.typography.headingS,
      fontWeight: fontWeight.bold,
    },
  };
});

/** Mobile: 14/140% medium · Desktop: 16/140% medium. */
export const Subtitle = styled(
  'p',
  forwardTone,
)<ToneProps>(({ theme, tone }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.headingXXS,
    fontWeight: fontWeight.medium,
    margin: 0,
    color: tone === 'onDark' ? palette.text.inverse : palette.text.secondary,
    [theme.breakpoints.up('lg')]: {
      ...theme.typography.headingXS,
      fontWeight: fontWeight.medium,
    },
  };
});

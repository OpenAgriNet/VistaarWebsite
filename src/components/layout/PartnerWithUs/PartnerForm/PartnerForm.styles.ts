'use client';

import { styled, type Theme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { borderWidth, fontWeight, radius, size } from '@/theme/tokens';

/**
 * Figma "Partner With Us-Pop up form": 1038px pop-up over a dimmed page — 493px field
 * picture (12px left corners) + form column. Title 24/120% bold, subtitle 14 regular;
 * 28px to the form; labels Body XS Strong (12/18 semibold, red asterisk), 8px to the
 * control; controls 460×48, 1px #D4D7E3, 8px radius; 16px between fields; 80px
 * description box; full-width green "Send Inquiry".
 * Below md the picture is hidden and the form fills the screen width.
 */

export const Root = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': { backgroundColor: (theme.vars ?? theme).palette.overlay },
  '& .MuiDialog-paper': {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: size.partnerDialogWidth,
    margin: theme.spacing(4),
    borderRadius: radius.image,
    overflow: 'hidden',
    backgroundColor: (theme.vars ?? theme).palette.surface.card,
  },
}));

export const Picture = styled('img')(({ theme }) => ({
  display: 'none',
  flexShrink: 0,
  width: size.partnerImageWidth,
  objectFit: 'cover',
  [theme.breakpoints.up('md')]: { display: 'block' },
}));

export const Body = styled('div')(({ theme }) => ({
  position: 'relative',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(7),
  minWidth: 0,
  padding: theme.spacing(6, 4),
  overflowY: 'auto',
  [theme.breakpoints.up('md')]: { padding: theme.spacing(7, 10, 9) },
}));

export const CloseButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(6),
  right: theme.spacing(4),
  display: 'inline-flex',
  padding: 0,
  border: 0,
  background: 'none',
  color: (theme.vars ?? theme).palette.text.primary,
  cursor: 'pointer',
  '&:focus-visible': {
    outline: `${borderWidth.thick}px solid ${(theme.vars ?? theme).palette.brand.primary}`,
    outlineOffset: theme.spacing(0.5),
  },
  [theme.breakpoints.up('md')]: { top: theme.spacing(8), right: theme.spacing(6) },
}));

export const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  paddingRight: theme.spacing(10),
}));

export const Title = styled('h2')(({ theme }) => ({
  ...theme.typography.dialogTitle,
  margin: 0,
  fontWeight: fontWeight.bold,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const Subtitle = styled('p')(({ theme }) => ({
  ...theme.typography.headingXXS,
  margin: 0,
  color: (theme.vars ?? theme).palette.text.secondary,
}));

export const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const Field = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const Label = styled('label')(({ theme }) => ({
  ...theme.typography.bodyXS,
  fontWeight: fontWeight.semibold,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const Required = styled('span')(({ theme }) => ({
  marginLeft: theme.spacing(1),
  color: (theme.vars ?? theme).palette.text.error,
}));

const controlStyles = ({ theme }: { theme: Theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.headingXXS,
    width: '100%',
    height: size.formControlHeight,
    paddingInline: theme.spacing(3),
    border: `${borderWidth.thin}px solid ${palette.border.input}`,
    borderRadius: radius.sm,
    backgroundColor: palette.surface.card,
    color: palette.text.primary,
    fontFamily: 'inherit',
    '&::placeholder': { color: palette.text.muted },
    '&:focus-visible': {
      outline: `${borderWidth.thick}px solid ${palette.brand.primary}`,
      outlineOffset: 0,
      borderColor: palette.brand.primary,
    },
    '&[aria-invalid="true"]': { borderColor: palette.text.error },
  };
};

export const Input = styled('input')(controlStyles);

export const TextArea = styled('textarea')(({ theme }) => ({
  ...controlStyles({ theme }),
  height: size.textareaHeight,
  paddingBlock: theme.spacing(3),
  resize: 'vertical',
}));

export const SelectWrap = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '& > span': {
    position: 'absolute',
    right: theme.spacing(3),
    pointerEvents: 'none',
    color: (theme.vars ?? theme).palette.text.primary,
  },
}));

export const Select = styled('select')(({ theme }) => ({
  ...controlStyles({ theme }),
  appearance: 'none',
  paddingRight: theme.spacing(10),
  cursor: 'pointer',
  // Placeholder option still selected.
  '&[data-empty="true"]': { color: (theme.vars ?? theme).palette.text.muted },
}));

export const FieldError = styled('p')(({ theme }) => ({
  ...theme.typography.bodyXS,
  margin: 0,
  color: (theme.vars ?? theme).palette.text.error,
}));

export const Submit = styled('button')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.labelXL,
    height: size.formControlHeight,
    border: 0,
    borderRadius: radius.sm,
    fontWeight: fontWeight.medium,
    color: palette.text.inverse,
    backgroundColor: palette.brand.primary,
    cursor: 'pointer',
    '&:focus-visible': {
      outline: `${borderWidth.thick}px solid ${palette.brand.primary}`,
      outlineOffset: theme.spacing(0.5),
    },
  };
});

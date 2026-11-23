'use client';

import { styled, type Theme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { borderWidth, fontWeight, gradient, radius, size } from '@/theme/tokens';

/**
 * Figma "Final Development → Bharati Chat": 628×900 white panel on the right over a dimmed
 * page; padding 16/24/24/24; content spread top-to-bottom.
 *   Top: "Chatbot" (24/120% bold) + open-in-new (bordered square) + close (grey circle);
 *        "New feature" banner (green gradient, yellow left edge, NEW pill);
 *        colour BV logo + bell / language / settings buttons.
 *   Middle: 110px avatar with a violet ring, "Bharati" in green, greeting (14 semibold).
 *   Bottom: three suggestion rows (bordered, 8px radius, chevron), question box with
 *           + / mic / green send button, disclaimer (12, grey).
 * Mobile: the panel fills the screen.
 */

export const Panel = styled(Drawer)(({ theme }) => ({
  '& .MuiBackdrop-root': { backgroundColor: (theme.vars ?? theme).palette.overlay },
  '& .MuiDrawer-paper': {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    width: '100%',
    padding: theme.spacing(4, 4, 6),
    backgroundColor: (theme.vars ?? theme).palette.surface.card,
    [theme.breakpoints.up('sm')]: {
      width: size.chatPanelWidth,
      padding: theme.spacing(4, 6, 6),
    },
  },
}));

export const Top = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const Row = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(3),
}));

export const Title = styled('h2')(({ theme }) => ({
  ...theme.typography.dialogTitle,
  margin: 0,
  fontWeight: fontWeight.bold,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const Tools = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

const focusRing = (color: string, offset: string) => ({
  '&:focus-visible': { outline: `${borderWidth.thick}px solid ${color}`, outlineOffset: offset },
});

/** Bordered square button (open in new page, bell, settings, language). */
const toolStyles = ({ theme }: { theme: Theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.labelL,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    minWidth: size.chatToolButton,
    height: size.chatToolButton,
    paddingInline: theme.spacing(2),
    border: `${borderWidth.thin}px solid ${palette.border.control}`,
    borderRadius: radius.sm,
    backgroundColor: palette.surface.card,
    color: palette.text.primary,
    textDecoration: 'none',
    cursor: 'pointer',
    ...focusRing(palette.brand.primary, theme.spacing(0.5)),
  };
};

export const ToolButton = styled('button')(toolStyles);
export const ToolLink = styled('a')(toolStyles);

export const CloseButton = styled('button')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size.chatCloseButton,
    height: size.chatCloseButton,
    padding: 0,
    border: 0,
    borderRadius: radius.full,
    backgroundColor: palette.surface.subtle,
    color: palette.text.primary,
    cursor: 'pointer',
    ...focusRing(palette.brand.primary, theme.spacing(0.5)),
  };
});

export const Banner = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(2, 3),
  borderLeft: `${borderWidth.navIndicator}px solid ${(theme.vars ?? theme).palette.surface.badge}`,
  borderRadius: radius.sm,
  backgroundImage: gradient.featureBanner,
  color: (theme.vars ?? theme).palette.text.inverse,
}));

export const BannerLabel = styled('p')(({ theme }) => ({
  ...theme.typography.labelS,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  margin: 0,
  fontWeight: fontWeight.medium,
  textTransform: 'uppercase',
}));

export const NewBadge = styled('span')(({ theme }) => ({
  paddingInline: theme.spacing(1.5),
  borderRadius: radius.full,
  fontWeight: fontWeight.bold,
  color: (theme.vars ?? theme).palette.text.primary,
  backgroundColor: (theme.vars ?? theme).palette.surface.badge,
}));

export const BannerText = styled('p')(({ theme }) => ({
  ...theme.typography.headingXXS,
  margin: 0,
}));

export const Logo = styled('img')({
  width: size.chatLogoWidth,
  height: size.chatLogoHeight,
});

export const Welcome = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  textAlign: 'center',
}));

export const Avatar = styled('img')(({ theme }) => ({
  width: size.chatAvatar,
  height: size.chatAvatar,
  borderRadius: radius.full,
  border: `${borderWidth.thick}px solid ${(theme.vars ?? theme).palette.brand.highlight}`,
  objectFit: 'cover',
}));

export const AssistantName = styled('p')(({ theme }) => ({
  ...theme.typography.assistantName,
  margin: 0,
  fontWeight: fontWeight.bold,
  color: (theme.vars ?? theme).palette.brand.primary,
}));

export const Greeting = styled('p')(({ theme }) => ({
  ...theme.typography.headingXXS,
  margin: 0,
  fontWeight: fontWeight.semibold,
  color: (theme.vars ?? theme).palette.text.primary,
}));

export const Bottom = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const Suggestions = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

export const Suggestion = styled('button')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    ...theme.typography.headingXXS,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(3),
    width: '100%',
    minHeight: size.formControlHeight,
    padding: theme.spacing(2, 3),
    border: `${borderWidth.thin}px solid ${palette.border.control}`,
    borderRadius: radius.sm,
    backgroundColor: palette.surface.card,
    fontWeight: fontWeight.semibold,
    color: palette.text.control,
    textAlign: 'left',
    cursor: 'pointer',
    ...focusRing(palette.brand.primary, theme.spacing(0.5)),
  };
});

export const Composer = styled('form')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    minHeight: size.formControlHeight,
    paddingInline: theme.spacing(2),
    border: `${borderWidth.thin}px solid ${palette.border.control}`,
    borderRadius: radius.sm,
    backgroundColor: palette.surface.card,
    '&:focus-within': { borderColor: palette.brand.primary },
  };
});

export const Input = styled('input')(({ theme }) => ({
  ...theme.typography.headingXXS,
  flex: 1,
  minWidth: 0,
  height: size.formControlHeight,
  border: 0,
  outline: 0,
  background: 'transparent',
  color: (theme.vars ?? theme).palette.text.primary,
  '&::placeholder': { color: (theme.vars ?? theme).palette.text.secondary },
}));

export const IconButton = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  padding: 0,
  border: 0,
  background: 'none',
  color: (theme.vars ?? theme).palette.text.primary,
  cursor: 'pointer',
  ...focusRing((theme.vars ?? theme).palette.brand.primary, theme.spacing(0.5)),
}));

export const SendButton = styled('button')(({ theme }) => {
  const palette = (theme.vars ?? theme).palette;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: size.chatSendButton,
    height: size.chatSendButton,
    padding: 0,
    border: 0,
    borderRadius: radius.full,
    backgroundColor: palette.brand.primary,
    color: palette.text.inverse,
    cursor: 'pointer',
    ...focusRing(palette.brand.primary, theme.spacing(0.5)),
  };
});

export const Disclaimer = styled('p')(({ theme }) => ({
  ...theme.typography.labelM,
  margin: 0,
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
}));

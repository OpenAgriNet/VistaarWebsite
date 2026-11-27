import { createTheme, type CSSProperties } from '@mui/material/styles';
import {
  borderWidth,
  breakpoints,
  color,
  contrastColor,
  fontFamily,
  fontWeight,
  radius,
  spacingUnit,
  typeScale,
  type TypeScaleKey,
} from './tokens';

/* ------------------------------------------------------------------ */
/* TypeScript: custom palette keys + one Typography variant per Figma */
/* text style (e.g. <Typography variant="headingS">).                 */
/* ------------------------------------------------------------------ */

type ScaleVariants = { [K in TypeScaleKey]: CSSProperties };
type ScaleVariantFlags = { [K in TypeScaleKey]: true };

interface BrandPalette {
  primary: string;
  primaryHover: string;
  accent: string;
  highlight: string;
}
interface SurfacePalette {
  page: string;
  card: string;
  control: string;
  subtle: string;
  topBar: string;
  navActive: string;
  mediaControl: string;
  mediaControlInverse: string;
  announcement: string;
  quote: string;
  sectionAlt: string;
  brandTint: string;
  badge: string;
}
interface BorderPalette {
  brand: string;
  control: string;
  subtle: string;
  quote: string;
  hairline: string;
  input: string;
}
interface ControlPalette {
  background: string;
  indicatorOn: string;
  dotActive: string;
  dotInactive: string;
}

/* MUI module augmentation requires `interface X extends Y {}` to add members. */
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module '@mui/material/styles' {
  interface TypographyVariants extends ScaleVariants {}
  interface TypographyVariantsOptions extends Partial<ScaleVariants> {}

  interface Palette {
    brand: BrandPalette;
    surface: SurfacePalette;
    border: BorderPalette;
    control: ControlPalette;
    overlay: string;
  }
  interface PaletteOptions {
    brand?: BrandPalette;
    surface?: SurfacePalette;
    border?: BorderPalette;
    control?: ControlPalette;
    overlay?: string;
  }
  interface TypeText {
    inverse: string;
    control: string;
    onDarkMuted: string;
    muted: string;
    error: string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides extends ScaleVariantFlags {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

/* ------------------------------------------------------------------ */

const ROOT_FONT_SIZE = 16;
const toRem = (px: number) => `${px / ROOT_FONT_SIZE}rem`;

/** Size + line height only, rem-based so the accessibility "Text Size +/-" scales everything. */
const scaleVariants = Object.fromEntries(
  (Object.keys(typeScale) as TypeScaleKey[]).map((key) => {
    const [size, lineHeight] = typeScale[key];
    return [
      key,
      {
        fontFamily: fontFamily.base,
        fontSize: toRem(size),
        lineHeight: `${lineHeight / size}`,
        // No fontWeight here: spreading a variant (e.g. inside a breakpoint) must never
        // reset a weight set by the component. Text is regular (400) unless a style says otherwise.
      },
    ];
  }),
) as ScaleVariants;

type SchemeColors = typeof color | typeof contrastColor;

const paletteFrom = (c: SchemeColors) => ({
  primary: { main: c.brand.primary, contrastText: c.text.inverse },
  background: { default: c.surface.page, paper: c.surface.card },
  text: {
    primary: c.text.primary,
    secondary: c.text.secondary,
    inverse: c.text.inverse,
    control: c.text.control,
    onDarkMuted: c.text.onDarkMuted,
    muted: c.text.muted,
    error: c.text.error,
  },
  brand: { ...c.brand },
  surface: { ...c.surface },
  border: { ...c.border },
  control: { ...c.control },
  overlay: c.overlay,
});

/**
 * Colour schemes:
 * - `light` → the Figma design (default)
 * - `dark`  → the accessibility panel's "Dark Contrast". MUI's `dark` slot is used so the
 *             built-in no-flash script and persistence work; the OS dark mode is NOT followed
 *             (defaultMode is always 'light').
 */
export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-bv-scheme' },
  colorSchemes: {
    light: { palette: paletteFrom(color) },
    dark: { palette: paletteFrom(contrastColor) },
  },
  breakpoints: { values: { ...breakpoints } },
  spacing: spacingUnit,
  shape: { borderRadius: radius.sm },
  typography: {
    fontFamily: fontFamily.base,
    htmlFontSize: ROOT_FONT_SIZE,
    fontWeightRegular: fontWeight.regular,
    fontWeightMedium: fontWeight.medium,
    fontWeightBold: fontWeight.bold,
    ...scaleVariants,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        // Render every scale variant as a <p> unless a component says otherwise.
        variantMapping: Object.fromEntries(
          (Object.keys(typeScale) as TypeScaleKey[]).map((key) => [key, 'p']),
        ),
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: false },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          textTransform: 'none',
          borderRadius: radius.sm,
          // DBIM: hover must be noticeable on clickable items.
          '&:hover': { textDecoration: 'underline' },
          '&:focus-visible': {
            outline: `${borderWidth.thick}px solid ${(t.vars ?? t).palette.brand.primary}`,
            outlineOffset: borderWidth.thick,
          },
        }),
      },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
    },
  },
});

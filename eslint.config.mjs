import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

/**
 * Project style rules (see README → "Styling rules"):
 *  - .tsx files hold markup only: no inline `sx` / `style`.
 *  - *.styles.ts files use theme values only: no raw hex / rgb / px / numbers.
 *  - Raw values are allowed in src/theme/tokens.ts and nowhere else.
 */
const STYLE_FILE_MESSAGE =
  'Use theme values (theme.spacing(), (theme.vars ?? theme).palette, tokens) — raw values belong in src/theme/tokens.ts.';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ['src/**/*.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXAttribute[name.name='sx']",
          message: "No inline `sx`. Put styles in the component's .styles.ts file.",
        },
        {
          selector: "JSXAttribute[name.name='style']",
          message: "No inline `style`. Put styles in the component's .styles.ts file.",
        },
      ],
    },
  },
  {
    files: ['src/**/*.styles.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        { selector: 'Literal[value=/#[0-9a-fA-F]{3,8}\\b/]', message: STYLE_FILE_MESSAGE },
        { selector: 'Literal[value=/rgba?\\(|hsla?\\(/]', message: STYLE_FILE_MESSAGE },
        { selector: 'Literal[value=/\\d+(\\.\\d+)?px/]', message: STYLE_FILE_MESSAGE },
        {
          selector:
            'TemplateElement[value.raw=/\\d+(\\.\\d+)?px|#[0-9a-fA-F]{3,8}\\b|rgba?\\(|hsla?\\(/]',
          message: STYLE_FILE_MESSAGE,
        },
        { selector: 'Property > Literal[value>1]', message: STYLE_FILE_MESSAGE },
      ],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;

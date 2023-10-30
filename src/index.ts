import { DesignTokens } from 'style-dictionary';
import { program } from './program';
import { generateTailwindClasses } from './sd-utils';
import { ErrorMissingGlobalTheme } from '../utils/error';

if (require.main === module) {
  program.parse(process.argv);
}

export function getTailwindClasses(tokens: DesignTokens, themes = ['global']) {
  if (!themes.includes('global')) {
    throw new Error(ErrorMissingGlobalTheme);
  }
  return {
    fontSize: generateTailwindClasses(tokens, themes, 'fontSizes'),
    letterSpacing: generateTailwindClasses(tokens, themes, 'letterSpacing'),
    lineHeight: generateTailwindClasses(tokens, themes, 'lineHeights'),
    spacing: generateTailwindClasses(tokens, themes, 'dimension'),
    color: generateTailwindClasses(tokens, themes, 'color'),
    borderRadius: generateTailwindClasses(tokens, themes, 'borderRadius'),
  };
}

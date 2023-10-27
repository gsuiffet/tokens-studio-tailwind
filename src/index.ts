import { DesignTokens } from 'style-dictionary';
import { program } from './program';
import { generateTailwindClasses } from './sd-utils';

if (require.main === module) {
  program.parse(process.argv);
}

export function getTailwindClasses(tokens: DesignTokens, themes: string[]) {
  return {
    fontSize: generateTailwindClasses(tokens, themes, 'fontSizes'),
    letterSpacing: generateTailwindClasses(tokens, themes, 'letterSpacing'),
    lineHeight: generateTailwindClasses(tokens, themes, 'lineHeights'),
    spacing: generateTailwindClasses(tokens, themes, 'dimension'),
    color: generateTailwindClasses(tokens, themes, 'color'),
    borderRadius: generateTailwindClasses(tokens, themes, 'borderRadius'),
  };
}

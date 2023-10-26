import {DesignTokens} from 'style-dictionary';
import { program } from './program';
import {generateCSSVariables} from "./sd-utils";

if (require.main === module) {
  program.parse(process.argv);
}

export function getCSSVariables(tokens: DesignTokens, themes: string[]) {
  return {
    fontSize: generateCSSVariables(tokens, themes, "fontSizes"),
    letterSpacing: generateCSSVariables(tokens, themes, "letterSpacing"),
    lineHeight: generateCSSVariables(tokens, themes, "lineHeights"),
    spacing: generateCSSVariables(tokens, themes, "dimension"),
    color: generateCSSVariables(tokens, themes, "color"),
    borderRadius: generateCSSVariables(tokens, themes, "borderRadius")
  }
}

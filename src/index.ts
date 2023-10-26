import * as commander from 'commander';
import * as fs from 'fs';
import {createStyles} from './sd.config'
import {DesignToken, DesignTokens} from 'style-dictionary';
import {kebabCase} from "lodash";

const program = new commander.Command();

program
  .option('-j, --json <path>', 'Path to the JSON design tokens')
  .option('-t, --themes <themes>', 'Design tokens themes (e.g., "global, dark")')
  .action(({themes, json}) => {
    const formattedThemes = themes ? themes.split(",").map((theme: string) => theme.trim()) : ['global'];
    const indexCSSData = `${formattedThemes.map((theme: string) =>
      `@import './sd-${theme}.css';\n@import './sd-base-typography-${theme}.css';\n@import './sd-component-typography-${theme}.css';\n`
    ).join('')}`
      try {
        if (!fs.existsSync('./sd-output')){
          fs.mkdirSync('./sd-output');
        }
        fs.writeFileSync('./sd-output/index.css', indexCSSData)
        const data = fs.readFileSync(json, 'utf8')
        const designTokens = JSON.parse(data)
        createStyles(designTokens, formattedThemes)
      } catch (err) {
        throw new Error(`Unexpected error: ${err}`)
      }
  })
  .parse(process.argv)

function generateCSSVariables(tokens: DesignTokens, themes = ['global'], type: string) {
  const cssVariables: Record<string, string> = {};
  function processNode(node: DesignTokens | DesignToken, currentPrefix = "") {
    for (const key in node) {
      if (node.hasOwnProperty(key)) {
        const currentKey = `${currentPrefix}${key}`;
        if (typeof node[key] === "object" && node[key].type !== type) {
          processNode(node[key], `${currentKey}-`);
        } else if (node[key].type === type) {
          cssVariables[`sd-${kebabCase(currentKey)}`] = `var(--${kebabCase(currentKey)})`;
        }
      }
    }
  }
  themes.forEach((theme) => {
    const themeNode = tokens[theme]
    if (themeNode) {
      processNode(themeNode)
    }
  })
  return cssVariables;
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

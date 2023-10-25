import * as commander from 'commander';
import * as fs from 'fs';
import {createStyles} from './sd.config'
import {kebabCase} from "lodash";

export type DesignTokens = {
  [key: string]: {};
};

const program = new commander.Command();

program
  .option('-j, --json <path>', 'Path to the JSON design tokens')
  .option('-t, --themes <themes>', 'Design tokens themes (e.g., "global, dark")')
  .action((options) => {
    if (options.json) {
      fs.readFile(options.json, 'utf8', (err, data) => {
        if (err) {
          console.log('Error when reading the JSON file: ', err)
        } else {
          const designTokens = JSON.parse(data)
          const themes =  options.themes.split(",").map((theme: string) => theme.trim())
          createStyles(designTokens, themes)
        }
      })
    }
  })
  .parse(process.argv)

function generateCSSVariables(tokens: DesignTokens, themes: string[], type: string) {
  const cssVariables = {};
  function processNode(node, currentPrefix = "") {
    for (const key in node) {
      const currentKey = `${currentPrefix}${key}`;
      if (typeof node[key] === "object" && node[key].type !== type) {
        processNode(node[key], `${currentKey}-`);
      } else if (node[key].type === type) {
        cssVariables[`sd-${kebabCase(currentKey)}`] = `var(--${kebabCase(currentKey)})`;
      }
    }
  }
  themes.forEach((theme) => {
    processNode(tokens[theme])
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

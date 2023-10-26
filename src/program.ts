import * as commander from "commander";
import fs from "fs";
import {createStyles} from "./sd.config";

const program = new commander.Command();

program
  .option('-j, --json <path>', 'Path to the JSON design tokens')
  .option('-t, --themes <themes>', 'Design tokens themes (e.g., "global, dark")')
  .action(({themes, json}) => {
    const formattedThemes = themes ? themes.split(",").map((theme: string) => theme.trim()) : ['global'];
    const indexCSSData = `${formattedThemes.map((theme: string) =>
      `@import './sd-${theme}.css';\n@import './sd-base-typography-${theme}.css';\n@import './sd-component-typography-${theme}.css';\n`
    ).join('')}`
    if (json) {
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
    } else {
      throw new Error('Missing design tokens path')
    }
  })

export { program };

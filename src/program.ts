import * as commander from 'commander';
import { MISSING_DESIGN_TOKEN_PATH, MISSING_GLOBAL_THEME } from './utils';
import fs from 'fs';
import { createStyles } from './sd.config';
import path from 'path';
import { merge } from 'lodash';
import { SD_OUTPUT_DIRECTORY_PATH } from './types';

const program = new commander.Command();

program
  .option('-j, --json <path>', 'Path to the JSON design tokens')
  .option('-t, --themes <themes>', 'Design tokens themes (e.g., "global, dark")')
  .action(({ themes, json }) => {
    const formattedThemes = themes
      ? themes.split(',').map((theme: string) => theme.trim())
      : ['global'];
    if (!formattedThemes.includes('global')) throw new Error(MISSING_GLOBAL_THEME);
    if (!json) throw new Error(MISSING_DESIGN_TOKEN_PATH);
    if (json) {
      try {
        const data = fs.readFileSync(json, 'utf8');
        const designTokens = JSON.parse(data);
        createStyles(designTokens, formattedThemes);
        const createdFiles = fs.readdirSync(SD_OUTPUT_DIRECTORY_PATH);
        const CSSFiles = createdFiles.filter(
          (file) => file !== 'index.css' && path.extname(file) === '.css',
        );
        const JSONFiles = createdFiles.filter(
          (file) => file !== 'tw-tokens.json' && path.extname(file) === '.json',
        );
        fs.writeFileSync(
          './sd-output/index.css',
          CSSFiles.map((file) => `@import './${file}';`).join('\n'),
        );
        let mergedTailwindClasses = {};
        JSONFiles.forEach((file) => {
          const themeTokens = JSON.parse(fs.readFileSync(`./sd-output/${file}`, 'utf8'));
          mergedTailwindClasses = merge(mergedTailwindClasses, themeTokens);
        });
        fs.writeFileSync(
          './sd-output/tw-tokens.json',
          JSON.stringify(mergedTailwindClasses, null, 2),
        );
      } catch (error) {
        throw new Error(`Unexpected error: ${error}`);
      }
    }
  });

export { program };

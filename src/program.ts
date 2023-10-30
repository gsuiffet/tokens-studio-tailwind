import * as commander from 'commander';
import fs from 'fs';
import { createStyles } from './sd.config';
import { ErrorMissingGlobalTheme } from '../utils/error';
import { sdOutputDirectoryPath } from '../utils/constants';

const program = new commander.Command();

program
  .option('-j, --json <path>', 'Path to the JSON design tokens')
  .option('-t, --themes <themes>', 'Design tokens themes (e.g., "global, dark")')
  .action(({ themes, json }) => {
    const formattedThemes = themes
      ? themes.split(',').map((theme: string) => theme.trim())
      : ['global'];
    if (!formattedThemes.includes('global')) {
      throw new Error(ErrorMissingGlobalTheme);
    }
    if (json) {
      try {
        const data = fs.readFileSync(json, 'utf8');
        const designTokens = JSON.parse(data);
        createStyles(designTokens, formattedThemes);
        const createdFiles = fs.readdirSync(sdOutputDirectoryPath);
        fs.writeFileSync(
          './sd-output/index.css',
          `${createdFiles.map((createdFile) => `@import './${createdFile}';\n`).join('')}`,
        );
      } catch (error) {
        throw new Error(`Unexpected error: ${error}`);
      }
    } else {
      throw new Error('Missing design tokens path');
    }
  });

export { program };

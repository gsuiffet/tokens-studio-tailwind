import StyleDictionary, { DesignTokens, formatHelpers } from 'style-dictionary';
import { getTailwindVariables } from './tailwindVariables';
import {
  MANDATORY_THEME,
  ROOT_CSS,
  SD_OUTPUT_DIRECTORY_PATH,
  TW_LAYER_BASE,
  TW_LAYER_COMPONENT,
} from './types';
import { baseTypographyConfig, componentsConfig, variablesConfig } from './configs';
import { componentsTemplate, CSSVariableTemplate } from './templates';

const { fileHeader } = formatHelpers;

StyleDictionary.registerFormat({
  name: 'tw/format',
  formatter: ({ dictionary: { allProperties } }) => getTailwindVariables(allProperties),
});

StyleDictionary.registerFormat({
  name: 'base/format',
  formatter: (arg) => {
    const theme = arg.file.options!.theme;
    const rootSelector = theme === MANDATORY_THEME ? ROOT_CSS : `.${theme}`;

    const { type, ...rest } = baseTypographyConfig;
    const typography = `  /* ${type} */\n${componentsTemplate({ arg, ...rest })}`;

    const formattedProperties = variablesConfig
      .map(({ type, ...rest }) => `    /* ${type} */\n${CSSVariableTemplate({ arg, ...rest })}`)
      .join('\n');

    const formattedContent = `${typography}  ${rootSelector} {\n${formattedProperties}\n  }\n`;

    return `${fileHeader({
      file: { destination: arg.file.destination },
    })}@layer ${TW_LAYER_BASE} {\n${formattedContent}}`;
  },
});

StyleDictionary.registerFormat({
  name: 'components/format',
  formatter: (arg) => {
    const prefixSelector = '.';
    const formattedProperties = componentsConfig
      .map(
        ({ type, ...rest }) =>
          `  /* ${type} */\n${componentsTemplate({ arg, ...rest, prefixSelector })}`,
      )
      .join('');
    return `${fileHeader({
      file: { destination: arg.file.destination },
    })}@layer ${TW_LAYER_COMPONENT} {\n${formattedProperties}}`;
  },
});

function getStyleDictionaryConfig(designTokens: DesignTokens, theme: string) {
  return {
    tokens: designTokens[theme],
    platforms: {
      json: {
        transforms: ['attribute/cti', 'name/cti/kebab'],
        buildPath: `${SD_OUTPUT_DIRECTORY_PATH}/`,
        files: [
          {
            destination: `tw-${theme}.json`,
            format: 'tw/format',
          },
        ],
      },
      css: {
        transforms: ['attribute/cti', 'name/cti/kebab'],
        buildPath: `${SD_OUTPUT_DIRECTORY_PATH}/`,
        files: [
          {
            destination: `base-${theme}.css`,
            format: 'base/format',
            options: { theme },
          },
          {
            destination: `components-${theme}.css`,
            format: 'components/format',
            options: { theme },
          },
        ],
      },
    },
  };
}

export function createStyles(designTokens: DesignTokens, themes: string[]) {
  themes.forEach((theme) => {
    StyleDictionary.extend(getStyleDictionaryConfig(designTokens, theme)).buildAllPlatforms();
  });
}

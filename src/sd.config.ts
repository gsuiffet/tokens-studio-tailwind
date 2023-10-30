import StyleDictionary, { formatHelpers, TransformedToken, DesignTokens } from 'style-dictionary';
import { getTypographyClass } from './sd-utils';
import {
  cssVariables,
  cssVariablesBaseTypography,
  htmlElementTypography,
  sdOutputDirectory,
} from '../utils/constants';
const { fileHeader } = formatHelpers;

StyleDictionary.registerFormat({
  name: 'baseTypography/format',
  formatter: ({ dictionary: { allProperties }, file, file: { packageName } }) => {
    return `${fileHeader({ file })}@layer base {\n${allProperties
      .filter(({ name, type }) => type === 'typography' && htmlElementTypography.includes(name))
      .map(({ name, original: { value } }) =>
        getTypographyClass(name, value, packageName as string, allProperties),
      )
      .join('')}}`;
  },
});

StyleDictionary.registerFormat({
  name: 'componentTypography/format',
  formatter: ({ dictionary: { allProperties }, file, file: { packageName } }) => {
    return `${fileHeader({ file })}@layer components {\n${allProperties
      .filter(({ name, type }) => type === 'typography' && !htmlElementTypography.includes(name))
      .map(({ name, original: { value } }) =>
        getTypographyClass(`.${name}`, value, packageName as string, allProperties),
      )
      .join('')}}`;
  },
});

StyleDictionary.registerTransform({
  name: 'sizes/px/em',
  type: 'value',
  matcher: ({ type }) => cssVariables.includes(type),
  transformer: ({ original: { value, type } }) => {
    if (type === 'color') {
      return value;
    }
    if (value.endsWith('%')) {
      return String(`${Number(value.replace('%', '') / 100)}em`); // 1% = 0.01 em;
    }
    if (!value.endsWith('px')) {
      return `${value}px`;
    }
    return value;
  },
});

StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: ({ dictionary, file, file: { packageName } }) => {
    return `${fileHeader({ file })}@layer base {\n  ${packageName} {\n${dictionary.allProperties
      .map(
        ({ name, value }) =>
          `    --${name}: ${value}${packageName !== ':root' ? ' !important' : ''};`,
      )
      .join('\n')}
  }\n}`;
  },
});

function getStyleDictionaryConfig(designTokens: DesignTokens, theme: string) {
  return {
    tokens: designTokens[theme],
    platforms: {
      css: {
        transforms: ['attribute/cti', 'name/cti/kebab', 'sizes/px/em'],
        buildPath: sdOutputDirectory,
        files: [
          {
            destination: `sd-${theme}.css`,
            format: 'css/variables',
            packageName: `${theme === 'global' ? ':root' : `.${theme}`}`,
            filter: (prop: TransformedToken) => cssVariables.includes(prop.type),
          },
          {
            destination: `sd-base-typography-${theme}.css`,
            format: 'baseTypography/format',
            packageName: `${theme === 'global' ? '' : `${theme}:`}`,
            filter: (prop: TransformedToken) => cssVariablesBaseTypography.includes(prop.type),
          },
          {
            destination: `sd-component-typography-${theme}.css`,
            format: 'componentTypography/format',
            packageName: `${theme === 'global' ? '' : `${theme}:`}`,
            filter: (prop: TransformedToken) => cssVariablesBaseTypography.includes(prop.type),
          },
        ],
      },
    },
  };
}

export function createStyles(designTokens: DesignTokens, themes: string[]) {
  themes.map((theme) => {
    StyleDictionary.extend(getStyleDictionaryConfig(designTokens, theme)).buildPlatform('css');
  });
}

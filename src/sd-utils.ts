import { DesignToken, DesignTokens, TransformedToken } from 'style-dictionary';
import { kebabCase } from 'lodash';
import {
  textCasePossibleValues,
  textDecorationPossibleValues,
  fontWeights,
} from '../utils/constants';

function getVariable(variable: string) {
  return kebabCase(variable.replace(/[{}]/g, '').replace('.', '-'));
}

function getProperty(allProperties: TransformedToken[], selectedProperty: string) {
  return allProperties.find(
    ({ name }) => selectedProperty && kebabCase(name) === getVariable(selectedProperty),
  );
}

function getPropertyValue<T>(
  packageName: string,
  selectedProperty?: TransformedToken | string,
  prefix = '',
  possibleValues?: { [key: string]: T },
  suffix = '',
) {
  if (selectedProperty && typeof selectedProperty === 'string') {
    return `${packageName}${prefix}${getVariable(selectedProperty)}${suffix}`;
  } else if (selectedProperty && typeof selectedProperty !== 'string') {
    switch (selectedProperty.type) {
      case 'fontWeights': {
        const { value } = selectedProperty;
        const formattedValue = value.replace(' Italic', '');
        const italic = value.includes('Italic') ? `italic` : '';
        return possibleValues && possibleValues[formattedValue]
          ? `${packageName}${prefix}${possibleValues[formattedValue]} ${italic}`
          : '';
      }
      case 'fontFamilies':
        return `${packageName}${prefix}${selectedProperty.value}`;
      default:
        return typeof selectedProperty.value === 'string' &&
          possibleValues &&
          possibleValues[selectedProperty.value]
          ? `${packageName}${prefix}${possibleValues[selectedProperty.value]}`
          : '';
    }
  } else {
    return '';
  }
}

export function getTypographyClass(
  name: string,
  value: DesignToken,
  packageName: string,
  allProperties: TransformedToken[],
) {
  const {
    fontSize,
    letterSpacing,
    lineHeight,
    paragraphIndent,
    textCase,
    textDecoration,
    fontFamily,
    fontWeight,
  } = value;
  const caseProperty = getProperty(allProperties, textCase);
  const decorationProperty = getProperty(allProperties, textDecoration);
  const fontWeightProperty = getProperty(allProperties, fontWeight);
  const fontFamilyProperty = getProperty(allProperties, fontFamily);
  const className =
    `${getPropertyValue(packageName, fontWeightProperty, 'font-', fontWeights)} ` +
    `${getPropertyValue(packageName, fontFamilyProperty, 'font-')} ` +
    `${getPropertyValue(packageName, caseProperty, undefined, textCasePossibleValues)} ` +
    `${getPropertyValue(packageName, decorationProperty, '', textDecorationPossibleValues)} ` +
    `${getPropertyValue(packageName, fontSize, 'text-sd-')} ` +
    `${getPropertyValue(packageName, letterSpacing, 'tracking-sd-')} ` +
    `${getPropertyValue(packageName, lineHeight, 'leading-sd-')} ` +
    `${getPropertyValue(packageName, paragraphIndent, 'pl-[--', undefined, ']')} `;
  return `  ${name} {\n    @apply ${className};\n  }\n`;
}

export function generateTailwindClasses(tokens: DesignTokens, themes: string[], type: string) {
  const cssVariables: Record<string, string> = {};
  function processNode(node: DesignTokens | DesignToken, currentPrefix = '') {
    for (const key in node) {
      if (typeof node === 'object' && node[key]) {
        const currentKey = `${currentPrefix}${key}`;
        if (node[key].type !== type) {
          processNode(node[key], `${currentKey}-`);
        } else if (node[key].type === type) {
          cssVariables[`sd-${kebabCase(currentKey)}`] = `var(--${kebabCase(currentKey)})`;
        }
      }
    }
  }
  themes.forEach((theme) => {
    const themeNode = tokens[theme];
    if (themeNode) {
      processNode(themeNode);
    }
  });
  return cssVariables;
}

import StyleDictionary, {formatHelpers, TransformedToken} from 'style-dictionary';
import {DesignTokens} from './'
import {kebabCase} from 'lodash';
const { fileHeader } = formatHelpers;

const cssVariables = ['letterSpacing', 'fontSizes', 'dimension', 'lineHeights', 'color', 'borderRadius'];
const cssVariablesForBaseElement = [
  'textCase',
  'textDecoration',
  'typography',
  'fontWeights',
  'fontFamilies',
];
const htmlBaseElement = [
  'h1',
  'h2',
  'h3',
  'h4',
  'p',
  'li',
  'a',
  'blockquote',
  'button',
  'th',
  'td',
  'code',
  'small',
];

const textCasePossibleValues = {
  none: 'normal-case',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
};
const textDecorationPossibleValues = {
  none: 'no-underline',
  underline: 'underline',
  'line-through': 'line-through',
};
const fontWeights = {
  Thin: 'thin',
  'Extra Light': 'extralight',
  Light: 'light',
  Regular: 'normal',
  Medium: 'medium',
  'Semi Bold': 'semibold',
  Bold: 'bold',
  'Extra Bold': 'extrabold',
  Black: 'black',
};
function getVariable(variable: string) {
  return kebabCase(variable.replace(/[{}]/g, '').replace('.', '-'));
}

function getPropertyValue(
  packageName: string,
  selectedProperty: TransformedToken | string,
  prefix: string,
  possibleValues = {},
  suffix = ""
) {
  if (selectedProperty && typeof selectedProperty === "string") {
    return `${packageName}${prefix}${getVariable(selectedProperty)}${suffix}`
  } else if (selectedProperty && typeof selectedProperty !== "string") {
    switch (selectedProperty.type) {
      case 'fontWeights':
        const formattedValue = selectedProperty.value.replace(' Italic', '')
        const italic = selectedProperty.value.includes('Italic') ? `italic` : ''
        return possibleValues[formattedValue]
          ? `${packageName}${prefix}${possibleValues[formattedValue]} ${italic}`
          : ""
      case 'fontFamilies':
        return `${packageName}${prefix}${selectedProperty.value}`
      default:
        return possibleValues[selectedProperty.value]
          ? `${packageName}${prefix}${possibleValues[selectedProperty.value]}`
          : ""
    }
  } else {
    return ""
  }
}

function getProperty(allProperties: TransformedToken[], selectedProperty: string) {
  return allProperties.find(
    ({ name }) => selectedProperty && kebabCase(name) === getVariable(selectedProperty),
  )
}

StyleDictionary.registerFormat({
  name: 'baseElement/format',
  formatter: ({ dictionary: {allProperties}, file, file: {packageName} }) => {
    return `${fileHeader({ file })}@layer base {\n${allProperties
      .filter(({ name }) => htmlBaseElement.includes(name))
      .map(({ name, original: { value } }) => {
        const {fontSize, letterSpacing, lineHeight, paragraphIndent, textCase, textDecoration, fontFamily, fontWeight} = value;
        const caseProperty = getProperty(allProperties, textCase);
        const decorationProperty = getProperty(allProperties, textDecoration)
        const fontWeightProperty = getProperty(allProperties, fontWeight)
        const fontFamilyProperty = getProperty(allProperties, fontFamily)
        const className =
          `${getPropertyValue(packageName, fontWeightProperty, 'font-', fontWeights)} ` +
          `${getPropertyValue(packageName, fontFamilyProperty, 'font-')} ` +
          `${getPropertyValue(packageName, caseProperty, "", textCasePossibleValues)} ` +
          `${getPropertyValue(packageName, decorationProperty, "", textDecorationPossibleValues)} ` +
          `${getPropertyValue(packageName, fontSize, 'text-sd-')} ` +
          `${getPropertyValue(packageName, letterSpacing, 'tracking-sd-')} ` +
          `${getPropertyValue(packageName, lineHeight, 'leading-sd-')} ` +
          `${getPropertyValue(packageName, paragraphIndent, 'pl-[--', undefined, ']')} `;
        return `  ${name} {\n    @apply ${className};\n  }\n`;
      })
      .join('')}}`;
  },
});

StyleDictionary.registerTransform({
  name: 'sizes/px/em',
  type: 'value',
  matcher: ({ type }) => cssVariables.includes(type),
  transformer: ({ original: { value, type } }) => {
    if (type === 'color') {
      return value
    }
    if (value.endsWith('%')) {
      return String(`${Number(value.replace('%', '') / 100)}em`) // 1% = 0.01 em;
    }
    if (!value.endsWith('px')) {
      return `${value}px`;
    }
    return value;
  },
});

StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: ({ dictionary, file, file: {packageName} }) => {
    return `${fileHeader({ file })}@layer base {\n  ${
      packageName
    } {\n${dictionary.allProperties.map(({ name, value }) => `    --${name}: ${value};`).join('\n')}
  }\n}`;
  },
});

function getStyleDictionaryConfig(designTokens: DesignTokens, theme: string ) {
  return {
    tokens: designTokens[theme],
    platforms: {
      css: {
        transforms: ['attribute/cti', 'name/cti/kebab', 'sizes/px/em'],
        buildPath: `sd-output/`,
        files: [
          {
            destination: `sd-${theme}.css`,
            format: 'css/variables',
            packageName: `${theme === 'global' ? ':root' : `.${theme}`}`,
            filter: ({type}) => cssVariables.includes(type),
          },
          {
            destination: `sd-base-element-${theme}.css`,
            format: 'baseElement/format',
            packageName: `${theme === 'global' ? '' : `${theme}:`}`,
            filter: ({type}) => cssVariablesForBaseElement.includes(type),
          },
          //todo if not in base create class component ?
        ],
      },
    },
  };
}

export function createStyles<T>(designTokens: DesignTokens, themes: string[] ) {
  themes.map((theme) => {
    StyleDictionary.extend(getStyleDictionaryConfig(designTokens, theme)).buildPlatform('css');
  });
}

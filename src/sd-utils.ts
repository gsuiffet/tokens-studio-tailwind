import {kebabCase} from 'lodash';



const tokens = require('../tokens/tokens.json');
const themes = ['global', 'dark'];

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

const cssVariables = ['letterSpacing', 'fontSizes', 'dimension', 'lineHeights', 'color', 'borderRadius'];

const cssVariablesForBaseElement = [
  'textCase',
  'textDecoration',
  'typography',
  'fontWeights',
  'fontFamilies',
];

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

const textDecorationPossibleValues = {
  none: 'no-underline',
  underline: 'underline',
  'line-through': 'line-through',
};

const textCasePossibleValues = {
  none: 'normal-case',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
};

function getVariable(variable) {
  return kebabCase(variable.replace(/[{}]/g, '').replace('.', '-'));
}

// function generateCSSVariables(type) {
//   const cssVariables = {};
//   function processNode(node, currentPrefix = "") {
//     for (const key in node) {
//       const currentKey = `${currentPrefix}${key}`;
//       if (typeof node[key] === "object" && node[key].type !== type) {
//         processNode(node[key], `${currentKey}-`);
//       } else if (node[key].type === type) {
//         cssVariables[`sd-${kebabCase(currentKey)}`] = `var(--${kebabCase(currentKey)})`;
//       }
//     }
//   }
//   themes.forEach((theme) => {
//     processNode(tokens[theme])
//   })
//   return cssVariables;
// }

module.exports = {
  themes,
  htmlBaseElement,
  fontWeights,
  textDecorationPossibleValues,
  textCasePossibleValues,
  cssVariables,
  cssVariablesForBaseElement,
  getVariable,
  // generateCSSVariables,
};

import { ConfigType, TailwindUtilityTypes } from '../types';
import { TokenTypes } from '@tokens-studio/types';
import { getColorValue, getShadowValue, getSizeValue } from '../CSSVariables';
import { getTypographyValue } from '../CSSComponents';
import { isBackgroundImage, isValidHTMLElement } from '../utils';

const {
  LINE_HEIGHTS,
  FONT_SIZES,
  LETTER_SPACING,
  BORDER_WIDTH,
  OPACITY,
  DIMENSION,
  TYPOGRAPHY,
  COLOR,
  BOX_SHADOW,
  SIZING,
} = TokenTypes;

const {
  TW_SPACING,
  TW_OPACITY,
  TW_BORDER_WIDTH,
  TW_LETTER_SPACING,
  TW_FONT_SIZE,
  TW_LINE_HEIGHT,
  TW_COLOR,
  TW_BOX_SHADOW,
  TW_BACKGROUND_IMAGE,
} = TailwindUtilityTypes;

export const variablesConfig: ConfigType[] = [
  {
    type: TW_SPACING,
    fn: (property) => getSizeValue(property),
    filter: (property) => [SIZING, DIMENSION].includes(property.type),
  },
  {
    type: TW_OPACITY,
    fn: (property) => getSizeValue(property),
    filter: (property) => property.type === OPACITY,
  },
  {
    type: TW_BORDER_WIDTH,
    fn: (property) => getSizeValue(property),
    filter: (property) => property.type === BORDER_WIDTH,
  },
  {
    type: TW_LETTER_SPACING,
    fn: (property) => getSizeValue(property),
    filter: (property) => property.type === LETTER_SPACING,
  },
  {
    type: TW_FONT_SIZE,
    fn: (property) => getSizeValue(property),
    filter: (property) => property.type === FONT_SIZES,
  },
  {
    type: TW_LINE_HEIGHT,
    fn: (property) => getSizeValue(property),
    filter: (property) => property.type === LINE_HEIGHTS,
  },
  {
    type: TW_COLOR,
    fn: (property) => getColorValue(property),
    filter: (property) => property.type === COLOR && !isBackgroundImage(property.value),
  },
  {
    type: TW_BACKGROUND_IMAGE,
    fn: (property) => getColorValue(property),
    filter: (property) => property.type === COLOR && isBackgroundImage(property.value),
  },
  {
    type: TW_BOX_SHADOW,
    fn: (property) => getShadowValue(property),
    filter: (property) => property.type === BOX_SHADOW,
  },
];

export const baseTypographyConfig: ConfigType = {
  type: TYPOGRAPHY,
  fn: (property) => getTypographyValue(property),
  filter: ({ name, type }) => type === TYPOGRAPHY && isValidHTMLElement(name),
};

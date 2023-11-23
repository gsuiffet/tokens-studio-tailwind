import { groupBy, kebabCase } from 'lodash';
import { TransformedToken } from 'style-dictionary';
import { TokenTypes } from '@tokens-studio/types';
import { TailwindUtilityTypes } from './types';
import { isBackgroundImage } from './utils';

const { SPACING, FONT_SIZES, LINE_HEIGHTS, SIZING, DIMENSION, COLOR } = TokenTypes;

const {
  TW_SPACING,
  TW_OPACITY,
  TW_BORDER_WIDTH,
  TW_BACKGROUND_IMAGE,
  TW_COLOR,
  TW_BOX_SHADOW,
  TW_LINE_HEIGHT,
  TW_FONT_SIZE,
  TW_LETTER_SPACING,
} = TailwindUtilityTypes;

function getProperties(allProperties: TransformedToken[]) {
  const allowedKeys = [
    TW_SPACING,
    TW_OPACITY,
    TW_BORDER_WIDTH,
    TW_BACKGROUND_IMAGE,
    TW_COLOR,
    TW_BOX_SHADOW,
    TW_LINE_HEIGHT,
    TW_FONT_SIZE,
    TW_LETTER_SPACING,
  ];
  return allProperties.reduce((result, property) => {
    const { type, value } = property;
    if (type === SPACING) return result; // spacing token is a componentMultipleSize
    if (type === FONT_SIZES) property.type = TW_FONT_SIZE;
    if (type === LINE_HEIGHTS) property.type = TW_LINE_HEIGHT;
    if (type === SIZING) property.type = TW_SPACING;
    if (type === DIMENSION) property.type = TW_SPACING;
    if (type === COLOR && isBackgroundImage(value)) property.type = TW_BACKGROUND_IMAGE;
    if (allowedKeys.includes(property.type)) {
      return [...result, property];
    } else {
      return result;
    }
  }, [] as TransformedToken[]);
}

export function getTailwindVariables(allProperties: TransformedToken[]) {
  const properties = getProperties(allProperties);
  const groupedProperties = groupBy(properties, 'type');
  const propertyKeys = Object.keys(groupedProperties);

  return JSON.stringify(
    propertyKeys.reduce(
      (result, key) => {
        const propertiesForKey = groupedProperties[key];
        if (propertiesForKey) {
          result[key] = propertiesForKey.reduce(
            (subResult: Record<string, string>, { path }) => {
              const value = kebabCase(path.join('-'));
              subResult[`sd-${value}`] = `var(--${value})`;
              return subResult;
            },
            {} as Record<string, string>,
          );
        }
        return result;
      },
      {} as Record<string, Record<string, string>>,
    ),
    null,
    2,
  );
}

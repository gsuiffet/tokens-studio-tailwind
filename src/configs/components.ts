import { TokenTypes } from '@tokens-studio/types';
import { getBorderValue, getMultipleSizeValue, getTypographyValue } from '../CSSComponents';
import { ConfigType } from '../types';
import { isValidHTMLElement } from '../utils';

const { TYPOGRAPHY, BORDER, BORDER_RADIUS, SPACING } = TokenTypes;

export const componentsConfig: ConfigType[] = [
  {
    type: TYPOGRAPHY,
    fn: (property) => getTypographyValue(property),
    filter: ({ name, type }) => type === TYPOGRAPHY && !isValidHTMLElement(name),
  },
  {
    type: BORDER,
    fn: (property) => getBorderValue(property),
    filter: (property) => property.type === BORDER,
  },
  {
    type: BORDER_RADIUS,
    fn: (property) => getMultipleSizeValue(property),
    filter: (property) => property.type === BORDER_RADIUS,
  },
  {
    type: SPACING,
    fn: (property) => getMultipleSizeValue(property),
    filter: (property) => property.type === SPACING,
  },
];

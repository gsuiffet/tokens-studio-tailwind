import {
  MISSING_MANDATORY_VALUE,
  throwErrorIfUnitIsNotAllowed,
  transformEm,
  transformValueIfNeeded,
} from '../utils';
import { TransformedToken } from 'style-dictionary';
import {
  TokenBoxshadowValue,
  BoxShadowTypes,
  BoxShadowValues,
  TokenTypes,
} from '@tokens-studio/types';
import { TW_INSET_VALUE, UNITS } from '../types';

const { BOX_SHADOW } = TokenTypes;
const { INNER_SHADOW } = BoxShadowTypes;
const { PIXEL, PERCENT, REM, EM } = UNITS;
const { X, Y, BLUR, SPREAD } = BoxShadowValues;

const transformProperty = (
  value: string | number,
  propName: keyof TokenBoxshadowValue,
  tokenType: TokenTypes,
) => {
  const allowedUnits = [PIXEL, PERCENT, REM, EM];
  const defaultUnit = PIXEL;
  const transform = { [UNITS.PERCENT]: (singleValue: string) => transformEm(singleValue) };
  if (value === '') throw new Error(MISSING_MANDATORY_VALUE(tokenType, propName));
  if (!isNaN(Number(value))) {
    return `${value}${defaultUnit}`;
  } else {
    throwErrorIfUnitIsNotAllowed(allowedUnits, { value, type: BOX_SHADOW });
    return transformValueIfNeeded(value as string, transform);
  }
};

function transformBoxShadow(
  { x, y, blur, spread, color, type }: TokenBoxshadowValue,
  tokenType: TokenTypes,
) {
  const transformedX = transformProperty(x, X, tokenType);
  const transformedY = transformProperty(y, Y, tokenType);
  const transformedBlur = blur ? `${transformProperty(blur, BLUR, tokenType)} ` : '';
  const transformedSpread = spread ? `${transformProperty(spread, SPREAD, tokenType)} ` : '';
  return `${
    type === INNER_SHADOW ? `${TW_INSET_VALUE} ` : ''
  }${transformedX} ${transformedY} ${transformedBlur}${transformedSpread}${color}`;
}

type Props =
  | TransformedToken
  | { value: TokenBoxshadowValue | TokenBoxshadowValue[]; type: TokenTypes };

export function getShadowValue({ value, type }: Props): string {
  if (Array.isArray(value)) {
    return value.map((shadow) => transformBoxShadow(shadow, type)).join(', ');
  } else {
    return transformBoxShadow(value, type);
  }
}

import { DesignToken, TransformedToken } from 'style-dictionary';
import { SingleBorderToken, TokenBorderValue, TokenTypes } from '@tokens-studio/types';
import {
  ALLOWED_BORDER_STYLES,
  TailwindClassTypes,
  TokenBorderStyleValue,
  TW_COLOR_DEFAULT_VALUE,
} from '../types';
import { getSizeValue } from '../CSSVariables';
import { VALUE_NOT_ALLOWED } from '../utils';
import { get } from 'lodash';

const { SOLID } = TokenBorderStyleValue;
const { TW_CLS_BORDER } = TailwindClassTypes;
const { BORDER_WIDTH } = TokenTypes;

type Props = TransformedToken | SingleBorderToken;

function getColor(color: string | undefined, original: DesignToken) {
  const isVariable = new RegExp('^{.*}$');
  if (color) {
    return get(original, 'value.color') && isVariable.test(original.value.color)
      ? `sd-${original.value.color.replace(/^\{|}$/g, '')}`
      : `[${color}]`;
  } else {
    return `[${TW_COLOR_DEFAULT_VALUE}]`;
  }
}

export function getBorderValue(token: Props): string[] {
  const { value, type } = token;
  const { original } = token as TransformedToken;
  const { color, width, style } = value as TokenBorderValue;
  if (style && !ALLOWED_BORDER_STYLES.includes(style as TokenBorderStyleValue)) {
    throw new Error(VALUE_NOT_ALLOWED(style, type, ALLOWED_BORDER_STYLES));
  }

  return [
    `${TW_CLS_BORDER}${getColor(color, original)}`,
    `${TW_CLS_BORDER}[${getSizeValue({
      value: width ?? '',
      type: BORDER_WIDTH,
    })}]`,
    `${TW_CLS_BORDER}${style ?? SOLID}`,
  ];
}

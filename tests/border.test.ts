import { getBorderValue } from '../src/CSSComponents';
import { SingleBorderToken, TokenTypes } from '@tokens-studio/types';
import {
  ALLOWED_BORDER_STYLES,
  TailwindClassTypes,
  TokenBorderStyleValue,
  TW_COLOR_DEFAULT_VALUE,
} from '../src/types';
import { VALUE_NOT_ALLOWED } from '../src/utils';
const { BORDER } = TokenTypes;
const { TW_CLS_BORDER } = TailwindClassTypes;
const { SOLID, DASHED } = TokenBorderStyleValue;

describe('getBorderValue function', () => {
  it('should return border values with default style if style is not provided', () => {
    const border = {
      color: '#000000',
      width: '2px',
    };
    const result = getBorderValue({ value: border, type: BORDER } as SingleBorderToken);
    expect(result).toEqual([
      `${TW_CLS_BORDER}[#000000]`,
      `${TW_CLS_BORDER}[2px]`,
      `${TW_CLS_BORDER}${SOLID}`,
    ]);
  });

  it('should return border values with provided style if it is allowed', () => {
    const border = {
      color: '#FF0000',
      width: '1rem',
      style: 'dashed',
    };
    const result = getBorderValue({ value: border, type: BORDER } as SingleBorderToken);
    expect(result).toEqual([
      `${TW_CLS_BORDER}[#FF0000]`,
      `${TW_CLS_BORDER}[1rem]`,
      `${TW_CLS_BORDER}${DASHED}`,
    ]);
  });

  it('should return border values with default cls', () => {
    const border = {
      style: 'dashed',
    };
    const result = getBorderValue({ value: border, type: BORDER } as SingleBorderToken);
    expect(result).toEqual([
      `${TW_CLS_BORDER}[${TW_COLOR_DEFAULT_VALUE}]`,
      `${TW_CLS_BORDER}[0px]`,
      `${TW_CLS_BORDER}${DASHED}`,
    ]);
  });

  it('should throw an error for disallowed border style', () => {
    const border = {
      color: '#000000',
      width: '2px',
      style: 'invalid_style',
    };
    expect(() => {
      getBorderValue({ value: border, type: BORDER } as SingleBorderToken);
    }).toThrowError(VALUE_NOT_ALLOWED('invalid_style', BORDER, ALLOWED_BORDER_STYLES));
  });
});

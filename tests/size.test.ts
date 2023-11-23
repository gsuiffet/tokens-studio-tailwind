import { getSizeValue } from '../src/CSSVariables';
import { TokenTypes } from '@tokens-studio/types';
import { sizesConfig } from '../src/CSSVariables/size/config';
import { CONFIG_NOT_FOUND } from '../src/utils';

const { FONT_SIZES, LINE_HEIGHTS, LETTER_SPACING, BORDER_WIDTH } = TokenTypes;

describe('getSizeValue function', () => {
  it('should return default FONT_SIZES value if value is an empty string', () => {
    const defaultValue = sizesConfig[FONT_SIZES]?.defaultValue;
    const result = getSizeValue({ value: '', type: FONT_SIZES });
    expect(result).toEqual(defaultValue);
  });

  it('should return FONT_SIZES value with default unit if value is a number', () => {
    const defaultUnit = sizesConfig[FONT_SIZES]?.defaultUnit;
    const result = getSizeValue({ value: '12', type: FONT_SIZES });
    expect(result).toEqual(`12${defaultUnit}`);
  });

  it('should throw an error if type is not found in config', () => {
    expect(() => {
      getSizeValue({ value: '10', type: 'INVALID_TYPE' as TokenTypes });
    }).toThrowError(`${CONFIG_NOT_FOUND('INVALID_TYPE' as TokenTypes)}`);
  });

  it('should throw an error in case of the unit is not allowed', () => {
    expect(() => {
      getSizeValue({ value: '10FAKE_UNIT', type: LINE_HEIGHTS });
    }).toThrowError(`10FAKE_UNIT can't be defined as a unit for ${LINE_HEIGHTS}`);
  });

  it('should transform LETTER_SPACING value with % unit to em', () => {
    const result = getSizeValue({ value: '1%', type: LETTER_SPACING });
    expect(result).toEqual('0.01em');
  });

  it('should transform BORDER_WIDTH value with % unit to em', () => {
    const result = getSizeValue({ value: '1%', type: BORDER_WIDTH });
    expect(result).toEqual('0.01em');
  });
});

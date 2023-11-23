import { getMappedValue } from '../src/CSSVariables';
import { TokenTextCaseValue, TokenTextDecorationValue, TokenTypes } from '@tokens-studio/types';
import {
  TailwindFontWeight,
  TailwindTextCase,
  TailwindTextDecoration,
  TokenFontWeightValue,
  TW_ITALIC_VALUE,
} from '../src/types';
import { CONFIG_NOT_FOUND, VALUE_NOT_ALLOWED } from '../src/utils';
import { mappedValueConfig } from '../src/CSSVariables/mappedValue/config';

const { FONT_WEIGHTS, TEXT_CASE, TEXT_DECORATION } = TokenTypes;
const { MEDIUM, BOLD } = TailwindFontWeight;
const { NO_UNDERLINE } = TailwindTextDecoration;
const { NORMAL_CASE } = TailwindTextCase;
describe('getMappedValue function', () => {
  it('should return default FONT_WEIGHTS value if input value is undefined', () => {
    const result = getMappedValue({ value: undefined, type: FONT_WEIGHTS });
    expect(result).toEqual(MEDIUM);
  });

  it('should return mapped FONT_WEIGHTS value for allowed input', () => {
    const result = getMappedValue({ value: 'Bold', type: FONT_WEIGHTS });
    expect(result).toEqual(`${BOLD} `);
  });

  it('should return mapped FONT_WEIGHTS value for FONT_WEIGHTS with Italic', () => {
    const result = getMappedValue({ value: 'Bold Italic', type: FONT_WEIGHTS });
    expect(result).toEqual(`${BOLD} ${TW_ITALIC_VALUE}`);
  });

  it('should return default TEXT_CASE value if input value is undefined', () => {
    const result = getMappedValue({ value: undefined, type: TEXT_CASE });
    expect(result).toEqual(NORMAL_CASE);
  });

  it('should return default TEXT_CASE value if input value is undefined', () => {
    const result = getMappedValue({ value: undefined, type: TEXT_CASE });
    expect(result).toEqual(NORMAL_CASE);
  });

  it('should return mapped TEXT_CASE value for allowed input', () => {
    const result = getMappedValue({ value: 'none', type: TEXT_CASE });
    expect(result).toEqual(NORMAL_CASE);
  });

  it('should return default TEXT_DECORATION value if input value is undefined', () => {
    const result = getMappedValue({ value: undefined, type: TEXT_DECORATION });
    expect(result).toEqual(NO_UNDERLINE);
  });

  it('should return mapped TEXT_DECORATION value for allowed input', () => {
    const result = getMappedValue({ value: 'none', type: TEXT_DECORATION });
    expect(result).toEqual(NO_UNDERLINE);
  });

  it('should throw an error on TEXT_CASE for disallowed input', () => {
    const allowedValues = mappedValueConfig[TEXT_CASE]?.allowedValues;
    expect(() => {
      getMappedValue({ value: 'FAKE_VALUE' as TokenTextCaseValue, type: TEXT_CASE });
    }).toThrowError(VALUE_NOT_ALLOWED('FAKE_VALUE', TEXT_CASE, Object.keys(allowedValues!)));
  });

  it('should throw an error on TEXT_DECORATION for disallowed input', () => {
    const allowedValues = mappedValueConfig[TEXT_DECORATION]?.allowedValues;
    expect(() => {
      getMappedValue({ value: 'FAKE_VALUE' as TokenTextDecorationValue, type: TEXT_DECORATION });
    }).toThrowError(VALUE_NOT_ALLOWED('FAKE_VALUE', TEXT_DECORATION, Object.keys(allowedValues!)));
  });

  it('should throw an error on FONT_WEIGHTS for disallowed input', () => {
    const allowedValues = mappedValueConfig[FONT_WEIGHTS]?.allowedValues;
    expect(() => {
      getMappedValue({ value: 'FAKE_VALUE' as Partial<TokenFontWeightValue>, type: FONT_WEIGHTS });
    }).toThrowError(VALUE_NOT_ALLOWED('FAKE_VALUE', FONT_WEIGHTS, Object.keys(allowedValues!)));
  });

  it('should throw an error if type is not found in config', () => {
    expect(() => {
      getMappedValue({ value: 'Bold', type: 'INVALID_TYPE' as TokenTypes });
    }).toThrowError(`${CONFIG_NOT_FOUND('INVALID_TYPE' as TokenTypes)}`);
  });
});

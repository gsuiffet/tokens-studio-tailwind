import { getFontFamilyValue } from '../src/CSSVariables';
import { TokenTypes } from '@tokens-studio/types';
import { MISSING_MANDATORY_VALUE } from '../src/utils';
import { TW_FONT_FAMILY_DEFAULT_VALUE } from '../src/types';
import { TailwindClassTypes } from '../src/types';

const { FONT_FAMILIES } = TokenTypes;
const { TW_CLS_FONT } = TailwindClassTypes;

describe('getFontFamilyValue function', () => {
  it('should throw an error if value is undefined', () => {
    expect(() => getFontFamilyValue({ value: undefined, type: FONT_FAMILIES })).toThrowError(
      MISSING_MANDATORY_VALUE(FONT_FAMILIES),
    );
  });

  it('should return default font family value if value is an empty string', () => {
    const result = getFontFamilyValue({ value: '', type: FONT_FAMILIES });
    expect(result).toEqual(`${TW_CLS_FONT}${TW_FONT_FAMILY_DEFAULT_VALUE}`);
  });

  it('should return value with tw-cls-font prefix if value is provided', () => {
    const result = getFontFamilyValue({ value: 'Arial', type: FONT_FAMILIES });
    expect(result).toEqual(`${TW_CLS_FONT}Arial`);
  });
});

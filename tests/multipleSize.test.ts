import { getMultipleSizeValue } from '../src/CSSComponents';
import { SingleBorderRadiusToken, SingleSpacingToken } from '@tokens-studio/types';
import { TokenTypes } from '@tokens-studio/types';
import { TailwindClassTypes } from '../src/types';
import { CONFIG_NOT_FOUND, WRONG_VALUE } from '../src/utils';

const { BORDER_RADIUS, SPACING } = TokenTypes;

const {
  TW_CLS_ROUNDED,
  TW_CLS_ROUNDED_SS,
  TW_CLS_ROUNDED_EE,
  TW_CLS_ROUNDED_SE,
  TW_CLS_ROUNDED_ES,
  TW_CLS_GAP,
} = TailwindClassTypes;

describe('getMultipleSizeValue function', () => {
  it('should return transformed values for multiple sizes with appropriate tailwind classes', () => {
    const value = '10 20 30';

    const result = getMultipleSizeValue({ value, type: BORDER_RADIUS } as SingleBorderRadiusToken);
    expect(result).toEqual([
      `${TW_CLS_ROUNDED_SS}[10px]`,
      `${TW_CLS_ROUNDED_SE}[20px] ${TW_CLS_ROUNDED_ES}[20px]`,
      `${TW_CLS_ROUNDED_EE}[30px]`,
    ]);
  });

  it('should return transformed single BORDER_RADIUS value for multiple sizes with appropriate tailwind class', () => {
    const value = '10';

    const result = getMultipleSizeValue({ value, type: BORDER_RADIUS } as SingleBorderRadiusToken);
    expect(result).toEqual([`${TW_CLS_ROUNDED}[10px]`]);
  });

  it('should return transformed single SPACING value for multiple sizes with appropriate tailwind class', () => {
    const value = '1%';

    const result = getMultipleSizeValue({ value, type: SPACING } as SingleSpacingToken);
    expect(result).toEqual([`${TW_CLS_GAP}[0.01em]`]);
  });

  it('should throw an error for incorrect values', () => {
    const value = '10 abc 30';

    expect(() => {
      getMultipleSizeValue({ value, type: BORDER_RADIUS } as SingleBorderRadiusToken);
    }).toThrowError("abc can't be defined as a unit for borderRadius");
  });

  it('should throw an error for incorrect number of values', () => {
    const value = '10 10 30 40 50';

    expect(() => {
      getMultipleSizeValue({ value, type: BORDER_RADIUS } as SingleBorderRadiusToken);
    }).toThrowError(WRONG_VALUE(BORDER_RADIUS, value));
  });

  it('should throw an error if type is not found in config', () => {
    const value = '10 20 30';

    expect(() => {
      getMultipleSizeValue({ value, type: 'FAKE_TYPE' as TokenTypes } as SingleBorderRadiusToken);
    }).toThrowError(CONFIG_NOT_FOUND('FAKE_TYPE' as TokenTypes));
  });
});

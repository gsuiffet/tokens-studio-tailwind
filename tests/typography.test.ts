import { getTypographyValue } from '../src/CSSComponents';
import { SingleTypographyToken } from '@tokens-studio/types';
import {
  TailwindClassTypes,
  TailwindFontWeight,
  TailwindTextCase,
  TailwindTextDecoration,
  TW_FONT_FAMILY_DEFAULT_VALUE,
} from '../src/types';

const { TW_CLS_FONT_SIZE, TW_CLS_LETTER_SPACING, TW_CLS_LINE_HEIGHT, TW_CLS_PL, TW_CLS_FONT } =
  TailwindClassTypes;
const { NORMAL_CASE, UPPERCASE } = TailwindTextCase;
const { NO_UNDERLINE, UNDERLINE } = TailwindTextDecoration;
const { MEDIUM } = TailwindFontWeight;

describe('getTypographyValue function', () => {
  it('should return typography values for all properties', () => {
    const typographyValues = {
      fontSize: '16px',
      letterSpacing: '1px',
      lineHeight: '1.5',
      paragraphIndent: '20px',
      textCase: 'uppercase',
      textDecoration: 'underline',
      fontWeight: 'Bold',
      fontFamily: 'Arial',
    };

    const result = getTypographyValue({ value: typographyValues } as SingleTypographyToken);

    expect(result).toEqual([
      `${TW_CLS_FONT_SIZE}[16px]`,
      `${TW_CLS_LETTER_SPACING}[1px]`,
      `${TW_CLS_LINE_HEIGHT}[1.5px]`,
      `${TW_CLS_PL}[20px]`,
      `${UPPERCASE}`,
      `${UNDERLINE}`,
      `${TW_CLS_FONT}bold `,
      `${TW_CLS_FONT}Arial`,
    ]);
  });

  it('should return default values for unspecified properties', () => {
    const typographyValues = {
      fontFamily: '',
    };

    const result = getTypographyValue({ value: typographyValues } as SingleTypographyToken);

    expect(result).toEqual([
      `${TW_CLS_FONT_SIZE}[0px]`,
      `${TW_CLS_LETTER_SPACING}[0px]`,
      `${TW_CLS_LINE_HEIGHT}[0px]`,
      `${TW_CLS_PL}[0px]`,
      `${NORMAL_CASE}`,
      `${NO_UNDERLINE}`,
      `${TW_CLS_FONT}${MEDIUM}`,
      `${TW_CLS_FONT}${TW_FONT_FAMILY_DEFAULT_VALUE}`,
    ]);
  });
});

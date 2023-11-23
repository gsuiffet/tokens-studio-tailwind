import { TransformedToken } from 'style-dictionary';
import { SingleTypographyToken, TokenTypes } from '@tokens-studio/types';
import { TailwindClassTypes } from '../types';
import { getFontFamilyValue, getMappedValue, getSizeValue } from '../CSSVariables';

const { TW_CLS_FONT_SIZE, TW_CLS_LETTER_SPACING, TW_CLS_LINE_HEIGHT, TW_CLS_PL, TW_CLS_FONT } =
  TailwindClassTypes;
const {
  FONT_SIZES,
  LETTER_SPACING,
  LINE_HEIGHTS,
  PARAGRAPH_INDENT,
  TEXT_CASE,
  TEXT_DECORATION,
  FONT_WEIGHTS,
  FONT_FAMILIES,
} = TokenTypes;

type Props = TransformedToken | SingleTypographyToken;
export function getTypographyValue({ value }: Props): string[] {
  const {
    fontSize,
    letterSpacing,
    lineHeight,
    paragraphIndent,
    textCase,
    textDecoration,
    fontWeight,
    fontFamily,
  } = value;

  return [
    `${TW_CLS_FONT_SIZE}[${getSizeValue({ value: fontSize ?? '', type: FONT_SIZES })}]`,
    `${TW_CLS_LETTER_SPACING}[${getSizeValue({
      value: letterSpacing ?? '',
      type: LETTER_SPACING,
    })}]`,
    `${TW_CLS_LINE_HEIGHT}[${getSizeValue({ value: lineHeight ?? '', type: LINE_HEIGHTS })}]`,
    `${TW_CLS_PL}[${getSizeValue({ value: paragraphIndent ?? '', type: PARAGRAPH_INDENT })}]`,
    `${getMappedValue({ value: textCase, type: TEXT_CASE })}`,
    `${getMappedValue({ value: textDecoration, type: TEXT_DECORATION })}`,
    `${TW_CLS_FONT}${getMappedValue({ value: fontWeight, type: FONT_WEIGHTS })}`,
    `${getFontFamilyValue({ value: fontFamily, type: FONT_FAMILIES })}`,
  ];
}

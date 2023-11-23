import { SingleFontFamiliesToken, TokenTypes } from '@tokens-studio/types';
import { TailwindClassTypes, TW_FONT_FAMILY_DEFAULT_VALUE } from '../types';
import { MISSING_MANDATORY_VALUE } from '../utils';

const { TW_CLS_FONT } = TailwindClassTypes;

type Props = SingleFontFamiliesToken | { value?: string; type: TokenTypes };

export function getFontFamilyValue({ value, type }: Props) {
  if (value === undefined) throw new Error(MISSING_MANDATORY_VALUE(type));
  return `${TW_CLS_FONT}${value === '' ? TW_FONT_FAMILY_DEFAULT_VALUE : value}`;
}

import { SingleFontFamiliesToken, TokenTypes } from '@tokens-studio/types';
import { TailwindClassTypes, TW_FONT_FAMILY_DEFAULT_VALUE } from '../types';

const { TW_CLS_FONT } = TailwindClassTypes;

type Props = SingleFontFamiliesToken | { value?: string; type: TokenTypes };

export function getFontFamilyValue({ value }: Props) {
  return `${TW_CLS_FONT}${!value ? TW_FONT_FAMILY_DEFAULT_VALUE : value}`;
}

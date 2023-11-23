import { TokenTextCaseValue, TokenTextDecorationValue } from '@tokens-studio/types';
import {
  TailwindFontWeight,
  TailwindTextCase,
  TailwindTextDecoration,
  TokenFontWeightValue,
} from '../../types';

const { NORMAL_CASE, UPPERCASE, LOWERCASE, CAPITALIZE } = TailwindTextCase;
const { NO_UNDERLINE, UNDERLINE, LINE_THROUGH } = TailwindTextDecoration;
const { THIN, EXTRA_LIGHT, LIGHT, NORMAL, MEDIUM, SEMI_BOLD, BOLD, EXTRA_BOLD, BLACK } =
  TailwindFontWeight;

export const textCasePossibleValues: Partial<Record<TokenTextCaseValue, string>> = {
  none: NORMAL_CASE,
  uppercase: UPPERCASE,
  lowercase: LOWERCASE,
  capitalize: CAPITALIZE,
};

export const textDecorationPossibleValues: Partial<Record<TokenTextDecorationValue, string>> = {
  none: NO_UNDERLINE,
  underline: UNDERLINE,
  'line-through': LINE_THROUGH,
};

export const fontWeightPossibleValues: Record<TokenFontWeightValue, string> = {
  Thin: THIN,
  100: THIN,
  'Thin Italic': THIN,
  'Extra Light': EXTRA_LIGHT,
  200: EXTRA_LIGHT,
  'Extra Light Italic': EXTRA_LIGHT,
  Light: LIGHT,
  300: LIGHT,
  'Light Italic': LIGHT,
  Regular: NORMAL,
  400: NORMAL,
  'Regular Italic': NORMAL,
  Medium: MEDIUM,
  500: MEDIUM,
  'Medium Italic': MEDIUM,
  'Semi Bold': SEMI_BOLD,
  600: SEMI_BOLD,
  'Semi Bold Italic': SEMI_BOLD,
  Bold: BOLD,
  700: BOLD,
  'Bold Italic': BOLD,
  'Extra Bold': EXTRA_BOLD,
  800: EXTRA_BOLD,
  'Extra Bold Italic': EXTRA_BOLD,
  Black: BLACK,
  900: BLACK,
  'Black Italic': BLACK,
};

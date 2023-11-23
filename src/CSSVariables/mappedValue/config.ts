import { TokenTextCaseValue, TokenTextDecorationValue, TokenTypes } from '@tokens-studio/types';
import {
  TailwindFontWeight,
  TW_ITALIC_VALUE,
  TailwindTextCase,
  TailwindTextDecoration,
  TokenFontWeightValue,
  TOKEN_ITALIC_VALUE,
} from '../../types';
import {
  fontWeightPossibleValues,
  textCasePossibleValues,
  textDecorationPossibleValues,
} from './constants';

const { NORMAL_CASE } = TailwindTextCase;
const { NO_UNDERLINE } = TailwindTextDecoration;
const { MEDIUM } = TailwindFontWeight;
const { TEXT_CASE, TEXT_DECORATION, FONT_WEIGHTS } = TokenTypes;

type TokenValue = TokenTextCaseValue | TokenTextDecorationValue | TokenFontWeightValue;

type MappedValueConfig = {
  [key: string]: {
    defaultValue: string;
    allowedValues: Partial<Record<TokenValue, string>>;
    getValue: (value: Partial<TokenValue>) => string | undefined;
  };
};

export const mappedValueConfig: MappedValueConfig = {
  [TEXT_CASE]: {
    defaultValue: NORMAL_CASE,
    allowedValues: textCasePossibleValues,
    getValue: (value) => textCasePossibleValues[value as TokenTextCaseValue] ?? undefined,
  },
  [TEXT_DECORATION]: {
    defaultValue: NO_UNDERLINE,
    allowedValues: textDecorationPossibleValues,
    getValue: (value) =>
      textDecorationPossibleValues[value as TokenTextDecorationValue] ?? undefined,
  },
  [FONT_WEIGHTS]: {
    defaultValue: MEDIUM,
    allowedValues: fontWeightPossibleValues,
    getValue: (value) => {
      const formattedValue = (value as TokenFontWeightValue).replace(` ${TOKEN_ITALIC_VALUE}`, '');
      const italic = (value as TokenFontWeightValue).includes(TOKEN_ITALIC_VALUE)
        ? TW_ITALIC_VALUE
        : '';
      return fontWeightPossibleValues[formattedValue as TokenFontWeightValue]
        ? `${fontWeightPossibleValues[formattedValue as TokenFontWeightValue]} ${italic}`
        : undefined;
    },
  },
};

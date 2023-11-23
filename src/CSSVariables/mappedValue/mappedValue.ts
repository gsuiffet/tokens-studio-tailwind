import { SingleTextCaseToken, SingleTextDecorationToken, TokenTypes } from '@tokens-studio/types';
import { TokenFontWeightValue } from '../../types';
import { mappedValueConfig } from './config';
import { CONFIG_NOT_FOUND, VALUE_NOT_ALLOWED } from '../../utils';

type Props =
  | Partial<SingleTextCaseToken | SingleTextDecorationToken>
  | { value: Partial<TokenFontWeightValue> | undefined; type: TokenTypes };

export function getMappedValue({ value, type }: Props) {
  const config = mappedValueConfig[type as TokenTypes];
  if (!config) throw new Error(CONFIG_NOT_FOUND(type as TokenTypes));
  const { defaultValue, getValue, allowedValues } = config;

  if (value === undefined) return defaultValue;

  if (getValue(value) === undefined) {
    throw new Error(
      VALUE_NOT_ALLOWED(value as string, type as TokenTypes, Object.keys(allowedValues)),
    );
  }

  return config.getValue(value);
}

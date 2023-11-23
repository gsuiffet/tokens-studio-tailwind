import { UNITS } from '../types';
import { TransformedToken } from 'style-dictionary';
import { TokenTypes } from '@tokens-studio/types';

export const MISSING_GLOBAL_THEME = 'Missing global theme';
export const MISSING_DESIGN_TOKEN_PATH = 'Missing design tokens path';

export const CONFIG_NOT_FOUND = (type: TokenTypes) => `Configuration not found for type:'${type}'`;
export const VALUE_NOT_ALLOWED = (value: string, type: TokenTypes, allowedValues: string[]) =>
  `Value:'${value}' for type:'${type}' is not allowed. Allowed values ${JSON.stringify(
    allowedValues,
  )}`;

export const MISSING_MANDATORY_VALUE = (type: TokenTypes, value?: string) =>
  'Missing mandatory value' + (value ? `:'${value}'` : '') + " for type: '" + type + "'";

export const WRONG_VALUE = (type: TokenTypes, value: string) =>
  `Wrong value:'${value}' found for type:${type}`;

export function throwErrorIfUnitIsNotAllowed(
  allowedUnits: UNITS[],
  { value, type }: Partial<TransformedToken> | { value: string; type: TokenTypes },
) {
  const allowedUnitsRegex = new RegExp(`^-?[0-9]+(.[0-9]*)?(${allowedUnits.join('|')})$`);
  if (!allowedUnitsRegex.test(value))
    throw new Error(`${value} can't be defined as a unit for ${type}`);
}

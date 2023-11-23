import {
  CONFIG_NOT_FOUND,
  throwErrorIfUnitIsNotAllowed,
  transformValueIfNeeded,
} from '../../utils';
import { TransformedToken } from 'style-dictionary';
import { TokenTypes } from '@tokens-studio/types';
import { sizesConfig } from './config';

type Props = TransformedToken | { value: string; type: TokenTypes };

export function getSizeValue({ value, type }: Props): string {
  const config = sizesConfig[type];
  if (!config) throw new Error(CONFIG_NOT_FOUND(type));

  const { defaultValue, defaultUnit, allowedUnits, transform } = config;
  if (value === '') return defaultValue;

  if (!isNaN(value)) {
    return `${value}${defaultUnit}`;
  } else {
    throwErrorIfUnitIsNotAllowed(allowedUnits, { value, type });
  }
  return transformValueIfNeeded(value, transform);
}

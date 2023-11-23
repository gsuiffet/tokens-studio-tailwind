import { TransformedToken } from 'style-dictionary';
import { LINEAR_GRADIENT } from '../types';

type Props = TransformedToken;

export function getColorValue({ value }: Props): string {
  if (value.includes(LINEAR_GRADIENT)) {
    return value.replace(`${LINEAR_GRADIENT} `, LINEAR_GRADIENT);
  }
  return value;
}

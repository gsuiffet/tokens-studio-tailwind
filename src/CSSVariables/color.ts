import { TransformedToken } from 'style-dictionary';
import { LINEAR_GRADIENT } from '../types';

type Props = TransformedToken;

export function getColorValue({ value }: Props): string {
  const rgb_hsl_value = /^(rgb|hsl)\(/;
  const rgba_hsla_value = /^(rgba|hsla)\(/;

  if (value.includes(LINEAR_GRADIENT)) {
    return value.replace(`${LINEAR_GRADIENT} `, LINEAR_GRADIENT);
  }

  if (rgb_hsl_value.test(value)) {
    return value.replace(/(rgb|hsl)\(|\)/g, '').replace(/,\s*/g, ' ');
  }

  if (rgba_hsla_value.test(value)) {
    return value.replace(/(rgba|hsla)\(|\)/g, '');
  }

  return value;
}

import {
  CONFIG_NOT_FOUND,
  throwErrorIfUnitIsNotAllowed,
  transformValueIfNeeded,
  WRONG_VALUE,
} from '../../utils';
import { TransformedToken } from 'style-dictionary';
import { SingleBorderRadiusToken, SingleSpacingToken } from '@tokens-studio/types';
import { multipleSizesConfig } from './config';

function generateTailwindClasses(
  tailwindClasses: string | string[] | undefined,
  transformedValue: string,
  selectedUnit: string,
): string {
  if (Array.isArray(tailwindClasses)) {
    return tailwindClasses.map((cls) => `${cls}[${transformedValue}${selectedUnit}]`).join(' ');
  }
  return `${tailwindClasses}[${transformedValue}${selectedUnit}]`;
}

type Props = TransformedToken | SingleBorderRadiusToken | SingleSpacingToken;
export function getMultipleSizeValue({ value, type }: Props): string {
  const config = multipleSizesConfig[type];
  if (!config) throw new Error(CONFIG_NOT_FOUND(type));

  const { defaultUnit, allowedUnits, groupedTailwindClasses, transform } = config;
  const values = value.split(' ').filter((singleValue: string) => singleValue);

  return values.map((singleValue: string, index: number) => {
    let selectedUnit = '';
    if (!isNaN(Number(singleValue))) {
      selectedUnit = defaultUnit;
    } else {
      throwErrorIfUnitIsNotAllowed(allowedUnits, { value: singleValue, type });
    }
    const transformedValue = transformValueIfNeeded(singleValue, transform);
    const tailwindClasses = groupedTailwindClasses[values.length]?.[index];

    if (tailwindClasses) {
      return generateTailwindClasses(tailwindClasses, transformedValue, selectedUnit);
    } else {
      throw new Error(WRONG_VALUE(type, value));
    }
  });
}

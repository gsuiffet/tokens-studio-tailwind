import {
  HTML_TYPOGRAPHY_ELEMENTS,
  LINEAR_GRADIENT,
  transformFunction,
  transformFunctionValue,
  UNITS,
} from '../types';
const { PIXEL, PERCENT, REM, EM } = UNITS;

export const transformEm = (value: string) => `${Number(value.replace('%', '')) / 100}em`;

export const isBackgroundImage = (value: string) => value.includes(LINEAR_GRADIENT);

export const isValidHTMLElement = (
  name: string,
): name is (typeof HTML_TYPOGRAPHY_ELEMENTS)[number] =>
  HTML_TYPOGRAPHY_ELEMENTS.includes(name as (typeof HTML_TYPOGRAPHY_ELEMENTS)[number]);

export function transformValueIfNeeded(value: string, transform?: transformFunction): string {
  for (const unit of [PIXEL, PERCENT, REM, EM]) {
    if (value.endsWith(unit) && transform && transform[unit]) {
      const transformationFunction = transform[unit] as transformFunctionValue;
      return transformationFunction(value);
    }
  }
  return value;
}

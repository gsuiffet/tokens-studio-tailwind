import { getTailwindVariables } from '../src/tailwindVariables';
import { TransformedToken } from 'style-dictionary';
import { TokenTypes } from '@tokens-studio/types';
const { SPACING, FONT_SIZES, LINE_HEIGHTS, SIZING, DIMENSION, COLOR, BORDER } = TokenTypes;

describe('getTailwindVariables function', () => {
  const allProperties = [
    { type: SPACING, value: '20', path: [SPACING, '0'] },
    { type: FONT_SIZES, value: '20', path: [FONT_SIZES, '0'] },
    { type: LINE_HEIGHTS, value: '20', path: [LINE_HEIGHTS, '0'] },
    { type: SIZING, value: '20', path: [SIZING, '0'] },
    { type: DIMENSION, value: '20', path: [DIMENSION, '0'] },
    { type: COLOR, value: '#BAF', path: [COLOR, '0'] },
    { type: COLOR, value: 'linear-gradient (to right, #000000, #FFFFFF)', path: [COLOR, '1'] },
    { type: BORDER, value: '20', path: [BORDER, '0'] },
  ] as unknown as TransformedToken[];

  it('should generate Tailwind variables based on the provided properties', () => {
    const result = getTailwindVariables(allProperties);
    expect(JSON.parse(result)).toEqual({
      fontSize: {
        'sd-font-sizes-0': 'var(--font-sizes-0)',
      },
      lineHeight: {
        'sd-line-heights-0': 'var(--line-heights-0)',
      },
      spacing: {
        'sd-sizing-0': 'var(--sizing-0)',
        'sd-dimension-0': 'var(--dimension-0)',
      },
      color: {
        'sd-color-0': 'var(--color-0)',
      },
      backgroundImage: {
        'sd-color-1': 'var(--color-1)',
      },
    });
  });
});

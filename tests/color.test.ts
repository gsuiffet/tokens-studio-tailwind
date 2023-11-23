import { getColorValue } from '../src/CSSVariables';
import { TransformedToken } from 'style-dictionary';

describe('getColorValue function', () => {
  it('should return the value without modification if it does not include LINEAR_GRADIENT', () => {
    const result = getColorValue({ value: '#FF0000' } as TransformedToken);
    expect(result).toEqual('#FF0000');
  });

  it('should remove whitespace if it includes after LINEAR_GRADIENT', () => {
    const result = getColorValue({
      value: 'linear-gradient (to right, #000000, #FFFFFF)',
    } as TransformedToken);
    expect(result).toEqual('linear-gradient(to right, #000000, #FFFFFF)');
  });

  it('should handle LINEAR_GRADIENT even if it is not separated by a space', () => {
    const result = getColorValue({
      value: 'linear-gradient(to right, #000000, #FFFFFF) and more text',
    } as TransformedToken);
    expect(result).toEqual('linear-gradient(to right, #000000, #FFFFFF) and more text');
  });
});

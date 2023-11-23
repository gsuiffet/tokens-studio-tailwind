import { getShadowValue } from '../src/CSSVariables';
import { BoxShadowTypes, TokenBoxshadowValue, TokenTypes } from '@tokens-studio/types';
import { MISSING_MANDATORY_VALUE } from '../src/utils';

const { INNER_SHADOW, DROP_SHADOW } = BoxShadowTypes;
const { BOX_SHADOW } = TokenTypes;

describe('getShadowValue function', () => {
  it('should transform a single shadow value correctly', () => {
    const singleShadow = {
      x: '2',
      y: '4',
      blur: '8px',
      spread: '0',
      color: '#000000',
      type: DROP_SHADOW,
    };

    const result = getShadowValue({ value: singleShadow, type: BOX_SHADOW });
    expect(result).toEqual('2px 4px 8px 0px #000000');
  });

  it('should transform an array of shadow values correctly', () => {
    const shadowArray = [
      {
        x: '2',
        y: '4',
        blur: '8px',
        spread: '0',
        color: '#000000',
        type: DROP_SHADOW,
      },
      {
        x: '2',
        y: '4em',
        blur: '8px',
        spread: '0',
        color: '#000000',
        type: INNER_SHADOW,
      },
    ];

    const result = getShadowValue({ value: shadowArray, type: BOX_SHADOW });
    expect(result).toEqual('2px 4px 8px 0px #000000, inset 2px 4em 8px 0px #000000');
  });

  it('should throw an error if a mandatory value id an empty string', () => {
    const singleShadow = {
      x: '',
      y: '4',
      blur: '8px',
      spread: '0',
      color: '#000000',
      type: DROP_SHADOW,
    };
    expect(() => getShadowValue({ value: singleShadow, type: BOX_SHADOW })).toThrowError(
      MISSING_MANDATORY_VALUE(BOX_SHADOW, 'x'),
    );
  });

  it('should handle value without blur and spread properties', () => {
    const singleShadow = {
      x: '2',
      y: '4',
      color: '#000000',
      type: DROP_SHADOW,
    } as TokenBoxshadowValue;

    const result = getShadowValue({ value: singleShadow, type: BOX_SHADOW });
    expect(result).toEqual('2px 4px #000000');
  });
});

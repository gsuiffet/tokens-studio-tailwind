import { TokenTypes } from '@tokens-studio/types';
import { variablesConfig } from '../src/configs';
import { CSSVariableTemplate } from '../src/templates';
import { FormatterArguments } from 'style-dictionary/types/Format';
import { MANDATORY_THEME } from '../src/types';

const {
  DIMENSION,
  OPACITY,
  BORDER_WIDTH,
  LETTER_SPACING,
  FONT_SIZES,
  LINE_HEIGHTS,
  COLOR,
  BOX_SHADOW,
} = TokenTypes;

describe('variablesConfig function tests', () => {
  it('should properly transform values based on the specified types and filters', () => {
    const arg = {
      file: { options: { theme: MANDATORY_THEME } },
      dictionary: {
        allProperties: [
          {
            value: '0px',
            type: DIMENSION,
            name: `${DIMENSION}-0`,
          },
          {
            value: '0.5',
            type: OPACITY,
            name: `${OPACITY}-0`,
          },
          {
            value: '-1.2%',
            type: LETTER_SPACING,
            name: `${LETTER_SPACING}-0`,
          },
          {
            value: '2',
            type: BORDER_WIDTH,
            name: `${BORDER_WIDTH}-0`,
          },
          {
            value: '20',
            type: FONT_SIZES,
            name: `${FONT_SIZES}-0`,
          },
          {
            value: '100%',
            type: LINE_HEIGHTS,
            name: `${LINE_HEIGHTS}-0`,
          },
          {
            value: '#f1f5f9',
            type: COLOR,
            name: `${COLOR}-0`,
          },
          {
            value: 'linear-gradient (45deg, #87CEEB 0%, #008000 100%)',
            type: COLOR,
            name: 'gradient-0',
          },
          {
            value: {
              x: '2',
              y: '2',
              blur: '2',
              spread: '2',
              color: '#000000',
              type: 'innerShadow',
            },
            type: BOX_SHADOW,
            name: `${BOX_SHADOW}-0`,
          },
        ],
      },
    } as unknown as FormatterArguments;

    const formattedProperties = variablesConfig.map(({ fn, filter }) =>
      CSSVariableTemplate({ arg, fn, filter }),
    );
    expect(formattedProperties).toEqual([
      '    --dimension-0: 0px;',
      '    --opacity-0: 0.5;',
      '    --border-width-0: 2px;',
      '    --letter-spacing-0: -0.012em;',
      '    --font-sizes-0: 20px;',
      '    --line-heights-0: 100%;',
      '    --color-0: #f1f5f9;',
      '    --gradient-0: linear-gradient(45deg, #87CEEB 0%, #008000 100%);',
      '    --box-shadow-0: inset 2px 2px 2px 2px #000000;',
    ]);
  });
});

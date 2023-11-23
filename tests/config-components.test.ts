import { FormatterArguments } from 'style-dictionary/types/Format';
import { TokenTypes } from '@tokens-studio/types';
import { componentsConfig } from '../src/configs';
import { componentsTemplate } from '../src/templates';
import { MANDATORY_THEME } from '../src/types';

const { TYPOGRAPHY, BORDER, BORDER_RADIUS, SPACING } = TokenTypes;

describe('componentsConfig function tests', () => {
  it('should properly transform values based on the specified types and filters', () => {
    const prefixSelector = '.';
    const arg = {
      file: { options: { theme: MANDATORY_THEME } },
      dictionary: {
        allProperties: [
          {
            value: {
              fontFamily: 'Inter',
              fontWeight: 'Regular',
              lineHeight: '28',
              fontSize: '16',
              letterSpacing: '0%',
              paragraphSpacing: '0',
              paragraphIndent: '0px',
              textCase: 'none',
              textDecoration: 'none',
            },
            type: TYPOGRAPHY,
            name: `${TYPOGRAPHY}-0`,
          },
          {
            value: {
              color: '#cc3838',
              width: '2',
              style: 'solid',
            },
            type: BORDER,
            name: `${BORDER}-0`,
          },
          {
            value: '10',
            type: BORDER_RADIUS,
            name: `${BORDER_RADIUS}-0`,
          },
          {
            value: '10',
            type: SPACING,
            name: `${SPACING}-0`,
          },
        ],
      },
    } as unknown as FormatterArguments;
    const formattedProperties = componentsConfig.map(({ fn, filter }) =>
      componentsTemplate({ arg, fn, filter, prefixSelector }),
    );
    expect(formattedProperties).toEqual([
      '  .typography-0 {\n' +
        '    @apply text-[16px] tracking-[0em] leading-[28px] pl-[0px] normal-case no-underline font-normal  font-Inter;\n' +
        '  }\n',
      '  .border-0 {\n    @apply border-[#cc3838] border-[2px] border-solid;\n  }\n',
      '  .borderRadius-0 {\n    @apply rounded-[10px];\n  }\n',
      '  .spacing-0 {\n    @apply gap-[10px];\n  }\n',
    ]);
  });

  it('should properly transform custom theme values based on the specified types and filters', () => {
    const prefixSelector = '.';
    const arg = {
      file: { options: { theme: 'dark' } },
      dictionary: {
        allProperties: [
          {
            value: '10',
            type: SPACING,
            name: `${SPACING}-0`,
          },
        ],
      },
    } as unknown as FormatterArguments;
    const formattedProperties = componentsConfig.map(({ fn, filter }) =>
      componentsTemplate({ arg, fn, filter, prefixSelector }),
    );
    expect(formattedProperties.join('').trim()).toEqual(
      '.spacing-0 {\n' + '    @apply dark:gap-[10px];\n' + '  }',
    );
  });
});

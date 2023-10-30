import { getTailwindClasses } from '../src';
import tokens from '../__mock__/tokens.json';
import { ErrorMissingGlobalTheme } from '../utils/error';

test('Should run successfully without theme', () => {
  expect(getTailwindClasses(tokens)).toMatchObject({
    fontSize: {},
    letterSpacing: {},
    lineHeight: {
      'sd-line-heights-0': 'var(--line-heights-0)',
      'sd-line-heights-1': 'var(--line-heights-1)',
      'sd-line-heights-2': 'var(--line-heights-2)',
      'sd-line-heights-3': 'var(--line-heights-3)',
      'sd-xs': 'var(--xs)',
    },
    spacing: {},
    color: {},
    borderRadius: {},
  });
});

test('Should throw an Error in case of missing global theme', () => {
  try {
    getTailwindClasses(tokens, ['dark']);
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    expect(message).toBe(ErrorMissingGlobalTheme);
  }
});

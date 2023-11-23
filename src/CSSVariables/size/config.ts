import { transformFunction, UNITS } from '../../types';
import { transformEm } from '../../utils';
import { TokenTypes } from '@tokens-studio/types';

const { PIXEL, PERCENT, REM, EM } = UNITS;
const {
  FONT_SIZES,
  LETTER_SPACING,
  LINE_HEIGHTS,
  BORDER_WIDTH,
  OPACITY,
  PARAGRAPH_INDENT,
  SIZING,
  DIMENSION,
} = TokenTypes;

interface SizesConfigProps {
  [key: string]: {
    defaultValue: string;
    defaultUnit: UNITS.PIXEL | UNITS.PERCENT | string;
    allowedUnits: UNITS[];
    transform?: transformFunction;
  };
}

export const sizesConfig: SizesConfigProps = {
  [FONT_SIZES]: {
    defaultValue: `0${PIXEL}`,
    defaultUnit: PIXEL,
    allowedUnits: [PIXEL, PERCENT, REM, EM],
  },
  [LETTER_SPACING]: {
    defaultValue: `0${PIXEL}`,
    defaultUnit: PIXEL,
    allowedUnits: [PIXEL, PERCENT, REM, EM],
    transform: {
      [UNITS.PERCENT]: (value) => transformEm(value),
    },
  },
  [LINE_HEIGHTS]: {
    defaultValue: `0${PIXEL}`,
    defaultUnit: PIXEL,
    allowedUnits: [PIXEL, PERCENT],
  },
  [PARAGRAPH_INDENT]: {
    defaultValue: `0${PIXEL}`,
    defaultUnit: PIXEL,
    allowedUnits: [PIXEL, PERCENT],
  },
  [BORDER_WIDTH]: {
    defaultValue: `0${PIXEL}`,
    defaultUnit: PIXEL,
    allowedUnits: [PIXEL, PERCENT, REM, EM],
    transform: {
      [UNITS.PERCENT]: (value) => transformEm(value),
    },
  },
  [OPACITY]: {
    defaultValue: '1',
    defaultUnit: '',
    allowedUnits: [PERCENT],
  },
  [SIZING]: {
    defaultValue: `0${PIXEL}`,
    defaultUnit: PIXEL,
    allowedUnits: [PIXEL, REM, EM],
  },
  [DIMENSION]: {
    defaultValue: `0${PIXEL}`,
    defaultUnit: PIXEL,
    allowedUnits: [PIXEL, REM, EM],
  },
};

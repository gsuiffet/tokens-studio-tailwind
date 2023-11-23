import { TailwindClassTypes, transformFunction, UNITS } from '../../types';
import { transformEm } from '../../utils';
import { TokenTypes } from '@tokens-studio/types';

const { PIXEL, PERCENT, REM, EM } = UNITS;
const {
  TW_CLS_GAP,
  TW_CLS_PY,
  TW_CLS_PX,
  TW_CLS_PT,
  TW_CLS_PB,
  TW_CLS_PR,
  TW_CLS_PL,
  TW_CLS_ROUNDED,
  TW_CLS_ROUNDED_SS,
  TW_CLS_ROUNDED_EE,
  TW_CLS_ROUNDED_SE,
  TW_CLS_ROUNDED_ES,
} = TailwindClassTypes;
const { BORDER_RADIUS, SPACING } = TokenTypes;

interface MultipleSizesConfigProps {
  [key: string]: {
    defaultUnit: UNITS.PIXEL | UNITS.PERCENT | string;
    allowedUnits: UNITS[];
    groupedTailwindClasses: {
      [key: number]: string[][] | string[];
    };
    transform?: transformFunction;
  };
}

export const multipleSizesConfig: MultipleSizesConfigProps = {
  [BORDER_RADIUS]: {
    defaultUnit: PIXEL,
    allowedUnits: [PIXEL, PERCENT, REM],
    groupedTailwindClasses: {
      1: [TW_CLS_ROUNDED],
      2: [
        [TW_CLS_ROUNDED_SS, TW_CLS_ROUNDED_EE],
        [TW_CLS_ROUNDED_SE, TW_CLS_ROUNDED_ES],
      ],
      3: [[TW_CLS_ROUNDED_SS], [TW_CLS_ROUNDED_SE, TW_CLS_ROUNDED_ES], [TW_CLS_ROUNDED_EE]],
      4: [TW_CLS_ROUNDED_SS, TW_CLS_ROUNDED_SE, TW_CLS_ROUNDED_EE, TW_CLS_ROUNDED_ES],
    },
  },
  [SPACING]: {
    defaultUnit: PIXEL,
    allowedUnits: [PIXEL, PERCENT, REM, EM],
    groupedTailwindClasses: {
      1: [TW_CLS_GAP],
      2: [TW_CLS_PY, TW_CLS_PX],
      3: [TW_CLS_PT, TW_CLS_PX, TW_CLS_PB],
      4: [TW_CLS_PT, TW_CLS_PR, TW_CLS_PB, TW_CLS_PL],
    },
    transform: {
      [PERCENT]: (value) => transformEm(value),
    },
  },
};

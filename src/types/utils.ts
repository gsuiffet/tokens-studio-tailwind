import { TransformedToken } from 'style-dictionary';
import { FormatterArguments } from 'style-dictionary/types/Format';
import { TokenTypes } from '@tokens-studio/types';
import { TailwindUtilityTypes } from './enums';

interface FnFilterProps {
  fn: (property: TransformedToken) => string | string[];
  filter: (property: TransformedToken) => boolean;
}

export interface FileTemplateProps extends FnFilterProps {
  arg: FormatterArguments;
  prefixSelector?: string;
}

export interface ConfigType extends FnFilterProps {
  type: TokenTypes | TailwindUtilityTypes;
}

export type transformFunctionValue = (value: string) => string;
export type transformFunction = { [key: string]: transformFunctionValue };

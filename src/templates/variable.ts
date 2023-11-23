import { FileTemplateProps, MANDATORY_THEME } from '../types';
import { TransformedToken } from 'style-dictionary';
import { kebabCase } from 'lodash';

export function CSSVariableTemplate({
  arg: {
    dictionary: { allProperties },
    file: { options },
  },
  fn,
  filter,
}: FileTemplateProps) {
  const theme = options!.theme;
  const properties = filter ? allProperties.filter(filter) : allProperties;
  const generateVariable = (property: TransformedToken) => {
    const importantFlag = theme !== MANDATORY_THEME ? ' !important' : '';
    return `    --${kebabCase(property.name)}: ${fn(property)}${importantFlag};`;
  };
  return properties.map(generateVariable).join('\n');
}

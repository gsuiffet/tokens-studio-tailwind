import { FileTemplateProps, MANDATORY_THEME } from '../types';

export function componentsTemplate({
  arg: {
    dictionary: { allProperties },
    file: { options },
  },
  fn,
  filter,
  prefixSelector = '',
}: FileTemplateProps) {
  const theme = options!.theme;
  const prefixUtility = `${theme === MANDATORY_THEME ? '' : `${theme}:`}`;
  const filteredProperties = filter ? allProperties.filter(filter) : allProperties;
  const generatedClasses = filteredProperties.map((property) => {
    const classNames = fn(property) as string[];
    const prefixedClasses = classNames
      .map((className) => {
        const multipleCls = className.split(' ').filter((cls) => cls);
        if (multipleCls.length > 1) {
          return multipleCls.map((cls) => `${prefixUtility}${cls}`).join(' ');
        }
        return `${prefixUtility}${className}`;
      })
      .join(' ');
    return `  ${prefixSelector}${property.name} {\n    @apply ${prefixedClasses};\n  }\n`;
  });
  return generatedClasses.join('');
}

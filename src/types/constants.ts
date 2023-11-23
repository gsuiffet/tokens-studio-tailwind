import { TokenBorderStyleValue } from './enums';

// Tailwind
export const TW_LAYER_COMPONENT = 'components' as const;
export const TW_LAYER_BASE = 'base' as const;
export const TW_ITALIC_VALUE = 'italic' as const;
export const TW_INSET_VALUE = 'inset' as const;
export const TW_FONT_FAMILY_DEFAULT_VALUE = 'sans' as const;
export const TW_COLOR_DEFAULT_VALUE = 'transparent' as const;

// Token
export const TOKEN_ITALIC_VALUE = 'Italic' as const;
export const ALLOWED_BORDER_STYLES = Object.values(TokenBorderStyleValue);

// Style dictionary
export const SD_OUTPUT_DIRECTORY = 'sd-output' as const;
export const SD_OUTPUT_DIRECTORY_PATH = `./${SD_OUTPUT_DIRECTORY}` as const;
export const MANDATORY_THEME = 'global' as const;

// CSS
export const ROOT_CSS = ':root' as const;
export const LINEAR_GRADIENT = 'linear-gradient' as const;

// HTML
export const HTML_TYPOGRAPHY_ELEMENTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'p',
  'li',
  'a',
  'blockquote',
  'button',
  'th',
  'td',
  'code',
  'small',
] as const;

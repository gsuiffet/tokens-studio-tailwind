# Design Tokens Studio Tailwind

**@gsuiffet/tokens-studio-tailwind** is a npm package that simplify the integration of design tokens from Tokens Studio into Tailwind CSS projects.

## Introduction

Design Tokens Studio Tailwind streamlines the process of integrating design tokens from Tokens Studio into Tailwind CSS projects. It helps you maintain consistency in your design system by providing an easy way to map design tokens to CSS properties.


## Table of Contents
- [Compatibility](#compatibility)
- [Installation](#installation)
- [Usage](#usage)
- [Generated CSS from token](#generated-css-from-token)
- [Supported tokens](#supported-tokens)
- [Contributing](#contributing)

## Compatibility
**Tailwind CSS Version:** This package is compatible with Tailwind CSS version `^3` and Tokens-studio version `^1`. If you are using a different version, please check for compatibility or consider updating your Tailwind CSS installation. 

## Installation

You can install this package using your preferred package manager:

```bash
npm install @gsuiffet/tokens-studio-tailwind
# or
yarn add @gsuiffet/tokens-studio-tailwind
# or
pnpm add @gsuiffet/tokens-studio-tailwind
```

## Usage
1. [Add a script to your package.json](#add-a-script-to-your-packagejson)
2. [Run the script for the first time](#run-the-script-for-the-first-time)
3. [Import the generated CSS in your CSS file](#import-the-generated-css-in-your-css-file)
4. [Get and Set Tailwind CSS class utilities](#get-and-set-tailwind-css-class-utilities)

There are two ways to use Design Tokens Studio Tailwind in your Tailwind CSS project:
1. **Synchronize Design Tokens from Tokens Studio:**
   - Sync your JSON design tokens file from [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens) with your repository
2. **Import Design Tokens File:**
   - Export the JSON design tokens file from [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens) and import it directly into your project.

Tokens Example:
```json
{
  "global": {
    "xs": {
      "value": "3",
      "type": "lineHeights"
    }
  },
  "dark": {
    "xs": {
      "value": "3",
      "type": "lineHeights"
    }
  }
}
```

**⚠ WARNING**
> The JSON design tokens should include a theme named 'global'. This theme will be used to generate root CSS.

<br>

#### Add a script to your package.json
```json
{
  "scripts": {
    "build:sd": "npx tokens-studio-tailwind -j tokens/tokens.json -t global,dark"
    // ... other scripts
  }
}
```
- The option `-j` should specify the absolute path to your JSON design tokens file in your project.
- The option `-t` (optional) is a comma-separated list of your themes.

Place this script at the beginning of your scripts to build your project or run the development environment (e.g., Next.js):
```json
{
  "scripts": {
    "dev": "npm run build:sd && next dev",
    "build": "npm run build:sd && next build",
    "build:sd": "npx tokens-studio-tailwind -j tokens/tokens.json -t global,dark"
  }
}
```

<br>

#### Run the script for the first time
```bash
npm run build:sd
```

This will create a folder `sd-output`, at the top-level of your project and generate several files according to your tokens:
- `index.css` => this will group all css files
- `base-global.css` => tailwind base layer for root css
- `base-theme1.css` => tailwind base layer for theme css
- `components-global.css` => tailwind components layer for root css
- `components-theme1.css` => tailwind components layer for theme css
- `tw-global.json` => root css variables
- `tw-theme1.json` => theme css variables
- `tw-tokens.json` => this will merge all variable tokens

<br>

#### Import the generated CSS in your CSS file
1. Install postcss-import in your project using one of the following commands:
    - npm install -D postcss-import
    - pnpm add -D postcss-import
    - yarn add -D postcss-import
2. In your postcss.config.js file, add the `postcss-import` plugin
    ```js
    module.exports = {
      plugins: {
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {},
      }
    }
    ```
3. import the `sd-output` directory in your `global.css` file:
    ```css
    @import './sd-output';
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    @layer base {
      // ...
    }
    ```

<br>

#### Get and Set Tailwind CSS class utilities

Override or extend your theme using the `./sd-output/tw-tokens.json` file.
  
Example usage:
```js
const tokens = require('./sd-output/tw-tokens.json');

module.exports = {
  theme: {
    ...tokens,
    ...
  },
  ...
}
```
Or, for more granular control:
```js
const tokens = require('./tokens/tokens.json');
const {
  spacing,
  opacity,
  borderWidth,
  backgroundImage,
  color,
  boxShadow,
  lineHeight,
  fontSize,
  letterSpacing,
} = tokens

module.exports = {
  theme: {
    boxShadow,
    extend: {
      fontSize,
      colors: {
        ...color,
        ...
      }
    },
    ...
  },
  ...
}
```

## Generated CSS from token
- A token value can be a variable. In such cases, the package will automatically assign the corresponding value.
- Token key will be transform in KebabCase. In case of multiple children, the package will concat the parent and all children keys.
- Token located within a theme that is not the `global` theme will be used with the `!important` keyword. This precaution is taken in case the variable shares the same name between theme but holds a different value.

|                     | Token                                                                                                                                                                                 | Generated CSS                                                                                                  |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| Simple token        | <pre>{<br/> "global": {<br/>  "TOKEN_NAME": {<br/>   "value": "TOKEN_VALUE",<br/>   "type": "TOKEN_TYPE"<br/>  }<br/> }<br/>}</pre>                                                   | <pre>@layer base {<br/> :root {<br/>  --token-name: TOKEN_VALUE;<br/> }<br/>}</pre>                            |
| Token with children | <pre>{<br/> "global": {<br/>  "TOKEN_NAME_PARENT": {<br/>   "TOKEN_NAME_CHILDREN": {<br/>    "value": "TOKEN_VALUE",<br/>    "type": "TOKEN_TYPE"<br/>   }<br/>  }<br/> }<br/>}</pre> | <pre>@layer base {<br/> :root {<br/>  --token-name-parent-token-name-children: TOKEN_VALUE;<br/> }<br/>}</pre> |
| Theme token         | <pre>{<br/> "dark": {<br/>  "TOKEN_NAME": {<br/>   "value": "TOKEN_VALUE",<br/>   "type": "TOKEN_TYPE"<br/>  }<br/> }<br/>}</pre>                                                     | <pre>@layer base {<br/> .dark {<br/>  --token-name: TOKEN_VALUE !important;<br/> }<br/>}</pre>                 |


## Supported tokens
This package provides support for:
- **[fontSizes](#simple-tokens)** (variable)
- **[letterSpacing](#simple-tokens)** (variable)
- **[lineHeights](#simple-tokens)** (variable)
- **[borderWidth](#simple-tokens)** (variable)
- **[(#simple-tokens)](#simple-tokens)** (variable)
- **[sizing](#simple-tokens)** (variable)
- **[dimension](#simple-tokens)** (variable)
- **[color & linear-gradient](#simple-tokens)** (variable)
- **[boxShadow](#boxshadow-token)** (variable)
- **[border](#border-token)** (composite)
- **[borderRadius](#borderradius-token)** (composite)
- **[spacing](#spacing-token)** (composite)
- **[typography](#typography-token)** (composite)

Not supported:
- assets
- custom composite


### Variables
#### Simple tokens
| TOKEN_TYPE      | TAILWIND_UTILITY |     Allowed units      | Default unit | Default TOKEN_VALUE | TAILWIND_UTILITY_CLASS                                                                                                                                                                 |
|-----------------|------------------|:----------------------:|:------------:|:-------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fontSizes       | fontSize         | `px \| % \| rem \| em` |     `px`     |        `0px`        | `text`                                                                                                                                                                                 |
| letterSpacing   | letterSpacing    | `px \| % \| rem \| em` |     `px`     |        `0px`        | `tracking`<br/> (`%` will be transform to `em`)                                                                                                                                        |
| lineHeights     | lineHeight       |       `px \| %`        |     `px`     |        `0px`        | `leading`                                                                                                                                                                              |
| borderWidth     | borderWidth      | `px \| % \| rem \| em` |     `px`     |        `0px`        | `border`<br/> (`%` will be transform to `em`)                                                                                                                                          |
| opacity         | opacity          |          `%`           |              |         `1`         | `opacity`                                                                                                                                                                              |
| sizing          | spacing          |   `px \| rem \| em`    |     `px`     |        `0px`        | `p`<br/>- `m`<br/>- `w`<br/>- `h`<br/>- `max-h`<br/>- `gap`<br/>- `top`<br/>- `right`<br/>- `bottom`<br/>- `left`<br/>- `inset-*`<br/>- `space-*`<br/>- `translate-*`<br/>- `scroll-*` |
| dimension       | spacing          |   `px \| rem \| em`    |     `px`     |        `0px`        | `p`<br/>- `m`<br/>- `w`<br/>- `h`<br/>- `max-h`<br/>- `gap`<br/>- `top`<br/>- `right`<br/>- `bottom`<br/>- `left`<br/>- `inset-*`<br/>- `space-*`<br/>- `translate-*`<br/>- `scroll-*` |
| color           | color            |                        |              |                     | `text`<br/>- `bg`<br/>- `border`<br/>- `divide`<br/>- `outline`<br/>- `ring`<br/>- `decoration`<br/>- `fill`<br/>- `shadow`                                                            |
| color           | backgroundImage  |                        |              |                     | `bg`<br/> (This handle `linear-gradient` see [Tokens Studio documentation](https://docs.tokens.studio/available-tokens/color-tokens#gradients))                                        |

Simple token example:
```json
{
  "global": {
    "TOKEN_NAME": {
      "value": "2",
      "type": "fontSizes"
    }
  }
}
```
This will generate an entry in the `base-global.css` file:
```css
@layer base {
  :root {
    /* fontSize */
    --TOKEN_NAME: 2px;
  }
}
```

---

#### boxShadow token
|        |     Allowed units      |       Allowed values        | Default unit |                         |
|--------|:----------------------:|:---------------------------:|:------------:|:------------------------|
| x      | `px \| % \| rem \| em` |          required           |     `px`     | (`%` transform to `em`) |
| y      | `px \| % \| rem \| em` |          required           |     `px`     | (`%` transform to `em`) |
| blur   | `px \| % \| rem \| em` |                             |     `px`     | (`%` transform to `em`) |
| spread | `px \| % \| rem \| em` |                             |     `px`     | (`%` transform to `em`) |
| type   |                        | `innerShadow \| dropShadow` |              |                         |
| color  |                        |                             |              |                         |

Simple shadow token example:
```json
{
  "global": {
    "TOKEN_NAME": {
      "value": {
        "x": "1",
        "y": "2",
        "blur": "2",
        "spread": "2",
        "color": "#c80707",
        "type": "innerShadow"
      },
      "type": "boxShadow"
    }
  }
}
```
This will generate an entry in the `base-global.css` file:
```css
@layer base {
  /* boxShadow */
  --TOKEN_NAME: inset 1px 2px 2px 2px #c80707
}
```
Complex shadow token example:
```json
{
  "global": {
    "TOKEN_NAME": {
      "value": [
        {
          "x": "1",
          "y": "2",
          "blur": "2",
          "spread": "2",
          "color": "#c80707",
          "type": "innerShadow"
        },
        {
          "x": "1",
          "y": "2",
          "blur": "2",
          "spread": "2",
          "color": "#c80707",
          "type": "dropShadow"
        }
      ],
      "type": "boxShadow"
    }
  }
}
```
This will generate an entry in the `base-global.css` file:
```css
@layer base {
  /* boxShadow */
  --TOKEN_NAME: inset 1px 2px 2px 2px #c80707, 1px 2px 2px 2px #c80707
}
```

### Composites
#### border token
|       |     Allowed units      |  Allowed values   | Default unit | Default VALUE | TAILWIND_UTILITY_CLASS                           |
|-------|:----------------------:|:-----------------:|:------------:|:-------------:|:-------------------------------------------------|
| width | `px \| % \| rem \| em` |                   |     `px`     |     `0px`     | `border`<br/> (`%` will be transform to `em`)    |
| color |                        |                   |              | `transparent` | `border`                                         |
| style |                        | `solid \| dashed` |              |    `solid`    | `border`                                         |

Border token example:
```json
{
  "global": {
    "TOKEN_NAME": {
      "value": {
        "color": "#cc3838",
        "width": "2",
        "style": "solid"
      },
      "type": "border"
    }
  }
}
```
This will generate an entry in the `components-global.css` file:

```css
@layer components {
  /* border */
  .TOKEN_NAME {
    @apply border-[#cc3838] border-[2px] border-solid;
  }
}
```

---

#### borderRadius token
| Example value | VALUE                                                                   |
|---------------|:------------------------------------------------------------------------|
| `6`           | `rounded-[6px]`                                                         |
| `6 2`         | `rounded-ss-[6px] rounded-ee-[6px] rounded-se-[2px] rounded-es-[2px]`   |
| `6 2 4`       | `rounded-ss-[6px] rounded-se-[2px] rounded-es-[2px] rounded-ee-[4px]`   |
| `6 2 4 8`     | `rounded-ss-[6px] rounded-se-[2px] rounded-ee-[4px] rounded-es-[8px]`   |

|  Allowed units   | Default unit |
|:----------------:|:------------:|
| `px \| % \| rem` |     `px`     |

BorderRadius token example:
```json
{
  "global": {
    "TOKEN_NAME": {
      "value": "6",
      "type": "borderRadius"
    }
  }
}
```
This will generate an entry in the `components-global.css` file:
```css
@layer components {
  /* BorderRadius */
  .TOKEN_NAME {
    @apply rounded-[6px];
  }
}
```

---

#### spacing token
| Example value | VALUE <br/> (`%` transform to `em`)   |
|---------------|:--------------------------------------|
| `6`           | `gap-[6px]`                           |
| `6 2`         | `py-[6px] px-[6px]`                   |
| `6 2 4`       | `pt-[6px] px-[2px] pb-[4px]`          |
| `6 2 4 8`     | `pt-[6px] pr-[2px] pb-[4px] pl-[8px]` |

|      Allowed units      | Default unit |
|:-----------------------:|:------------:|
| `px \| % \| rem  \| em` |     `px`     |

Spacing token example:
```json
{
  "global": {
    "TOKEN_NAME": {
      "value": "6",
      "type": "spacing"
    }
  }
}
```
This will generate an entry in the `components-global.css` file:
```css
@layer components {
  /* spacing */
  .TOKEN_NAME {
    @apply gap-[6px];
  }
}
```

---

#### typography token
|                           |     Allowed units      | Allowed values                                | Default unit | Default VALUE  | TAILWIND_UTILITY_CLASS                          |
|---------------------------|:----------------------:|:----------------------------------------------|:------------:|:--------------:|:------------------------------------------------|
| [fontFamily](#fontfamily) |   required (string)    |                                               |              |     `sans`     | `font`                                          |
| fontSize                  | `px \| % \| rem \| em` |                                               |     `px`     |     `0px`      | `text`                                          |
| letterSpacing             | `px \| % \| rem \| em` |                                               |     `px`     |     `0px`      | `tracking`<br/> (`%` will be transform to `em`) |
| lineHeight                |       `px \| %`        |                                               |     `px`     |     `0px`      | `leading`                                       |
| paragraphIndent           |       `px \| %`        |                                               |     `px`     |     `0px`      | `pl`                                            |
| fontWeight                |                        | [fontWeight value](#fontweight-value)         |              | `font-medium`  | [fontWeight value](#fontweight-value)           |
| textCase                  |                        | [textCase value](#textCase-value)             |              | `normal-case`  | [textCase value](#textCase-value)               |
| textDecoration            |                        | [textDecoration value](#textdecoration-value) |              | `no-underline` | [textDecoration value](#textdecoration-value)   |

##### fontWeight value
| Allowed values       |  TAILWIND_UTILITY_CLASS  |
|----------------------|:------------------------:|
| `Thin`               |       `font-thin`        |
| `100`                |       `font-thin`        |
| `Thin Italic`        |    `font-thin italic`    |
| `Extra Light`        |    `font-extralight`     |
| `200`                |    `font-extralight`     |
| `Extra Light Italic` | `font-extralight italic` |
| `Light`              |       `font-light`       |
| `300`                |       `font-light`       |
| `Light Italic`       |   `font-light italic`    |
| `Regular`            |      `font-normal`       |
| `400`                |      `font-normal`       |
| `Regular Italic`     |   `font-normal italic`   |
| `Medium`             |      `font-medium`       |
| `500`                |      `font-medium`       |
| `Medium Italic`      |   `font-medium italic`   |
| `Semi Bold`          |     `font-semibold`      |
| `600`                |     `font-semibold`      |
| `Semi Bold Italic`   |  `font-semibold italic`  |
| `Bold`               |       `font-bold`        |
| `700`                |       `font-bold`        |
| `Bold Italic`        |    `font-bold italic`    |
| `Extra Bold`         |     `font-extrabold`     |
| `800`                |     `font-extrabold`     |
| `Extra Bold Italic`  | `font-extrabold italic`  |
| `Black`              |       `font-black`       |
| `900`                |       `font-black`       |
| `Black Italic`       |   `font-black italic`    |

##### textCase value
| Allowed values | TAILWIND_UTILITY_CLASS |
|----------------|:----------------------:|
| `none`         |     `normal-case`      |
| `uppercase`    |      `uppercase`       |
| `lowercase`    |      `lowercase`       |
| `capitalize`   |      `capitalize`      |

##### textDecoration value
| Allowed values | TAILWIND_UTILITY_CLASS |
|----------------|:----------------------:|
| `none`         |     `no-underline`     |
| `underline`    |      `underline`       |
| `line-through` |     `line-through`     |

#### fontFamily
fontFamily may require manual intervention.

| Token                                                                                                                                                  | Generated CSS                                                            |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| <pre>{<br/> "global": {<br/>  "h1": {<br/>   "value": {<br/>    "fontFamily": "Inter"<br/>   },<br/>   "type": "typography"<br/>  }<br/> }<br/>}</pre> | <pre>@layer base {<br/> h1 {<br/>  @apply: font-Inter<br/> }<br/>}</pre> |

To address this, you'll need to set the font family manually. For example, to set a font variable using Next.js, you can refer to this documentation [Next.js](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#with-tailwind-css). Once you've obtained the font variable, you can add it to your tailwind.config.js as demonstrated below:
```js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      "fontFamily": {
        "Inter": ["var(--Inter)", ...fontFamily.sans]
      }
    }
  }
}
```

Typography token example:
```json
{
  "global": {
    "h1": {
      "value": {
        "fontFamily": "Inter",
        "fontWeight": "Bold Italic",
        "lineHeight": "100%",
        "fontSize": "48",
        "letterSpacing": "-1.2%",
        "paragraphSpacing": "",
        "paragraphIndent": "",
        "textCase": "none",
        "textDecoration": "none"
      },
      "type": "typography"
    },
    "subtitle": {
     "value": {
        "fontFamily": "Inter",
        "fontWeight": "Bold Italic",
        "lineHeight": "100%",
        "fontSize": "24",
        "letterSpacing": "-1.2%",
        "paragraphSpacing": "",
        "paragraphIndent": "",
        "textCase": "none",
        "textDecoration": "none"
     },
     "type": "typography"
    }
  },
  "dark": {
    "h1": {
      "value": {
        "fontFamily": "Inter",
        "fontWeight": "Bold Italic",
        "lineHeight": "100%",
        "fontSize": "48",
        "letterSpacing": "-1.2%",
        "paragraphSpacing": "",
        "paragraphIndent": "",
        "textCase": "none",
        "textDecoration": "none"
      },
      "type": "typography"
    },
    "subtitle": {
      "value": {
        "fontFamily": "Inter",
        "fontWeight": "Bold Italic",
        "lineHeight": "100%",
        "fontSize": "24",
        "letterSpacing": "-1.2%",
        "paragraphSpacing": "",
        "paragraphIndent": "",
        "textCase": "none",
        "textDecoration": "none"
     },
     "type": "typography"
    }
  }
}
```

- ⚠️ paragraphSpacing will be ignored
- If the TOKEN_NAME is a html element `h1 | h2 | h3 | h4 | p | li | a | blockquote | button | th | td | code | small`, this will generate an entry in the base-*.css file:

This will generate several files:
- An entry in the `base-global.css` file:
   ```css
   @layer base {
     /* typography */
     h1 {
       @apply text-[48px] tracking-[-0.012em] leading-[100%] pl-[0px] normal-case no-underline font-bold italic font-Inter
     }
   }
   ```
- An entry in the `components-global.css` file:
   ```css
   @layer components {
     /* typography */
     .subtitle {
       @apply text-[24px] tracking-[-0.012em] leading-[100%] pl-[0px] normal-case no-underline font-bold italic font-Inter
     }
   }
   ```
- An entry in the `base-dark.css` file:
   ```css
   @layer base {
     /* typography */
     h1 {
       @apply dark:text-[48px] dark:tracking-[-0.012em] dark:leading-[100%] dark:pl-[0px] dark:normal-case dark:no-underline dark:font-bold italic dark:font-Inter;
     }
   }
   ```
- An entry in the `components-dark.css` file:
   ```css
   @layer components {
     /* typography */
     .subtitle {
       @apply dark:text-[24px] dark:tracking-[-0.012em] dark:leading-[100%] dark:pl-[0px] dark:normal-case dark:no-underline dark:font-bold italic dark:font-Inter
     }
   }
   ```
## Contributing
To contribute to this project:

* Run `pnpm i` to install dependencies.
* Run `pnpm run build && node dist/index.js -j __mock__/tokens.json -t global,dark` to test the program
* Run `changeset` to create a changeset (this will be used to update the package version)
* Create a Pull request for your branch

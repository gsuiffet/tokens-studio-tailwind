# Design Tokens Studio Tailwind

**@gsuiffet/tokens-studio-tailwind** is a npm package designed to streamline the integration of design tokens from Tokens Studio into Tailwind CSS projects.

## Introduction

Design Tokens Studio Tailwind simplifies the process of integrating design tokens from Tokens Studio into Tailwind CSS projects. It ensures consistency in your design system by providing an efficient way to map design tokens to CSS properties.


## Table of Contents
- [Compatibility](#compatibility)
- [Installation](#installation)
- [Usage](#usage)
- [Generated CSS from token](#generated-css-from-token)
- [Supported tokens](#supported-tokens)
- [Contributing](#contributing)

## Compatibility
**Tailwind CSS Version:** This package is compatible with Tailwind CSS version `^3` and Tokens-studio version `^1`. For different versions, please check compatibility or consider updating your Tailwind CSS installation.

## Installation

Install this package using your preferred package manager:

```bash
npm install @gsuiffet/tokens-studio-tailwind
# or
yarn add @gsuiffet/tokens-studio-tailwind
# or
pnpm add @gsuiffet/tokens-studio-tailwind
```

## Usage
### Introduction
To integrate Design this package into your Tailwind CSS project, follow these steps:

1. [Adding a Script to package.json](#adding-a-script-to-packagejson)
2. [Running the Script](#running-the-script)
3. [Importing Generated CSS](#importing-generated-css)
4. [Setting Tailwind CSS Class Utilities](#setting-tailwind-css-class-utilities)

### Two Methods of Usage
There are two methods to utilize Tokens Studio Tailwind in your Tailwind CSS project:
1. **Synchronize Design Tokens from Tokens Studio:**
   - Sync your JSON design tokens file from [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens) with your repository
2. **Import Design Tokens File:**
   - Export the JSON design tokens file from [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens) and import it directly into your project.

### Example Tokens
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
> Ensure the JSON design tokens include a theme named 'global', which will be used to generate root CSS.

<br>

#### Adding a Script to package.json
Add the following script to your `package.json`:
```json
{
  "scripts": {
    "build:sd": "tokens-studio-tailwind -j tokens/tokens.json -t global,dark"
    // ... other scripts
  }
}
```
- The `-j` option specifies the absolute path to your JSON design tokens file.
- The `-t` option (optional) is a comma-separated list of your themes.

Place this script at the beginning of your scripts to build your project or run the development environment (e.g., Next.js):
```json
{
  "scripts": {
    "dev": "npm run build:sd && next dev",
    "build": "npm run build:sd && next build",
    "build:sd": "tokens-studio-tailwind -j tokens/tokens.json -t global,dark"
  }
}
```

<br>

#### Running the Script
Run the script for the first time:
```bash
npm run build:sd
```

This will create a `sd-output` folder at the top-level of your project and generate several files according to your tokens.
- `index.css` => this will group all css files
- `base-global.css` => tailwind base layer for root css
- `base-theme1.css` => tailwind base layer for theme css
- `components-global.css` => tailwind components layer for root css
- `components-theme1.css` => tailwind components layer for theme css
- `tw-global.json` => root css variables
- `tw-theme1.json` => theme css variables
- `tw-tokens.json` => this will merge all variable tokens

<br>

#### Importing Generated CSS
To import the generated CSS into your CSS file:
1. Install `postcss-import` using one of these commands:
    - npm install -D postcss-import
    - pnpm add -D postcss-import
    - yarn add -D postcss-import
2. Add the `postcss-import` plugin in your `postcss.config.js file:
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

#### Setting Tailwind CSS Class Utilities

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
For more granular control:
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
When generating CSS from tokens, consider the following points:


- **Variable Token Values:** A token value may be defined as a variable. In such cases, the package will automatically assign the corresponding value.
- **Transformation of Token Keys:** Token keys are transformed into kebab-case format. For tokens with multiple children, the package concatenates the parent key with all children keys.
- **Theme-specific Token Handling:** Tokens located within a theme other than the `global` theme will be utilized with the `!important` keyword. This approach is adopted as a precautionary measure, especially when a variable shares the same name between themes but contains different values.

|                     | Token                                                                                                                                                                                 | Generated CSS                                                                                                  |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| Simple token        | <pre>{<br/> "global": {<br/>  "TOKEN_NAME": {<br/>   "value": "TOKEN_VALUE",<br/>   "type": "TOKEN_TYPE"<br/>  }<br/> }<br/>}</pre>                                                   | <pre>@layer base {<br/> :root {<br/>  --token-name: TOKEN_VALUE;<br/> }<br/>}</pre>                            |
| Token with children | <pre>{<br/> "global": {<br/>  "TOKEN_NAME_PARENT": {<br/>   "TOKEN_NAME_CHILDREN": {<br/>    "value": "TOKEN_VALUE",<br/>    "type": "TOKEN_TYPE"<br/>   }<br/>  }<br/> }<br/>}</pre> | <pre>@layer base {<br/> :root {<br/>  --token-name-parent-token-name-children: TOKEN_VALUE;<br/> }<br/>}</pre> |
| Theme token         | <pre>{<br/> "dark": {<br/>  "TOKEN_NAME": {<br/>   "value": "TOKEN_VALUE",<br/>   "type": "TOKEN_TYPE"<br/>  }<br/> }<br/>}</pre>                                                     | <pre>@layer base {<br/> .dark {<br/>  --token-name: TOKEN_VALUE !important;<br/> }<br/>}</pre>                 |


## Supported tokens
This package provides support for the following:
- **[fontSizes](#simple-tokens)** (variable)
- **[letterSpacing](#simple-tokens)** (variable)
- **[lineHeights](#simple-tokens)** (variable)
- **[borderWidth](#simple-tokens)** (variable)
- **[opacity](#simple-tokens)** (variable)
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

Example for a simple token:
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

Example for a simple shadow token:
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
Example for a complex shadow token:
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

Example Border Token:
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

Example BorderRadius Token:
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

Example Spacing Token:
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

#### fontFamily value
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

Example Typography Token:
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

# Design Tokens Studio Tailwind

**@gsuiffet/tokens-studio-tailwind** is a npm package that simplify the integration of design tokens from Tokens Studio into Tailwind CSS projects.

## Introduction

Design Tokens Studio Tailwind streamlines the process of integrating design tokens from Tokens Studio into Tailwind CSS projects. It helps you maintain consistency in your design system by providing an easy way to map design tokens to CSS properties.


## Table of Contents

1. [Compatibility](#compatibility)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Examples](#examples)
5. [Supported CSS Properties](#supported-css-properties)
6. [Contributing](#contributing)

## Compatibility
**Tailwind CSS Version:** This package is compatible with Tailwind CSS version `^3 If you are using a different version, please check for compatibility or consider updating your Tailwind CSS installation. 

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

This project is being tested under

There are two ways to use Design Tokens Studio Tailwind in your Tailwind CSS project:
1. **Synchronize Design Tokens from Tokens Studio:**
   - Sync your JSON design tokens file from [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens) with your repository
2. **Import Design Tokens File:**
   - Export the JSON design tokens file from [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens) and import it directly into your project.

<br>

**⚠ WARNING**
> The JSON design tokens should include a theme named 'global'. This theme will be used to generate root CSS.

<br>

#### Add a script to your package.json
```json
{
  "scripts": {
    "build:sd": "npx @gsuiffet/tokens-studio-tailwind -j tokens/tokens.json -t global,dark",
    // ... other scripts
  }
}
```
- The option `-j` should specify the absolute path to your JSON design tokens file in your project.
- The option `-t` (optional) is a comma-separated list of your themes.

Place this script at the beginning of your scripts to build your project or run the development environment.
```json
{
  "scripts": {
    "dev": "npm run build:sd && next dev",
    "build": "npm run build:sd && next build",
    "build:sd": "npx @gsuiffet/tokens-studio-tailwind -j tokens/tokens.json -t global,dark"
  }
}
```

<br>

### Creating a Folder for Generated CSS
Follow these steps:
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
3. Create a folder named `sd-output`
4. inside the `sd-output`, create an empty `index.css` file
5. import the `sd-output` in your `global.css` file:
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

#### Getting and Setting Tailwind CSS Classes

Override or extend your theme with the `getTailwindClasses utility function. The function takes two parameters:
- the JSON design tokens file.
- an optional array of your themes (default = ["global"]).
  
Example usage:
```js
const tokens = require('./tokens/tokens.json');
const {getTailwindClasses} = require('@gsuiffet/tokens-studio-tailwind');

module.exports = {
  theme: {
    ...getTailwindClasses(tokens, ['global', 'dark']),
    ...
  },
  ...
}
```
Or, for more granular control:
```js
const tokens = require('./tokens/tokens.json');
const {getTailwindClasses} = require('@gsuiffet/tokens-studio-tailwind');
const {fontSize,color} = getTailwindClasses(tokens, ['global', 'dark'])

module.exports = {
  theme: {
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

<br>

## Examples

If your design token path is located at the root directory of your project, typically at `./tokens.json`.

### Basic tokens
Suppose you have the following basic design tokens in your `tokens.json:

```json
{
  "global": {
    "lineHeights": {
      "0": {
        "value": "100%",
        "type": "lineHeights"
      },
      "1": {
        "value": "36",
        "type": "lineHeights"
      },
      "2": {
        "value": "32",
        "type": "lineHeights"
      },
      "3": {
        "value": "28",
        "type": "lineHeights"
      }
    },
    "xs": {
      "value": "3",
      "type": "lineHeights"
    }
  },
  "dark": {
    "xs": {
      "value": "4",
      "type": "lineHeights"
    }
  }
}
```
Running the build:sd script with the command:
```bash
npx @gsuiffet/tokens-studio-tailwind -j tokens.json -t global,dark
```
will create a folder named `sd-output` with the following files:

- An `index.css` file that imports the generated CSS:
   ```css
   @import './sd-dark.css';
   @import './sd-global.css';
   ```

- A `sd-dark.css` file, containing CSS rules for the 'dark' theme:
  ```css
  @layer base {
    .dark {
      --xs: 4px;
    }
  }
   ```

- A `sd-global.css` file, containing CSS rules for the 'global' theme:
  ```css
  @layer base {
    :root {
      --line-heights-0: 1em;
      --line-heights-1: 36px;
      --line-heights-2: 32px;
      --line-heights-3: 28px;
      --xs: 3px;
    }
  }
   ```

The utility function `getTailwindClasses` will provide you with an object that you can merge or extend in your `tailwind.config.js` to apply these classes.
```json
{
   "lineHeight": {
     "sd-line-heights-0": "var(--line-heights-0)",
     "sd-line-heights-1": "var(--line-heights-1)",
     "sd-line-heights-2": "var(--line-heights-2)",
     "sd-line-heights-3": "var(--line-heights-3)",
     "sd-xs": "var(--xs)"
   }
}
```

### Composite tokens
If you have composite tokens, such as typography, you can generate CSS files as well. Here's an example of composite tokens in your tokens.json:
```json
{
  "global": {
    "fontSize": {
      "4": {
        "value": "48",
        "type": "fontSizes"
      }
    },
    "h1": {
      "value": {
        "fontSize": "{fontSize.4}"
      },
      "type": "typography"
    }
  }
}
```
Running the build:sd script with the command:
```bash
npx @gsuiffet/tokens-studio-tailwind -j tokens.json
```
will create a folder named `sd-output` with the following files:

- An `index.css` file that imports the generated CSS:
   ```css
   @import './sd-base-typography-global.css';
   @import './sd-component-typography-global.css';
   @import './sd-global.css';
   ```

- A `sd-global.css file, containing CSS rules for the 'global' theme:
  ```css
  @layer base {
    :root {
      --font-size-4: 48px;
    }
  }
   ```

- A `sd-component-typography-global.css` file (this file will be filled in case your tokens include a type `typography` but the name is not a valid HTML element)
  ```css
  @layer components {
  }
   ```

- A `sd-base-typography-global.css file that provides CSS rules for typography:
  ```css
  @layer base {
    h1 {
      @apply text-sd-font-size-4;
    }
  }
   ```

The utility function `getTailwindClasses` will generate an object that you can merge or extend in your `tailwind.config.js` to apply these classes.
```json
{
  "fontSize": {
    "sd-font-size-4": "var(--font-size-4)"
  }
}
```

## Supported CSS Properties
This package currently supports the following CSS properties:
- fontSize
- letterSpacing
- lineHeight
- spacing
- color
- borderRadius

For each supported property, refer to the provided examples for usage details.

## Contributing
To contribute to this project:

* Run `pnpm i` to install dependencies.
* Run `pnpm run build && node dist/index.js -j __mock__/tokens.json -t global,dark` to test the program
* Run `changeset` to create a changeset (this will be used to update the package version)
* Create a Pull request for your branch

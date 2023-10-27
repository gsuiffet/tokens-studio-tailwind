# Design tokens from Tokens Studio to Tailwind CSS

**tokens-studio-tailwind** is a npm package that simplifies the integration of design tokens from Tokens Studio into Tailwind CSS projects.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
4. [Examples](#examples)
5. [Contributing](#contributing) todo
6. [License](#license) todo

## Installation

You can install this package using your favorite package manager:

```bash
npm install tokens-studio-tailwind
# or
yarn add tokens-studio-tailwind
# or
pnpm add tokens-studio-tailwind
```

## Usage

You have 2 ways to use tokens-studio-tailwind in your Tailwind CSS project:
1. Sync your JSON design tokens file from [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens) to your repository
2. Export the JSON design tokens file from [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens) and import it in your project.

<br>

**⚠ WARNING**
> The JSON design tokens should have a theme named 'global'. It will be use to generate root css.

<br>

#### Add a script in package.json
```json
{
  "scripts": {
    "build:sd": "npx @gsuiffet/tokens-studio-tailwind -j tokens/tokens.json -t global,dark",
    ...
  }
}
```
- The option `-j` should be the absolute path to your JSON design tokens file in your project
- The option `-t` (optional) is a list of your themes separate by a comma.

Add this script at the beginning of your scripts to build your project or run the dev environment.
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

#### Create a folder that will hold the generated css and import it in your global.css
1. Install `postcss-import` in your project
    - (npm install | pnpm add | yarn add) -D postcss-import
    - In your postcss.config.js file add postcss-import plugin
   ```js
    module.exports = {
      plugins: {
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {},
      }
    }
      ```
2. Create a folder named `sd-output`
3. inside the `sd-output` create an empty `index.css` file
4. import the folder `sd-output` in your `global.css` file
```css
@import './sd-output';
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  ...
}
```

<br>

#### Get and set Tailwind CSS classes

Override or extend your theme with the getTailwindClasses utility function.

getTailwindClasses function take 2 parameters.
- the JSON design tokens file
- an optional array of your themes (default = ["global"])

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

...

## What is set a the moment...

[//]: # (todo review the text)

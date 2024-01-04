# Tokens Studio Tailwind

**@gsuiffet/tokens-studio-tailwind** is a npm package (open source) designed to streamline the integration of design tokens from Tokens Studio into Tailwind CSS projects.

## Introduction

Tokens Studio Tailwind simplifies the process of integrating design tokens from Tokens Studio into Tailwind CSS projects. It ensures consistency in your design system by providing an efficient way to map design tokens to CSS properties.

## Compatibility
This package is compatible with Tailwind CSS version 3.3.5 and currently supports the free version ^1 of Tokens-studio. For different versions, please verify compatibility or consider updating your Tailwind CSS installation.

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
See the [Documentation](https://tokens-studio-tailwind-doc.vercel.app)

## Contributing
To contribute to this project:

* Run `pnpm i` to install dependencies.
* Run `pnpm run build && node dist/index.js -j __mock__/tokens.json -t global,dark` to test the program
* Run `changeset` to create a changeset (this will be used to update the package version)
* Create a Pull request for your branch

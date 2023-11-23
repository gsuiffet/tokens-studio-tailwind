import { program } from '../src/program';
import { MISSING_DESIGN_TOKEN_PATH, MISSING_GLOBAL_THEME } from '../src/utils';
import fs from 'fs';
import { SD_OUTPUT_DIRECTORY_PATH } from '../src/types';

const simpleTokenPath = './__mock__/tokens.json';
const CompositeTokenPath = './__mock__/tokensWithBaseAndComponent.json';

function clean() {
  if (fs.existsSync(SD_OUTPUT_DIRECTORY_PATH)) {
    const createdFiles = fs.readdirSync(SD_OUTPUT_DIRECTORY_PATH);
    createdFiles.forEach((createdFile) =>
      fs.unlinkSync(`${SD_OUTPUT_DIRECTORY_PATH}/${createdFile}`),
    );
    fs.rmdirSync(SD_OUTPUT_DIRECTORY_PATH);
  }
}

describe('program', () => {
  beforeEach(() => {
    clean();
  });
  afterAll(() => {
    clean();
  });

  test('Should create files in sd-output directory without themes option', () => {
    program.parse(['node', '../dist/index.js', '-j', simpleTokenPath]);
    const createdFiles = fs.readdirSync(SD_OUTPUT_DIRECTORY_PATH);
    expect(createdFiles.sort()).toEqual(
      [
        'base-global.css',
        'components-global.css',
        'index.css',
        'tw-global.json',
        'tw-tokens.json',
      ].sort(),
    );
    expect(createdFiles).toHaveLength(5);
  });

  test('Should create files in sd-output directory with global theme only', () => {
    program.parse(['node', '../dist/index.js', '-j', simpleTokenPath, '-t', 'global']);
    const createdFiles = fs.readdirSync(SD_OUTPUT_DIRECTORY_PATH);
    expect(createdFiles.sort()).toEqual(
      [
        'base-global.css',
        'components-global.css',
        'index.css',
        'tw-global.json',
        'tw-tokens.json',
      ].sort(),
    );
    expect(createdFiles).toHaveLength(5);
  });

  test('Should create files in sd-output directory with multiple themes', () => {
    program.parse(['node', '../dist/index.js', '-j', simpleTokenPath, '-t', 'global,dark']);
    const createdFiles = fs.readdirSync(SD_OUTPUT_DIRECTORY_PATH);
    expect(createdFiles.sort()).toEqual(
      [
        'base-dark.css',
        'base-global.css',
        'components-dark.css',
        'components-global.css',
        'index.css',
        'tw-dark.json',
        'tw-global.json',
        'tw-tokens.json',
      ].sort(),
    );
    expect(createdFiles).toHaveLength(8);
  });

  test('Should create files in sd-output directory with multiple themes for composite tokens', () => {
    program.parse(['node', '../dist/index.js', '-j', CompositeTokenPath, '-t', 'global,dark']);
    const createdFiles = fs.readdirSync(SD_OUTPUT_DIRECTORY_PATH);
    expect(createdFiles.sort()).toEqual(
      [
        'base-dark.css',
        'base-global.css',
        'components-dark.css',
        'components-global.css',
        'index.css',
        'tw-dark.json',
        'tw-global.json',
        'tw-tokens.json',
      ].sort(),
    );
    expect(createdFiles).toHaveLength(8);
  });

  test('Should throw an Error in case of missing json design tokens path', () => {
    try {
      program.parse(['node', '../dist/index.js']);
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      expect(message).toBe(MISSING_DESIGN_TOKEN_PATH);
    }
  });

  test('Should throw an Error in case of the json design tokens path cant be find', () => {
    const fakeJsonPath = '/path/to/json.json';
    try {
      program.parse(['node', '../dist/index.js', '-j', fakeJsonPath]);
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      expect(message).toBe(
        "Unexpected error: Error: ENOENT: no such file or directory, open '/path/to/json.json'",
      );
    }
  });

  test('Should throw an Error in case of missing global theme', () => {
    try {
      program.parse(['node', '../dist/index.js', '-j', simpleTokenPath, '-t', 'dark']);
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      expect(message).toBe(MISSING_GLOBAL_THEME);
    }
  });
});

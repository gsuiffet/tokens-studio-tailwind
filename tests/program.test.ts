import { program } from '../src/program';
import { ErrorMissingDesignTokenPath, ErrorMissingGlobalTheme } from '../utils/error';
import { sdOutputDirectoryPath } from '../utils/constants';
import fs from 'fs';

const simpleTokenPath = './__mock__/tokens.json';
const CompositeTokenPath = './__mock__/tokensWithBaseAndComponent.json';

function clean() {
  if (fs.existsSync(sdOutputDirectoryPath)) {
    const createdFiles = fs.readdirSync(sdOutputDirectoryPath);
    createdFiles.forEach((createdFile) => fs.unlinkSync(`${sdOutputDirectoryPath}/${createdFile}`));
    fs.rmdirSync(sdOutputDirectoryPath);
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
    const createdFiles = fs.readdirSync(sdOutputDirectoryPath);
    expect(createdFiles.sort()).toEqual(['index.css', 'sd-global.css'].sort());
    expect(createdFiles).toHaveLength(2);
  });

  test('Should create files in sd-output directory with global theme only', () => {
    program.parse(['node', '../dist/index.js', '-j', simpleTokenPath, '-t', 'global']);
    const createdFiles = fs.readdirSync(sdOutputDirectoryPath);
    expect(createdFiles.sort()).toEqual(['index.css', 'sd-global.css'].sort());
    expect(createdFiles).toHaveLength(2);
  });

  test('Should create files in sd-output directory with multiple themes', () => {
    program.parse(['node', '../dist/index.js', '-j', simpleTokenPath, '-t', 'global,dark']);
    const createdFiles = fs.readdirSync(sdOutputDirectoryPath);
    expect(createdFiles.sort()).toEqual(['index.css', 'sd-global.css', 'sd-dark.css'].sort());
    expect(createdFiles).toHaveLength(3);
  });

  test('Should create files in sd-output directory with multiple themes for composite tokens', () => {
    program.parse(['node', '../dist/index.js', '-j', CompositeTokenPath, '-t', 'global,dark']);
    const createdFiles = fs.readdirSync(sdOutputDirectoryPath);
    expect(createdFiles.sort()).toEqual(
      [
        'index.css',
        'sd-base-typography-dark.css',
        'sd-base-typography-global.css',
        'sd-component-typography-dark.css',
        'sd-component-typography-global.css',
        'sd-dark.css',
        'sd-global.css',
      ].sort(),
    );
    expect(createdFiles).toHaveLength(7);
  });

  test('Should throw an Error in case of missing json design tokens path', () => {
    try {
      program.parse(['node', '../dist/index.js']);
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      expect(message).toBe(ErrorMissingDesignTokenPath);
    }
  });

  test('Should throw an Error in case of the json design tokens path does cant be find', () => {
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
      expect(message).toBe(ErrorMissingGlobalTheme);
    }
  });
});

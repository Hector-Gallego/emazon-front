import "jest-preset-angular/setup-jest";

export default {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs', 'node'],
    transform: {
      '^.+\\.(ts|html)$': 'ts-jest',
    },
    testEnvironment: 'jsdom', 
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
  };
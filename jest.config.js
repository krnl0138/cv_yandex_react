/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export const preset = 'ts-jest';
export const testEnvironment = 'node';
export default {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

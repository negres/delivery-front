const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)': '<rootDir>/src/components/$1',
    '^@/lib/(.*)': '<rootDir>/src/lib/$1',
    '^@/hooks/(.*)': '<rootDir>/src/hooks/$1',
  },
};

module.exports = createJestConfig(config);

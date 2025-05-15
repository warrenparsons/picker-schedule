module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.cjs'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.(test|spec).[jt]sx'],
  testPathIgnorePatterns: ['<rootDir>/tests/'],
};
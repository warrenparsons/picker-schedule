// playwright.config.js
module.exports = {
  testDir: './tests',
  testMatch: ['**/*.spec.cjs'],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
};
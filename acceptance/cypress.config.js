const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 1280,
  retries: {
    runMode: 3,
  },
  e2e: {
    supportFile: '../../../acceptance/cypress/support/e2e.js',
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/tests/*.cy.{js,jsx}',
  },
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

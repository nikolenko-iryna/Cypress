const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl:"https://www.saucedemo.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure:true,
    defaultCommandTimeout: 6000,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

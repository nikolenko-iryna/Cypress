const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://qauto2.forstudy.space",
  },
  env: {
    email: "iryna.hw21.qauto2b@test.com",
    password: "Qauto12345",
  },
});


const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "https://sandbox-app.oexpress.co.id/",
    "chromeWebSecurity": false ,
    "experimentalSessionAndOrigin": true,
    env: {
    },
    // screenshotsFolder: 'cypress/screenshots/register'
  },
});

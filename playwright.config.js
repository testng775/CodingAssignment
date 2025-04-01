const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
   use: {
       headless: true,  // Run in headless mode
       browserName: 'chromium',
   },
   timeout: 60000,
});

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
   use: {
       headless:true,  // Run in headless mode
       browserName: 'chromium',
       //slowMo: 3000,  // Slow down actions by 1000ms (1 second)

   },
   timeout: 120000,
});

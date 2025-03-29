// playwright.config.js
module.exports = {
    testDir: 'src/tests', // Path to your tests directory
    timeout: 60000, // Max time for a test (in milliseconds)
    use: {
        headless: false, // Set to true to run without opening the browser
        browserName: 'chromium', // You can set this to 'firefox' or 'webkit' as well
    },
};

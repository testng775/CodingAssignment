# Ryanair Flight Booking Test Automation

This repository contains Automated test suite for booking a flight on Ryanair using Playwright (JavaScript) and Page Object Model.

## Tech Stack
- Playwright
- JavaScript
- Docker
- Page Object Model (POM)

## Technical Requirements

To run these tests, the following tools and technologies are required:

1. **Node.js** (version 14 or later)
   - Install from [https://nodejs.org/](https://nodejs.org/)

2. **Playwright** (used for browser automation)
   - To install Playwright, run the following command:
     ```bash
     npm install playwright
     ```

3. **Playwright Test Runner**
   - Install Playwright Test for running tests:
     ```bash
     npm install @playwright/test
     ```

4. **Git** (for version control)

5. **Browser (Chromium)**: Playwright automatically installs the necessary browsers.


## Test Flow

1. Open Ryanair homepage
2. Search for flights (e.g., Dublin to Barcelona, Sep 8 - Sep 12, 2 adults)
3. Select "Regular" flight option
4. Click "Log in later"
5. Fill passenger details
6. Select seats for both flights
7. Navigate to the "Bags" page

## How to Execute the Tests

### 1. Clone the Repository
First, clone the repository to your local machine:

##git clone https://github.com/testng775/CodingAssignment.git

### 2. Execute Test Locally on Visual Studio
npm test

### 3. Execute Test Locally on Docker Container
1. Update  headless:false from playwright.config.js
2. Build Docker Image - docker build -t ryanair-playwright-tests .
3. Run Docker Container - docker run --rm ryanair-playwright-tests  




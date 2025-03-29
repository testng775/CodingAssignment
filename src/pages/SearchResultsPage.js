// src/pages/SearchResultsPage.js
class SearchResultsPage {
    constructor(page) {
      this.page = page;
      // Define locators for the search results page
      this.selectButtonSelector = 'button.flight-card-summary__select-btn';
      this.flightSelector = 'flight-card-summary';
        this.selectButtonLocator = 'button:has-text("Select")';
    }
  
    async selectFirstSuggestedFlight() {
        // Wait for the first flight suggestion to appear and click on it
         const firstFlightCard = this.page.locator(this.flightSelector).first();

        // Click on the first flight's 'Select' button
        await firstFlightCard.locator(this.selectButtonLocator).click();
    }
    async selectSecondSuggestedFlight(){
    // Get the second flight button   
    await this.page.getByRole('button', { name: 'Select' }).click();
    await this.page.waitForTimeout(5000);
    }

      }
  
  
  module.exports = SearchResultsPage;  
  
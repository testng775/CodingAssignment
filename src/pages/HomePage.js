class HomePage{
constructor(page)
{
//Locators for elements on homePage    
this.page=page;
this.fromFieldSelector = 'role=textbox[name="From"]';
this.toFieldSelector = 'role=textbox[name="To"]';

this.departureDateField='#input-button__display-value';

this.returnDateField='#input-button__dates-to';
this.searchButton='button:has-text("Search")';

// Locators for the cookie pop-up (adjust these based on your page's HTML structure)
this.cookieBanner = '.cookie-popup-with-overlay__box';
this.acceptCookiesButton = 'button:has-text("Yes, I agree")'; // Adjust to match the actual button


}

async navigate()
{
    await this.page.goto('https://www.ryanair.com/');
    await this.handleCookiePopup();
}


async handleCookiePopup()
{
    try {
        // Wait for the cookie banner to be visible
        await this.page.waitForSelector(this.cookieBanner, { state: 'visible', timeout: 5000 });

        // If the cookie banner is found, click on the 'Yes I Agree' button
        await this.page.click(this.acceptCookiesButton);
    } catch (error) {
        // If no cookie banner is found, continue with the test
        console.log('No cookie banner');
    }


}


//Selecting 'From' & 'To' Flight Destinations
async searchFlightDestination(from,to)
{
await this.page.click(this.fromFieldSelector);
await this.page.fill(this.fromFieldSelector, from);
await this.page.waitForTimeout(5000);

await this.page.click(this.toFieldSelector);
await this.page.waitForTimeout(1000);
await this.page.fill(this.toFieldSelector, to);
await this.page.keyboard.press('Tab');
await this.page.waitForTimeout(5000);

}

//Selecting 'Departure' & 'Return' Dates
async selectFlightDates(month, day) {
    // Click the month button dynamically
    await this.page.getByRole('button', { name: month }).first().click();

    // Click the day button dynamically
    await this.page.getByText(day, { exact: true }).first().click();

    // Optionally wait for 1 second
    await this.page.waitForTimeout(1000);

    // Select return date dynamically (if required)
    await this.page.getByText('12').first().click();
  }


  async selectPassengers() {

    await this.page.getByRole('button', { name: 'Passengers 1 Adult' }).click();
    await this.page.locator('.counter__button-wrapper--enabled').first().click();
    await this.page.getByRole('button', { name: 'Done' }).click();
    await this.page.waitForTimeout(5000);

  }

async searchFlights(){
    await this.page.getByRole('button', { name: 'Search' }).click();

}

}

module.exports = HomePage;

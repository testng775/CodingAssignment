class PassengerPage{
constructor(page){
this.page=page;
this.passengerSection = this.page.locator('div[data-ref^="pax-details__ADT-"]'); 
this.emailField = 'role=textbox[name="email"]';
this.passwordField = 'role=textbox[name="password"]';
this.loginButton='button:has-text("Log in")';
this.loginLaterLink='button:has-text("Log in later")';


this.passenger1FirstName = '[name="form.passengers.ADT-0.name"]';
this.passenger1LastName = '[name="form.passengers.ADT-0.surname"]';


this.passenger2Title = '/html/body/app-root/flights-root/div/div/div/div/flights-lazy-content/flights-passengers/ry-spinner/pax-app-container/pax-app/ry-spinner/div/div/div[2]/pax-app-form-container/pax-app-form/form/pax-passenger-container[2]/pax-passenger/div/pax-passenger-details-container/pax-passenger-details/pax-passenger-details-form-container/pax-details-form/ry-dropdown/div[2]/button';
this.passenger2TitleMr='//*[@id="title-0-error-message"]/div[2]/div/div/ry-dropdown-item[1]/button/div/div[1]'
this.passenger2FirstName = '[name="form.passengers.ADT-1.name"]';
this.passenger2LastName = '[name="form.passengers.ADT-1.surname"]';


}


async ryanairLoginSection(email, password)
{
//click Login Section
await this.page.getByRole('button', { name: 'Log in' }).click();

//Enter Email
await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'email@email.com' }).click();
await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'email@email.com' }).fill(email);
await this.page.waitForTimeout(5000);

//Enter Password
await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Password' }).click();
await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Password' }).fill(password);
await this.page.waitForTimeout(5000);

//Click Login Button
await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Log in' }).click();
//await this.page.waitForTimeout(5000);

}

async flightTypeSelection(){
    await this.page.waitForTimeout(5000);

  const flightRegularSelection = await this.page.locator('th[data-e2e="fare-card-regular"]');
  await flightRegularSelection.waitFor({ state: 'visible' });
 await flightRegularSelection.click();
await this.page.waitForTimeout(5000);
}

async isPassengerSectionVisible() {
    // Page Down using keyboard.press
await this.page.keyboard.press('PageDown');

// Check if the "Passengers" section is visible
    const passengerSections=this.passengerSection;
    // Get the number of matching elements ( passengers)
    const count = await passengerSections.count();

    // Check if all matching elements are visible
    for (let i = 0; i < count; i++) {
        const passenger = passengerSections.nth(i);
        const isVisible = await passenger.isVisible();
        if (!isVisible) {
            return false; // Return false if any section is not visible
        }
    }

    return true; // Return true if all sections are visible
}
async isPassengerSectionDisabled() {
    // Check if the "Passengers" section is disabled
    const passengerSections = this.passengerSection;
    
    // Get the number of matching elements (passengers)
    const count = await passengerSections.count();

    // Check if any of the matching elements (passenger sections) is disabled
    for (let i = 0; i < count; i++) {
        const passenger = passengerSections.nth(i);
        const isDisabled = await passenger.isDisabled();
        if (!isDisabled) {
            return false; // Return false if any section is not disabled
        }
    }

    return true; // Return true if all sections are disabled
}


async isPassengerSectionActive() {

// Check if the "Passengers" section is disabled
const passengerSections = this.passengerSection;
    
// Get the number of matching elements (passengers)
const count = await passengerSections.count();

// Check if any of the matching elements (passenger sections) is enabled
for (let i = 0; i < count; i++) {
    const passenger = passengerSections.nth(i);
    const isEnabled = await passenger.isEnabled();
    if (!isEnabled) {
        return false; // Return false if any section is not enabled
    }
}

return true; // Return true if all sections are disabled


    // Ensure passenger section is active (not disabled)
    //return await this.page.isEnabled(this.passengerSection);
}


async clickLoginLater(){
// Page Down using keyboard.press to view the log in later link
await this.page.keyboard.press('PageDown');
await this.page.click('span.login-touchpoint__login-later');
await this.page.waitForTimeout(5000);
//await this.page.pause();
}

async isPassenger2TitleVisible() {
    try {
        // Wait for the title dropdown of Passenger 2 to be visible
        const titleSelector = 'button.dropdown__toggle:nth-of-type(2)';
        
        // Wait for the selector to be visible with a timeout of 5000ms
        await this.page.waitForSelector(titleSelector, { state: 'visible', timeout: 5000 });
        
        console.log("Passenger 2's title dropdown is visible.");
        return true; // Return true if the dropdown is visible
    } catch (error) {
        console.log("Passenger 2's title dropdown is NOT visible.");
        return false; // Return false if the dropdown is not visible within the timeout
    }
}

async fillPassengerData(passengerIndex, title, firstName, lastName) {
    // Dynamically select the correct fields for title, first name, and last name based on passenger index
    const titleSelector = passengerIndex === 1 ? this.passenger1Title : this.passenger2Title;
    const firstNameInput = passengerIndex === 1 ? this.passenger1FirstName : this.passenger2FirstName;
    const lastNameInput = passengerIndex === 1 ? this.passenger1LastName : this.passenger2LastName;

    // Select Title for Passenger 1
    if (passengerIndex === 1) {
        // Wait for the Passenger 1 title dropdown button to be visible and click
        await this.page.locator('pax-passenger').filter({ hasText: 'Passenger 1 Adult Title -' }).getByRole('button').click();
        
        // Wait for the "Mr" option to be visible and click
        await this.page.getByRole('button', { name: 'Mr', exact: true }).click();
    } 
    // Select Title for Passenger 2
    else if (passengerIndex === 2) {
        // Wait for the Passenger 2's title dropdown button to be visible
        await this.page.locator(`xpath=${this.passenger2Title}`).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(`xpath=${this.passenger2Title}`).click();

        // Wait for the "Mr" option to be visible in the dropdown
        await this.page.locator(`xpath=${this.passenger2TitleMr}`).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(`xpath=${this.passenger2TitleMr}`).click();

        await this.page.waitForTimeout(2000); // Reduced wait time after selecting the title
    }

    // Ensure that the first name and last name inputs are visible before interacting with them
    const firstNameLocator = this.page.locator(firstNameInput);
    const lastNameLocator = this.page.locator(lastNameInput);

    // Wait for the fields to be visible before filling them
    await firstNameLocator.waitFor({ state: 'visible', timeout: 5000 });
    await lastNameLocator.waitFor({ state: 'visible', timeout: 5000 });

    // Scroll to first name input field if it is out of view
    await firstNameLocator.scrollIntoViewIfNeeded();
    await lastNameLocator.scrollIntoViewIfNeeded();

    // Fill the first name and last name for the current passenger
    await firstNameLocator.fill(firstName);
    await lastNameLocator.fill(lastName);

    // Wait for a short time to ensure actions are completed before continuing
    await this.page.waitForTimeout(500); 

}

async clickContinueButton(){
    await this.page.getByRole('button', { name: 'Continue' }).click();
   // await this.page.waitForTimeout(5000);
    //await this.page.pause();
    }



/////////////////
}







module.exports = PassengerPage;  

class SeatSelectionPage {
    constructor(page) {
        this.page = page;
    }

    async selectSeats() {
        await this.page.click('button:has-text("Select seat")');
        await this.page.click('div.seat-available'); // Adjust as per selector
        await this.page.click('button:has-text("Next")');
    }

async seatSelection() {
    // Get all the available seats
    const availableSeats = await this.page.locator('.seatmap__seat--standard');
    
    // Get the total count of available seats
    const seatCount = await availableSeats.count();

    // Check if there are available seats
    if (seatCount === 0) {
     //   console.log('No available seats.');
        return;
    }

    // Pick a random seat index for Passenger 1
    const randomSeatNo = Math.floor(Math.random() * seatCount);

    // Click the random seat for Passenger 1
    await availableSeats.nth(randomSeatNo).click();
   // console.log(`Selected seat for Passenger 1: ${randomSeatNo + 1}`);
    

    // Get the updated count of available seats after Passenger 1's selection
    const updatedSeatCount = await availableSeats.count();

    // If there is more than one seat, pick a random seat for Passenger 2
    if (updatedSeatCount > 0) {
        let randomIndex2;
        do {
            // Pick a random index for Passenger 2 that is not the same as Passenger 1's seat
            randomIndex2 = Math.floor(Math.random() * updatedSeatCount);
        } while (randomIndex2 === randomSeatNo); 
        
        // Wait for the specific seat to be visible, enabled, and stable
await this.page.locator('.seatmap__seat--standard').nth(randomIndex2).waitFor({
    state: 'attached', // Wait for the element to be attached to the DOM
    timeout: 5000, // Timeout of 5 seconds
  });
  
  // Now click the seat
  await availableSeats.nth(randomIndex2).click();
  //console.log(`Selected seat for Passenger 2: ${randomIndex2 + 1}`);
  
  // Click the random seat for Passenger 2
  await availableSeats.nth(randomIndex2).click();
  //  console.log(`Selected seat for Passenger 2: ${randomIndex2 + 1}`);
        
    }
}

async nextFlightButton() {
    // Wait for the button to be visible and attached to the DOM before clicking
    await this.page.getByRole('button', { name: 'Next flight' }).waitFor({
        state: 'visible',  // Ensure the button is visible
        timeout: 10000,     // Set a reasonable timeout of 10 seconds
    });

    // Now click the button
    await this.page.getByRole('button', { name: 'Next flight' }).click({ force: true });
    await this.page.waitForTimeout(6000);

}

async flightContinueButton(){
    await this.page.getByRole('button', { name: 'Continue' }).click();

    // Wait for the button to be visible and attached to the DOM before clicking
    await this.page.getByRole('button', { name: 'Continue' }).waitFor({
        state: 'visible',  // Ensure the button is visible
        timeout: 30000,     // Set a reasonable timeout of 10 seconds
    });

    // Now click the button
    await this.page.getByRole('button', { name: 'Continue' }).click({ force: true });
    await this.page.waitForTimeout(6000);

}

async handleFlightSeatPopup() {
    try {
        // Wait for the popup to be visible
        await this.page.waitForSelector('.seats-offer__wrapper', { state: 'visible', timeout: 5000 });

        // If the popup appears, wait for the "No, thanks" button to be visible and click on it
        const noThanksButton = this.page.locator('button:has-text("No, thanks")');
        
        // Wait for the button to be attached and visible
        await noThanksButton.waitFor({
            state: 'attached',  // Ensure the button is attached to the DOM
            timeout: 3000,      // Timeout for waiting for the button (3 seconds)
        });

        // Click the "No, thanks" button
        await noThanksButton.click();

        console.log('Clicked the "No, thanks" button');
    } catch (error) {
        // If the popup does not appear, continue with the test
        console.log('No popup appeared, continuing with the test');
    }
}

async flighttwowait(){
    await this.page.waitForTimeout(5000);
}

async flightPopupFastTrack(){
 await this.page.getByRole('button', { name: 'No, thanks' }).click();

 const flightPopupFastTrackSelector = '.enhanced-takeover-beta__modal';
 const noThanksButtonSelector = `${flightPopupFastTrackSelector} button:has-text("No, thanks")`;
 
 if (await this.page.isVisible(flightPopupFastTrackSelector )) {
   await this.page.click(noThanksButtonSelector);
 }

}


}

module.exports = SeatSelectionPage;
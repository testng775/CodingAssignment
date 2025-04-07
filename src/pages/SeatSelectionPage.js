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
        console.log('No available seats.');
        return;
    }

    // Pick a random seat index for Passenger 1
    const randomSeatNo = Math.floor(Math.random() * seatCount);

    // Click the random seat for Passenger 1
    await availableSeats.nth(randomSeatNo).click();
    console.log(`Selected seat for Passenger 1: ${randomSeatNo + 1}`);
    
    // Wait for the seat selection to complete by waiting for an element to update
    //await this.page.waitForSelector('.seatmap__seat--standard:has-text("Included")'); // Wait for a seat to be marked as "Selected"
    //await this.page.waitForSelector('.seat__seat--occupied');


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
  console.log(`Selected seat for Passenger 2: ${randomIndex2 + 1}`);
  
        // Click the random seat for Passenger 2
        await availableSeats.nth(randomIndex2).click();
        console.log(`Selected seat for Passenger 2: ${randomIndex2 + 1}`);
        
        // Wait for the seat selection to complete (just wait for a selector or change in state)
       // await this.page.waitForSelector('.seatmap__seat--standard:has-text("Selected")'); // Update with proper condition
    }
}




async nextFlightButton() {
    // Wait for the button to be visible and ready to be clicked
    await this.page.getByRole('button', { name: 'Next flight' }).click();

    //await this.page.locator('button:has-text("Next flight")').waitFor({ state: 'attached' });
    //await this.page.locator('button:has-text("Next flight")').waitFor({ state: 'visible' });

    // Now click the button
    //await this.page.locator('button:has-text("Next flight")').click({ force: true });

    console.log('Force clicked the Next flight button');

}

      

}

module.exports = SeatSelectionPage;
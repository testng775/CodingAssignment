import { test, expect } from '@playwright/test';

const HomePage = require('../pages/HomePage');
const SearchResultsPage = require('../pages/SearchResultsPage'); 
const PassengerPage=require('../pages/PassengerPage');
const SeatSelectionPage = require('../pages/SeatSelectionPage');
const BaggageSelectionPage = require('../pages/BaggageSelectionPage');

const passenger1Data = { title: 'Mr', firstName: 'John', lastName: 'Doe' };
const passenger2Data = { title: 'Mrs', firstName: 'Jane', lastName: 'Smith' };

test('Ryanair Flight Booking Process', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage= new SearchResultsPage(page);
  const passengerPage=new PassengerPage(page);
  const seatSelectionPage = new SeatSelectionPage(page);
  const baggageSelectionPage =new BaggageSelectionPage(page);
//==========================================================================================================
//======= TEST STEPS WITH ASSERTION (PRE STEPS)============================================================
//====THE FOLLOWING SECTION IS COVERING PRE STEPS ========================================================
//==== lOGIN TO RYANAIR
//===  SEARCH FOR FLIGHTS (DUBLIN-BASEL)
//==== SELECT DEPARTURE / RETURN DATE (TUE,8 SEP - SAT 12 SEP)
//==== SELECT PASSENGERS 2
//========================================================================================================

// Go to Ryanair homepage
 await homePage.navigate();

// Search for flights Location
await homePage.searchFlightDestination('Dublin','Basel');

//Selecting Departure Date
const month = 'Sept';  
const departureDay = '8';  

// Selecting Departure/Return Date
await homePage.selectFlightDates(month, departureDay);

// Select No of Ppassengers
  const numberOfAdults = 2; 
  await homePage.selectPassengers();

//Searching Flights
await homePage.searchFlights();


//=================================================================================================
//====THE FOLLOWING SECTION IS COVERING STEPS  1-5(REFER TO ASSIGNMENT) ===========================
//================================================================================================

//==== 1.Select suggested flights (e.g. “Regular” option) -> “Log in to myRyanair” and “Passengers” section
//======appear under selected flights; “Passengers” section is disabled


//Select Suggested Flight
await searchResultsPage.selectFirstSuggestedFlight();
await searchResultsPage.selectSecondSuggestedFlight();

//Select FlightType -Regular
await passengerPage.flightTypeSelection();

//Verify if PassengerSection is Visible
await passengerPage.isPassengerSectionVisible();

//Verify if PassengerSection is Visible
await passengerPage.isPassengerSectionDisabled();

//Log in to myRyanair -
//await passengerPage.ryanairLoginSection('testingshaima@gmail.com', 'Testing123!');


//==== 2.Choose “Log in later” -> “Passengers” section becomes active
//===================================================================
await passengerPage.clickLoginLater();
await passengerPage.isPassengerSectionActive();


//==== 3.Enter any valid values in fields in “Passengers” section and click [Continue] -> “Where would you like
//=====to sit?” page for the first flight is loaded
//===================================================================================

// fill in Passengers data
await passengerPage.fillPassengerData(1, passenger1Data.title, passenger1Data.firstName, passenger1Data.lastName);
await passengerPage.page.waitForTimeout(1000);  // Small wait before filling Passenger 2 data
await passengerPage.fillPassengerData(2, 'Mr', passenger2Data.firstName, passenger2Data.lastName); 
await passengerPage.clickContinueButton();



//==== 4.Choose any available seats and click [Next] -> “Where would you like to sit?” page for the second
//======flight is loaded
//=========================================================================================

// User selects seat for first flight
await seatSelectionPage.seatSelection();
await seatSelectionPage.nextFlightButton();

//==== 5.Choose any available seats and click [Continue] -> “What bags are you taking on board?” page is
//======loaded
//=========================================================================================
//await seatSelectionPage.nextFlightSeatSelection();

//await seatSelectionPage.handleFlightSeatPopup();
await seatSelectionPage.flightContinueButton();
await seatSelectionPage.seatSelection();
await seatSelectionPage.flighttwowait();
await seatSelectionPage.flightContinueButton();
await seatSelectionPage.flightPopupFastTrack();
//await baggageSelectionPage.verifyTitleCabinBags();


}


);
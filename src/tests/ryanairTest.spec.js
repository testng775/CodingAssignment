import { test, expect } from '@playwright/test';

const HomePage = require('../pages/HomePage');
const SearchResultsPage = require('../pages/SearchResultsPage'); 
const PassengerPage=require('../pages/PassengerPage');


test('Ryanair Flight Booking Process', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage= new SearchResultsPage(page);
  const passengerPage=new PassengerPage(page);
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
//==== 1.Select suggested flights (e.g. “Regular” option) -> “Log in to myRyanair” and “Passengers” section
//======appear under selected flights; “Passengers” section is disabled


//Select Suggested Flight
await searchResultsPage.selectFirstSuggestedFlight();
await searchResultsPage.selectSecondSuggestedFlight();

//Log in to myRyanair -
await passengerPage.ryanairLoginSection('testingshaima@gmail.com', 'Testing123!');

});
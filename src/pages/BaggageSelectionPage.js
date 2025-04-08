 class BaggageSelectionPage{
    constructor(page) {
      this.page = page;
    }
  
   


async verifyTitleCabinBags(){
 const cabinBagsElement = await this.page.locator('.header__title h3.card__header span[data-header=""]');

   // Check if the element contains the exact text 'Cabin Bags'
  const textContent = await cabinBagsElement.textContent();
  if (textContent && textContent.trim() === 'Cabin Bags') {
    console.log('Cabin Bags text is correctly displayed!');
  } else {
    console.log('Cabin Bags text is incorrect. Found:', textContent);
  }

  }}
  
  module.exports = BaggageSelectionPage;
//User loads the page//
describe('On Page Load', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ', {
      statusCode: 200,
      fixture: 'apiResponse.json', // This fixture should represent the initial state
    }).as('apiRequest');
    cy.visit('localhost:3000');
    cy.wait('@apiRequest');
  });


  // // ON PAGE LOAD GRABBING API INFORMATION
it('should GET all the dogs on page load', () => {
  cy.get('.dogs-container').children().should('have.length', 4)
  // expect the first() and last() cards content to be tested - testing the length of the cards alone is not enough
  //  //These images represent the first and last images of the moveis api
 cy.get('img[src="https://cdn2.thedogapi.com/images/IyR0sT3yy.jpg"]').should('be.visible');
 cy.get('.dogs-container').first().should('contain', 'Akita');
 cy.get('img[src="https://cdn2.thedogapi.com/images/Dtxn7vdC0.jpg"]').should('be.visible');
 cy.get('.dogs-container').last().should('contain', 'Standard Schnauzer');

})

  it('should display all initial UI elements correctly', () => {
    // Check Page Title
    cy.get('h1.big-heading').should('contain', 'Digital Dog Park');
    cy.get('h2.footer-heading').should('contain', 'Digital Dog Park');

    // Check Breed Type Buttons (a anchors elements insde the nav links)
    const breeds = ['Working', 'Herding', 'Non-Sporting', 'Toy', 'Hound', 'Terrier', 'Sporting'];
    breeds.forEach(breed => {
      cy.get(`nav.buttons-breed a`).contains(breed).should('be.visible');
    });

    // Check View Favorites and Back to Main Links
    cy.get('div.buttons-container a').contains('View Favorites').should('be.visible');
    cy.get('div.buttons-container a').contains('Back to Main').should('be.visible');

    // Check Fetch More Dogs Button
    cy.get('button.dog-tag-button').should('contain', 'Fetch More Dogs');

    // Check Dogs Information for each child element the wrap checks the DOM elements for img and name
    cy.get('.dogs-container').children().each((element) => {
      cy.wrap(element).find('img').should('be.visible'); // Checks if image is visible
      cy.wrap(element).find('.dog-breed-name').should('be.visible'); // Checks if breed name is not empty
    });
  });
})
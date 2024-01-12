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


// ERROR HANDELING 300
 // Test error handling
 describe('Error Handling', () => {
  it('should show error messaging to a user', () => {
    cy.intercept('GET', 'https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ', {
      forceNetworkError: true
    }).as('error');
    cy.visit('localhost:3000');
    cy.wait('@error');
    cy.get('h2').should('contain.text', 'Something went wrong, please try again later!');
  });
});
});





//FETCHING MORE DOGS BUTTON
describe('Fetch More Dogs Button', () => {
  it('should load more dogs when clicked', () => {
    cy.intercept('GET', 'https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ', {
      statusCode: 200,
      fixture: 'apiResponse.json',
    }).as('api1Request');

    cy.visit('localhost:3000');
    cy.wait('@api1Request');

    // Initial number of dogs 
    const initialDogCount = 4; 
    cy.get('.dogs-container').children().should('have.length', initialDogCount);

    cy.intercept('GET', 'https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ', {
      statusCode: 200,
      fixture: 'additionalDogs.json', // Fixture representing additional dogs
    }).as('api2Request');

    cy.get('.dog-tag-button').click();
    cy.wait('@api2Request');

    // Check if more dogs are loaded
    cy.get('.dogs-container').children().should('have.length.greaterThan', initialDogCount);
  });
});




//TEST THE BREED BUTTON FUNCTIONALITY
describe('Breed Button Functionality', () => {
  beforeEach(() => {
    // Stub the initial API call when the application loads
    cy.intercept('GET', 'https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ', {
      statusCode: 200,
      fixture: 'breedTypes.json', 
    }).as('breedTypes');

    // Visit the application
    cy.visit('localhost:3000');

    // Wait for the initial dogs to load
    cy.wait('@breedTypes');
  });

  it('should display only working breed dogs when the Working breed button is clicked', () => {
    
    cy.contains('nav.buttons-breed a', 'Working').click();

    // Wait for the URL to change to confirm navigation
    cy.url().should('include', '/group/working');

    cy.get('img[src="https://cdn2.thedogapi.com/images/IyR0sT3yy.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Akita');
  });

  it('should display only herding breed dogs when the herding breed button is clicked', () => {
  
    cy.contains('nav.buttons-breed a', 'Herding').click();

    // Wait for the URL to change to confirm navigation
    cy.url().should('include', '/group/herding');

    cy.get('img[src="https://cdn2.thedogapi.com/images/BjFmVohkU.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Bearded Collie');
  });


  
  it('should display only Non-Sporting breed dogs when the Non-Sporting breed button is clicked', () => {

    cy.contains('nav.buttons-breed a', 'Non-Sporting').click();

    // Wait for the URL to change to confirm navigation
    cy.url().should('include', '/group/non_sporting');

    cy.get('img[src="https://cdn2.thedogapi.com/images/HJGzbx9Nm_1280.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Bulldog');
  });

  it('should display only toy breed dogs when the toy breed button is clicked', () => {
    
    cy.contains('nav.buttons-breed a', 'Toy').click();

    // Wait for the URL to change to confirm navigation
    cy.url().should('include', '/group/toy');

    cy.get('img[src="https://cdn2.thedogapi.com/images/BJa4kxc4X_1280.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Affenpinscher');
  });

  it('should display only hound breed dogs when the hound breed button is clicked', () => {
   
    cy.contains('nav.buttons-breed a', 'Hound').click();

    // Wait for the URL to change to confirm navigation
    cy.url().should('include', '/group/hound');

    cy.get('img[src="https://cdn2.thedogapi.com/images/tChrH8dDJ.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Afghan Hound');
  });

  it('should display only terrier breed dogs when the terrier breed button is clicked', () => {
   
    cy.contains('nav.buttons-breed a', 'Terrier').click();

    // Wait for the URL to change to confirm navigation
    cy.url().should('include', '/group/terrier');

    cy.get('img[src="https://cdn2.thedogapi.com/images/CLRVGYoXA.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Bull Terrier');
  });

  it('should display only sporting breed dogs when the sporting breed button is clicked', () => {
    
    //CYPRESS KEPT CLICKING THE NON-SPORTING THIS WAS A WORKAROUND THAT I USED
    cy.get('nav.buttons-breed a').eq(6).click(); // Indexing starts at 0
  
    // Wait for the URL to change to confirm navigation
    cy.url().should('include', '/group/sporting');

    cy.get('img[src="https://cdn2.thedogapi.com/images/J4H-oD_7x.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Kooikerhondje');
  });

});





//Details of a dog
describe('Selecting dog details', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ', {
      statusCode: 200,
      fixture: 'apiResponse.json', // This fixture should represent the initial state
    }).as('apiRequest');
    cy.visit('localhost:3000');
    cy.wait('@apiRequest');
  });

 // // Selecting a dog
 it('should GET all the dogs data when selected', () => {
  cy.get('.dogs-container img').first().click(); // Click on the first dog image; 
 
  // Verify that the dog details are displayed correctly
  
    cy.get('img[src="https://cdn2.thedogapi.com/images/IyR0sT3yy.jpg"]').should('be.visible');
    cy.get('.dog-card').should('contain', 'Akita');
    cy.get('.dog-card').should('contain', 'Hunting bears');
    cy.get('.dog-card').should('contain', 'Working');
    cy.get('.dog-card').should('contain', '10 - 14 years');
    cy.get('.dog-card').should('contain', 'Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous');
    cy.get('.dog-card').should('contain', '65 - 115');
    cy.get('.dog-card').should('contain', '24 - 28');
    cy.get('.dog-card').should('contain', '🤍');
    cy.get('.dog-card').find('button').as('firstFavoriteButton').click();
   // text changes from "🤍 Favorite" to "❤️ Favorite" upon favoriting
      cy.get('@firstFavoriteButton').should('contain', '❤️');
 })

  
    
});

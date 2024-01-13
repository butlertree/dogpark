//MOUNT
describe('On Page Load', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ', {
      statusCode: 200,
      fixture: 'apiResponse.json', 
    }).as('apiRequest');
    cy.visit('localhost:3000');
    cy.wait('@apiRequest');
  });


  // // ON PAGE MOUNT GRABBING API INFORMATION
it('should GET all the dogs on page load', () => {
  cy.get('.dogs-container').children().should('have.length', 4)
  
 cy.get('img[src="https://cdn2.thedogapi.com/images/IyR0sT3yy.jpg"]').should('be.visible');
 cy.get('.dogs-container').first().should('contain', 'Akita');
 cy.get('.dogs-container').first().should('contain', '🤍');
 cy.get('img[src="https://cdn2.thedogapi.com/images/Dtxn7vdC0.jpg"]').should('be.visible');
 cy.get('.dogs-container').last().should('contain', 'Standard Schnauzer');
 cy.get('.dogs-container').last().should('contain', '🤍');
 
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
    cy.get('nav.buttons-container a').contains('View Favorites').should('be.visible');
    cy.get('nav.buttons-container a').contains('Back to Main').should('be.visible');

    // Check Fetch More Dogs Button
    cy.get('button.dog-tag-button').should('contain', 'Fetch More Dogs');

    // Check Information for each child 
    cy.get('.dogs-container').children().each((element) => {
    cy.wrap(element).find('img').should('be.visible'); 
    cy.wrap(element).find('.dog-breed-name').should('be.visible'); 
    });
  });


// ERROR HANDELING 300
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

//ERROR HANDELING 404
describe('Error Handling', () => {
  it('should test for 404 network error', () => {
    cy.intercept('GET', 'https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ', {
      statusCode: 200,
      fixture: 'apiResponse.json', 
    }).as('apiRequest');
    cy.visit('localhost:3000/hello');
    cy.wait('@apiRequest');
    cy.get('.not-found').contains('404 Page Not Found')
    cy.get('.not-found').contains('The page you are looking for does not exist.')
    cy.get('.not-found').contains('Main')
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
      fixture: 'additionalDogs.json', 
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

    cy.visit('localhost:3000');

    cy.wait('@breedTypes');
  });

  it('should display only working breed dogs when the Working breed button is clicked', () => {
    
    cy.contains('nav.buttons-breed a', 'Working').click();

    cy.url().should('include', '/group/working');

    cy.get('img[src="https://cdn2.thedogapi.com/images/IyR0sT3yy.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Akita');
  });

  it('should display only herding breed dogs when the herding breed button is clicked', () => {
  
    cy.contains('nav.buttons-breed a', 'Herding').click();

    cy.url().should('include', '/group/herding');

    cy.get('img[src="https://cdn2.thedogapi.com/images/BjFmVohkU.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Bearded Collie');
  });

  it('should display only Non-Sporting breed dogs when the Non-Sporting breed button is clicked', () => {

    cy.contains('nav.buttons-breed a', 'Non-Sporting').click();

    cy.url().should('include', '/group/non_sporting');

    cy.get('img[src="https://cdn2.thedogapi.com/images/HJGzbx9Nm_1280.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Bulldog');
  });

  it('should display only toy breed dogs when the toy breed button is clicked', () => {
    
    cy.contains('nav.buttons-breed a', 'Toy').click();

   
    cy.url().should('include', '/group/toy');

    cy.get('img[src="https://cdn2.thedogapi.com/images/BJa4kxc4X_1280.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Affenpinscher');
  });

  it('should display only hound breed dogs when the hound breed button is clicked', () => {
   
    cy.contains('nav.buttons-breed a', 'Hound').click();

    cy.url().should('include', '/group/hound');

    cy.get('img[src="https://cdn2.thedogapi.com/images/tChrH8dDJ.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Afghan Hound');
  });

  it('should display only terrier breed dogs when the terrier breed button is clicked', () => {
   
    cy.contains('nav.buttons-breed a', 'Terrier').click();

    
    cy.url().should('include', '/group/terrier');

    cy.get('img[src="https://cdn2.thedogapi.com/images/CLRVGYoXA.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Bull Terrier');
  });

  it('should display only sporting breed dogs when the sporting breed button is clicked', () => {
    
    //CYPRESS KEPT CLICKING THE NON-SPORTING THIS WAS A WORKAROUND THAT I USED
    cy.get('nav.buttons-breed a').eq(6).click(); // Indexing starts at 0
  
   
    cy.url().should('include', '/group/sporting');

    cy.get('img[src="https://cdn2.thedogapi.com/images/J4H-oD_7x.jpg"]').should('be.visible');
    cy.get('.dogs-container').should('contain', 'Kooikerhondje');
  });

});


//DETAILS OF A DOG
describe('Selecting dog details', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ', {
      statusCode: 200,
      fixture: 'apiResponse.json',
    }).as('apiRequest');
    cy.visit('localhost:3000');
    cy.wait('@apiRequest');
  });

 //SELECT A DOG
 it('should GET all the dogs data when selected', () => {
  cy.get('.dogs-container img').first().click(); // Click on the first dog image; 
 
  
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


// SHOW FAVORITED DOG
describe('Selecting dog details', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ', {
      statusCode: 200,
      fixture: 'apiResponse.json', 
    }).as('apiRequest');
    cy.visit('localhost:3000');
    cy.wait('@apiRequest');
  });

  it('should favorite dog selected', () => {
    // Click on the first dog image
    cy.get('.dog-container').first().find('button').as('firstFavoriteButton').click();

     cy.get('@firstFavoriteButton').should('contain', '❤️'); 
     cy.contains('nav.buttons-container a', 'View Favorites').click();
     cy.url().should('include', '/favorites');
     cy.get('img[src="https://cdn2.thedogapi.com/images/IyR0sT3yy.jpg"]').should('be.visible');
     cy.get('.dogs-container').should('contain', 'Akita');
  });

});
})


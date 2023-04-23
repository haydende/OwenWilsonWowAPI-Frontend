
function createGETStub(url: string, filename: string): void {
  cy.intercept({
    method: 'GET',
    url: url,
    hostname: 'owen-wilson-wow-api.onrender.com'
  }, {
    fixture: filename
  })
}

function createNotFoundStub(url: string): void {
  cy.intercept({
    method: 'GET',
    url: url,
    hostname: 'owen-wilson-wow-api.onrender.com',
  }, (req) => {
    req.reply(404);
  })
}

describe('Random Wow Search', () => {

  beforeEach(() => {
    createGETStub('wows/directors', 'random/wows-directors.json');
    createGETStub('wows/movies', 'random/wows-movienames.json');
  })

  specify('As a user, I should get a list of quotes from a random search with the default form entries', () => {

    // Stub request with response of: 5_2000_MeetTheParents_JayRoach.json
    createGETStub('/wows/random?results=5&year=2000','random/5_2000_MeetTheParents_JayRoach.json');

    cy.visit('/random');
    cy.get('div #wow-list').should('not.exist');
    cy.get('div #submit-message > label')
      .should('contain.text', "Press submit to get some results!");

    cy.wait(1000);

    cy.get('#submit-button-div > #submit-button').click();
    cy.wait(3000);

    cy.get('div #search-results-div > #search-error-message-div')
      .should('not.exist');

    cy.get('div #search-empty-message-div')
      .should('not.exist');

    cy.get('div #wow-list')
      .should('not.be.empty')
      .children()
        .should('have.length', 2);
  })

  specify('As a user, I should get no quotes from a random search with non-matching criteria', () => {
    // Stub request with response of: random/2_1800_BottleRocket_PaulWeitz.json
    createGETStub('/wows/random?results=2&year=1800&movie=Bottle Rocket&director=Paul Weitz', 'random/2_1800_BottleRocket_PaulWeitz.json');
    createGETStub('/wows/directors', '');

    cy.visit('/random');
    cy.get('div #wow-list').should('not.exist');
    cy.get('div #submit-message > label')
      .should('contain.text', "Press submit to get some results!");

    cy.wait(3000);

    cy.get('#results-div > #results-input').clear().type('2');
    cy.get('#year-div > #year-input').clear().type('1800');
    cy.get('#movie-name-div > #movie-name-select').select('N/A');
    cy.get('#director-name-div > #director-name-select').select('N/A');

    cy.get('#submit-button-div > #submit-button').click();
    cy.wait(1000);

    cy.get('div #search-results-div > #wow-list-div')
      .should('not.exist');

    cy.get('div #search-results-div > #search-error-message-div')
      .should('not.exist');

    cy.get('div #search-results-div > #search-empty-message-div > label')
      .should('contain.text', "It looks like nothing matched that criteria. Try again with something else!")
  })

  specify('As a user, I should get no quotes when the API endpoint cannot be found', () => {
    // Create Stubbed 404 Not Found response for the default search params
    createNotFoundStub('/wows/random?results=5&year=2000');

    cy.visit('/random');
    cy.get('div #wow-list').should('not.exist');
    cy.get('div #submit-message > label')
        .should('contain.text', "Press submit to get some results!");

    cy.wait(3000)

    cy.get('#submit-button-div > #submit-button').click();
    cy.wait(1000);

    cy.get('div #wow-list-div')
      .should('not.exist')

    cy.get('div #search-empty-message-div')
      .should('not.exist');

    cy.get('div #search-error-message-div > label')
      .should(
        'contain.text',
        "It looks like there was an error when getting results. Give that another go, and submit an issue on GitHub if this persists!"
      );
  })

  specify('As a user, I should get no quotes when the API endpoint cannot be found, but subsequent searches yield results', () => {
    // Create Stubbed 404 Not Found response for the default search params
    createNotFoundStub('/wows/random?results=5&year=2000');

    // Start with error scenario
    cy.visit('/random');
    cy.get('div #wow-list').should('not.exist');
    cy.get('div #submit-message > label')
      .should('contain.text', "Press submit to get some results!");

    cy.wait(3000)

    cy.get('#submit-button-div > #submit-button').click();
    cy.wait(1000);

    cy.get('div #wow-list-div')
      .should('not.exist')

    cy.get('div #search-empty-message-div')
      .should('not.exist');

    cy.get('div #search-error-message-div > label')
      .should(
        'contain.text',
        "It looks like there was an error when getting results. Give that another go, and submit an issue on GitHub if this persists!"
      );

    // End with another attempt, but this time successful
    // Stub request with response of: 5_2000_MeetTheParents_JayRoach.json
    createGETStub('/wows/random?results=5&year=2000','random/5_2000_MeetTheParents_JayRoach.json');

    cy.get('#submit-button-div > #submit-button').click();

    cy.get('div #search-results-div > #search-error-message-div')
      .should('not.exist');

    cy.get('div #search-empty-message-div')
      .should('not.exist');

    cy.get('div #wow-list')
      .should('not.be.empty')
      .children()
      .should('have.length', 2);
  })
})

import { createGETStub, createNotFoundStub } from "./StubHelper";
import {NOT_APPLICABLE} from "../../src/app/constants";

describe('Random Wow Search', () => {

  beforeEach(() => {
    createGETStub('wows/directors', 'random/wows-directors.json');
    createGETStub('wows/movies', 'random/wows-movienames.json');
  })

  specify('As a user, I should see the correct default values in the form fields and default state for the page', () => {

    cy.visit('/random');
    cy.wait(1000);

    let searchCriteriaDiv = cy.get('div #search-div > #search-criteria-div');

    searchCriteriaDiv.get('#results-div > #results-input')
      .should('contain.value', '5');

    searchCriteriaDiv.get('#year-div > #year-input')
      .should('contain.value', '2000');

    searchCriteriaDiv.get('#movie-name-div > #movie-name-select')
      .should('contain.value', NOT_APPLICABLE);

    searchCriteriaDiv.get('#director-name-div > #director-name-select')
      .should('contain.value', NOT_APPLICABLE);

    cy.get('#search-results-div')
      .should('not.exist');

    cy.get('#submit-message > label')
      .should('contain.text', 'Press submit to get some results!')

  })

  specify('As a user, I should get a list of quotes from a random search with the default form entries', () => {

    // Stub request with response of: 5_2000_NA_NA.json
    createGETStub('/wows/random?results=5&year=2000','random/5_2000_NA_NA.json');

    cy.visit('/random');
    cy.wait(1000);

    cy.get('div #wow-list-div').should('not.exist');
    cy.get('div #submit-message > label')
      .should('contain.text', "Press submit to get some results!");

    cy.get('#submit-button-div > #submit-button').click();
    cy.wait(3000);

    cy.get('div #search-results-div > #search-error-message-div')
      .should('not.exist');

    cy.get('div #search-empty-message-div')
      .should('not.exist');

    cy.get('#wow-list-div > wow-list > #wow-list')
      .children()
      .should('have.length', 2);
  })

  specify('As a user, I should get a list of quotes from a random search with movie name specified', () => {
    cy.visit('/random');
    cy.wait(1000);

    // Stub request with response of: 5_2000_The%20Wow%Movie_NA.json
    createGETStub('wows/random?results=5&year=2000&movie=The%20Wow%20Movie', 'random/5_2000_The%20Wow%20Movie_NA.json');

    let searchDiv = cy.get('#search-div');

    searchDiv.get('#search-criteria-div > #movie-name-div > #movie-name-select')
      .select('The Wow Movie')
      .blur();

    searchDiv.get('#submit-button-div > #submit-button').click();
    cy.wait(3000);

    cy.get('#wow-list-div > wow-list > #wow-list')
      .children()
      .should('have.length', 3);
  })

  specify('As a user, I should get a list of quotes from a random search with director name specified', () => {
    cy.visit('/random');
    cy.wait(1000);

    // Stub request with response of: 5_2000_The%20Wow%Movie_NA.json
    createGETStub('wows/random?results=5&year=2000&director=Wow%20Owowson', 'random/5_2000_NA_Wow%20Owowson.json');

    let searchDiv = cy.get('#search-div');

    searchDiv.get('#search-criteria-div > #director-name-div > #director-name-select')
      .select('Wow Owowson')
      .blur();

    searchDiv.get('#submit-button-div > #submit-button').click();
    cy.wait(3000);

    cy.get('#wow-list-div > wow-list > #wow-list')
      .children()
      .should('have.length', 3);
  })

  specify('As a user, I should get no quotes from a random search with non-matching criteria', () => {
    // Stub request with response of: random/2_1800_NA_NA.json
    createGETStub('/wows/random?results=2&year=1800', 'random/2_1800_NA_NA.json');

    cy.visit('/random');
    cy.get('div #wow-list-div').should('not.exist');
    cy.get('div #submit-message > label')
      .should('contain.text', "Press submit to get some results!");

    cy.wait(3000);

    cy.get('#results-div > #results-input').clear().type('2');
    cy.get('#year-div > #year-input').clear().type('1800');

    cy.get('#submit-button-div > #submit-button').click();
    cy.wait(1000);

    cy.get('div #search-results-div > #wow-list-div-div')
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
    cy.get('div #wow-list-div').should('not.exist');
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
    cy.get('div #wow-list-div').should('not.exist');
    cy.get('div #submit-message > label')
      .should('contain.text', "Press submit to get some results!");

    cy.wait(3000)

    cy.get('#submit-button-div > #submit-button').click();
    cy.wait(1000);

    cy.get('div #wow-list-div-div')
      .should('not.exist')

    cy.get('div #search-empty-message-div')
      .should('not.exist');

    cy.get('div #search-error-message-div > label')
      .should(
        'contain.text',
        "It looks like there was an error when getting results. Give that another go, and submit an issue on GitHub if this persists!"
      );

    // End with another attempt, but this time successful
    // Stub request with response of: 5_2000_NA_NA.json
    createGETStub('/wows/random?results=5&year=2000','random/5_2000_NA_NA.json');

    cy.get('#submit-button-div > #submit-button').click();

    cy.get('div #search-results-div > #search-error-message-div')
      .should('not.exist');

    cy.get('div #search-empty-message-div')
      .should('not.exist');

    cy.get('#wow-list-div > wow-list > #wow-list')
      .children()
      .should('have.length', 2);
  })
})

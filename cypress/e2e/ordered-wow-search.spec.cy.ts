import { createGETStub, createNotFoundStub } from "./StubHelper";

describe('OrderedWowSearchComponent', () => {

  specify('As a user, I should see the correct default values in the form fields', () => {
    cy.visit('/ordered');
    cy.wait(1000);

    let searchCriteriaDiv = cy.get('div #search-div > #search-criteria-div');

    searchCriteriaDiv
      .get('#start-index-div > #start-index-input')
        .should('contain.value', '0')

    let endIndexInputDiv = searchCriteriaDiv
      .get('#end-index-div > #end-index-input-div');

    endIndexInputDiv
      .get('#end-index-input')
        .should('contain.value', '0')
        .should('be.disabled');

    endIndexInputDiv
      .get('#use-end-index-checkbox')
        .should('not.be.checked');
  })

  specify('As a user, I should get some results when submitting the default form values', () => {

    // Stub request with response of: 0_0.json
    createGETStub('/wows/ordered/0-0', 'ordered/0_0.json');

    cy.visit('/ordered')
    cy.wait(1000);

    cy.get('div #search-results-div > #wow-list-div')
      .should('not.exist');

    cy.get('div #submit-message-div > label')
      .should('contain.text', "Press submit to get some results!");

    let searchCriteriaDiv = cy.get('#search-div > #search-criteria-div');
    searchCriteriaDiv.get('#start-index-div > #start-index-input')
      .should('contain.value', 0);

    searchCriteriaDiv.get('#end-index-div > #end-index-input-div > #end-index-input')
      .should('be.disabled')
      .should('contain.value', 0)

    cy.get('#submit-button-div > #submit-button').click();
    cy.wait(3000);

    cy.get('div #search-results-div > #search-error-message-div')
      .should('not.exist');

    cy.get('div #search-empty-message-div')
      .should('not.exist');

    cy.get('div #wow-list')
      .should('not.be.empty')
      .children()
        .should('have.length', 1);
  })

  specify('As a user, I should get no quotes from an ordered search with non-matching criteria', () => {

    // Stub request with response of: 100_100.json
    createGETStub('/wows/ordered/100-100', 'ordered/100_100.json');

    cy.visit('/ordered');
    cy.wait(1000);

    cy.get('div #search-results-div > #wow-list-div')
      .should('not.exist');

    let searchCriteriaDiv = cy.get('div #search-div > #search-criteria-div')

    searchCriteriaDiv.get('#start-index-div > #start-index-input')
      .clear()
      .type('100')
      .blur();

    searchCriteriaDiv.get('#end-index-div > #end-index-input-div > #end-index-input')
      .should('be.disabled')
      .should('contain.value', 100);

    cy.get('#submit-button-div > #submit-button').click();
    cy.wait(3000);

    cy.get('div #search-results-div > #search-error-message-div')
      .should('not.exist');

    cy.get('div #search-results > #wow-list')
      .should('not.exist');

    cy.get('div #search-results-div > #search-empty-message-div > label')
      .should('contain.text', "It looks like nothing matched that criteria. Try again with something else!")

  })

  specify('As a user, I should get not quotes when the API endpoint cannot be found', () => {

    // Stub request with 404 Not Found response
    createNotFoundStub('/wows/ordered/0-0');

    cy.visit('/ordered')
    cy.wait(1000);

    cy.get('div #search-results-div > #wow-list-div')
      .should('not.exist');

    cy.get('#submit-button-div > #submit-button').click();
    cy.wait(3000);

    cy.get('div #search-results > #wow-list')
      .should('not.exist');

    cy.get('div #search-results-div > #search-empty-message-div > label')
      .should('not.exist');

    cy.get('div #search-results-div > #search-error-message-div > label')
      .should(
        'contain.text',
        "It looks like there was an error when getting results. Give that another go, and submit an issue on GitHub if this persists!");
  })

  specify('As a user, I should get no quotes when teh API endpoint cannot be found, but subsequent searches yield results', () => {

    // Stub request with 404 Not Found response
    createNotFoundStub('/wows/ordered/0-0');
    // Stub request with '1-1.json'
    createGETStub('/wows/ordered/1-1', 'ordered/1_1.json');

    cy.visit('/ordered');
    cy.wait(1000);

    cy.get('#submit-button-div > #submit-button').click();
    cy.wait(3000);

    cy.get('div #search-results-div > #search-error-message-div > label')
      .should(
        'contain.text',
        "It looks like there was an error when getting results. Give that another go, and submit an issue on GitHub if this persists!");

    cy.get('div #search-div > #search-criteria-div > #start-index-div > #start-index-input')
      .clear()
      .type('1')
      .blur();

    cy.get('div #submit-button-div > #submit-button').click();
    cy.wait(3000);

    cy.get('div #search-results-div > #search-error-message-div')
      .should('not.exist');

    cy.get('div search-empty-message-div')
      .should('not.exist');

    cy.get('div #wow-list-div')
      .children()
        .should('have.length', 1)
  })
})

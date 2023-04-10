describe('Random Wow Search', () => {

  specify('As a user, I should get a list of quotes from a random search with the default form entries', () => {

    // Stub request with 5_2000_MeetTheParents_JayRoach.json
    cy.intercept({
      method: 'GET',
      url: '/wows/random?results=5&year=2000',
      hostname: 'owen-wilson-wow-api.onrender.com'
    }, {
      fixture: 'random/5_2000_MeetTheParents_JayRoach.json'
    })

    cy.visit('/random')
    cy.get('div #wow-list').should('be.empty')
    cy.wait(1000)

    cy.get('#submit-button-div > #submit-button').click()
    cy.wait(2000)

    cy.get('div #wow-list')
      .should('not.be.empty')
      .children()
        .should('have.length', 2);

  })
})

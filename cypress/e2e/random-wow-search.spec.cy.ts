describe('Random Wow Search', () => {

  specify('As a user, I should get a list of quotes from a random search', () => {
    cy.visit('/random')
    cy.get('div #wow-list').should('be.empty')
    cy.wait(1000)

    cy.get('#submit > button').click()
    cy.wait(2000)

    cy.get('div #wow-list').should('not.be.empty')

  })
})

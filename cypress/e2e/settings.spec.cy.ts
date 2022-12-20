describe('Settings', () => {

  const themes = [
    ['Light', 'rgb(240, 240, 240)'], ['Dark', 'rgb(30, 30, 30)']
  ];
  // TODO: import from fixture

  themes.forEach(($theme) => {
    const [name, colour] = $theme;

    specify(`As a user, I should be able to switch to the ${name} theme`, () => {
      cy.visit('/settings')
      cy.wait(2000)

      cy.get('select').select(name)
      cy.wait(2000)

      cy.get('#save-button').click()
      cy.wait(1000)

      cy.get('body').should('have.class', name.toLowerCase())
      cy.get('body').should('have.css', 'background-color', colour)
    });
  });

})

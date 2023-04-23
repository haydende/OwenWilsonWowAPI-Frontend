
export function createGETStub(url: string, filename: string): void {
  cy.intercept({
    method: 'GET',
    url: url,
    hostname: 'owen-wilson-wow-api.onrender.com'
  }, {
    fixture: filename
  })
}

export function createNotFoundStub(url: string): void {
  cy.intercept({
    method: 'GET',
    url: url,
    hostname: 'owen-wilson-wow-api.onrender.com',
  }, (req) => {
    req.reply(404);
  })
}

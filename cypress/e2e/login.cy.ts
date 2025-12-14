describe('Cypress login', () => {
  it('should provide a valid session', () => {
    // Login command sets up the session intercept and cookie
    cy.login();
    // Visit a route in order to allow cypress to actually set the cookie
    cy.visit('/');
    // Wait until the intercepted request is ready
    // /api/auth/session 으로 세션 확인하는 요청이 완료될 때까지 대기
    cy.wait('@session');
    // This is where you can now add assertions
    // Example: provide a data-test-id on an element.
    // This can be any selector that "always and only" exists when the user is logged in
    cy.get("[data-id='authenticated']")
      .should('exist')
      .then(() => {
        cy.log('Cypress login successful');
      });
  });
});

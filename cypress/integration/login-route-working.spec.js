describe('app works correctly with routes', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('should open cart page by default', function () {
    cy.contains('Соберите бургер');
  });

  it("should open profile page after 'личный кабинет' button click", function () {
    cy.get('p').contains('Профиль').click({ force: true });
    cy.contains('Профиль');
  });
});

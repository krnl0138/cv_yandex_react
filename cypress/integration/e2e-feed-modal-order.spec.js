describe('open feed page and click on order', function () {
    before(function () {
        cy.visit('https://spaceburger.nomoredomains.rocks/');
    });

    it('click лента заказов to open the feed page', function () {
        cy.get('[data-cy=feed-page-link]').click({ force: true })
    });

    it('click an order to open the modal', function () {
        cy.get('[data-cy=feed-order-0]').children('div').click({ force: true })
    });

    it('click to close the modal window', function () {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('[data-cy=modal-close]').click({ force: true })
    });
})
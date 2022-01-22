// перетаскивание ингредиента в конструктор,
// открытие модального окна с описанием ингредиента,
// отображение в модальном окне данных ингредиента,
// открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»,
// закрытие модальных окон при клике на кнопку закрытия.

describe('drag ingredients and order the burger', function () {
  before(function () {
    cy.visit('https://spaceburger.nomoredomains.rocks/');
  });

  it('drag n drop the bun in the cart', function () {
    const dataTransfer = new DataTransfer();
    cy.get('[data-cy=card-bun-0]').trigger("dragstart", {
      dataTransfer,
      force: true
    })

    cy.get('[data-cy=burger-constructor-bun-top]').trigger("drop", {
      dataTransfer,
      force: true
    });
  });

  it('drag n drop the ingredient in the cart', function () {
    const dataTransfer = new DataTransfer();
    cy.get('[data-cy=card-main-0]').trigger("dragstart", {
      dataTransfer,
      force: true
    })

    cy.get('[data-cy=burger-constructor-middle]').trigger("drop", {
      dataTransfer,
      force: true
    });
  });

  it('click the ingredient to open the modal', function () {
    cy.get('[data-cy=card-main-0]').click({ force: true })
  });

  it('click to close the modal window', function () {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
    cy.get('[data-cy=modal-close]').click({ force: true })
  });

  it('click the order button', function () {
    cy.findByText('Оформить заказ').click({ force: true })
  });

  it('get redirected to the login page', function () {
    cy.contains('Вход')
  })

  it('enter login credentials', function () {
    cy.get('form').find('input[name=email]').type('tom@tom.com', { force: true })
    cy.get('form').find('input[name=password]').type('tom', { force: true })
  });

  it('click the login button', function () {
    cy.findByText('Войти').click({ force: true })
  });

  it('click the order button after login', function () {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)
    cy.findByText('Оформить заказ').click({ force: true })
  });

  it('click to close modal window (10 secs wait from a server)', function () {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(18000)
    cy.get('[data-cy=modal-close]').click({ force: true })
  });

}); 
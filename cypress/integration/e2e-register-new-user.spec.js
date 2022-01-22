const getRandomCredentials = () => {
    const max = 10000;
    const randNum = Math.floor(Math.random() * max);
    const username = `userTest-${randNum}`;
    const email = `userTest${randNum}@test.com`.toLowerCase();
    const password = `userTestPassword-${randNum}`;
    return [username, email, password]
}
const [randUsername, randEmail, randPassword] = getRandomCredentials();

describe('open login page and register new user', function () {
    before(function () {
        cy.visit('https://spaceburger.nomoredomains.rocks/login');
    });

    it('get redirected to the login page', function () {
        cy.contains('Вход')
    })

    it('click зарегистрироваться button', function () {
        cy.contains('Зарегистрироваться').click({ force: true })
    })

    it('get redirected to the login page', function () {
        cy.contains('Регистрация')
    })

    it('enter login credentials', function () {

        cy.get('form').find('input[name=username]').type(randUsername, { force: true })
        cy.get('form').find('input[name=email]').type(randEmail, { force: true })
        cy.get('form').find('input[name=password]').type(randPassword, { force: true })
    });

    it('click зарегистрироваться button', function () {
        cy.contains('Зарегистрироваться').click({ force: true })
    })

    it('get redirected to the home page', function () {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.contains('Соберите бургер')
    })

    it('click профиль button', function () {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.contains('Профиль').click({ force: true })
    })

    it('get redirected to the login page', function () {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.contains('История заказов')
    })

    it('check login credentials', function () {
        cy.get('form').find('input[name=username]').should('have.value',randUsername)
        cy.get('form').find('input[name=email]').should('have.value',randEmail)
    });

})
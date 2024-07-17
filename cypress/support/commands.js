Cypress.Commands.add('fillPersonalData', (name, lastName, cpf, email) => {
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(name);
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(lastName);
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type('19051998');
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(cpf);
    cy.get('[data-cy="input-signup-personal-data-email"]').type(email)
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type(email)

    cy.get('[data-cy="input-signup-personal-data-password"]').type('123456789')
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]').type('123456789')

    cy.contains('Selecione a proficiência').click();
    cy.get('#dropdown-button-1 > .overflow-y-scroll > :nth-child(3)').click()

    cy.get('[data-cy="input-signup-personal-data-lgpd"]').click()
    cy.get('[data-cy="button-signup_submit_button_1"]').click();
})

Cypress.Commands.add('fillAdress', () => {
    cy.get('[data-cy="input-signup-address-cep"]').type('14407480')
    cy.get('[data-cy="input-signup-address-number"]').type('785')
})

Cypress.Commands.add('apiCep', () => {
    cy.intercept('**https://brasilapi.com.br/api/cep/v1/**').as('cep')
    cy.wait('@cep');
})


/// <reference types="cypress" />

const faker = require('faker-br');

context('Desafio técnico QA - Buildbox', () => {
  context('Processo de cadastro', () => {
    beforeEach(() => {
      cy.visit('https://qastage.buildbox.one/18/cadastro/');
      cy.get('[data-cy="button-btn-enroll"]').click();
    })
    it('Validar cadastro com sucesso', () => {
      // Preenchendo dados pessoais
      cy.fillPersonalData(faker.name.firstName(), faker.name.lastName(), faker.br.cpf(), faker.internet.email());
      cy.contains('Dados Pessoais e de acesso').should('exist')
      cy.contains('Já possui uma conta?').should('exist')

      // Preenchendo endereço
      cy.fillAdress()
      cy.get(`[x-show="steps[currentStep] === 'address'"] > .mb-11 > .text-neutral-900`).should('be.visible')
      cy.apiCep()
      cy.get('[data-cy="button-previous_item"]').should('be.visible');

      cy.get('[data-cy="button-signup_submit_button_3"]').click()

      // Validando tela de sucesso
      cy.contains('Thank you for joining us!').should('exist')
      cy.contains(' Agora você tem o passe para descobrir como o inglês pode te levar longe ').should('exist')

      cy.get('[data-cy="button-wide_window_button"]')
        .should('exist').should('be.visible')
    })
    it('Preenchendo CPF com formato inválido', () => {
      cy.fillPersonalData(faker.name.firstName(), faker.name.lastName(), 78945613203, faker.internet.email());
      cy.get(':nth-child(2) > .form-container > .input-error').should('contain.text', 'CPF inválido')
    })
    it('Preenchendo CPF que já está em uso', () => {
      cy.fillPersonalData(faker.name.firstName(), faker.name.lastName(), 12345678909, faker.internet.email());
      cy.get('.input-error').should('contain.text', 'Este CPF já está em uso')
    })
  })
})

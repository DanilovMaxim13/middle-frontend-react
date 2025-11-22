describe('Конструктор бургера', () => {
  it('Должен оформиться заказ', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh');
        win.localStorage.setItem('accessToken', 'test-access');
      },
    });
    cy.intercept('GET', 'ingredients', { fixture: 'data-ingredients.json' });
    cy.intercept('GET', 'user', { fixture: 'auth.json' });

    cy.get('[data-cy="ingredientId-643d69a5c3f7b9001cfa093c"]').as('ingredient1');
    cy.get('[data-cy="ingredientId-643d69a5c3f7b9001cfa0941"]').as('ingredient2');
    cy.get('[data-cy="ingredientId-643d69a5c3f7b9001cfa0942"]').as('ingredient3');
    cy.get('[data-cy="burgerConstructor"]').as('burgerConstructor');

    cy.get('@ingredient1').click();
    cy.contains('Детали ингредиента')
      .should('exist')
      .should('have.text', 'Детали ингредиента');
    cy.get('[data-cy="close-modal"]').as('close-modal-btn');
    cy.get('@close-modal-btn').click();

    cy.dragAndDrop('@ingredient1', '@burgerConstructor');
    cy.dragAndDrop('@ingredient2', '@burgerConstructor');
    cy.dragAndDrop('@ingredient3', '@burgerConstructor');

    cy.intercept('POST', 'orders', { fixture: 'order.json' });
    cy.get('[data-cy="btn-order"]').as('order-btn');
    cy.get('@order-btn').click();

    cy.contains('идентификатор заказа')
      .should('exist')
      .should('have.text', 'идентификатор заказа');
  });
});

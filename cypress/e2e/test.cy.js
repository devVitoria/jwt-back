describe("Página inicial", () => {
    it("Deve exibir o título corretamente", () => {
        cy.visit("http://192.168.6.3:3000/login");
        cy.visit("https://example.cypress.io");
        cy.title().should("include", "Cypress");

    });
});
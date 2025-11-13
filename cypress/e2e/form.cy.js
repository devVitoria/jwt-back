 describe("Formulario de contato", () => {
 it("Deve preencher e enviar o formulario", () => {
 cy.visit("http://localhost:3000/contato");

 cy.get('input[name="nome"]').type("Maria Silva");
 cy.get('input[name="email"]').type("maria@email.com");
 cy.get('textarea[name="mensagem"]').type("Ola! Teste de envio.");
 cy.get('button[type="submit"]').click();

 cy.contains("Mensagem enviada com sucesso").should("be.visible");
 });
 });

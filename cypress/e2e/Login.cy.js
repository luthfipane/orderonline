const config = require("../../global-var.json");
describe("Login Page", () => {
  it("Login Account", () => {
    cy.visit("/");
    cy.get('[name="email"]').type(config.emailLogin);
    cy.get('[name="password"]').type(config.password);
    cy.get('[type="submit"]').click();
    cy.contains("Diskon anda saat ini").should("be.visible");
    cy.screenshot("login", { overwrite: true });
  });
});

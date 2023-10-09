const config = require("../../global-var.json");
describe("Forgot Password Page", () => {
  it("Forgot Password", () => {
    cy.visit("/");
    cy.get('a[href="/password/reset"]').click();
    cy.get('[name="email"]').type(config.emailForgot);
    cy.get('[type="submit"]').click();
    cy.contains(
      "Kami sudah mengirimkan link untuk reset password Anda. Tolong cek email Anda!"
    ).should("be.visible");
    cy.screenshot("EmailSentForgotPassword", { overwrite: true });
    cy.wait(10000);
  });

  it("Verified Inbox Email", () => {
    const userinbox = config.emailForgot.slice(0, 12);
    cy.visit(`https://mailnesia.com/mailbox/${userinbox}`);
    cy.contains("Reset Password").click();
    cy.get(":nth-child(4) > .content-block > a")
      .should("have.attr", "href")
      .then((href) => {
        cy.visit(href, { failOnStatusCode: false });
        // cy.contains("klik disini").click();
        cy.wait(5000);

        cy.get('[name="password"]').type(config.newPassword);
        cy.get('[name="confirmPassword"]').type(config.newPassword);
        cy.get('[type="submit"]').click();
        cy.contains("Password Anda sudah diganti!").should("be.visible");
        cy.screenshot("SuccessForgotPassword", { overwrite: true });
      });
  });
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});

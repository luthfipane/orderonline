const common = require("../function/getRandomNumber");
const config = require("../../global-var.json");

describe("Generate UserEmail", () => {
  const userEmail = config.email + common.getRndInteger(1, 100);

  it("set data file", () => {
    cy.writeFile("cypress/fixtures/variable.json", { userEmail: userEmail });
  });
});

describe("Setup Variable", () => {
  let email = "";

  beforeEach(() => {
    cy.fixture("variable.json").then((common) => {
      email = common.userEmail;
    });
  });

  it("Register Account", () => {
    cy.visit("/");
    cy.get('a[href="/register"]').click();
    cy.get('[name="name"]').type(config.name);
    cy.get('[name="email"]').type(email + config.domain);
    cy.get('[name="password"]').type(config.password);
    cy.get('[name="phone"]').type(config.phone);
    cy.get('[type="submit"]').click();
    cy.contains("Please Check Your Email!").should("be.visible");
    cy.wait(10000);
  });

  it("Verification Email", () => {
    cy.visit(`https://mailnesia.com/mailbox/${email}`);
    cy.contains("Informasi Akun OExpress Anda").click();
    cy.contains("klik disini").click();
    cy.wait(10000);
    cy.contains("Verification Success!").should("be.visible")
    cy.screenshot("RegisterUser", { overwrite: true });
  });
})
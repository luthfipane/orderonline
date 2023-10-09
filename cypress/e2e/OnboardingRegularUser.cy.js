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
  });

  it("Fill The Form", () => {
    const NIK = Math.floor(1000000000000000 + Math.random() * 9999999999999999);
    cy.visit("/");
    cy.get('[name="email"]').type(email + config.domain);
    cy.get('[name="password"]').type(config.password);
    cy.get('[type="submit"]').click();
    cy.wait(5000);
    cy.get('[name="store_name"]').type(config.storeName);
    cy.get('[name="name"]').type(config.name);
    cy.get('[name="phone"]').type(config.phone);
    cy.get('[name="pickup_address"]').type(config.address);
    cy.get(".multiselect__input")
      .click({ force: true })
      .type("Bandung{downArrow}{enter}", { delay: 500 }, { force: true });
    cy.contains("Selanjutnya").click();
    cy.wait(5000);
    cy.get("#store-address").click();
    cy.get(".dnd-uploader").attachFile("test.png", {
      subjectType: "drag-n-drop",
    });
    cy.wait(5000);
    cy.contains("Selanjutnya").click();
    cy.wait(5000);
    cy.get(".multiselect__tags").click().type("{enter}");
    cy.get('[name="account_number"]').type(config.noRek);
    cy.get('[name="account_name"]').type(config.name);
    cy.get(".dnd-uploader").attachFile("test.png", {
      subjectType: "drag-n-drop",
    });
    cy.wait(5000);
    cy.contains("Selanjutnya").click();
    cy.wait(5000);
    cy.get(".dnd-uploader").attachFile("test.png", {
      subjectType: "drag-n-drop",
    });
    cy.wait(5000);
    cy.get('[placeholder="Masukkan NIK anda..."]').type(NIK, { delay: 500 });
    cy.contains("Selanjutnya").dblclick();
    cy.wait(5000);
    cy.get("#tnc-agreement").click();
    cy.get('[type="submit"]').eq(0).click();
    cy.wait(5000);
    cy.contains("Diskon anda saat ini").should("be.visible");
    cy.screenshot("OnBoardingUser", { overwrite: true });
  });
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});

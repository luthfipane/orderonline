const common = require("../function/getRandomNumber");
const config = require("../../global-var.json");

describe("Generate UserEmail", () => {
  const userEmail = config.corpEmail + common.getRndInteger(1, 100);

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
    cy.visit("corp/register", { failOnStatusCode: false });
    cy.get('[name="name"]').type(config.corpName);
    cy.get('[name="email"]').type(email + config.domain);
    cy.get('[name="password"]').type(config.corpPassowrd);
    cy.get('[name="phone"]').type(config.corpNumber);
    cy.get('[type="submit"]').click();
    cy.contains("Please Check Your Email!").should("be.visible");
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
    cy.get('[name="password"]').type(config.corpPassowrd);
    cy.get('[type="submit"]').click();
    cy.wait(5000);
    cy.get('[name="company_name"]').type(config.corpName);
    cy.get('[name="owner_name"]').type(config.ownerName);
    cy.get('[name="company_business"]').type(config.bidangBisnis);
    cy.get('[name="company_npwp"]').type(NIK, { delay: 500 });
    cy.get('[name="company_phone"]').type(config.corpNumber);
    cy.get('[name="company_email"]').type(email + config.domain);
    cy.get('[name="company_address"]').type(config.address);
    cy.get(".multiselect__input")
      .click({ force: true })
      .type("Bandung{downArrow}{enter}", { delay: 500 }, { force: true });
    cy.contains("Selanjutnya").click();
    cy.wait(5000);
    cy.get('[name="warehouse.sender_name"]').type(config.custBagian);
    cy.get('[name="warehouse.phone"]').type(config.custPhone);
    cy.get('[name="warehouse.name"]').type(config.custName);
    cy.get('[name="finance_name"]').type(config.custFinanceName);
    cy.get('[name="working_hour.start"]').type(config.custWorkHour.start);
    cy.get('[name="working_hour.end"]').type(config.custWorkHour.end);
    cy.contains("Senin").click({ force: true });
    cy.contains("Selasa").click({ force: true });
    cy.contains("Rabu").click({ force: true });
    cy.contains("Kamis").click({ force: true });
    cy.contains("Jumat").click({ force: true });
    cy.get(".multiselect__select").eq(0).click({ force: true });
    cy.contains("Bulanan").click({ force: true });
    cy.get('[name="pickup_time.start"]').type(config.custPickupHour.start);
    cy.get('[name="pickup_time.end"]').type(config.custPickupHour.end);
    cy.get("#payment-type-invoicing").click();
    cy.get("#store-address").click();
    cy.get("#tax-ppn").click();
    cy.get("#permission-service-0").click();
    cy.contains("Selanjutnya").click();
    cy.get(".dnd-uploader").eq(0).attachFile("test.png", {
      subjectType: "drag-n-drop",
    });
    cy.wait(5000);
    cy.get(".dnd-uploader").eq(1).attachFile("test.png", {
      subjectType: "drag-n-drop",
    });
    cy.wait(5000);
    cy.get(".dnd-uploader").eq(2).attachFile("test.png", {
      subjectType: "drag-n-drop",
    });
    cy.wait(5000);
    cy.get(".dnd-uploader").eq(3).attachFile("test.png", {
      subjectType: "drag-n-drop",
    });
    cy.wait(5000);
    cy.get(".dnd-uploader").eq(4).attachFile("test.png", {
      subjectType: "drag-n-drop",
    });
    cy.wait(5000);
    cy.contains("Selanjutnya").click();
    cy.wait(5000);
    cy.get(".multiselect__select").click();
    cy.contains("BCA").click();
    cy.get('[name="bank.account_number"]').type(config.custNoRek);
    cy.get('[name="bank.account_name"]').type(config.custName);
    cy.contains("Selanjutnya").click({ force: true });
    cy.wait(5000);
    cy.contains("Ya, Mengerti").click({ force: true });
    cy.wait(5000);
    cy.get("#tnc-agreement").click();
    cy.get('[type="submit"]').eq(0).click();
    cy.wait(5000);
    cy.contains("Peringatan Upload Surat Perjanjian").should("be.visible");
    cy.screenshot("OnBoardingCorporate", { overwrite: true });
  });
});

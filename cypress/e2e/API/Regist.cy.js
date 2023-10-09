const config = require("../../../global-var.json");
const common = require("../../function/getRandomNumber");
describe("API Register Account", () => {
  const userEmail = config.corpEmail + common.getRndInteger(1, 100);
  it("Register Account", () => {
    cy.request({
      method: "POST",
      url: "https://sandbox.api.oexpress.co.id/auth/member/register",
      failOnStatusCode: false,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "A298535C-B6AE-4EE4-B9B2-A07C996E76A7",
      },
      body: {
        name: config.apiName,
        email: userEmail + config.domain,
        password: config.apiPassword,
        phone: config.apiPhone,
        phone_alt: config.apiPhoneAlt,
        address: config.apiAdress,
        branch_id: config.apiBranchId,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.email).to.eq(userEmail + config.domain);
    });
  });
});

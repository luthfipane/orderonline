const config = require("../../../global-var.json");
describe("API Register Account", () => {
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
        name: config.emailLogin,
        email: config.emailLogin,
        password: config.apiPassword,
        phone: config.apiPhone,
        phone_alt: config.apiPhoneAlt,
        address: config.apiAdress,
        branch_id: config.apiBranchId,
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq(
        "Email sudah terdaftar di dalam sistem"
      );
    });
  });
});

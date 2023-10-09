const config = require("../../../global-var.json");
describe("API Reset Password", () => {
  it("Reset Password", () => {
    cy.request({
      method: "POST",
      url: "https://sandbox.api.oexpress.co.id/auth/member/password/reset",
      failOnStatusCode: false,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "A298535C-B6AE-4EE4-B9B2-A07C996E76A7",
      },
      body: {
        email: config.emailForgot,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(
        "Cek email Anda untuk membuat password baru"
      );
    });
  });
});

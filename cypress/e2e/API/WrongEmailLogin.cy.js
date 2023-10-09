const config = require("../../../global-var.json");
describe("API Login Account", () => {
  it("Login Wrong Account", () => {
    cy.request({
      method: "POST",
      url: "https://sandbox.api.oexpress.co.id/auth/member/login",
      failOnStatusCode: false,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "A298535C-B6AE-4EE4-B9B2-A07C996E76A7",
      },
      body: {
        email: config.wrongEmail,
        password: config.password,
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("Kombinasi email dan password salah");
    });
  });
});

import userData from "../fixtures/user-data.json";

describe("Auth test suite", () => {
  beforeEach(() => {
    cy.task("seedDataBase");
  });
  context("Register Tests", () => {
    it.only("should register new user", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/register",
        form: true,
        body: userData.precise
      }).then((resp) => {
        expect(resp.status).to.be.eq(200);
        expect(resp.body._id).to.not.null;
        expect(resp.body.isConfirm).to.be.false;
        expect(resp.body.roles[0]).to.be.eq("User");
      });
    });
    it("should failed on not pass required infos", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/register",
        form: true,
        body: userData.requireIssue,
        failOnStatusCode: false
      }).then((resp) => {
        expect(resp.status).to.be.eq(400);
        expect(resp.body.error.toLowerCase()).to.contain("is required");
      });
    });
    it("should failed on invalid email", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/register",
        form: true,
        body: userData.invalidEmail,
        failOnStatusCode: false
      }).then((resp) => {
        expect(resp.status).to.be.eq(400);
        expect(resp.body.error.toLowerCase()).to.contain("invalid email");
      });
    });
    it("should return error while duplicate email address", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/register",
        form: true,
        body: userData.precise,
        failOnStatusCode: false
      }).then((resp) => {
        expect(resp.status).to.be.eq(200);
        expect(resp.body.error).to.undefined;
      });
      cy.request({
        method: "POST",
        url: "/api/auth/register",
        form: true,
        body: userData.precise,
        failOnStatusCode: false
      }).then((resp) => {
        expect(resp.status).to.be.eq(400);
        expect(resp.body.error.toLowerCase()).to.contain("email exist");
      });
    });
    it("should return error while password length is not valid", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/register",
        form: true,
        body: userData.passwordLengthIssue,
        failOnStatusCode: false
      }).then((resp) => {
        expect(resp.status).to.be.eq(400);
        expect(resp.body.error.toLowerCase()).to.contain("invalid password");
      });
    });
  });

  context("Login Tests", () => {
    it("should login with valid exist user", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        form: true,
        body: userData.validLogin,
        failOnStatusCode: false
      }).then((resp) => {
        expect(resp.status).to.be.eq(200);
        expect(resp.body.token).to.exist;
        expect(resp.body.user).to.exist;
      });
    });
    it("should return error with invalid credentials", function () {
      cy.api({
        method: "POST",
        url: "/api/auth/login",
        body: userData.invalidLogin1,
        failOnStatusCode: false
      }).then((resp) => {
        expect(resp.status).to.be.eq(400);
        expect(resp.body.error).to.contain("invalid");
      });

      cy.api({
        method: "POST",
        url: "/api/auth/login",
        body: userData.invalidLogin2,
        failOnStatusCode: false
      }).then((resp) => {
        expect(resp.status).to.be.eq(400);
        expect(resp.body.error).to.not.undefined;
      });
    });
  });
});

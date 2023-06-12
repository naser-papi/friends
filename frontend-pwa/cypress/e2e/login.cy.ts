/// <reference types="Cypress"/>
import loginData from "../fixtures/login-data.json";

describe("login process test", () => {
  context("validation and general tests", () => {
    beforeEach(() => {
      cy.visit("/login");
    });
    it("should validate form with required info and min & max characters", () => {
      cy.validateForm(loginData.fields);
    });
    it("should show register page after click on signup link", () => {
      cy.get("[data-cy='signUpLink']").click();
      cy.location("pathname").should("contain", "/register");
    });
  });

  context("login process", () => {
    it("should go to home page after successful login", () => {
      cy.intercept("POST", "http://localhost:8082/api/auth/login", {
        statusCode: 200,
        body: loginData.savedUser
      }).as("loginApi");
      cy.visit("/login");
      cy.fillForm(loginData.fields);
      cy.get("button[data-cy='submit']").as("submit");
      cy.get("@submit").click();
      cy.get("@submit").should("be.disabled", true);
      cy.wait("@loginApi");
      cy.location("pathname").should("contain", "/home");
    });
    it.only("should show the returned error from backend", () => {
      cy.intercept("POST", "http://localhost:8082/api/auth/login", {
        statusCode: 400,
        body: { error: "server error" }
      }).as("loginApi");
      cy.visit("/login");
      cy.fillForm(loginData.fields);
      cy.get("button[data-cy='submit']").as("submit");
      cy.get("@submit").click();
      cy.get("@submit").should("be.disabled", true);
      cy.wait("@loginApi");
      cy.get("[data-cy='notifyBar']").contains("server error");
      cy.location("pathname").should("contain", "/login");
    });
  });
});

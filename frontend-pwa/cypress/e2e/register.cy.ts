/// <reference types="Cypress"/>
import regData from "../fixtures/register-data.json";

describe("Register Page Tests", () => {
  context("validations and general tests", () => {
    beforeEach(() => {
      cy.visit("/register");
    });
    it("should validate form with required info and min & max characters", () => {
      cy.validateForm(regData.fields);
    });
    it("should show login page after click on signIn link", () => {
      cy.get("[data-cy='signInLink']").click();
      cy.location("pathname").should("contain", "/login");
    });
  });
  context("submit register form", () => {
    it.only("should after success register, redirect to home page after successful registration", () => {
      cy.intercept("POST", "http://localhost:8082/api/auth/register", {
        statusCode: 200,
        body: regData.savedUser
      });
      cy.visit("/register");
      cy.fillForm(regData.fields);
      cy.get("button[data-cy='submit']").as("submit");
      cy.get("@submit").click();
      cy.get("@submit").should("be.disabled", true);
      cy.get("[data-cy='notifyBar']").contains("New User registered");
      cy.location("pathname").should("contain", "/home");
    });
    it("should show the returned error from backend", () => {
      cy.intercept("POST", "http://localhost:8082/api/auth/register", {
        statusCode: 400,
        body: { error: "invalid data" }
      }).as("registerApi");
      cy.visit("/register");
      cy.fillForm(regData.fields);
      cy.get("button[data-cy='submit']").as("submit");
      cy.get("@submit").click();
      cy.get("@submit").should("be.disabled", true);
      cy.wait("@registerApi");
      cy.get("[data-cy='notifyBar']").contains("invalid data");
      cy.location("pathname").should("contain", "/register");
    });
  });
});

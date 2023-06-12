/// <reference types="Cypress" />
import loginData from "../fixtures/login-data.json";

describe("all needed test for home page", () => {
  context("general tests", () => {
    it("should redirect to login without token", () => {
      cy.visit("/home");
      cy.location("pathname").should("eq", "/login");
    });
    it.only("should have three section for user info, post list, friends and a search bar in desktop view", () => {
      //cy.doLogin();
      cy.visit("/home", {
        onBeforeLoad(win) {
          win.initialState = {
            mode: "light",
            isLoggedIn: true,
            isFetchApi: false,
            userInfo: loginData.savedUser
          };
        }
      });
      cy.title().should("eq", "Home");
      cy.viewport("iphone-se2");
      cy.get("[data-cy='userAvatar']").click();
      cy.get("[data-cy='briefInfoBox']").should("be.visible");
      cy.get("body").click("right");
      cy.get("[data-cy='briefInfoBox']").should("not.be.visible");
    });
  });
});

/// <reference types="Cypress"/>
import loginData from "../fixtures/login-data.json";
import generalData from "../fixtures/general-data.json";

describe("general tests", () => {
  context("navigation tests", () => {
    it("should switch between different pages", () => {
      cy.wrap(generalData.pages).each((page: any) => {
        cy.visit(page.url, {
          onBeforeLoad(win) {
            if (page.needToken) {
              win.initialState = {
                mode: "light",
                isLoggedIn: true,
                isFetchApi: false,
                userInfo: loginData.savedUser
              };
            }
          }
        });
        cy.title().should("eq", page.title);
      });
    });
  });

  context("layout tests", () => {
    it("should switch between dark and light theme", () => {
      cy.visit("/", {
        onBeforeLoad(win: Cypress.AUTWindow) {
          win.initialState = {
            mode: "light",
            isLoggedIn: true,
            isFetchApi: false,
            userInfo: loginData.savedUser
          };
        }
      });
      cy.get("[data-cy='themeSwitch']").get("[type='checkbox']").as("themeSwitch");
      cy.get("@themeSwitch").should("have.value", "false");
      cy.get("body").should("have.backgroundColor", generalData.theme.lightBackground);
      cy.get("@themeSwitch").click();
      cy.get("body").should("have.backgroundColor", generalData.theme.darkBackground);

      cy.get("[data-cy='appTitle']").should("be.visible");
      cy.viewport("iphone-se2");
      cy.get("app-title").should("not.exist");
    });
  });

  context("auth tests", () => {
    it("should redirect to login without authentication", function () {
      cy.visit("/home");
      cy.location("pathname").should("contain", "/login");
    });
  });
});

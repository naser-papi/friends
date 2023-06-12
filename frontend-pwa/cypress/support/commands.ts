/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { IDataField } from "./models";
import { faker } from "@faker-js/faker";
import loginData from "../fixtures/login-data.json";

Cypress.Commands.add("doLogin", () => {
  cy.intercept("POST", "http://localhost:8082/api/auth/login", {
    statusCode: 200,
    body: loginData.savedUser
  }).as("loginApi");
  cy.visit("/login");
  cy.fillForm(loginData.fields);
  cy.get("button[data-cy='submit']").as("submit");
  cy.get("@submit").click();
});
Cypress.Commands.add("validateForm", (metadata: IDataField[]) => {
  cy.get("button[data-cy='submit']").click();
  metadata.forEach((field) => {
    if (field.required) {
      cy.get(`[data-cy='${field.name}-error']`).should("contain", "required");
    }
  });

  metadata.forEach((field) => {
    if (field.min) {
      cy.get(`[data-cy='${field.name}'] input`).type(faker.string.alpha(field.min - 1));
    }
  });
  cy.get("button[data-cy='submit']").click();

  metadata.forEach((field) => {
    if (field.min) {
      cy.get(`[data-cy='${field.name}-error']`).should("contain", `at least ${field.min}`);
    }
  });

  metadata.forEach((field) => {
    if (field.max) {
      cy.get(`[data-cy='${field.name}'] input`).type(faker.string.alpha(field.max + 1));
    }
  });

  cy.get("button[data-cy='submit']").click();

  metadata.forEach((field) => {
    if (field.max) {
      cy.get(`[data-cy='${field.name}-error']`).should("contain", `at most ${field.max}`);
    }
  });
});
Cypress.Commands.add("fillForm", (metadata: IDataField[]) => {
  let pass = faker.string.alpha(8);
  metadata.forEach((field) => {
    const min = field.min ? field.min + 1 : 3;
    switch (field.type) {
      case "text":
      case "multiLine":
        cy.get(`[data-cy="${field.name}"] input`).type(faker.string.alpha(min));
        break;
      case "password":
        cy.get(`[data-cy="${field.name}"] input`).type(pass);
        break;
      case "email":
        cy.get(`[data-cy="${field.name}"] input`).type(faker.internet.email());
        break;
      case "boolean":
        cy.get(`[data-cy="${field.name}"] input`).check();
        break;
      case "number":
        cy.get(`[data-cy="${field.name}"] input`).type(faker.number.int().toString());
        break;
      case "image":
        cy.get(`[data-cy="${field.name}-fileSelector"]`).selectFile("cypress/fixtures/me1.jpg", {
          force: true
        });
        break;
    }
  });
});
const compareColor = (color, property) => (targetElement) => {
  const tempElement = document.createElement("div");
  tempElement.style.color = color;
  tempElement.style.display = "none"; // make sure it doesn't actually render
  document.body.appendChild(tempElement); // append so that `getComputedStyle` actually works

  const tempColor = getComputedStyle(tempElement).color;
  const targetColor = getComputedStyle(targetElement[0])[property];

  document.body.removeChild(tempElement); // remove it because we're done with it

  expect(tempColor).to.equal(targetColor);
};

Cypress.Commands.overwrite("should", (originalFn, subject, expectation, ...args) => {
  const customMatchers = {
    "have.backgroundColor": compareColor(args[0], "backgroundColor"),
    "have.color": compareColor(args[0], "color")
  };

  // See if the expectation is a string and if it is a member of Jest's expect
  if (typeof expectation === "string" && customMatchers[expectation]) {
    return originalFn(subject, customMatchers[expectation]);
  }
  return originalFn(subject, expectation, ...args);
});

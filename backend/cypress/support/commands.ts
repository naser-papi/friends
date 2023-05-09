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

interface IRequestInfo {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
}

declare namespace Cypress {
  interface Chainable<Subject> {
    login(email: string, password: string): Chainable<Subject>;

    testInvalidToken(info: IRequestInfo): Chainable<Subject>;
  }
}

Cypress.Commands.add("login", (email, password) => {
  cy.api({
    method: "POST",
    url: "/api/auth/login",
    form: true,
    body: { email, password },
    failOnStatusCode: false
  }).then((resp) => {
    expect(resp.status).to.be.eq(200);
    expect(resp.body.token).to.not.null;
    cy.wrap(resp.body).as("userInfo");
  });
});

Cypress.Commands.add("testInvalidToken", ({ url, method }) => {
  cy.api({
    method,
    url,
    form: true,
    body: null,
    failOnStatusCode: false
  }).then((resp) => {
    expect(resp.status).to.be.eq(403);
    expect(resp.body.error).to.not.undefined;
  });

  cy.api({
    method,
    url,
    failOnStatusCode: false,
    headers: {
      Authorization: "dummytoken"
    }
  }).then((resp) => {
    expect(resp.status).to.be.eq(403);
    expect(resp.body.error).to.not.undefined;
  });
});

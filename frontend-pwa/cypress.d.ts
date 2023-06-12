import { IDataField } from "./cypress/support/models";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      validateForm(metadata: IDataField[]): Chainable;

      fillForm(metadata: IDataField[]): Chainable;

      doLogin(): Chainable;
    }
  }
}

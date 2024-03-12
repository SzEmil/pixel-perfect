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

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      signOut(): Chainable<any>;
      signIn(): Chainable<any>;
      signUp(): Chainable<any>;
      signUpMultipleTimes(numAttempts: number): Chainable<any>;
    }
    interface Window {
      Clerk?: {
        isReady: () => boolean;
        client: {
          signIn: {
            create: (options: {
              identifier: string;
              password: string;
            }) => Promise<{ createdSessionId: string }>;
          };
          signUp: {
            create: (options: {
              emailAddress: string;
              password: string;
            }) => Promise<{ createdSessionId: string }>;
          };
        };
        setActive: (options: { session: string }) => Promise<void>;
      };
    }
  }
}

// Cypress.Commands.add(`signOut`, () => {
//   cy.log(`sign out by clearing all cookies.`);
//   cy.clearCookies({ domain: undefined });
// });

// Cypress.Commands.add(`signIn`, () => {
//   cy.log(`Signing in.`);
//   cy.visit('http://localhost:3000/', {
//     failOnStatusCode: false,
//     auth: {
//       username: 'clerk',
//       password: 'test_password',
//     },
//   });

//   cy.window()
//     .should((window: Cypress.Window) => {
//       expect(window).to.not.have.property(`Clerk`, undefined);
//       expect(window.Clerk!.isReady()).to.eq(true);
//     })
//     .then((window: Cypress.Window) => {
//       const domain = (window as Window & typeof globalThis).location.hostname;
//       cy.clearCookies({ domain: domain });
//       return window.Clerk!.client.signIn.create({
//         identifier: Cypress.env(`test_email`),
//         password: Cypress.env(`test_password`),
//       });
//     })
//     .then(res => {
//       return cy.window().its('Clerk').invoke('setActive', {
//         session: res.createdSessionId,
//       });
//     })
//     .then(() => {
//       cy.log(`Finished Signing in.`);
//     });
// });

// Cypress.Commands.add(`signUp`, () => {
//   cy.log(`Signing up.`);
//   cy.visit('http://localhost:3000/', {
//     auth: {
//       username: 'clerk',
//       password: 'test_password',
//     },
//   });

//   cy.window()
//     .should((window: Cypress.Window) => {
//       expect(window).to.not.have.property(`Clerk`, undefined);
//       expect(window.Clerk!.isReady()).to.eq(true);
//     })
//     .then((window: Cypress.Window) => {
//       const domain = (window as Window & typeof globalThis).location.hostname;
//       cy.clearCookies({ domain: domain });
//       return window.Clerk!.client.signUp.create({
//         emailAddress: 'wefsowrites@gmail.com',
//         password: `408tz!co`,
//       });
//     })
//     .then(res => {
//       return cy.window().its('Clerk').invoke('setActive', {
//         session: res.createdSessionId,
//       });
//     })
//     .then(() => {
//       cy.log(`Finished Signing up.`);
//     });
// });

Cypress.Commands.add(`signOut`, () => {
  cy.log(`sign out by clearing all cookies.`);
  cy.clearCookies({ domain: null });
});

Cypress.Commands.add(`signIn`, () => {
  cy.log(`Signing in.`);
  cy.visit(`http://localhost:3000/`, {
    failOnStatusCode: false,
  });

  cy.window()
    .should(window => {
      expect(window).to.not.have.property(`Clerk`, undefined);
      expect(window.Clerk.isReady()).to.eq(true);
    })
    .then(async window => {
      await cy.clearCookies({ domain: window.location.domain });
      cy.log(`Cleared cookies`);
      const res = await window.Clerk.client.signIn.create({
        identifier: Cypress.env(`test_email`),
        password: Cypress.env(`test_password`),
      });
      cy.log(`Response:`, res);
      await window.Clerk.setActive({
        session: res.createdSessionId,
      });

      cy.log(`Finished Signing in.`);
    });
});

export {};

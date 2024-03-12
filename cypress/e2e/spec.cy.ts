// describe('Sign out', () => {
//   it('Should redirect to signIn page when non logged user trying to visit dashboard', () => {
//     cy.visit('http://localhost:3000/dashboard', {
//       failOnStatusCode: false,
//     });

//     cy.url().should('include', '/sign-in');
//   });
// });

// describe('Signed in', () => {
//   beforeEach(() => {
//     cy.session('signed-in', () => {
//       cy.signIn();
//     });
//   });

//   it('Shold redirect user to dashboard page when user is logged in', () => {
//     // open dashboard page
//     cy.visit('http://localhost:3000/dashboard', {
//       failOnStatusCode: false,
//     });

   // cy.get('#identifier-field').type(Cypress.env(`test_email`))
    // cy.contains('Image Transformation').click();

    // cy.contains('Image Restore').click();

    // cy.url().should('include', '/dashboard/transformations/image/add/restore');
//   });
// });

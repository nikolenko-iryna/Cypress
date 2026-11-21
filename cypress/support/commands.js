
Cypress.Commands.add("createExpense", (expenseData, token) => {
  return cy.request({
    method: "POST",
    url: "/api/expenses",
    headers: { Cookie: token },
    body: expenseData,
  });
});






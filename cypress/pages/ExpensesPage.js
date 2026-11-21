export class ExpensesPage {
  get fuelExpensesLink() {
    return cy.contains("a", "Fuel expenses");
  }

  get firstExpenseRow() {
    return cy.get("tbody tr").first();
  }
}


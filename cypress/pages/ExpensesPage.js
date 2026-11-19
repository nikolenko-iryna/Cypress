export class ExpensesPage {
  get fuelExpensesLink() {
    return cy.contains("a", "Fuel expenses");
  }

  get addExpenseButton() {
    return cy.contains("button", "Add an expense");
  }

  get carSelect() {
    return cy.get("#addExpenseCar");
  }

  get mileageField() {
    return cy.get("#addExpenseMileage");
  }

  get litersField() {
    return cy.get("#addExpenseLiters");
  }

  get totalCostField() {
    return cy.get("#addExpenseTotalCost");
  }

  get addButton() {
    return cy.get(".modal-footer").contains("button", "Add");
  }

  get firstExpenseRow() {
    return cy.get("tbody tr").first();
  }

  addFuelExpense(car, mileage, liters, totalCost) {
    this.fuelExpensesLink.click();
    this.addExpenseButton.click();
    this.carSelect.select(car);
    this.mileageField.clear().type(mileage);
    this.litersField.type(liters);
    this.totalCostField.type(totalCost);
    this.addButton.click();
  }
}

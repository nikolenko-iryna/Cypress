export class GaragePage {
  get addCarButton() {
    return cy.contains("button", "Add car");
  }

  get brandSelect() {
    return cy.get("#addCarBrand");
  }

  get modelSelect() {
    return cy.get("#addCarModel");
  }

  get mileageField() {
    return cy.get("#addCarMileage");
  }

  get addButton() {
    return cy.get(".modal-footer").contains("button", "Add");
  }

  get firstCarName() {
    return cy.get(".car_name").first();
  }

  addCar(brand, model, mileage) {
    this.addCarButton.click();
    this.brandSelect.select(brand);
    this.modelSelect.select(model);
    this.mileageField.type(mileage);
    this.addButton.click();
  }
}

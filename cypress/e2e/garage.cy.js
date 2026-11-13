import { GaragePage } from "../pages/GaragePage";
import { ExpensesPage } from "../pages/ExpensesPage";

const garagePage = new GaragePage();
const expensesPage = new ExpensesPage();

describe("Garage and fuel expenses", () => {
  beforeEach(() => {
    cy.visit("/", { auth: { username: "guest", password: "welcome2qauto" } });
    cy.env(["email", "password"]).then(({ email, password }) => {
      cy.login(email, password);
    });
    cy.deleteAllCars();
  });

  it("Add car", () => {
    garagePage.addCar("Audi", "TT", "100");
    garagePage.firstCarName.should("contain", "Audi TT");
  });

  it("Add fuel expense", () => {
    garagePage.addCar("BMW", "X5", "200");
    expensesPage.addFuelExpense("BMW X5", "250", "40", "2000");
    expensesPage.firstExpenseRow.should("contain", "250");
  });
});

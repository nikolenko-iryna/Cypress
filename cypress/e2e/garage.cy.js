import { faker } from "@faker-js/faker";
import { GaragePage } from "../pages/GaragePage";
import { ExpensesPage } from "../pages/ExpensesPage";

const garagePage = new GaragePage();
const expensesPage = new ExpensesPage();

describe("Garage and fuel expenses", () => {
  let token;

  beforeEach(() => {
    const user = {
      name: "John",
      lastName: "Dou",
      email: faker.internet.email(),
      password: "Qwerty12345",
      repeatPassword: "Qwerty12345",
    };

    cy.request("POST", "/api/auth/signup", user).then((response) => {
      token = response.headers["set-cookie"][0].split(";")[0];
    });

    cy.visit("/panel/garage", { auth: { username: "guest", password: "welcome2qauto" } });
  });

  afterEach(() => {
    cy.request({ method: "DELETE", url: "/api/users", headers: { Cookie: token } });
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

import { faker } from "@faker-js/faker";
import { GaragePage } from "../pages/GaragePage";
import { ExpensesPage } from "../pages/ExpensesPage";

const garagePage = new GaragePage();
const expensesPage = new ExpensesPage();

describe("HW 22.1 API testing", () => {
  let token;
  let carId;
    const expense = {
    reportedAt: new Date().toISOString().slice(0, 10),
    mileage: 150,
    liters: 20,
    totalCost: 500,
  };
  const user = {
    name: "John",
    lastName: "Dou",
    email: faker.internet.email(),
    password: "Qwerty12345",
    repeatPassword: "Qwerty12345",
  };

  before(() => {
    cy.request("POST", "/api/auth/signup", user).then((response) => {
      expect(response.status).to.equal(201);
      token = response.headers["set-cookie"][0].split(";")[0];
    });
  });

  beforeEach(() => {
    cy.request("POST", "/api/auth/signin", {
      email: user.email,
      password: user.password,
      remember: false,
    });
    cy.visit("/panel/garage", { auth: { username: "guest", password: "welcome2qauto" } });
  });

  after(() => {
    cy.request({ method: "DELETE", url: "/api/users", headers: { Cookie: token } });
  });

  it("Create car via UI and intercept response", () => {
    cy.intercept("POST", "/api/cars").as("createCar");

    garagePage.addCar("Audi", "TT", "100");

    cy.wait("@createCar").then((xhr) => {
      expect(xhr.response.statusCode).to.equal(201);
      carId = xhr.response.body.data.id;
    });
  });

  it("Get cars list via API and check created car", () => {
    cy.request({
      method: "GET",
      url: "/api/cars",
      headers: { Cookie: token },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.data[0].id).to.equal(carId);
      expect(response.body.data[0].brand).to.equal("Audi");
      expect(response.body.data[0].model).to.equal("TT");
      expect(response.body.data[0].mileage).to.equal(100);
    });
  });
    it("Create expense via API with custom command", () => {
    cy.createExpense(
      {
        carId: carId,
        reportedAt: expense.reportedAt,
        mileage: expense.mileage,
        liters: expense.liters,
        totalCost: expense.totalCost,
        forceMileage: false,
      },
      token,
    ).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal("ok");
      expect(response.body.data.carId).to.equal(carId);
      expect(response.body.data.reportedAt).to.equal(expense.reportedAt);
      expect(response.body.data.mileage).to.equal(expense.mileage);
      expect(response.body.data.liters).to.equal(expense.liters);
      expect(response.body.data.totalCost).to.equal(expense.totalCost);
    });
  });
    it("Check expense via UI", () => {
    expensesPage.fuelExpensesLink.click();

    cy.contains("Audi TT").should("be.visible");

    expensesPage.firstExpenseRow.should("contain", expense.mileage);
    expensesPage.firstExpenseRow.should("contain", expense.liters);
    expensesPage.firstExpenseRow.should("contain", expense.totalCost);
  });
});



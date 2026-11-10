describe("Registration", () => {
  beforeEach(() => {
    cy.visit("/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
    cy.get(".hero-descriptor_btn").click();
  });

  it("Registration title is displayed", () => {
    cy.get(".modal-title").should("have.text", "Registration");
  });

  it("Name: empty field shows error", () => {
    cy.get("#signupName").click();
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should("have.text", "Name required");
    cy.get("#signupName").should("have.class", "is-invalid");
  });
  it("Name: wrong data shows error", () => {
    cy.get("#signupName").type("123");
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should("have.text", "Name is invalid");
    cy.get("#signupName").should("have.class", "is-invalid");
  });
  it("Name: wrong length shows error", () => {
    cy.get("#signupName").type("J");
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should(
      "have.text",
      "Name has to be from 2 to 20 characters long",
    );
    cy.get("#signupName").should("have.class", "is-invalid");
  });
  it("Last name: empty field shows error", () => {
    cy.get("#signupLastName").click();
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should("have.text", "Last name required");
    cy.get("#signupLastName").should("have.class", "is-invalid");
  });

  it("Last name: wrong data shows error", () => {
    cy.get("#signupLastName").type("123");
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should("have.text", "Last name is invalid");
    cy.get("#signupLastName").should("have.class", "is-invalid");
  });

  it("Last name: wrong length shows error", () => {
    cy.get("#signupLastName").type("J");
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should(
      "have.text",
      "Last name has to be from 2 to 20 characters long",
    );
    cy.get("#signupLastName").should("have.class", "is-invalid");
  });
  it("Email: empty field shows error", () => {
    cy.get("#signupEmail").click();
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should("have.text", "Email required");
    cy.get("#signupEmail").should("have.class", "is-invalid");
  });

  it("Email: wrong data shows error", () => {
    cy.get("#signupEmail").type("test");
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should("have.text", "Email is incorrect");
    cy.get("#signupEmail").should("have.class", "is-invalid");
  });
  it("Password: empty field shows error", () => {
    cy.get("#signupPassword").click();
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should("have.text", "Password required");
    cy.get("#signupPassword").should("have.class", "is-invalid");
  });

  it("Password: wrong data shows error", () => {
    cy.get("#signupPassword").type("qwerty", { sensitive: true });
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should(
      "have.text",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
    cy.get("#signupPassword").should("have.class", "is-invalid");
  });
  it("Re-enter password: empty field shows error", () => {
    cy.get("#signupRepeatPassword").click();
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should(
      "have.text",
      "Re-enter password required",
    );
    cy.get("#signupRepeatPassword").should("have.class", "is-invalid");
  });

  it("Re-enter password: passwords do not match", () => {
    cy.get("#signupPassword").type("Qwerty123", { sensitive: true });
    cy.get("#signupRepeatPassword").type("Qwerty124", { sensitive: true });
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should("have.text", "Passwords do not match");
    cy.get("#signupRepeatPassword").should("have.class", "is-invalid");
  });
  it("Register button is disabled with incorrect data", () => {
    cy.get("#signupName").type("123");
    cy.get(".modal-title").click();
    cy.contains("button", "Register").should("be.disabled");
  });
  it("Successful registration with valid data", () => {
    const email = "iryna.test" + Date.now() + "@test.com";

    cy.get("#signupName").type("Iryna");
    cy.get("#signupLastName").type("Test");
    cy.get("#signupEmail").type(email);
    cy.get("#signupPassword").type("Qwerty123", { sensitive: true });
    cy.get("#signupRepeatPassword").type("Qwerty123", { sensitive: true });
    cy.contains("button", "Register").click();

    cy.contains("h1", "Garage").should("be.visible");
    cy.contains("Log out").click(); 
  });
  it("Login with custom command", () => {
    const email = "iryna.test" + Date.now() + "@test.com";

    cy.get("#signupName").type("Iryna");
    cy.get("#signupLastName").type("Test");
    cy.get("#signupEmail").type(email);
    cy.get("#signupPassword").type("Qwerty123", { sensitive: true });
    cy.get("#signupRepeatPassword").type("Qwerty123", { sensitive: true });
    cy.contains("button", "Register").click();
    cy.contains("Log out").click();

    cy.login(email, "Qwerty123");

    cy.contains("h1", "Garage").should("be.visible");
     cy.contains("Log out").click();
  });
    it("Name: more than 20 characters shows error", () => {
    cy.get("#signupName").type("Abcdefghijklmnopqrstu");
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should("have.text", "Name has to be from 2 to 20 characters long");
    cy.get("#signupName").should("have.class", "is-invalid");
  });

  it("Last name: more than 20 characters shows error", () => {
    cy.get("#signupLastName").type("Abcdefghijklmnopqrstu");
    cy.get(".modal-title").click();
    cy.get(".invalid-feedback").should("have.text", "Last name has to be from 2 to 20 characters long");
    cy.get("#signupLastName").should("have.class", "is-invalid");
  });

   it("Name: value with spaces is valid after trim", () => {
    cy.get("#signupName").type("  John  ".trim());
    cy.get(".modal-title").click();
    cy.get("#signupName").should("not.have.class", "is-invalid");
  });

   it("Last name: value with spaces is valid after trim", () => {
    cy.get("#signupLastName").type("  Test  ".trim());
    cy.get(".modal-title").click();
    cy.get("#signupLastName").should("not.have.class", "is-invalid");
  });
});


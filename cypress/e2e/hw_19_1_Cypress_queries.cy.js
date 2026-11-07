describe("Header and footer buttons", () => {
  beforeEach(() => {
    cy.visit("https://qauto.forstudy.space/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  });

  it("Logo", () => {
    cy.get(".header_logo").should("be.visible");
  });

  it("Home", () => {
    cy.contains("Home").click();
  });

  it("About", () => {
    cy.contains("About").click();
  });

  it("Contacts", () => {
    cy.contains("Contacts").click();
  });

  it("Guest log in", () => {
    cy.contains("Guest log in").click();
    cy.url().should("contain", "garage");
  });

  it("Sign In", () => {
    cy.contains("Sign In").click();
    cy.contains("Log in").should("be.visible");
  });

  it("Facebook", () => {
    cy.get(".socials_link").eq(0).should("be.visible");
  });

  it("Telegram", () => {
    cy.get(".socials_link").eq(1).should("be.visible");
  });

  it("YouTube", () => {
    cy.get(".socials_link").eq(2).should("be.visible");
  });

  it("Instagram", () => {
    cy.get(".socials_link").eq(3).should("be.visible");
  });

  it("LinkedIn", () => {
    cy.get(".socials_link").eq(4).should("be.visible");
  });

  it("ithillel.ua", () => {
    cy.contains("ithillel.ua").should("be.visible");
  });

  it("Support email", () => {
    cy.contains("support@ithillel.ua").should("be.visible");
  });
});


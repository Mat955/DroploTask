import {test, expect} from "@playwright/test";

test.describe("Navigation Management", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:3000");
  });

  test("should show empty state initially", async ({page}) => {
    await expect(page.getByText("Menu jest puste")).toBeVisible();
    await expect(
      page.getByText("W tym menu nie ma jeszcze żadnych linków.")
    ).toBeVisible();
  });

  test("should add new navigation item", async ({page}) => {
    await page.getByText("Dodaj pozycję menu").click();
    await page.getByLabel("Nazwa").fill("Test Link");
    await page.getByLabel("Link").fill("https://test.com");
    await page.getByRole("button", {name: "Dodaj"}).click();

    await expect(page.getByText("Test Link")).toBeVisible();
    await expect(page.getByText("https://test.com")).toBeVisible();
  });

  test("should edit navigation item", async ({page}) => {
    // Add item first
    await page.getByText("Dodaj pozycję menu").click();
    await page.getByLabel("Nazwa").fill("Original Name");
    await page.getByRole("button", {name: "Dodaj"}).click();

    // Edit item
    await page.getByRole("button", {name: "Edytuj"}).click();
    await page.getByLabel("Nazwa").fill("Updated Name");
    await page.getByRole("button", {name: "Zapisz"}).click();

    await expect(page.getByText("Updated Name")).toBeVisible();
  });

  test("should add child navigation item", async ({page}) => {
    // Add parent item
    await page.getByText("Dodaj pozycję menu").click();
    await page.getByLabel("Nazwa").fill("Parent Item");
    await page.getByRole("button", {name: "Dodaj"}).click();

    // Add child item
    await page.getByRole("button", {name: "Dodaj pozycję menu"}).click();
    await page.getByLabel("Nazwa").fill("Child Item");
    await page.getByRole("button", {name: "Dodaj"}).click();

    await expect(page.getByText("Child Item")).toBeVisible();
  });

  test("should delete navigation item", async ({page}) => {
    // Add item first
    await page.getByText("Dodaj pozycję menu").click();
    await page.getByLabel("Nazwa").fill("To Delete");
    await page.getByRole("button", {name: "Dodaj"}).click();

    // Delete item
    await page.getByRole("button", {name: "Usuń"}).click();

    await expect(page.getByText("To Delete")).not.toBeVisible();
    await expect(page.getByText("Menu jest puste")).toBeVisible();
  });
});

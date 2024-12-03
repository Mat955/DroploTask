import {test, expect} from "@playwright/test";

test.describe("Navigation Management", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:3000");
  });

  test("should handle nested items correctly", async ({page}) => {
    // Add parent item
    await page.getByText("Dodaj pozycję menu").click();
    await page.getByLabel("Nazwa").fill("Parent Item");
    await page.getByRole("button", {name: "Dodaj"}).click();

    // Add child item
    await page.getByRole("button", {name: "Dodaj pozycję menu"}).last().click();
    await page.getByLabel("Nazwa").fill("Child Item");
    await page.getByRole("button", {name: "Dodaj"}).click();

    // Add nested child
    await page.getByText("Child Item").click();
    await page.getByRole("button", {name: "Dodaj pozycję menu"}).last().click();
    await page.getByLabel("Nazwa").fill("Nested Child");
    await page.getByRole("button", {name: "Dodaj"}).click();

    // Verify structure
    await expect(page.getByText("Parent Item")).toBeVisible();
    await expect(page.getByText("Child Item")).toBeVisible();
    await expect(page.getByText("Nested Child")).toBeVisible();
  });

  test("should edit nested items", async ({page}) => {
    // Setup nested structure
    await page.getByText("Dodaj pozycję menu").click();
    await page.getByLabel("Nazwa").fill("Parent");
    await page.getByRole("button", {name: "Dodaj"}).click();
    await page.getByRole("button", {name: "Dodaj pozycję menu"}).last().click();
    await page.getByLabel("Nazwa").fill("Child");
    await page.getByRole("button", {name: "Dodaj"}).click();

    // Edit child
    await page.getByText("Child").click();
    await page.getByRole("button", {name: "Edytuj"}).last().click();
    await page.getByLabel("Nazwa").fill("Updated Child");
    await page.getByRole("button", {name: "Zapisz"}).click();

    await expect(page.getByText("Updated Child")).toBeVisible();
  });

  test("should delete nested items", async ({page}) => {
    // Setup nested structure
    await page.getByText("Dodaj pozycję menu").click();
    await page.getByLabel("Nazwa").fill("Parent");
    await page.getByRole("button", {name: "Dodaj"}).click();
    await page.getByRole("button", {name: "Dodaj pozycję menu"}).last().click();
    await page.getByLabel("Nazwa").fill("Child to Delete");
    await page.getByRole("button", {name: "Dodaj"}).click();

    // Delete child
    await page.getByText("Child to Delete").click();
    await page.getByRole("button", {name: "Usuń"}).last().click();

    await expect(page.getByText("Child to Delete")).not.toBeVisible();
    await expect(page.getByText("Parent")).toBeVisible();
  });

  test("should validate form fields", async ({page}) => {
    await page.getByText("Dodaj pozycję menu").click();
    await page.getByRole("button", {name: "Dodaj"}).click();

    await expect(page.getByText("Nazwa jest wymagana")).toBeVisible();

    await page.getByLabel("Link").fill("invalid-url");
    await expect(page.getByText("Nieprawidłowy format URL")).toBeVisible();
  });

  test("should handle drag and drop reordering", async ({page}) => {
    // Add items
    await page.getByText("Dodaj pozycję menu").click();
    await page.getByLabel("Nazwa").fill("First Item");
    await page.getByRole("button", {name: "Dodaj"}).click();

    await page.getByText("Dodaj pozycję menu").click();
    await page.getByLabel("Nazwa").fill("Second Item");
    await page.getByRole("button", {name: "Dodaj"}).click();

    // Get items and verify initial order
    const items = await page.$$(".navigation-item");
    const firstItemText = await items[0].textContent();
    const secondItemText = await items[1].textContent();

    expect(firstItemText).toContain("First Item");
    expect(secondItemText).toContain("Second Item");

    // Perform drag and drop
    await page.dragAndDrop(
      ".navigation-item:first-child",
      ".navigation-item:last-child"
    );

    // Verify new order
    const updatedItems = await page.$$(".navigation-item");
    const newFirstItemText = await updatedItems[0].textContent();
    const newSecondItemText = await updatedItems[1].textContent();

    expect(newFirstItemText).toContain("Second Item");
    expect(newSecondItemText).toContain("First Item");
  });
});

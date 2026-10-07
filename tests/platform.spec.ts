import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
const routes = JSON.parse(
  fs.readFileSync("docs/routes.json", "utf8"),
) as string[];
test("all 96 routes load, have a heading, and show no uncaught errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.locator('a[href="#"]').count()).toBe(0);
  }
  expect(errors).toEqual([]);
});
test("journey advances, money participant changes and opportunity filters work", async ({
  page,
}) => {
  await page.goto("/journey");
  await page.getByRole("button", { name: "Next stage" }).click();
  await expect(
    page.getByRole("heading", { name: "Order management", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Previous stage" }).click();
  await expect(
    page.getByRole("heading", { name: "Customer orders", exact: true }),
  ).toBeVisible();
  await page.goto("/money");
  await page.getByRole("tab", { name: /Carrier/ }).click();
  await expect(
    page.getByRole("heading", { name: "Carrier", exact: true }),
  ).toBeVisible();
  await page.goto("/opportunities");
  await page.getByRole("button", { name: "Next question" }).click();
  await page.getByLabel("Your interest").selectOption("Facility");
  await expect(page.locator(".opportunity-card")).toHaveCount(4);
  await expect(page.getByText("Question 2 of 8")).toBeVisible();
  await page.goto("/journey");
  await page.getByRole("tab", { name: "Who pays whom?" }).click();
  await expect(
    page.getByRole("heading", { name: "Payment follows the agreement." }),
  ).toBeVisible();
});
test("learning completion, bookmarks, quiz and corrupt storage recovery", async ({
  page,
}) => {
  await page.goto("/academy/carrier/carrier-01");
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await page
    .getByLabel("The final leg to the recipient", { exact: true })
    .check();
  await expect(page.getByText("Correct. Apply that principle")).toBeVisible();
  await page.goto("/progress");
  await expect(
    page.getByRole("link", { name: "What is last mile?", exact: true }),
  ).toBeVisible();
  await page.goto("/resources");
  await page
    .getByRole("button", {
      name: "Save Do I need a USDOT number?",
      exact: true,
    })
    .click();
  await page.goto("/progress");
  await expect(
    page.getByRole("link", { name: /Do I need a USDOT/ }),
  ).toBeVisible();
  await page.evaluate(() => localStorage.setItem("ela-completed", "{invalid"));
  await page.reload();
  await expect(
    page.getByText("Complete a lesson to see it here."),
  ).toBeVisible();
});
test("calculator validates edge cases and outputs monthly results", async ({
  page,
}) => {
  await page.goto("/tools/route");
  await page.getByLabel("Carrier compensation / day ($)").fill("400");
  await page.getByLabel("Total loaded driver cost / day ($)").fill("200");
  await expect(page.locator(".calculator-output h2")).toHaveText("$4,400.00");
  await page.getByLabel("Carrier compensation / day ($)").fill("-1");
  await expect(page.getByRole("alert")).toContainText("finite value");
  await page.getByLabel("Carrier compensation / day ($)").fill("1000001");
  await expect(page.getByRole("alert")).toBeVisible();
  await page.getByRole("button", { name: "Reset assumptions" }).click();
  await page.getByLabel("Fuel economy (MPG)").fill("0");
  await expect(page.getByRole("alert")).toContainText("greater than zero");
  await page.goto("/tools/warehouse");
  await page.getByLabel("Variable expense share of revenue (%)").fill("100");
  await expect(page.locator(".calculator-output")).toContainText(
    "No positive contribution",
  );
});
test("search, state selector, compare, and unknown route", async ({ page }) => {
  await page.goto("/search?q=How%20do%20I%20get%20a%20route");
  await expect(
    page.getByRole("link", { name: "Finding routes", exact: true }),
  ).toBeVisible();
  await page.goto("/start/business-registration");
  await page
    .getByLabel("What state are you operating in?")
    .selectOption("Florida");
  await expect(
    page.getByRole("heading", { name: "Your Florida verification pathway" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Start a business in Florida/ }),
  ).toBeVisible();
  await page.goto("/opportunities/compare");
  await expect(page.getByRole("table")).toBeVisible();
  await page.goto("/not-a-page");
  await expect(
    page.getByRole("heading", { name: "Let’s find your next step." }),
  ).toBeVisible();
});
test("responsive layouts, keyboard menu, reduced motion and accessibility", async ({
  page,
}) => {
  const sizes = [
    [320, 640],
    [375, 812],
    [390, 844],
    [430, 932],
    [412, 915],
    [768, 1024],
    [1366, 768],
    [1920, 1080],
    [2560, 1440],
  ];
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height });
    for (const path of [
      "/",
      "/journey",
      "/tools/route",
      "/academy/carrier/carrier-10",
      "/proposal",
    ]) {
      await page.goto(path);
      await expect(page.locator("h1")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      const large = overflow
        ? await page.evaluate(() =>
            [...document.querySelectorAll("body *")]
              .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
              .slice(0, 15)
              .map((e) => ({
                tag: e.tagName,
                cls: e.className,
                text: e.textContent?.slice(0, 60),
              })),
          )
        : [];
      expect(
        overflow,
        `${path} overflows at ${width}: ${JSON.stringify(large)}`,
      ).toBe(false);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".mobile-menu summary").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".mobile-menu")).toHaveAttribute("open", "");
  await page.keyboard.press("Escape");
  await expect(page.locator(".mobile-menu")).not.toHaveAttribute("open", "");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1366, height: 900 });
  for (const path of [
    "/",
    "/journey",
    "/tools/route",
    "/academy/carrier/carrier-10",
    "/resources",
    "/search",
    "/opportunities/compare",
    "/proposal",
  ]) {
    await page.goto(path);
    const a = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      a.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      path,
    ).toEqual([]);
  }
  await page.goto("/");
  await page.screenshot({ path: "docs/home-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "docs/home-mobile.png", fullPage: true });
});

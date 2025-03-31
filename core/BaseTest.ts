import { test as base } from "@playwright/test";
import { PageFactory } from "../core/PageFactory";
import { LoginPage } from "../pages/LoginPage";

export const test = base.extend<{ pages: PageFactory }>({
  pages: async ({ page }, use) => {
    const pageFactory = new PageFactory(page);
    await pageFactory.getPage(LoginPage).navigateTo(); // Ensure navigation before each test
    await use(pageFactory);
  },
});

export { expect } from "@playwright/test";

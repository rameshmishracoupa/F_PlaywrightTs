import { test as base } from "@playwright/test";
import { DataFlowBasePage } from "../pages/dataflowpage/DataFlowBasePage";
import { CreateTableActionPage } from "../pages/dataflowpage/CreateTableActionPage";
import { LoginPage } from "../pages/LoginPage";

export const test = base.extend<{
    loginPage: LoginPage;
    dataFlowBasePage: DataFlowBasePage;
    createTableActionPage: CreateTableActionPage;
    login: (username: string) => Promise<void>;
}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dataFlowBasePage: async ({ page }, use) => {
        await use(new DataFlowBasePage(page));
    },
    createTableActionPage: async ({ page }, use) => {
        await use(new CreateTableActionPage(page));
    },
    login: async ({ loginPage }, use) => {
        await use(async (username: string) => {
            await loginPage.navigateTo();
            await loginPage.login(username);
        });
    }
});

export { expect } from "@playwright/test";

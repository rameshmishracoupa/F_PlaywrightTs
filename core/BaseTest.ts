import { test as base } from "@playwright/test";
import { DataFlowBasePage } from "../pages/dataflowpage/DataFlowBasePage";
import { CreateTableActionPage } from "../pages/dataflowpage/CreateTableActionPage";
import { DropTableActionPage } from "../pages/dataflowpage/DropTableActionPage";
import { LoginPage } from "../pages/LoginPage";
import { InsertActionPage } from "../pages/dataflowpage/InsertActionPage";
import { HomePage } from "../pages/HomePage";

export const test = base.extend<{
    loginPage: LoginPage;
    dataFlowBasePage: DataFlowBasePage;
    createTableActionPage: CreateTableActionPage;
    dropTableActionPage: DropTableActionPage;
    insertActionPage: InsertActionPage;
    homePage:HomePage;
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
    dropTableActionPage: async ({page}, use)=>{
        await use(new DropTableActionPage(page));
    },
    insertActionPage: async ({page}, use)=>{
        await use(new InsertActionPage(page));
    },
    homePage: async ({page}, use)=>{
        await use(new HomePage(page));
    },
    
    login: async ({ loginPage }, use) => {
        await use(async (username: string) => {
            await loginPage.navigateTo();
            await loginPage.login(username);
        });
    }
});

export { expect } from "@playwright/test";

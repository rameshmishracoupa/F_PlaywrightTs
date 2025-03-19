import { Page } from "@playwright/test";
import { config } from "./Config";

export class BasePage {
    protected static page: Page;

    constructor(page: Page) {
        if (!BasePage.page) {
            BasePage.page = page;
        }
    }
    async navigateTo(): Promise<void> {
        await this.pageInstance.goto(`${config.baseUrl}`);
    }
    protected get pageInstance(): Page {
        return BasePage.page;
    }
}

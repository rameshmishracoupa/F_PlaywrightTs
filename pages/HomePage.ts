import { Page } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { config } from "../core/Config";
import * as users from "../core/users.json";
import { TextBox } from "../components/TextBox";
import * as fs from 'fs/promises';
import { Button } from "../components/Button";
import { HomePageLocators } from "../locator/HomePageLocators";


export class HomePage extends BasePage {
    private dataFlowPage: Button;

    constructor(page: Page) {
        super(page);
        this.dataFlowPage = new Button(HomePageLocators.dataflow_page);
    }

    async navigateToDataFlow() {
        console.log("Navigating to: " + config.baseUrl);
        await this.dataFlowPage.click();
    }
}

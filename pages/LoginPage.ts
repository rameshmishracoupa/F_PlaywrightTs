import { Page } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { config } from "../core/Config";
import * as users from "../core/users.json";
import { TextBox } from "../components/TextBox";
import * as fs from 'fs/promises';
import { Button } from "../components/Button";

type UserData = {
    user: string;
    email: string;
    password: string;
};

export class LoginPage extends BasePage {
    private emailInput: TextBox;
    private passwordInput: TextBox;
    private signInButton: Button;

    constructor(page: Page) {
        super(page);
        this.emailInput = new TextBox( "[id='input-user-name']");
        this.passwordInput = new TextBox( "[id='input-password']");
        this.signInButton = new Button("[type='submit']");
    }

    async navigateTo() {
        console.log("Navigating to: " + config.baseUrl);
        await this.pageInstance.goto(config.baseUrl);
    }

    async getUserCredentials(username: string): Promise<UserData | null> {
        try {
            const data = await fs.readFile("core/users.json", "utf8");
            const usersArray: UserData[] = JSON.parse(data); // Parse JSON to an array

            const user = usersArray.find(u => u.user === username);
            return user || null;
        } catch (error) {
            console.error("Error reading users.json:", error);
            return null;
        }
    }

    async login(username: string) {
        const user = await this.getUserCredentials(username);

        if (!user) {
            throw new Error(`User ${username} not found in users.json`);
        }

        console.log(`Logging in as: ${user.email}`);

        await this.emailInput.EnterText(user.email);
        await this.signInButton.click();
        await this.passwordInput.EnterText(user.password);
        await this.signInButton.click();
    }
}

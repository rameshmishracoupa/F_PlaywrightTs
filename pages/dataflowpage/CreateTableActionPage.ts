
import { WaitUtils } from "../../components/WaitUtils.ts";
import { BasePage } from "../../core/BasePage.ts";
import { createTableLocators } from "../../locator/createTableLocators.ts";
import { Page } from "@playwright/test";
import {TextBox} from '../../components/TextBox';
import {Button} from '../../components/Button';
import { DropDown } from '../../components/DropDown';

export class CreateTableActionPage extends BasePage {
    waitUtils: WaitUtils;
    fillTableName: TextBox;
    configureButton: Button;
    addColumn: Button;
    saveConfiguration: Button;

    constructor(page: Page) {
        super(page);
        this.waitUtils = new WaitUtils(page);
        this.fillTableName = new TextBox(createTableLocators.inputTable);
        this.configureButton= new Button(createTableLocators.configureButton);
        this.addColumn = new Button(createTableLocators.addColumn);
        this.saveConfiguration = new Button(createTableLocators.saveConfig);
    }

    private getConnectionDropdown(connectionName: string): DropDown {
        const updatedLocator = createTableLocators.connectionSelect.replace("${connectionName}", connectionName);
        return new DropDown(createTableLocators.connectionOpen, updatedLocator);
    }
    
    async OpenAndSelectConnectionName(connectionName: string): Promise<void> {
        const connection = this.getConnectionDropdown(connectionName);
        await connection.open();
        await connection.select(connectionName); // Provide appropriate value
    }

    async EnterTableName(tableName: string): Promise<void>{
        await this.fillTableName.EnterText(tableName);
    }

    async OpenConfigurationPage(): Promise<void>{
        await this.configureButton.click();
    }

    async SaveTheConfiguration(): Promise<void>{
        this.saveConfiguration.click();
    }
        
    
}

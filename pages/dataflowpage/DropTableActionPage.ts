
import { WaitUtils } from "../../components/WaitUtils.ts";
import { BasePage } from "../../core/BasePage.ts";
import { DropTableLocators } from "../../locator/DropTableLocators.ts";
import { Page } from "@playwright/test";
import {TextBox} from '../../components/TextBox';
import {Button} from '../../components/Button';
import { DropDown } from '../../components/DropDown';
import { ActionHelper } from "../../ActionHelper/ActionHelper.ts";
import { Label } from "../../components/Label.ts";
import {  Locator } from '@playwright/test';

export class DropTableActionPage extends BasePage {
    waitUtils: WaitUtils;
    fillTableName: TextBox;
    configureButton: Button;
    addColumn: Button;
    saveConfiguration: Button;
    tableToDropContainer: Label;

    constructor(page: Page) {
        super(page);
        this.waitUtils = new WaitUtils(page);
        this.configureButton= new Button(DropTableLocators.configureButton);
        this.tableToDropContainer = new Label(DropTableLocators.tableToDropBox);
        this.saveConfiguration = new Button(DropTableLocators.saveConfig);
    }

    private getConnectionDropdown(connectionName: string): DropDown {
        const updatedLocator = DropTableLocators.connectionSelect.replace("${connectionName}", connectionName);
        return new DropDown(DropTableLocators.connectionOpen, updatedLocator);
    }

    private getTableElementByName(tableName: string): Locator {
        const locator = DropTableLocators.tablebyname.replace("${tableName}", tableName);
        return this.pageInstance.locator(locator);
    }
    
    async OpenAndSelectConnectionName(connectionName: string): Promise<void> {
        const connection = this.getConnectionDropdown(connectionName);
        await connection.open();
        await connection.select(connectionName); // Provide appropriate value
    }

    

    async OpenConfigurationPage(): Promise<void>{
        await this.configureButton.click();
    }

    async SaveTheConfiguration(): Promise<void>{
        this.saveConfiguration.click();
    }

    async DragAndDropTableByName(tableName: string){
        const tableLocator = this.getTableElementByName(tableName);

  await ActionHelper.dragAndDropSourceToDestElement(this.pageInstance, tableLocator, this.pageInstance.locator(DropTableLocators.tableToDropBox));
    }
        
    
}


import { DropDown } from '../../components/DropDown';
import { ActionHelper } from '../../ActionHelper/ActionHelper';
import { WaitUtils } from '../../components/WaitUtils';
import {test} from "../../core/BaseTest"
import { ActionType } from '../../pages/dataflowpage/DataFlowBasePage';
import { Page, expect, Locator } from "@playwright/test";
import { LoginPage } from '../../pages/LoginPage';




test.only('First Test', async({page, pages,context}) => {
    const loginPage = pages.getPage(LoginPage);
    const waitUtils = new WaitUtils(page);
    await loginPage.login("DeployPlanner1");
    await page.locator("//div[@data-testid='AppSwitcher_QAId']").click();
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for new page to open
        page.locator("//a[@data-testid='NavBarMenuItem_apps_Link_QAId']").click(),
    ]);
    await newPage.locator("//div[contains(@class, 'dx-scrollview-content')]/div[contains(@class, 'dx-tile') and .//div[text()='LayoutDesignerApp']]").click();
    
    await waitUtils.isVisibleElement("fw-layout-workspace-header-caption");
    const element = newPage.locator('#fw-layout-workspace'); // Select element
    await page.waitForTimeout(5000);
    expect(await element.screenshot()).toMatchSnapshot('appboard.png');

});







  
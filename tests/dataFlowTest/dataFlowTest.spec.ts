
import { DropDown } from '../../components/DropDown';
import { ActionHelper } from '../../ActionHelper/ActionHelper';
import { WaitUtils } from '../../components/WaitUtils';
import {test} from "../../core/BaseTest"
import { ActionType, DataFlowBasePage } from '../../pages/dataflowpage/DataFlowBasePage';
import { Page, expect, Locator } from "@playwright/test";
import { LoginPage } from '../../pages/LoginPage';
import {HomePage} from '../../pages/HomePage';
import { InsertActionPage } from '../../pages/dataflowpage/InsertActionPage';




test.only('First Test', async({page, pages}) => {
  const loginPage = pages.getPage(LoginPage);
  const homePage = pages.getPage(HomePage);
  const dataFlowBasePage = pages.getPage(DataFlowBasePage);
  const insertActionPage= pages.getPage(InsertActionPage);
    const waitUtils = new WaitUtils(page);
    const dataFlowName = "Auto_Table_Mapping_Error";
    await loginPage.login("RecipeBuilderAdvanced");
    await homePage.navigateToDataFlow();

    await dataFlowBasePage.EnterDataFlowNameAndOpenIt(dataFlowName);
  
    await dataFlowBasePage.CloseDialogBoxIfAppear();
    await dataFlowBasePage.selectFirstActionNode();

    await insertActionPage.OpenConfigurationPage();
    await insertActionPage.expressionBuilderExpandCollapse.click();

    const element = page.locator("[data-testid='ExpressionEditor_TableJoinsContent']"); // Select element
    await page.waitForTimeout(5000);
    expect(await element.screenshot()).toMatchSnapshot('TableMappingErr.png');

});
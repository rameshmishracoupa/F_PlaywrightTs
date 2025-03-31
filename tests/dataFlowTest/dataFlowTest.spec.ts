
import { DropDown } from '../../components/DropDown';
import { ActionHelper } from '../../ActionHelper/ActionHelper';
import { WaitUtils } from '../../components/WaitUtils';
import {test} from "../../core/BaseTest"
import { ActionType } from '../../pages/dataflowpage/DataFlowBasePage';
import { Page, expect, Locator } from "@playwright/test";




test.only('First Test', async({page, login, context,dataFlowBasePage,insertActionPage, homePage}) => {
    const waitUtils = new WaitUtils(page);
    const dataFlowName = "Auto_Table_Mapping_Error";
    await login("RecipeBuilderAdvanced");
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
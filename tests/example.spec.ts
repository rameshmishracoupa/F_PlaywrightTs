
import { DropDown } from '../components/DropDown';
import { ActionHelper } from '../ActionHelper/ActionHelper';
import { WaitUtils } from '../components/WaitUtils';
import {test} from "../core/BaseTest"
import { ActionType } from '../pages/dataflowpage/DataFlowBasePage';


test.only('Second Test', async({page,login,dataFlowBasePage,createTableActionPage,dropTableActionPage,homePage}) => {
  // const context = await browser.newContext();
  // const page = await context.newPage();
  var connectionName ="conn";
  const dataFlowName="Insertdata";
  const waitUtils = new WaitUtils(page);
  await login("rameshuser2");
  
  await homePage.navigateToDataFlow();

  await dataFlowBasePage.EnterDataFlowNameAndOpenIt(dataFlowName);
  //Revert to published
  
  await dataFlowBasePage.CloseDialogBoxIfAppear();
  await dataFlowBasePage.RevertToPublished();
  await dataFlowBasePage.CloseDialogBoxIfAppear();

  
  await dataFlowBasePage.DragAndDropActionByName(ActionType.CREATE_TABLE, -450);

  await createTableActionPage.OpenAndSelectConnectionName(connectionName);

 
  //select table
  const tableName = "tableName";
  await createTableActionPage.EnterTableName(tableName);
  await createTableActionPage.OpenConfigurationPage();
  await waitUtils.isVisibleElement(createTableActionPage.addColumn.toString(),5000);
  await createTableActionPage.addColumn.click();
  await createTableActionPage.SaveTheConfiguration();

  await dataFlowBasePage.saveDataFlow();
  await dataFlowBasePage.closeCanvasPage();
  await dataFlowBasePage.EnterDataFlowNameAndOpenIt(dataFlowName);
  // await page.waitForTimeout(5000);

  await dataFlowBasePage.DragAndDropActionByName(ActionType.DROP_TABLE, -450);

  await dataFlowBasePage.selectFirstActionNode();
  await dataFlowBasePage.saveDataFlow();

  await dataFlowBasePage.RunSelectedActions();
  
  await waitUtils.waitUntilTextContains("span[class^='StatusBanner__statusText']","Execution success.",50000)

  //switch to design page
  await dataFlowBasePage.switchToDesignPage();

  await dataFlowBasePage.selectSecondActionNode();

  await dropTableActionPage.OpenAndSelectConnectionName(connectionName);

  await dropTableActionPage.OpenConfigurationPage();
  const deletetable= "tableName";

  await dropTableActionPage.DragAndDropTableByName(deletetable);
  await dropTableActionPage.SaveTheConfiguration();

 await dataFlowBasePage.WaitUntilToasterDisappears();
 

  await dataFlowBasePage.saveDataFlow();
  

 await dataFlowBasePage.RunSelectedActions();
  
  await waitUtils.waitUntilTextContains("span[class^='StatusBanner__statusText']","Execution success.",50000)
  await dataFlowBasePage.switchToDesignPage();

  await dropTableActionPage.OpenConfigurationPage();

  console.log("Waiting for tooltip to appear...");
  await page.locator(`//div[@title='${deletetable}']`).hover();
  await page.waitForSelector("//div[contains(@data-testid, 'Tooltip') and normalize-space(text())='Table has been dropped']", { state: 'visible' });

  console.log("Tooltip is now visible!");


});






  
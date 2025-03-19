
import { DropDown } from '../components/DropDown';
import { ActionHelper } from '../ActionHelper/ActionHelper';
import { WaitUtils } from '../components/WaitUtils';
import {test} from "../core/BaseTest"
import { ActionType } from '../pages/dataflowpage/DataFlowBasePage';

// test('First Test', async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     // await page.goto('https://qa.llama.ai');
//     // console.log(await page.title());
// });

test.only('Second Test', async({page,login,dataFlowBasePage,createTableActionPage}) => {
  // const context = await browser.newContext();
  // const page = await context.newPage();
  var connectionName ="conn";
  const dataFlowName="Insertdata";
  const waitUtils = new WaitUtils(page);
  await login("rameshuser2");
  const dialogBoxLocator = "[data-testid='UpgradedAssetDetectedModal_OKButton']";
  await page.locator("[data-testid='AppSectionsNavigator_dataFlows']").click();

  dataFlowBasePage.EnterDataFlowNameAndOpenIt(dataFlowName);
  //Revert to published
  
  dataFlowBasePage.CloseDialogBoxIfAppear();
  dataFlowBasePage.RevertToPublished();
  dataFlowBasePage.CloseDialogBoxIfAppear();

  
   dataFlowBasePage.DragAndDropActionByName(ActionType.CREATE_TABLE, -450);

  createTableActionPage.OpenAndSelectConnectionName(connectionName);

 
  //select table
  const tableName = "tableName";
  createTableActionPage.EnterTableName(tableName);
  createTableActionPage.OpenConfigurationPage();
  await waitUtils.isVisibleElement(createTableActionPage.addColumn.toString(),5000);
  await createTableActionPage.addColumn.click();
  createTableActionPage.SaveTheConfiguration();
  // await page.locator("[data-testid='ConfigureTable_AddColumnButton']").click();
  // await page.locator("[data-testid='ConfigureTable_SaveButton']").click();

  await page.locator("[data-testid='CanvasActionBar_SaveButton']").click();
  await waitUtils.waitUntilTextContains("[data-testid='ToastContainerQAId'] span","Data Flow was saved successfully",20000);
  await page.locator("[data-testid='CanvasActionBar_CloseButton']").click();
  await page.locator(`//a[@title='${dataFlowName}']`).click();
  const dropTableActionElement = page.locator("[title='Drop Tables']");
  await ActionHelper.dragAndDrop(page, dropTableActionElement, -450);

  await dataFlowBasePage.selectFirstActionNode();
await page.locator("[data-testid='CanvasActionBar_SaveButton']").click();
  await waitUtils.waitUntilTextContains("[data-testid='ToastContainerQAId'] span","Data Flow was saved successfully",20000)
  await page.locator("[data-testid='CanvasActionBar_RunButton_MoreOptionsContextMenu']").click();
  await page.locator("[data-testid='CanvasActionBar_RunButton_RunAllSelectedButton']").click();
  
  await waitUtils.waitUntilTextContains("span[class^='StatusBanner__statusText']","Execution success.",50000)

  //switch to design page
  await page.locator("//a[contains(text(), 'Design')]").click();
  await dataFlowBasePage.selectSecondActionNode();

  const dropconnection = new DropDown("div.Selectors__keyEventWrapper__CSu55", `[data-testid='DropActionProperties_ConnectionDropdown_Menu'] [title='${connectionName}'] > span`);
  
  await dropconnection.open();
  
  await dropconnection.select(connectionName);
 await page.locator("[data-testid='DropActionProperties_ConfigureButton']").click();
  const deletetable= "tableName";
  const sourceele= page.locator(`[data-testid^='dbo.'][title='${deletetable}']`);
  const desele = page.locator("//div[@data-testid='TableList_Container'][.//div[@class='TableList__title__jA8AR' and text()='Tables To Drop']]//div[@class='TableList__content__HQJUh']");
  await ActionHelper.dragAndDropSourceToDestElement(page, sourceele,desele)
 await page.locator("[data-testid='ConfigureDropTablesModal_SaveButton']").click();

 await page.waitForTimeout(10000);
 await waitUtils.waitUntilDisappear("[data-testid='ToastContainerQAId'] span")
  await page.locator("[data-testid='CanvasActionBar_SaveButton']").click();
  
  //
  await waitUtils.waitUntilTextContains("[data-testid='ToastContainerQAId'] span","Data Flow was saved successfully",20000);

 await page.locator("[data-testid='CanvasActionBar_RunButton_MoreOptionsContextMenu']").click();
  await page.locator("[data-testid='CanvasActionBar_RunButton_RunAllSelectedButton']").click();
  
  await waitUtils.waitUntilTextContains("span[class^='StatusBanner__statusText']","Execution success.",50000)
  await page.locator("//a[contains(text(), 'Design')]").click();
  await page.locator("[data-testid='DropActionProperties_ConfigureButton']").click();
  console.log("Waiting for tooltip to appear...");
  await page.locator(`//div[@title='${deletetable}']`).hover();
  await page.waitForSelector("//div[contains(@data-testid, 'Tooltip') and normalize-space(text())='Table has been dropped']", { state: 'visible' });

  console.log("Tooltip is now visible!");


});







  
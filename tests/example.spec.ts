import { test, expect, type Page, Locator } from '@playwright/test';
import { DropDown } from '../util/DropDown';
import { ActionHelper } from '../ActionHelper/ActionHelper';
import { WaitUtils } from '../util/WaitUtils';

test('First Test', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    // await page.goto('https://qa.llama.ai');
    // console.log(await page.title());
});

test.only('Second Test', async({page}) => {
  // const context = await browser.newContext();
  // const page = await context.newPage();
  await page.goto('https://dev.llama.ai');
  await page.locator("[id='input-user-name']").fill("ramesh.mishra_admin@coupa.com");
  await page.locator("[type='submit']").click();
  await page.locator("[id='input-password']").fill("Llama@12345");
  await page.locator("[type='submit']").click();
  await page.locator("[data-testid='AppSectionsNavigator_dataFlows']").click();
  //
  await page.locator("tr.dx-datagrid-filter-row td:first-child [aria-label='Search box']").hover();
  await page.locator("//span[contains(text(),'Equals')]").click();
  
  var dataFlowName = "Insertdata";
  await page.locator("tr.dx-datagrid-filter-row td:first-child input").fill(dataFlowName);
  
  await page.locator(`//a[@title='${dataFlowName}']`).click();
  //Revert to published
  await page.locator("[data-testid='CanvasActionBar_MoreMenuButton']").click();
  const element = await page.locator("[data-testid='CanvasActionBar_revertToPublished']");
  const ariaDisabled= await element.getAttribute("aria-disabled");
  if(ariaDisabled==='false'){
    await element.click();
    await page.locator("[data-testid='RevertDraftModal_RevertButton']").click();
    
  }
  else{
    await page.locator("h3").click();
  }
  await page.waitForTimeout(5000);

  const creatTableActionElement = page.locator("[title='Create Table']");
  await ActionHelper.dragAndDrop(page, creatTableActionElement, -450);
  
  var connectionName ="conn";
  
  const connection = new DropDown(page, "div.Selectors__keyEventWrapper__CSu55", `[data-testid='CreateTableActionProperties_ConnectionDropdown_Menu'] [title='${connectionName}'] > span`);
  
  await connection.open();
  
  await connection.select("conn");
  await page.waitForTimeout(5000);
  const waitUtils = new WaitUtils(page);
  //select table
  await page.locator("[data-testid='CreateTableActionProperties_TableNameInput_Input']").fill("tableName");
  await page.locator("[data-testid='CreateTableActionProperties_ConfigureTableButton']").click();
  await page.locator("[data-testid='ConfigureTable_AddColumnButton']").click();
  await page.locator("[data-testid='ConfigureTable_SaveButton']").click();
  await page.waitForTimeout(5000);
  await page.locator("[data-testid='CanvasActionBar_SaveButton']").click();
  await waitUtils.waitUntilTextContains("[data-testid='ToastContainerQAId'] span","Data Flow was saved successfully",20000)
  await page.waitForTimeout(5000);
  await page.locator("[data-testid='CanvasActionBar_CloseButton']").click();
  await page.waitForTimeout(10000);
  await page.locator(`//a[@title='${dataFlowName}']`).click();

  await page.waitForTimeout(10000);
  const dropTableActionElement = page.locator("[title='Drop Tables']");
  await ActionHelper.dragAndDrop(page, dropTableActionElement, -450);

  await selectFirstActionNode(page);

  await page.locator("[data-testid='CanvasActionBar_RunButton_MoreOptionsContextMenu']").click();
  await page.locator("[data-testid='CanvasActionBar_RunButton_RunAllSelectedButton']").click();
  
  await waitUtils.waitUntilTextContains("span[class^='StatusBanner__statusText']","Execution success.",50000)

  //switch to design page
  await page.locator("//a[contains(text(), 'Design')]").click();
  await selectSecondActionNode(page);

  const dropconnection = new DropDown(page, "div.Selectors__keyEventWrapper__CSu55", `[data-testid='CreateTableActionProperties_ConnectionDropdown_Menu'] [title='${connectionName}'] > span`);
  
  await connection.open();
  
  await connection.select("conn");


});

async function selectFirstActionNode(page: Page): Promise<void> {
  await page.evaluate(() => {
      const d = (window as any).go.Diagram.fromDiv("box");
      const createTableNodeKey = d.model.nodeDataArray[1].key;
      const node = d.findNodeForKey(createTableNodeKey);
      d.select(node);
  });
}

async function selectSecondActionNode(page: Page): Promise<void> {
  await page.evaluate(() => {
      const d = (window as any).go.Diagram.fromDiv("box");
      const createTableNodeKey = d.model.nodeDataArray[2].key;
      const node = d.findNodeForKey(createTableNodeKey);
      d.select(node);
  });
}



  
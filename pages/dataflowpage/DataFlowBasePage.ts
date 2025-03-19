
import { Page } from "@playwright/test";
import { BasePage } from "../../core/BasePage";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import { WaitUtils } from "../../components/WaitUtils";
import * as  DataFlowBaseLocators  from "../../locator/DataFlowBaseLocators.json";
import { ActionHelper } from "../../ActionHelper/ActionHelper";

export enum ActionType {
  CREATE_TABLE = "Create Table",
  DROP_TABLE = "Drop Table"
}

export class DataFlowBasePage extends BasePage  {
   waitUtils: WaitUtils;

  
    

    constructor(page){
        super(page);
        this.waitUtils = new WaitUtils(page);
    }

    async DragAndDropActionByName(actionType: ActionType, xOffSet: number = 0, yOffSet: number = 0): Promise<void> {
      // Retrieve locator template from JSON and replace placeholder
      const locatorTemplate = DataFlowBaseLocators.elements.action_type.replace("${actionType}", actionType);
      const actionElement = this.pageInstance.locator(locatorTemplate);
      await ActionHelper.dragAndDrop(this.pageInstance, actionElement, xOffSet, yOffSet);
    }
    async EnterDataFlowNameAndOpenIt(dataFlowName: string){
        
        
        const locatorString = this.pageInstance.locator(DataFlowBaseLocators.elements.select_dataflow_by_name.replace("${dataFlowName}", dataFlowName));
          await this.pageInstance.locator(DataFlowBaseLocators.elements.search_type_button).hover();
          await this.pageInstance.locator(DataFlowBaseLocators.elements.serach_type_select).click();
          await this.pageInstance.locator(DataFlowBaseLocators.elements.search_box_input_field).fill(dataFlowName);
          
          await this.waitUtils.sleep(5000);
          await locatorString.click();
    }

    async selectFirstActionNode(): Promise<void> {
        await this.pageInstance.evaluate(() => {
            const d = (window as any).go.Diagram.fromDiv("box");
            const createTableNodeKey = d.model.nodeDataArray[1].key;
            const node = d.findNodeForKey(createTableNodeKey);
            d.select(node);
        });
      }

      async  selectSecondActionNode(): Promise<void> {
        await this.pageInstance.evaluate(() => {
            const d = (window as any).go.Diagram.fromDiv("box");
            const createTableNodeKey = d.model.nodeDataArray[2].key;
            const node = d.findNodeForKey(createTableNodeKey);
            d.select(node);
        });
      }

      async CloseDialogBoxIfAppear(): Promise<void> {
        const waitUtils = new WaitUtils(this.pageInstance);
        const locator = DataFlowBaseLocators.elements.dialog_box_locator;
        if(await waitUtils.isVisibleElement(locator,5000)){
            await this.pageInstance.locator(locator).click();
        }
      }

      async RevertToPublished(): Promise<void> {
        await this.pageInstance.locator(DataFlowBaseLocators.elements.more_menu_button).click();
        const element = this.pageInstance.locator(DataFlowBaseLocators.elements.revert_to_published);
        const ariaDisabled= await element.getAttribute("aria-disabled");
        if(ariaDisabled==='false'){
            await element.click();
            await this.pageInstance.locator(DataFlowBaseLocators.elements.revert_button).click();
        }
        else{
            await this.pageInstance.locator(DataFlowBaseLocators.elements.dataflow_label).click();
        }
      }
}
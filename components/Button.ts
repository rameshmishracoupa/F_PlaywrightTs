import { BrowserContext, Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';


export class Button extends BasePage {
    private selector: string

    constructor( selector: string ) {
        super(BasePage.page);
        
        this.selector = selector;
      }


      async click(){
        await this.pageInstance.locator(this.selector).click();
      }
}
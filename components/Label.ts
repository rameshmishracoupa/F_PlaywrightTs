import { BrowserContext, Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';


export class Label extends BasePage {
    private selector: string

    constructor( selector: string, variable: string = "" ) {
        super(BasePage.page);
        
        this.selector = selector;
      }

      async click(){
        await this.pageInstance.locator(this.selector).click();
      }

      async hoverOnIt(){
        await this.pageInstance.locator(this.selector).hover();
      }
}
import { BrowserContext, Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';


export class TextBox extends BasePage {
    private textInputSelector: string

    constructor( element: string) {
        super(BasePage.page);
        
        this.textInputSelector = element;
      }


      async EnterText(value: string): Promise<void>{
        console.log(`���️ Entering Text with this value: ${value}`);
        await this.pageInstance.locator(this.textInputSelector).fill(value);
      }
}
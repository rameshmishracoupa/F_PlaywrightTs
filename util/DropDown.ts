import { Page } from '@playwright/test';

export class DropDown {
  private page: Page;
  private openSelector: string;
  private optionSelector: string;

  /**
   * @param page - The Playwright Page instance.
   * @param openSelector - Selector for the dropdown element that opens the dropdown.
   * @param optionSelector - Selector for the dropdown options container.
   */
  constructor(page: Page, openSelector: string, optionSelector: string) {
    this.page = page;
    this.openSelector = openSelector;
    this.optionSelector = optionSelector;
  }

  /**
   * Clicks the element that opens the dropdown.
   */
  async open(): Promise<void> {
    console.log(`Opening dropdown using selector: ${this.openSelector}`);
    await this.page.click(this.openSelector);
    console.log('Dropdown opened.');
  }

  /**
   * Selects the dropdown option matching the provided value.
   * @param value - The text of the option to select.
   */
  async select(value: string): Promise<void> {
    console.log(`Selecting dropdown value: "${value}"`);
    // Locate the option that has the provided text
    console.log(`Selecting dropdown value: "${this.optionSelector}"`);
    const option = this.page.locator(this.optionSelector);

     await option.click();
    console.log(`Dropdown value "${value}" selected.`);
  }

  /**
   * Opens the dropdown and then selects the specified value.
   * @param value - The text of the option to select.
   */
  async openAndSelect(value: string): Promise<void> {
    console.log(`Opening dropdown and selecting value: "${value}"`);
    await this.open();
    await this.select(value);
    console.log(`Dropdown opened and value "${value}" selected.`);
  }
}

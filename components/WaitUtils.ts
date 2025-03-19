import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "../core/BasePage";

export class WaitUtils extends BasePage {
    
    constructor(page: Page) {
        super(page);  // ✅ Pass `page` to BasePage
    }

    /**
     * Waits until the given element contains the specified text.
     * @param selector CSS or XPath selector of the element.
     * @param text Expected text content.
     * @param timeout Optional timeout (default: 5000ms).
     */
    async waitUntilTextContains(selector: string, text: string, timeout: number = 5000): Promise<void> {
        const element: Locator = this.pageInstance.locator(selector);  // ✅ Use `pageInstance`

        await element.waitFor({
            state: "visible",
            timeout: timeout,
        });

        await expect(element).toContainText(text);
        console.log(`✅ Text "${text}" found in element: ${selector}`);
    }

    /**
     * Waits until the specified element disappears (hidden or removed).
     * @param selector CSS or XPath selector of the element.
     * @param timeout Optional timeout (default: 20000ms).
     */
    async waitUntilDisappear(selector: string, timeout: number = 20000): Promise<void> {
        console.log(`⏳ Waiting for all elements matching '${selector}' to disappear...`);

    const elements = await this.pageInstance.locator(selector).all(); // Get all matching elements

    for (const element of elements) {
        await element.waitFor({ state: "detached", timeout });
    }

    console.log(`✅ All elements matching '${selector}' have disappeared`);
    }

    /**
     * Checks if an element is visible within the given timeout.
     * @param selector CSS or XPath selector of the element.
     * @param timeout Optional timeout (default: 5000ms).
     * @returns `true` if the element is visible, otherwise `false`.
     */
    async isVisibleElement(selector: string, timeout: number = 5000): Promise<boolean> {
        try {
            await this.pageInstance.locator(selector).waitFor({ state: "visible", timeout });
            return true; // ✅ Element is visible within timeout
        } catch (error) {
            return false; // ❌ Timeout exceeded, element not visible
        }
    }

     async  sleep(timeout: number = 5000): Promise<void>{
        console.log(`���️ Sleeping for ${timeout}ms`);
        await this.pageInstance.waitForTimeout(timeout);
        
    }
}

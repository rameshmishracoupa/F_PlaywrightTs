import { Page, expect, Locator } from "@playwright/test";

export class WaitUtils {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Waits until the given element contains the specified text.
     * @param selector CSS or XPath selector of the element.
     * @param text Expected text content.
     * @param timeout Optional timeout (default: 5000ms).
     */
    async waitUntilTextContains(selector: string, text: string, timeout: number = 5000): Promise<void> {
        const element: Locator = this.page.locator(selector);

        await element.waitFor({
            state: "visible",
            timeout: timeout,
        });

        await expect(element).toContainText(text);
        console.log(`✅ Text "${text}" found in element: ${selector}`);
    }

    async waitUntilDisappear(page: Page, selector: string, timeout: number = 20000): Promise<void> {
        await page.locator(selector).waitFor({
            state: "hidden", // Element becomes hidden
            timeout
        });
    
        console.log(`✅ Element ${selector} has disappeared`);
    }
    async isVisibleElement(page: Page, selector: string, timeout: number = 5000): Promise<boolean> {
        try {
            await page.locator(selector).waitFor({ state: "visible", timeout });
            return true; // Element is visible within the timeout
        } catch (error) {
            return false; // Timeout exceeded, element is not visible
        }
    }
    
    
}

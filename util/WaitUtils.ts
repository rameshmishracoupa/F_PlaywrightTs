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
}

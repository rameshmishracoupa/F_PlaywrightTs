import { Page, Locator } from '@playwright/test';

export class ActionHelper{
    static async dragAndDrop(page: Page, element: Locator, xOffSet: number = 0, yOffSet: number = 0) {
        const box = await element.boundingBox();
        if (!box) throw new Error('Element not found');
        await page.waitForTimeout(5000);
        const startX = box.x + box.width / 2; // Center of the element
        const startY = box.y + box.height / 2;
        const endX = startX + xOffSet; // Move horizontally by x pixels
        const endY = startY; // Keep Y the same
      
        await page.mouse.move(startX, startY);
        await page.mouse.down(); // Press mouse button
        await page.mouse.move(endX, endY); // Drag to new position
        await page.mouse.up(); // Release mouse button
        await page.waitForTimeout(5000);
      }

      static async dragAndDropSourceToDestElement(page: Page, sourceElement: Locator, destinationElement: Locator){
          await sourceElement.dragTo(destinationElement);

      }
}
import { Page } from "@playwright/test";

export class PageFactory {
    private pageInstances: Map<string, any> = new Map();

    constructor(private page: Page) {}

    getPage<T>(PageClass: new (page: Page) => T): T {
        const className = PageClass.name;

        if (!this.pageInstances.has(className)) {
            this.pageInstances.set(className, new PageClass(this.page));
        }

        return this.pageInstances.get(className);
    }
}

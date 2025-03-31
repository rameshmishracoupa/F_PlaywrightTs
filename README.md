# Playwright Automation Framework

## 📌 Table of Contents

- [Playwright Automation Framework](#playwright-automation-framework)
  - [📌 Table of Contents](#-table-of-contents)
  - [📌 Project Structure](#-project-structure)
  - [📖 Framework Flow](#-framework-flow)
  - [🔄 How `PageFactory.ts` Works](#-how-pagefactoryts-works)
  - [🚀 Running Tests](#-running-tests)

## 📌 Project Structure

```
📦 project-root  
 ┣ 📂 core  
 ┃ ┣ 📜 BasePage.ts  
 ┃ ┣ 📜 BaseTest.ts  
 ┃ ┣ 📜 Config.ts  
 ┃ ┣ 📜 PageFactory.ts  
 ┃ ┣ 📜 users.json  
 ┣ 📂 components  
 ┃ ┣ 📜 Button.ts  
 ┃ ┣ 📜 Dropdown.ts  
 ┃ ┣ 📜 TextBox.ts  
 ┃ ┣ 📜 WaitUtil.ts  
 ┣ 📂 pages  
 ┃ ┣ 📜 LoginPage.ts  
 ┃ ┣ 📜 DataFlowBasePage.ts  
 ┃ ┣ 📜 CreateTableActionPage.ts  
 ┃ ┣ 📜 DropTableActionPage.ts  
 ┃ ┣ 📜 InsertActionPage.ts  
 ┃ ┣ 📜 HomePage.ts  
 ┣ 📂 locators  
 ┃ ┣ 📜 createTableLocators.ts  
 ┃ ┣ 📜 (other locator files)  
 ┣ 📂 tests  
 ┃ ┣ 📜 dataflow.spec.ts  
 ┃ ┣ 📜 (other test files)  
 ┣ 📜 playwright.config.ts  
 ┣ 📜 package.json  
 ┣ 📜 README.md  
```

## 📖 Framework Flow

1. **Test Execution Begins**

   - Playwright initializes the test runner.
   - The `PageFactory` is instantiated using the `test.extend()` method in `BaseTest.ts`.
   - The `LoginPage.navigateTo()` is triggered before each test to ensure the test starts at the correct page.

2. **Page Factory Usage**

   - Instead of instantiating pages manually in tests, `PageFactory` dynamically creates and caches page instances using:

   ```ts
   const loginPage = pageFactory.getPage(LoginPage);
   ```

3. **Page Objects & Components**

   - Pages are designed following the **Page Object Model (POM)** principle.
   - Components like `Button.ts`, `TextBox.ts`, and `Dropdown.ts` encapsulate UI interactions, improving reusability.

4. **Test Execution & Actions**

   - Tests interact with the pages via page objects (`LoginPage.ts`, `DataFlowBasePage.ts`, etc.).
   - `ActionHelper.ts` handles complex UI actions like `dragAndDrop()`.

5. **Environment Configuration**

   - Base URL is dynamically set from `Config.ts` based on the environment variable:

   ```ts
   export const config = {
       env: process.env.TEST_ENV || "qa",
       baseUrls: {
           qa: "https://qa.llama.ai",
           dev: "https://dev.llama.ai",
           staging: "https://staging.llama.ai"
       },
       get baseUrl() {
           return this.baseUrls[this.env];
       }
   };
   ```

6. **Running Tests in Different Environments**

   - Use the following command to run tests in different environments:

   ```sh
   TEST_ENV=dev npx playwright test
   ```

---

## 🔄 How `PageFactory.ts` Works

1. Stores instances of each page object to avoid unnecessary re-instantiations.

2. Uses **TypeScript Generics** to dynamically create page objects on demand:

   ```ts
   private pageInstances: Map<string, any> = new Map();

   getPage<T>(PageClass: new (page: Page) => T): T {
       const className = PageClass.name;
       if (!this.pageInstances.has(className)) {
           this.pageInstances.set(className, new PageClass(this.page));
       }
       return this.pageInstances.get(className);
   }
   ```

3. Instead of writing multiple getters like `get loginPage() { return new LoginPage(this.page); }`,\
   you can now get any page dynamically:

   ```ts
   const loginPage = pageFactory.getPage(LoginPage);
   ```

---

## 🚀 Running Tests

To execute all tests:

```sh
npx playwright test
```

To run tests in **QA** environment:

```sh
TEST_ENV=qa npx playwright test
```

To run a specific test file:

```sh
npx playwright test tests/dataflow.spec.ts
```

To run tests in **headed mode**:

```sh
npx playwright test --headed
```
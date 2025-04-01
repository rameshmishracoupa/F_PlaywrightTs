export const config = {
    env: process.env.ENV || "dev", // Default to QA
    baseUrls: {
      qa: "https://qa.llama.ai",
      dev: "https://dev.llama.ai",
      staging: "https://staging.llama.a",
    },
    get baseUrl() {
      return this.baseUrls[this.env];
    },
  };
  

//Run with test env command
//TEST_ENV=qa npx playwright test

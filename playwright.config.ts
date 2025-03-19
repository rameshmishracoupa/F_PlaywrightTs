import { defineConfig, devices } from '@playwright/test';


const config =({
  testDir: './tests',
  timeout: 800*1000,
 expect:{
  timeout: 15*1000
 },
 reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1920, height: 1200 }
  }

});

module.exports = config;
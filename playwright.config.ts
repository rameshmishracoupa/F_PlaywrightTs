import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config =({
  testDir: './tests',
  timeout: 800*1000,
 expect:{
  timeout: 100*1000
 },
 reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    lauchOptions:{
      args: ['--start-maximized']
    },
    viewport: null
  }

});

module.exports = config;
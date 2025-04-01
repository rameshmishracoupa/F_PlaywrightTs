import { defineConfig, devices } from '@playwright/test';


const config =({
  testDir: './tests',
  timeout: 250*1000,
 expect:{
  timeout: 15*1000,
  toMatchSnapshot: {
    maxDiffPixelRatio: 0.5,
    threshold: 0.5,
    diffIgnoreColors: true,
    diffIgnoreAntialiasing: true, // Ignores minor text rendering differences
    maxDiffPixels: 10000,
  },
 },
 snapshotPathTemplate: 'snapshots/{testFileName}-snapshots/{arg}{ext}', // Fix naming issue
 reporter: [["html", { open: "never" }]],
 workers: 4,
  use: {
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1920, height: 1200 },
    trace: "on", // Enable tracing for debugging
    actionTimeout: 15 * 1000, // Timeout for each action
    navigationTimeout: 30 * 1000, // Timeout for page.goto()
    snapshotDir: "./snapshots",
  }

});

module.exports = config;
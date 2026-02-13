import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration
 * Tests critical user flows in real browsers
 *
 * Best Practices:
 * - Vitest: Unit & Component tests (fast feedback)
 * - Playwright: E2E user flows (real browser validation)
 */
export default defineConfig({
  testDir: './e2e',

  // Run tests in parallel for speed
  fullyParallel: true,

  // Fail build on CI if you accidentally left test.only
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,

  // Use available CPUs for parallel execution
  workers: process.env.CI ? 1 : undefined,

  // Reporter: HTML for local, GitHub for CI
  reporter: 'html',

  // Shared settings for all tests
  use: {
    // Base URL for navigation
    baseURL: 'http://localhost:5173',

    // Collect traces on first retry for debugging
    trace: 'on-first-retry',

    // Screenshots on failure
    screenshot: 'only-on-failure',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment for cross-browser testing:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Start dev server before running tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 minutes timeout
  },
});

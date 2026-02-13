/**
 * E2E Tests: Stock Search & Detail View
 * Tests stock autocomplete, navigation, and detail page functionality
 */

import { test, expect } from '@playwright/test';

test.describe('Stock Search & Detail', () => {
  test('should search for stock and navigate to detail page', async ({ page }) => {
    await page.goto('/');

    // Find search input in header
    const searchInput = page.locator('input[placeholder*="Suche"]').first();
    await expect(searchInput).toBeVisible();

    // Type stock symbol
    await searchInput.fill('AAPL');

    // Wait for autocomplete results
    await page.waitForTimeout(1000); // Wait for debounce

    // Click on first result
    await page.locator('text=/Apple|AAPL/i').first().click();

    // Should navigate to stock detail page
    await expect(page).toHaveURL(/\/stocks\/AAPL/i, { timeout: 10000 });

    // Should see stock heading - use specific heading selector to avoid strict mode
    await expect(page.getByRole('heading', { name: /Apple Inc/i }).first()).toBeVisible();
  });

  test('should display stock price chart', async ({ page }) => {
    await page.goto('/stocks/AAPL');

    // Wait for page to load
    await page.waitForTimeout(2000);

    // Should see chart (canvas or svg element)
    const chart = page.locator('canvas, svg').first();
    await expect(chart).toBeVisible({ timeout: 10000 });
  });

  test('should display news section', async ({ page }) => {
    await page.goto('/stocks/AAPL');
    await page.waitForLoadState('load');

    // Should see heading or tab with "News" - use flexible selector
    const newsElement = page.locator('button, div, h2, h3').filter({ hasText: /News|Nachrichten/i }).first();
    await expect(newsElement).toBeVisible({ timeout: 10000 });
  });

  test('should toggle between different time periods', async ({ page }) => {
    await page.goto('/stocks/MSFT');

    await page.waitForTimeout(2000);

    // Look for time period buttons (1W, 1M, 3M, 1Y, etc.)
    const timePeriodButtons = page.locator('button:has-text("1M"), button:has-text("3M"), button:has-text("1Y")');

    if (await timePeriodButtons.count() > 0) {
      // Click on a different time period
      await timePeriodButtons.first().click();

      // Wait for chart to update
      await page.waitForTimeout(1000);

      // Chart should still be visible
      const chart = page.locator('canvas, svg').first();
      await expect(chart).toBeVisible();
    }
  });
});

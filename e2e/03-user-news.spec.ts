/**
 * E2E Tests: User News Management
 * Tests creating, editing, and deleting user news (requires authentication)
 * THIS TEST VALIDATES THE CSRF TOKEN FIX!
 */

import { test, expect } from '@playwright/test';

test.describe('User News Management', () => {
  let testUser: { username: string; email: string; password: string };

  // Setup: Register and login before each test
  test.beforeEach(async ({ page }) => {
    // Generate unique credentials
    testUser = {
      username: `newsuser_${Date.now()}`,
      email: `newsuser_${Date.now()}@example.com`,
      password: 'TestPassword123!',
    };

    // Register new user
    await page.goto('/');
    await page.waitForLoadState('load');
    await page.waitForTimeout(1000);
    await page.goto('/register');
    await page.waitForLoadState('load');
    await page.waitForTimeout(1000);
    await page.fill('input[name="register-username"]', testUser.username);
    await page.fill('input[name="register-email"]', testUser.email);
    await page.fill('input[name="register-password"]', testUser.password);
    await page.fill('input[name="register-password-confirm"]', testUser.password);
    await page.press('input[name="register-password-confirm"]', 'Enter');
    await page.waitForURL('/dashboard', { timeout: 15000 });
  });

  test('should create user news with CSRF protection', async ({ page }) => {
    // Navigate to a stock page
    await page.goto('/stocks/AAPL');
    await page.waitForLoadState('load');
    await page.waitForTimeout(1000);

    // Switch to user news tab - wait for it to be visible first
    const userNewsTab = page.locator('button:has-text("Eigene News"), text=Eigene News').first();
    await userNewsTab.waitFor({ state: 'visible', timeout: 10000 });
    await userNewsTab.click();

    // Click add news button
    await page.locator('button:has-text("News hinzufügen")').click();

    // Fill out the modal form
    await page.fill('input[type="date"]', '2026-01-15');
    await page.fill('input[placeholder*="Überschrift"]', 'Test News Headline');
    await page.fill('textarea[placeholder*="Beschreibung"]', 'This is a test news summary for AAPL');

    // Select positive sentiment
    await page.locator('button:has-text("+ Positiv")').click();

    // Optional fields
    await page.fill('input[placeholder*="Reuters"]', 'Test Source');
    await page.fill('input[placeholder*="https://"]', 'https://example.com');

    // Submit form (THIS TESTS THE CSRF TOKEN!)
    await page.locator('button:has-text("News hinzufügen")').last().click();

    // Wait for success - modal should close
    await expect(page.locator('text=News hinzufügen').last()).not.toBeVisible({ timeout: 10000 });

    // Should see the new news in the list
    await expect(page.locator('text=Test News Headline')).toBeVisible({ timeout: 5000 });
  });

  test('should edit existing user news', async ({ page }) => {
    // First create a news
    await page.goto('/stocks/MSFT');
    await page.waitForLoadState('load');
    await page.waitForTimeout(1000);
    const userNewsTab = page.locator('button:has-text("Eigene News"), text=Eigene News').first();
    await userNewsTab.waitFor({ state: 'visible', timeout: 10000 });
    await userNewsTab.click();
    await page.locator('button:has-text("News hinzufügen")').click();

    await page.fill('input[type="date"]', '2026-01-15');
    await page.fill('input[placeholder*="Überschrift"]', 'Original Headline');
    await page.fill('textarea[placeholder*="Beschreibung"]', 'Original summary');
    await page.locator('button:has-text("+ Positiv")').click();
    await page.locator('button:has-text("News hinzufügen")').last().click();

    await page.waitForTimeout(2000);

    // Now edit it
    await page.locator('button:has-text("Bearbeiten")').first().click();

    // Change headline
    await page.fill('input[placeholder*="Überschrift"]', 'Updated Headline');
    await page.locator('button:has-text("News aktualisieren")').click();

    // Should see updated headline
    await expect(page.locator('text=Updated Headline')).toBeVisible({ timeout: 5000 });
  });

  test('should delete user news', async ({ page }) => {
    // First create a news
    await page.goto('/stocks/TSLA');
    await page.waitForLoadState('load');
    await page.waitForTimeout(1000);
    const userNewsTab = page.locator('button:has-text("Eigene News"), text=Eigene News').first();
    await userNewsTab.waitFor({ state: 'visible', timeout: 10000 });
    await userNewsTab.click();
    await page.locator('button:has-text("News hinzufügen")').click();

    await page.fill('input[type="date"]', '2026-01-15');
    await page.fill('input[placeholder*="Überschrift"]', 'News to Delete');
    await page.fill('textarea[placeholder*="Beschreibung"]', 'This will be deleted');
    await page.locator('button:has-text("- Negativ")').click();
    await page.locator('button:has-text("News hinzufügen")').last().click();

    await page.waitForTimeout(2000);

    // Delete it
    await page.locator('button:has-text("Löschen")').first().click();

    // Confirm deletion if there's a confirmation dialog
    const confirmButton = page.locator('button:has-text("Löschen")').last();
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }

    // Should no longer see the news
    await expect(page.locator('text=News to Delete')).not.toBeVisible({ timeout: 5000 });
  });
});

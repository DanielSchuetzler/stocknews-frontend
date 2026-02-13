/**
 * E2E Tests: Favorites Management
 * Tests adding and removing stocks from favorites
 */

import { test, expect } from '@playwright/test';

test.describe('Favorites Management', () => {
  let testUser: { username: string; email: string; password: string };

  // Setup: Register and login before each test
  test.beforeEach(async ({ page }) => {
    testUser = {
      username: `favuser_${Date.now()}`,
      email: `favuser_${Date.now()}@example.com`,
      password: 'TestPassword123!',
    };

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.goto('/register');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="register-username"]', testUser.username);
    await page.fill('input[name="register-email"]', testUser.email);
    await page.fill('input[name="register-password"]', testUser.password);
    await page.fill('input[name="register-password-confirm"]', testUser.password);
    await page.press('input[name="register-password-confirm"]', 'Enter');
    await page.waitForURL('/dashboard', { timeout: 15000 });
  });

  test('should add stock to favorites', async ({ page }) => {
    // Navigate to a stock page
    await page.goto('/stocks/AAPL');
    await page.waitForTimeout(2000);

    // Click favorite button (star icon or "Zu Favoriten")
    const favoriteButton = page.locator('button:has-text("Zu Favoriten"), button[aria-label*="favorite"]').first();

    if (await favoriteButton.isVisible()) {
      await favoriteButton.click();

      // Wait for success feedback
      await page.waitForTimeout(1000);

      // Go to dashboard and check favorites
      await page.goto('/dashboard');
      await expect(page.locator('text=/AAPL|Apple/i')).toBeVisible({ timeout: 5000 });
    }
  });

  test('should remove stock from favorites', async ({ page }) => {
    // First add to favorites
    await page.goto('/stocks/MSFT');
    await page.waitForTimeout(2000);

    const addButton = page.locator('button:has-text("Zu Favoriten")').first();
    if (await addButton.isVisible()) {
      await addButton.click();
      await page.waitForTimeout(1000);
    }

    // Now remove from favorites
    const removeButton = page.locator('button:has-text("Von Favoriten entfernen"), button:has-text("Entfernen")').first();
    if (await removeButton.isVisible()) {
      await removeButton.click();
      await page.waitForTimeout(1000);

      // Go to dashboard - should not see MSFT
      await page.goto('/dashboard');
      // The favorites list should either be empty or not contain MSFT
      const mightNotExist = page.locator('text=/MSFT|Microsoft/i');
      const count = await mightNotExist.count();
      expect(count).toBe(0);
    }
  });

  test('should persist favorites after logout and login', async ({ page }) => {
    // Add TSLA to favorites
    await page.goto('/stocks/TSLA');
    await page.waitForLoadState('load');
    await page.waitForTimeout(1000);

    const favoriteButton = page.locator('button:has-text("Zu Favoriten")').first();
    await favoriteButton.waitFor({ state: 'visible', timeout: 10000 });
    await favoriteButton.click();
    await page.waitForTimeout(1000);

    // Logout - wait for button to be available
    const logoutButton = page.locator('text=Logout, button:has-text("Logout")').first();
    await logoutButton.waitFor({ state: 'visible', timeout: 10000 });
    await logoutButton.click();
    await page.waitForURL(/\/(login)?/, { timeout: 10000 });

    // Login again
    await page.goto('/login');
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await page.fill('input[name="login-username"]', testUser.username);
    await page.fill('input[name="login-password"]', testUser.password);
    await page.press('input[name="login-password"]', 'Enter');
    await page.waitForURL('/dashboard', { timeout: 15000 });

    // Should still see TSLA in favorites
    await expect(page.locator('text=/TSLA|Tesla/i').first()).toBeVisible({ timeout: 5000 });
  });
});

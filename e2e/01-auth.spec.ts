/**
 * E2E Tests: Authentication Flow
 * Tests user registration, login, logout, and session persistence
 */

import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  // Generate unique credentials for each test run
  let testUser: { username: string; email: string; password: string };

  test.beforeEach(() => {
    testUser = {
      username: `testuser_${Date.now()}`,
      email: `testuser_${Date.now()}@example.com`,
      password: 'TestPassword123!',
    };
  });

  test('should register a new user', async ({ page }) => {
    // CRITICAL FIX: Navigate to home page first to initialize CSRF token
    // Spring Security's CookieCsrfTokenRepository only sets the cookie when
    // a request successfully goes through the security filter chain
    await page.goto('/');

    // Wait for any API request to complete (this triggers CSRF cookie)
    await page.waitForLoadState('networkidle');

    // Now navigate to register page
    await page.goto('/register');
    await page.waitForLoadState('networkidle');

    // Fill registration form using name attributes
    await page.fill('input[name="register-username"]', testUser.username);
    await page.fill('input[name="register-email"]', testUser.email);
    await page.fill('input[name="register-password"]', testUser.password);
    await page.fill('input[name="register-password-confirm"]', testUser.password);

    // Submit form and wait for the registration API call to complete
    // Press Enter on the last field to submit the form
    const [registerResponse] = await Promise.all([
      page.waitForResponse(response =>
        response.url().includes('/api/auth/register') && response.request().method() === 'POST',
        { timeout: 10000 }
      ),
      page.press('input[name="register-password-confirm"]', 'Enter')
    ]);

    // Check if registration was successful
    if (registerResponse.status() !== 200) {
      throw new Error(`Registration failed with status ${registerResponse.status()}: ${await registerResponse.text()}`);
    }

    // Wait for navigation to dashboard
    await page.waitForURL('/dashboard', { timeout: 20000 });

    // Should see dashboard welcome heading
    await expect(page.getByRole('heading', { name: /Willkommen/i })).toBeVisible({ timeout: 5000 });
  });

  test('should login with existing user', async ({ page }) => {
    // First register the user
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

    // Logout
    await page.click('text=Logout');
    // Wait for redirect (could be /login or /)
    await page.waitForURL(/\/(login)?$/, { timeout: 10000 });

    // Navigate to login if we're on home
    if (!page.url().includes('/login')) {
      await page.goto('/login');
    }
    await page.waitForLoadState('networkidle');

    // Login again
    await page.fill('input[name="login-username"]', testUser.username);
    await page.fill('input[name="login-password"]', testUser.password);
    await page.press('input[name="login-password"]', 'Enter');
    await page.waitForURL('/dashboard', { timeout: 15000 });
    await expect(page.getByRole('heading', { name: /Willkommen/i })).toBeVisible({ timeout: 5000 });
  });

  test('should show error on invalid login', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(1000); // Wait for CSRF token

    // Try login with wrong credentials
    await page.fill('input[name="login-username"]', 'nonexistent_user');
    await page.fill('input[name="login-password"]', 'WrongPassword123');
    await page.click('button:has-text("Anmelden")');

    // Should show error message (wait a bit for backend response)
    await expect(page.locator('text=/Ungültige|Fehler|Invalid|Error|falsch/i')).toBeVisible({ timeout: 5000 });

    // Should stay on login page
    await expect(page).toHaveURL('/login');
  });

  test('should logout successfully', async ({ page }) => {
    // First register and login
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

    // Logout
    await page.click('text=Logout');

    // Should redirect to home or login
    await page.waitForURL(/\/(login)?/, { timeout: 10000 });

    // Should not be able to access protected route
    await page.goto('/dashboard');
    await page.waitForURL('/login', { timeout: 10000 });
  });

  test('should persist session on page refresh', async ({ page }) => {
    // Register and login
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

    // Wait for dashboard to fully load before refresh
    await expect(page.getByRole('heading', { name: /Willkommen/i })).toBeVisible({ timeout: 5000 });
    await page.waitForTimeout(2000); // Let session stabilize

    // Refresh page - use 'load' instead of default which might be too strict
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(2000); // Give app time to restore session

    // Should still be logged in
    await page.waitForURL('/dashboard', { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /Willkommen/i })).toBeVisible({ timeout: 5000 });
  });
});

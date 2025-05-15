const { test, expect } = require('@playwright/test');

test('filters schedules by city', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // await page.goto('http://localhost:5173');
  await page.waitForSelector('.MuiSelect-select', { timeout: 10000 });
  await page.click('.MuiSelect-select');
  await page.click('li[data-value="Boston"]');
  await expect(page.locator('.MuiCard-root:has(p:text("Trash"))')).toBeVisible();
  await expect(page.locator('.MuiCard-root:has(p:text("Cambridge"))')).not.toBeVisible();
});
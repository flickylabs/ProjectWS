import { test, expect } from '@playwright/test';

test('title smoke bootstrap', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173');
  await page.screenshot({ path: 'tmp/pw-step-00.png', fullPage: true });
  const body = await page.locator('body').innerText();
  console.log(body);
  await expect(page.locator('body')).toBeVisible();
});

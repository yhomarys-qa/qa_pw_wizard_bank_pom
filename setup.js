import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://globalsqa.com');
  await page.waitForTimeout(2000);
  
  const optionsCount = await page.locator('#userSelect option').count();
  
  if (optionsCount <= 1) {
    await page.goto('https://globalsqa.com');
    await page.locator('input[placeholder="First Name"]').fill('Hermione');
    await page.locator('input[placeholder="Last Name"]').fill('Granger');
    await page.locator('input[placeholder="Post Code"]').fill('E43242');
    page.once('dialog', d => d.accept());
    await page.locator('button[type="submit"]:has-text("Add Customer")').click();

    await page.goto('https://globalsqa.com');
    await page.locator('#userSelect').selectOption({ label: 'Hermione Granger' });
    await page.locator('#currency').selectOption('Dollar');
    page.once('dialog', d => d.accept());
    await page.locator('button[type="submit"]:has-text("Process")').click();
  }
  
  await browser.close();
}

export default globalSetup;


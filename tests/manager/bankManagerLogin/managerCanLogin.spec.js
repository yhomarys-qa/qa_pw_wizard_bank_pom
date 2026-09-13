import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';

test('Assert manager can login successfully and see options menu', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLogin();

  // Validando o fluxo correto do gerente
  const addCustomerTab = page.locator('button:has-text("Add Customer")');
  const openAccountTab = page.locator('button:has-text("Open Account")');
  const customersTab = page.locator('button:has-text("Customers")');

  await expect(addCustomerTab).toBeVisible();
  await expect(openAccountTab).toBeVisible();
  await expect(customersTab).toBeVisible();
});




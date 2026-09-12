import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';

test('Assert manager can login successfully and see options menu', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);

  // 1. Abre a página inicial do banco
  await bankHomePage.open(); 

  // 2. Clica no botão para efetuar o login como Gerente
  await bankHomePage.clickBankManagerLogin();

  // 3. EXIGÊNCIA DO MENTOR: Verifica se os botões de menu do gerente aparecem após o login
  const addCustomerTab = page.locator('button:has-text("Add Customer")');
  const openAccountTab = page.locator('button:has-text("Open Account")');
  const customersTab = page.locator('button:has-text("Customers")');

  await expect(addCustomerTab).toBeVisible();
  await expect(openAccountTab).toBeVisible();
  await expect(customersTab).toBeVisible();
});



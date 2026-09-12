import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';

test('Assert correct customer Logout', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);

  // 1. Abre o banco e vai para login do cliente
  await bankHomePage.open();
  await bankHomePage.clickCustomerLogin();

  // 2. Loga com o cliente
  await customerLoginPage.selectCustomer('Hermoine Granger');
  await customerLoginPage.clickLoginButton();

  // 3. Clica em Logout
  const logoutButton = page.locator('button:has-text("Logout")');
  await logoutButton.waitFor({ state: 'visible' });
  await logoutButton.click();

  // 4. Valida o retorno
  await customerLoginPage.assertSelectCustomerDropDownIsVisible();
});

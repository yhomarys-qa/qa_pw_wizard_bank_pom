import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';

test('Assert correct customer Logout', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);

  await bankHomePage.open();
  await bankHomePage.clickCustomerLogin();

  await customerLoginPage.selectCustomer('Hermoine Granger');
  await customerLoginPage.clickLoginButton();

  const logoutButton = page.locator('button:has-text("Logout")');
  await logoutButton.waitFor({ state: 'visible' });
  await logoutButton.click();

  // EXIGÊNCIA DO MENTOR: Valida visibilidade E que o valor resetou para vazio ("")
  await customerLoginPage.assertSelectCustomerDropDownIsVisible();
  await customerLoginPage.assertSelectCustomerDropDownContainsValue('');
});




import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';

test('Assert correct customer Logout', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);

  await bankHomePage.open();
  await bankHomePage.clickCustomerLogin();

  await customerLoginPage.selectCustomer('Hermione Granger');
  await customerLoginPage.clickLoginButton();

  const logoutButton = page.locator('button:has-text("Logout")');
  await logoutButton.waitFor({ state: 'visible' });
  await logoutButton.click();

  await customerLoginPage.assertSelectCustomerDropDownIsVisible();
  // Validando que o dropdown voltou a ficar vazio
  await customerLoginPage.assertSelectCustomerDropDownContainsValue('');
});



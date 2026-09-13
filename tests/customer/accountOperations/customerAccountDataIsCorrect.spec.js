import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';

test('Assert Customer has correct bank data', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const loginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await bankHomePage.open();
  await bankHomePage.clickCustomerLogin();

  await loginPage.selectCustomer('Hermione Granger');
  await loginPage.clickLoginButton();

  // Validações estáticas dos dados originais exigidos pelo Luke
  await accountPage.assertAccountLineContainsText('1001');
  await accountPage.assertAccountLineContainsText('5096');
  await accountPage.assertAccountLineContainsText('Dollar');
});


















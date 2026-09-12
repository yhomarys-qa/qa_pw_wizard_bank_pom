import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';

test('Assert Customer has correct bank data', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const loginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  // 1. Navega até a área logada do cliente
  await bankHomePage.open();
  await bankHomePage.clickCustomerLogin();
  await loginPage.selectCustomer('Hermoine Granger');
  await loginPage.clickLoginButton();

  // 2. Valida os textos estruturais da linha de dados de forma flexível
  await accountPage.assertAccountLineContainsText('Account Number');
  await accountPage.assertAccountLineContainsText('Balance');
  await accountPage.assertAccountLineContainsText('Currency');
});



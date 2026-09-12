import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';

test('Assert Customer has correct bank data', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const loginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  // 1. Abre a URL correta do banco e navega até a área do cliente
  await bankHomePage.open();
  await bankHomePage.clickCustomerLogin();

  // 2. Executa o fluxo de login selecionando a Hermoine
  await loginPage.selectCustomer('Hermoine Granger');
  await loginPage.clickLoginButton();

  // 3. Executa as suas asserções de validação de dados da conta (Ajustado para Balance: 0)
  await accountPage.assertAccountIdInDropdownHasValue('number:1001');
  await accountPage.assertAccountLineContainsText('Account Number : 1001');
  await accountPage.assertAccountLineContainsText('Balance : 0');
  await accountPage.assertAccountLineContainsText('Currency : Dollar');
});


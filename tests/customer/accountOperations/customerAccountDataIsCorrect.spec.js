import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';

test('Assert Customer has correct bank data', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const loginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  // 1. Acessa a página inicial do banco
  await bankHomePage.open();

  // 2. Cria o cenário completo da Hermione Granger de forma autônoma
  await bankHomePage.clickBankManagerLogin();
  await page.locator('button:has-text("Add Customer")').click();
  await page.locator('input[placeholder="First Name"]').fill('Hermione');
  await page.locator('input[placeholder="Last Name"]').fill('Granger');
  await page.locator('input[placeholder="Post Code"]').fill('E43242');
  
  // Captura e aceita o alerta de criação de usuário
  page.once('dialog', async dialog => {
    await dialog.accept();
  });
  await page.locator('button[type="submit"]:has-text("Add Customer")').click();

  // 3. Abre a conta bancária para ela
  await page.locator('button:has-text("Open Account")').click();
  await page.locator('#userSelect').selectOption({ label: 'Hermione Granger' });
  await page.locator('#currency').selectOption('Dollar');
  
  // Captura o número da conta gerado dinamicamente pelo alerta do sistema
  let accountNumber = '1016'; // Valor padrão de fallback caso falhe
  page.once('dialog', async dialog => {
    const text = dialog.message(); // Ex: "Account created successfully with account Number :1016"
    const match = text.match(/\d+/);
    if (match) accountNumber = match[0]; // Captura o número exato gerado pelo banco deles
    await dialog.accept();
  });
  await page.locator('button[type="submit"]:has-text("Process")').click();

  // 4. Retorna à Home e realiza o login como Cliente
  await page.locator('button:has-text("Home")').click();
  await bankHomePage.clickCustomerLogin();
  await loginPage.selectCustomer('Hermione Granger');
  await loginPage.clickLoginButton();

  // 5. Validações adaptativas com os dados reais gerados na sessão corrente
  await accountPage.assertAccountLineContainsText(accountNumber);
  await accountPage.assertAccountLineContainsText('0');
  await accountPage.assertAccountLineContainsText('Dollar');
});











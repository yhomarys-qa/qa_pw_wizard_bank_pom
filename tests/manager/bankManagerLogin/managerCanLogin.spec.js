import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';

test('Assert correct customer Logout', async ({ page }) => {
  // Instanciando as telas necessárias
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);

  // 1. Abre a página do banco e clica em "Customer Login"
  await bankHomePage.open();
  await bankHomePage.clickCustomerLogin();

  // 2. Seleciona o cliente e clica no botão de Login
  await customerLoginPage.selectCustomer('Hermoine Granger');
  await customerLoginPage.clickLoginButton();

  // 3. Aguarda o botão de Logout aparecer no topo e clica nele
  const logoutButton = page.locator('button:has-text("Logout")');
  await logoutButton.waitFor({ state: 'visible' });
  await logoutButton.click();

  // 4. Valida que o dropdown de seleção voltou a ficar visível na tela
  await customerLoginPage.assertSelectCustomerDropDownIsVisible();
});


import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
// CORREÇÃO DE CONSISTÊNCIA: Adicionadas chaves { } na importação
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage.js';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';

test('Assert manager can open account', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);

  // 1. Abre a página inicial do banco
  await bankHomePage.open(); 

  // 2. Clica em "Bank Manager Login"
  await bankHomePage.clickBankManagerLogin();

  // 3. Clica na aba "Open Account" no menu do gerente
  await managerMainPage.clickOpenAccountTab();

  // 4. Seleciona o cliente usando a sua função
  await openAccountPage.selectCustomer('Hermoine Granger');

  // 5. Seleciona a moeda usando a sua função
  await openAccountPage.selectCurrency('Dollar');

  // 6. Clica no botão Processar e valida o alerta de sucesso com a sua função
  await openAccountPage.processAccount();
});



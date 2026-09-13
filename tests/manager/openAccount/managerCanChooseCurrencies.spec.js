import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
// CORREÇÃO DE CONSISTÊNCIA: Adicionadas chaves { } na importação
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage.js';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';

test('Assert manager can choose currencies', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);

  // 1. Abre a página e faz login como gerente
  await bankHomePage.open(); 
  await bankHomePage.clickBankManagerLogin();

  // 2. Acessa a tela de abertura de conta
  await managerMainPage.clickOpenAccountTab();

  // 3. Seleciona um cliente base
  await openAccountPage.selectCustomer('Hermoine Granger');

  // 4. Valida se consegue alternar entre as moedas disponíveis (Dollar, Pound, Rupee)
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.selectCurrency('Pound');
  await openAccountPage.selectCurrency('Rupee');
});




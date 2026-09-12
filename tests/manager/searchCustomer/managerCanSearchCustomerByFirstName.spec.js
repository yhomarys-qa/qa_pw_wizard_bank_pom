import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import BankManagerMainPage from '../../../src/pages/manager/BankManagerMainPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can search customer by first name', async ({ page }) => {
  // Instanciando os Page Objects
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  const searchName = 'Hermoine';

  // 1. Abre a página e faz login como gerente
  await bankHomePage.open(); 
  await bankHomePage.clickBankManagerLogin();

  // 2. Clica na aba "Customers" para abrir a listagem
  await managerMainPage.clickCustomersTab();

  // 3. Digita o primeiro nome no campo de busca usando a sua função
  await customersListPage.searchCustomer(searchName);

  // 4. Valida que o cliente pesquisado está visível na tabela filtrada
  await customersListPage.assertCustomerInList(searchName);
});




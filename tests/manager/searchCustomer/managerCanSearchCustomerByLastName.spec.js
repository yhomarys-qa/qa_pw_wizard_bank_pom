import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import BankManagerMainPage from '../../../src/pages/manager/BankManagerMainPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can search customer by last name', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  const searchLastName = 'Granger';

  await bankHomePage.open(); 
  await bankHomePage.clickBankManagerLogin();
  await managerMainPage.clickCustomersTab();

  // Busca pelo sobrenome na tabela
  await customersListPage.searchCustomer(searchLastName);

  // Valida que o cliente correspondente continua visível
  await customersListPage.assertCustomerInList(searchLastName);
});



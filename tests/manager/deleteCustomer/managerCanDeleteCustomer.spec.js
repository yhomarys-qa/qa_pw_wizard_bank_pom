import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import BankManagerMainPage from '../../../src/pages/manager/BankManagerMainPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can delete customer', async ({ page }) => {
  // Instanciando os Page Objects
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  const customerName = 'Hermoine';

  // 1. Abre a página e faz login como gerente
  await bankHomePage.open(); 
  await bankHomePage.clickBankManagerLogin();

  // 2. Clica na aba "Customers" para abrir a listagem
  await managerMainPage.clickCustomersTab();

  // 3. Valida primeiro que o cliente está visível na lista
  await customersListPage.assertCustomerInList(customerName);

  // 4. Deleta o cliente usando a sua função
  await customersListPage.deleteCustomer(customerName);

  // 5. Valida que o cliente não aparece mais na lista
  await customersListPage.assertCustomerNotInList(customerName);
});



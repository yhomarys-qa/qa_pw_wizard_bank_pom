import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can delete customer', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  const customerName = 'Hermione';

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLogin();
  await managerMainPage.clickCustomersTab();

  // Espera a tabela do AngularJS carregar os dados
  await page.waitForSelector('table tbody tr', { timeout: 10000 });

  await customersListPage.assertCustomerInList(customerName);
  await customersListPage.deleteCustomer(customerName);
  await customersListPage.assertCustomerNotInList(customerName);
});




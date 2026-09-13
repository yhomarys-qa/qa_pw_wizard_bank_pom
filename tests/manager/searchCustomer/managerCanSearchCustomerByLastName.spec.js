import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
// CORREÇÃO: Adicionadas as chaves { } na importação
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can search customer by last name', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  const searchLastName = 'Granger';

  await bankHomePage.open(); 
  await bankHomePage.clickBankManagerLogin();
  await managerMainPage.clickCustomersTab();

  await customersListPage.searchCustomer(searchLastName);
  await customersListPage.assertCustomerInList(searchLastName);
  
  await expect(customersListPage.tableRows).toHaveCount(1);
});




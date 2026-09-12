import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import BankManagerMainPage from '../../../src/pages/manager/BankManagerMainPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can search customer by postal code', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  const searchPostalCode = 'E859AB';

  await bankHomePage.open(); 
  await bankHomePage.clickBankManagerLogin();
  await managerMainPage.clickCustomersTab();

  await customersListPage.searchCustomer(searchPostalCode);
  await customersListPage.assertCustomerInList(searchPostalCode);
  
  // DICA DO MENTOR: Valida que somente o resultado procurado aparece na tabela
  await expect(customersListPage.tableRows).toHaveCount(1);
});




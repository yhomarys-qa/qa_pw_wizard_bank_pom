import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import BankManagerMainPage from '../../../src/pages/manager/BankManagerMainPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can search customer by first name', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  const searchName = 'Hermoine';

  await bankHomePage.open(); 
  await bankHomePage.clickBankManagerLogin();
  await managerMainPage.clickCustomersTab();

  await customersListPage.searchCustomer(searchName);
  await customersListPage.assertCustomerInList(searchName);
  
  // DICA DO MENTOR: Valida que somente o resultado procurado aparece na tabela
  await expect(customersListPage.tableRows).toHaveCount(1);
});





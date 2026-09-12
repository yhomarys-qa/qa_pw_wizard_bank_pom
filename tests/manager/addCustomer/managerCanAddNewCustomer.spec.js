import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import BankManagerMainPage from '../../../src/pages/manager/BankManagerMainPage.js';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can add new customer and verify in list', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  const firstName = 'John';
  const lastName = 'Doe';
  const postCode = '12345';

  // 1. Abre a página inicial do banco e loga como gerente
  await bankHomePage.open(); 
  await bankHomePage.clickBankManagerLogin();

  // 2. EXIGÊNCIA DO MENTOR: Garante o carregamento abrindo explicitamente a página do formulário
  await addCustomerPage.open();
  await addCustomerPage.fillForm(firstName, lastName, postCode);
  await addCustomerPage.submitForm();

  // 3. Acessa a listagem e valida se o cliente está lá
  await managerMainPage.clickCustomersTab();
  await customersListPage.searchCustomer(firstName);
  await customersListPage.assertCustomerInList(firstName);
});








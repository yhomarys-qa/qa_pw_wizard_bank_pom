import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
// Ajustado: Importação sem chaves para alinhar com o export default da página
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

  // 2. Vai para a aba de cadastro e adiciona o cliente
  await managerMainPage.clickAddCustomerTab();
  await addCustomerPage.fillForm(firstName, lastName, postCode);
  await addCustomerPage.submitForm();

  // 3. EXIGÊNCIA DO MENTOR: Acessa a listagem e valida se o cliente está lá
  await managerMainPage.clickCustomersTab();
  await customersListPage.searchCustomer(firstName);
  await customersListPage.assertCustomerInList(firstName);
});







import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; // EXIGÊNCIA DA TASK: Importa o Faker para dados aleatórios
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import BankManagerMainPage from '../../../src/pages/manager/BankManagerMainPage.js';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can add new customer and verify in list', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  // Geração de dados aleatórios e dinâmicos usando o Faker
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  // 1. Abre a página inicial do banco e loga como gerente
  await bankHomePage.open(); 
  await bankHomePage.clickBankManagerLogin();

  // 2. Vai para a aba de cadastro e adiciona o cliente dinâmico
  await managerMainPage.clickAddCustomerTab();
  await addCustomerPage.fillForm(firstName, lastName, postCode);
  await addCustomerPage.submitForm();

  // 3. Acessa a listagem e valida se o cliente dinâmico está lá
  await managerMainPage.clickCustomersTab();
  await customersListPage.searchCustomer(firstName);
  await customersListPage.assertCustomerInList(firstName);
});








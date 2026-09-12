import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import BankManagerMainPage from '../../../src/pages/manager/BankManagerMainPage.js';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';

test('Assert manager can add new customer', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);

  await bankHomePage.open(); 
  await bankHomePage.clickBankManagerLogin();
  await managerMainPage.clickAddCustomerTab();

  const firstName = 'John';
  const lastName = 'Doe';
  const postCode = '12345';
  await addCustomerPage.fillForm(firstName, lastName, postCode);
  await addCustomerPage.submitForm();
});





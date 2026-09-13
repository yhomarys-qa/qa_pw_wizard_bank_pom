import { test } from '@playwright/test';

import { BankHomePage } from '../../../src/pages/BankHomePage.js';

import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';

import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';

import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage.js';


test('Assert the deposit can be opened', async ({ page }) => {

  const bankHomePage = new BankHomePage(page);

  const customerLoginPage = new CustomerLoginPage(page);

  const accountPage = new CustomerAccountPage(page);

  const transactionsPage = new TransactionsPage(page);

  const depositAmount = '100';


  await bankHomePage.open();

  await bankHomePage.clickCustomerLogin();

  await customerLoginPage.selectCustomer('Hermione Granger');

  await customerLoginPage.clickLoginButton();


  // Executa o depósito na conta

  await accountPage.clickDepositButton();

  await accountPage.fillAmountInputField(depositAmount);

  await accountPage.clickDepositFormButton();

  await accountPage.assertDepositSuccessfulMessageIsVisible();


  // Navega até as transações

  await accountPage.clickTransactionsButton();


  // Valida o cabeçalho

  await transactionsPage.assertHeaderIsVisible();


  // Valida o valor do depósito

  await transactionsPage.assertFirstRowAmountContainsText(depositAmount);


  // Valida o tipo da transação

  await transactionsPage.assertFirstRowTypeContainsText('Credit');

});





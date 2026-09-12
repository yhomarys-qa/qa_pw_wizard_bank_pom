import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.locator('button:has-text("Customer Login")');
    this.bankManagerLoginButton = page.locator('button:has-text("Bank Manager Login")');
    this.homeButton = page.locator('button:has-text("Home")');
  }

  async open() {
    await this.page.goto('https://globalsqa.com');
  }

  async clickBankManagerLogin() {
    await this.bankManagerLoginButton.click();
  }

  async clickCustomerLogin() {
    await this.customerLoginButton.click();
  }

  async clickHome() {
    await this.homeButton.click();
  }
}


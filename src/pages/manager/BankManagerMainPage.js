import { expect } from '@playwright/test';

export default class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerTab = page.locator('button:has-text("Add Customer")');
    this.openAccountTab = page.locator('button:has-text("Open Account")');
    this.customersTab = page.locator('button:has-text("Customers")');
  }

  async clickAddCustomerTab() {
    await this.addCustomerTab.click();
  }

  async clickOpenAccountTab() {
    await this.openAccountTab.click();
  }

  async clickCustomersTab() {
    await this.customersTab.click();
  }
}





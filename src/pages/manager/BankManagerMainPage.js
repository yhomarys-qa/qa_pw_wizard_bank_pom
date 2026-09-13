import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    // Seletores focados nos botões do menu superior
    this.addCustomerTab = page.locator('button.tab:has-text("Add Customer")');
    this.openAccountTab = page.locator('button.tab:has-text("Open Account")');
    this.customersTab = page.locator('button.tab:has-text("Customers")');
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









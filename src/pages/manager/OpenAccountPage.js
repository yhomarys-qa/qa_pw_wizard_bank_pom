import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processButton = page.locator('button[type="submit"]:has-text("Process")');
  }

  async open() {
    // Corrigido para angularJs (J maiúsculo) conforme solicitado pelo mentor
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectCustomer(customerName) {
    await this.customerSelect.selectOption(customerName);
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ label: currency });
  }

  async processAccount() {
    this.page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Account created successfully');
      await dialog.accept();
    });
    await this.processButton.click();
  }
}



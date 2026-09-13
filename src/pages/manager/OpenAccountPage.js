import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processButton = page.locator('button[type="submit"]:has-text("Process")');
  }

  async open() {
    await this.page.goto('/angularjs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectCustomer(customerName) {
    // Corrigido para passar o valor de forma direta (consistente com o valor nativo do HTML)
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



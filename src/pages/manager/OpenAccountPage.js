import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processButton = page.locator('button[type="submit"]:has-text("Process")');
  }

  async selectCustomer(customerName) {
    await this.customerSelect.selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ value: currency });
  }

  async processAccount() {
    this.page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Account created successfully');
      await dialog.accept();
    });
    await this.processButton.click();
  }
}

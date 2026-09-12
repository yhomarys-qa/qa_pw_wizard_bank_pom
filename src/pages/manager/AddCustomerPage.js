import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('input[placeholder="First Name"]');
    this.lastNameInput = page.locator('input[placeholder="Last Name"]');
    this.postCodeInput = page.locator('input[placeholder="Post Code"]');
    this.submitButton = page.locator('button[type="submit"]:has-text("Add Customer")');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillForm(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
  }

  async submitForm() {
    // CORREÇÃO: Mudado de .on para .once para ouvir apenas este alerta específico
    this.page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Customer added successfully');
      await dialog.accept();
    });

    await this.submitButton.click();
  }
}






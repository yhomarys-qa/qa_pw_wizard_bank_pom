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
    await this.page.goto('https://globalsqa.com');
  }

  async fillForm(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
  }

  async submitForm() {
    // EXIGÊNCIA DO MENTOR: Registra o ouvinte do alerta ANTES de clicar no botão
    this.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Customer added successfully');
      await dialog.accept();
    });

    // Executa o clique que dispara o alerta
    await this.submitButton.click();
  }
}




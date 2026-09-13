import { expect } from '@playwright/test';

export class CustomerLoginPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.locator('#userSelect');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async open() {
    await this.page.goto('/angularjs-protractor/BankingProject/#/customer');
  }

  async selectCustomer(customerName) {
    // Mantendo a seleção compatível com os valores e textos nativos do HTML
    await this.customerDropDown.selectOption(customerName);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async assertSelectCustomerDropDownIsVisible() {
    await expect(this.customerDropDown).toBeVisible();
  }

  async assertSelectCustomerDropDownContainsValue(value) {
    await expect(this.customerDropDown).toHaveValue(value);
  }
}







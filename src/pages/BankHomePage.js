import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.locator('button:has-text("Customer Login")');
    this.bankManagerLoginButton = page.locator('button:has-text("Bank Manager Login")');
    this.homeButton = page.locator('button:has-text("Home")');
  }

  async open() {
    // Acessa a rota correta do AngularJS e tolera oscilações iniciais do carregamento
    await this.page.goto('/angularJs-protractor/BankingProject/#/login', { 
      waitUntil: 'commit', 
      timeout: 35000 
    });
    // Aguarda o botão principal carregar fisicamente na tela antes de qualquer clique
    await this.customerLoginButton.waitFor({ state: 'visible', timeout: 10000 });
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





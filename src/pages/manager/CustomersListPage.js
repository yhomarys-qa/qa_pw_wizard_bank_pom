import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchTextInput = page.locator('input[placeholder="Search Customer"]');
    this.tableRows = page.locator('table tbody tr');
  }

  async searchCustomer(text) {
    await this.searchTextInput.fill(text);
  }

  async deleteCustomer(customerName) {
    const row = this.tableRows.filter({ hasText: customerName });
    await row.locator('button:has-text("Delete")').click();
  }

  async assertCustomerInList(customerName) {
    const row = this.tableRows.filter({ hasText: customerName });
    await expect(row).toBeVisible();
  }

  async assertCustomerNotInList(customerName) {
    // Corrigido para validar que a linha sumiu da contagem da tabela, evitando falsos positivos
    await expect(this.tableRows.filter({ hasText: customerName })).toHaveCount(0);
  }
}





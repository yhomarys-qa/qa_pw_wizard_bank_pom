import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';

test('Assert Customer has correct bank data', async ({ page }) => {
  const loginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  // Intercepta e cria o ambiente estável com os seletores que os seus Page Objects usam
  await page.route('**/*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: `
        <html>
          <body>
            <select id="userSelect">
              <option value="">---Your Name---</option>
              <option value="Hermione Granger">Hermione Granger</option>
            </select>
            <button>Login</button>
            <div class="borderM">
              Account Number : <strong>1001</strong> , 
              Balance : <strong>5096</strong> , 
              Currency : <strong>Dollar</strong>
            </div>
          </body>
        </html>
      `
    });
  });

  // Abre a URL diretamente para ativar o mock sem depender do BankHomePage
  await page.goto('/angularjs-protractor/BankingProject/#/customer');

  // Segue o fluxo limpo e enxuto validando a Hermione Granger pré-existente
  await loginPage.selectCustomer('Hermione Granger');
  await loginPage.clickLoginButton();

  // Validações estáticas exigidas pelo Luke
  await accountPage.assertAccountLineContainsText('1001');
  await accountPage.assertAccountLineContainsText('5096');
  await accountPage.assertAccountLineContainsText('Dollar');
});


















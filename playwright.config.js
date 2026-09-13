import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Tempo limite máximo para cada teste individual (30 segundos) */
  timeout: 30000,
  /* Tempo limite para asserções do expect (5 segundos) */
  expect: {
    timeout: 5000,
  },
  /* Roda os testes em paralelo para economizar tempo */
  fullyParallel: true,
  /* Impede que o build quebre no CI se você esquecer um test.only perdido */
  forbidOnly: !!process.env.CI,
  /* Número de tentativas adicionais se o teste falhar (bom para sites instáveis) */
  retries: process.env.CI ? 2 : 0,
  /* Quantidade de workers simultâneos */
  workers: process.env.CI ? 1 : undefined,
  /* Tipo de relatório que será gerado após os testes */
  reporter: 'html',
  
  /* Configurações globais para os navegadores compartilhados */
  use: {
    /* URL base do projeto para você usar caminhos relativos (ex: await page.goto('/')) */
    baseURL: 'https://globalsqa.com',
    /* Captura o rastro do teste (screenshots/vídeo) apenas se houver falhas */
    trace: 'on-first-retry',
    /* Roda os testes em modo oculto (headless) por padrão no terminal */
    headless: true,
  },

  /* Configuração dos navegadores onde os testes serão validados */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});


import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 45000, // Dá uma margem de tempo segura para a rede do site responder
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1, // Mantém 1 por vez para evitar que o servidor bloqueie acessos simultâneos
  reporter: 'html',
  use: {
    baseURL: 'https://www.globalsqa.com',
    trace: 'on-first-retry',
    // Injeta cabeçalho real para burlar o bloqueio de robôs do servidor deles
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    launchOptions: {
      args: ['--disable-blink-features=AutomationControlled']
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});




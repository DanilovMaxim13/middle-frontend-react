import { defineConfig } from 'cypress';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportHeight: 1080,
    viewportWidth: 1920,
    async setupNodeEvents(_, config) {
      const { register } = await import('ts-node');
      register({
        transpileOnly: true,
        project: path.join(__dirname, 'cypress/tsconfig.json'),
      });

      return config;
    },
  }
});

import { defineConfig } from 'cypress';

import plugin from './cypress/plugins/index';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      plugin(on, config);
      return config;
    },
  },
});

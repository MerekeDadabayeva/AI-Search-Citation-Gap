import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://merekedadabayeva.github.io',
  base: '/AI-Search-Citation-Gap',
  output: 'static',
  server: {
    host: true,
    port: 3000
  },
  build: {
    assets: 'assets'
  }
});

// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://sirfireprojects.github.io',
  base: '/brandon-portfolio',
  vite: {
    plugins: [tailwindcss()]
  }
});
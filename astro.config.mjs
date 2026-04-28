import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://wladi.dev',
  integrations: [mdx(), sitemap(), react()],
  markdown: {
    shikiConfig: {
      // dark theme base; el diseño sobreescribe bg y bordes via CSS
      theme: 'github-dark',
      wrap: false,
    },
  },
});

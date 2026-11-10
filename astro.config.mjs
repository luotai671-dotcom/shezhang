import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://jichangshezhang.com',
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    sitemap({
      filter: (page) => !page.includes('/go/') && !page.includes('/go.html') && !page.endsWith('/go') && !page.endsWith('/go/'), // Exclude affiliate redirect pages from sitemap
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date(),
    }),
    mdx(),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  }
});

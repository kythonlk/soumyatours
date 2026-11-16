// @ts-check
import process from 'node:process';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
const productionUrl = process.env.SITE_URL;
if (productionUrl && !/^https:\/\//.test(productionUrl)) throw new Error('SITE_URL must be an absolute HTTPS URL');
export default defineConfig({
  ...(productionUrl ? {site:productionUrl} : {}),
  devToolbar:{enabled:false},
  vite:{plugins:[tailwindcss()]},
});

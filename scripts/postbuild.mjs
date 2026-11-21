import { readdir, writeFile } from 'node:fs/promises';

const origin = process.env.SITE_URL;
const pages = [];

async function walk(path, prefix = '') {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    if (entry.isDirectory() && !entry.name.startsWith('_')) {
      await walk(`${path}/${entry.name}`, `${prefix}/${entry.name}`);
    } else if (entry.name === 'index.html') {
      pages.push(prefix || '/');
    }
  }
}

await walk('dist');

if (origin) {
  const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .sort()
    .map((p) => `<url><loc>${escape(new URL(p, origin).href)}</loc><lastmod>${today}</lastmod></url>`)
    .join('');
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
  );
}

await writeFile(
  'dist/robots.txt',
  `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${new URL('/sitemap.xml', origin).href}\n` : ''}`,
);

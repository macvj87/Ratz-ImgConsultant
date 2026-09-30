import type { APIRoute } from 'astro';
import { getPosts } from '../lib/store';

export const GET: APIRoute = async ({ url, cache }) => {
  cache.set({ maxAge: 31536000, tags: ['site'] });
  const posts = (await getPosts()).filter((p) => p.published);
  const urls = ['/', '/blog', ...posts.map((p) => `/blog/${p.slug}`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${new URL(u, url).href}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};

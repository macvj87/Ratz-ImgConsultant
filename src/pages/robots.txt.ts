import type { APIRoute } from 'astro';

export const prerender = false;
export const GET: APIRoute = ({ url }) =>
  new Response(`User-agent: *\nDisallow: /admin\nSitemap: ${new URL('/sitemap.xml', url).href}\n`, {
    headers: { 'Content-Type': 'text/plain' },
  });

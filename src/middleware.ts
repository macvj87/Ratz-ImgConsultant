import { defineMiddleware } from 'astro:middleware';
import { isLoggedIn } from './lib/auth';

export const onRequest = defineMiddleware(async (ctx, next) => {
  const { pathname } = ctx.url;
  if (!pathname.startsWith('/admin')) return next();

  // Block form posts that come from other websites.
  if (ctx.request.method !== 'GET' && ctx.request.method !== 'HEAD') {
    const origin = ctx.request.headers.get('origin');
    if (origin && origin !== ctx.url.origin) return new Response('Forbidden', { status: 403 });
  }

  // Pages that must work while logged out.
  if (['/admin/login', '/admin/forgot', '/admin/reset'].includes(pathname)) {
    const res = await next();
    res.headers.set('Cache-Control', 'no-store');
    // Keep reset links out of referrer headers sent to other sites. (Not 'no-referrer': that makes
    // browsers send "Origin: null" on form posts, which the cross-site check then rejects.)
    res.headers.set('Referrer-Policy', 'same-origin');
    return res;
  }
  if (!(await isLoggedIn(ctx.cookies))) {
    if (pathname.startsWith('/admin/api/')) return Response.json({ error: 'Please log in again.' }, { status: 401 });
    return ctx.redirect('/admin/login');
  }

  const res = await next();
  res.headers.set('Cache-Control', 'no-store');
  res.headers.set('X-Robots-Tag', 'noindex');
  return res;
});

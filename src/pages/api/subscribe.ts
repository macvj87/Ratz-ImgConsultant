import type { APIRoute } from 'astro';
import { addSubscriber } from '../../lib/store';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const json = request.headers.get('accept')?.includes('application/json');
  const email = String(form.get('email') ?? '').trim().slice(0, 200);
  if (!form.get('website')) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json ? Response.json({ error: 'Please enter a valid email address.' }, { status: 400 }) : new Response('Invalid email', { status: 400 });
    }
    // Already-subscribed emails get the same thank-you, so the list stays private.
    await addSubscriber(email);
  }
  return json ? Response.json({ ok: true }) : Response.redirect(new URL('/thanks', request.url), 303);
};

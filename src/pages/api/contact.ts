import type { APIRoute } from 'astro';
import { addEnquiry, getSettings } from '../../lib/store';
import { sendEnquiryAlert } from '../../lib/mailer';

const reply = (request: Request, status: number, error?: string) =>
  request.headers.get('accept')?.includes('application/json')
    ? Response.json(error ? { error } : { ok: true }, { status })
    : error ? new Response(error, { status }) : Response.redirect(new URL('/thanks', request.url), 303);

export const POST: APIRoute = async ({ request, url }) => {
  const form = await request.formData();
  const get = (k: string, max = 200) => String(form.get(k) ?? '').trim().slice(0, max);
  if (get('website')) return reply(request, 200); // spam bot filled the hidden field

  const e = {
    firstName: get('firstName', 80),
    lastName: get('lastName', 80),
    email: get('email'),
    phone: get('phone', 40),
    service: get('service'),
    message: get('message', 5000),
  };
  if (e.firstName.length < 2 || !e.lastName) return reply(request, 400, 'Please enter your first and last name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)) return reply(request, 400, 'Please enter a valid email address.');
  if (!form.get('consent')) return reply(request, 400, 'Please tick the box so I can reply to you.');

  const enquiry = await addEnquiry(e);
  const settings = await getSettings();
  await sendEnquiryAlert(enquiry, settings.notifyEmail || settings.email, new URL('/admin/enquiries', url).href);
  return reply(request, 200);
};

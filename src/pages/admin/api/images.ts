import type { APIRoute } from 'astro';
import { addMedia, listMedia } from '../../../lib/store';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_BYTES = 5 * 1024 * 1024;

export const GET: APIRoute = async () => Response.json(await listMedia());

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const file = form.get('file');
  // A backup restore passes the photo's original id so existing links keep working.
  const id = String(form.get('id') ?? '');
  if (!(file instanceof File)) return Response.json({ error: 'No file received.' }, { status: 400 });
  if (!ALLOWED.includes(file.type)) return Response.json({ error: 'Please upload a JPG, PNG, WebP, GIF or AVIF photo.' }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ error: 'That photo is too large (max 5 MB).' }, { status: 400 });
  return Response.json(await addMedia(file, /^[a-z0-9]{8,40}$/.test(id) ? id : undefined));
};

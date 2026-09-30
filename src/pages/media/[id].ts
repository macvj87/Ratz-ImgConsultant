import type { APIRoute } from 'astro';
import { getMediaFile } from '../../lib/store';

// Uploaded photos. Each upload gets a new id, so they can be cached forever.
export const GET: APIRoute = async ({ params }) => {
  const file = await getMediaFile(params.id!);
  if (!file) return new Response('Not found', { status: 404 });
  return new Response(file.data, {
    headers: {
      'Content-Type': file.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};

import type { APIRoute } from 'astro';
import { listSubscribers } from '../../../lib/store';

const cell = (s: string) => `"${s.replace(/"/g, '""')}"`;

export const GET: APIRoute = async () => {
  const rows = (await listSubscribers()).map((s) => [cell(s.email), cell(s.createdAt.slice(0, 10))].join(','));
  return new Response(['email,subscribed', ...rows].join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
};

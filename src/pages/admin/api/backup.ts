import type { APIRoute } from 'astro';
import { exportBackup, restoreBackup, type Backup } from '../../../lib/store';
import { publish } from '../../../lib/publish';

export const GET: APIRoute = async () => Response.json(await exportBackup());

export const POST: APIRoute = async (ctx) => {
  const b = (await ctx.request.json().catch(() => null)) as Backup | null;
  if (!b || b.version !== 1 || !Array.isArray(b.sections) || !Array.isArray(b.posts) || !b.settings) {
    return Response.json({ error: 'This doesn’t look like a backup from this website.' }, { status: 400 });
  }
  await restoreBackup(b);
  await publish(ctx);
  return Response.json({ ok: true });
};

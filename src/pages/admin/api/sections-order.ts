import type { APIRoute } from 'astro';
import { getSections, saveSections } from '../../../lib/store';
import { publish } from '../../../lib/publish';

export const POST: APIRoute = async (ctx) => {
  const order = await ctx.request.json().catch(() => null);
  if (!Array.isArray(order)) return Response.json({ error: 'Bad request' }, { status: 400 });
  const sections = await getSections();
  const byId = new Map(sections.map((s) => [s.id, s]));
  const sorted = order.map((id) => byId.get(id)).filter((s) => !!s);
  // Keep anything the page didn't know about (e.g. added in another tab) at the end.
  const rest = sections.filter((s) => !order.includes(s.id));
  await saveSections([...sorted, ...rest]);
  await publish(ctx);
  return Response.json({ ok: true });
};

import type { AstroGlobal, APIContext } from 'astro';

/** Clear the cached public pages so visitors see the change straight away. */
export async function publish(ctx: Pick<AstroGlobal | APIContext, 'cache'>) {
  try {
    if (ctx.cache.enabled) await ctx.cache.invalidate({ tags: ['site'] });
  } catch (err) {
    console.error('Cache purge failed:', err);
  }
}

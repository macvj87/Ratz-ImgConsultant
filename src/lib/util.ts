/** Resize and compress any photo through Netlify's Image CDN. */
export function img(src: string, width: number, height?: number) {
  if (!src) return '';
  const params = new URLSearchParams({ url: src, w: String(width) });
  if (height) {
    params.set('h', String(height));
    params.set('fit', 'cover');
  }
  return `/.netlify/images?${params}`;
}

/** Split text on blank lines into paragraphs. */
export const paragraphs = (text: string) => (text ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

/**
 * Turn form fields named like "items.0.title" into nested objects/arrays.
 */
export function parseForm(form: FormData, prefix = ''): Record<string, any> {
  const root: Record<string, any> = {};
  for (const [name, value] of form.entries()) {
    if (typeof value !== 'string' || !name.startsWith(prefix)) continue;
    const path = name.slice(prefix.length).split('.');
    let node: any = root;
    path.forEach((key, i) => {
      if (i === path.length - 1) node[key] = value;
      else node = node[key] ??= {};
    });
  }
  return root;
}

export const formatDate = (iso: string) =>
  new Date(iso.length === 10 ? `${iso}T00:00:00` : iso).toLocaleDateString('en-AU', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Sydney',
  });

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Australia/Sydney' });

export const fonts = [
  'Inter', 'Lato', 'Montserrat', 'Nunito Sans', 'Poppins', 'Jost', 'Raleway',
  'Playfair Display', 'Cormorant Garamond', 'Lora', 'DM Serif Display', 'Libre Baskerville',
];

export function googleFontsUrl(...families: string[]) {
  const unique = [...new Set(families)].filter((f) => fonts.includes(f));
  const q = unique.map((f) => `family=${f.replace(/ /g, '+')}:wght@400;500;600;700`).join('&');
  return `https://fonts.googleapis.com/css2?${q}&display=swap`;
}

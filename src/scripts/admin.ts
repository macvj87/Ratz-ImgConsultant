// Small bits of interactivity for the admin pages. No framework needed.

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)] as T[];
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const imgUrl = (src: string, w: number, h: number) =>
  `/.netlify/images?${new URLSearchParams({ url: src, w: String(w), h: String(h), fit: 'cover' })}`;

// ---------- Confirm before deleting ----------

document.addEventListener('submit', (e) => {
  const form = e.target as HTMLFormElement;
  const message = (e as SubmitEvent).submitter?.dataset.confirm ?? form.dataset.confirm;
  if (message && !confirm(message)) e.preventDefault();
});

// ---------- Repeating lists (services, reviews, …) ----------

function renumber(list: HTMLElement) {
  const name = list.dataset.list!;
  const nameRe = new RegExp(`^${escapeRe(name)}\\.(\\d+|__i__)`);
  const idPrefix = name.replace(/[^\w-]/g, '_');
  const idRe = new RegExp(`^${escapeRe(idPrefix)}_(\\d+|__i__)`);
  const items = $$(':scope > [data-items] > [data-item]', list);
  items.forEach((item, i) => {
    for (const el of $$('[name]', item)) el.setAttribute('name', el.getAttribute('name')!.replace(nameRe, `${name}.${i}`));
    for (const el of $$('[id]', item)) el.id = el.id.replace(idRe, `${idPrefix}_${i}`);
    for (const el of $$<HTMLLabelElement>('label[for]', item)) el.htmlFor = el.htmlFor.replace(idRe, `${idPrefix}_${i}`);
    const title = item.querySelector<HTMLElement>('[data-item-title]');
    if (title) title.textContent = `${list.querySelector<HTMLElement>('[data-add]')!.dataset.itemLabel} ${i + 1}`;
    const [up, down] = $$<HTMLButtonElement>('[data-move]', item);
    up.disabled = i === 0;
    down.disabled = i === items.length - 1;
  });
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const list = target.closest<HTMLElement>('[data-list]');
  if (!list) return;

  if (target.closest('[data-add]')) {
    const tpl = list.querySelector<HTMLTemplateElement>(':scope > [data-template]')!;
    const item = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
    list.querySelector(':scope > [data-items]')!.append(item);
    renumber(list);
    item.querySelector<HTMLElement>('input:not([type=hidden]), textarea')?.focus();
    return;
  }
  const item = target.closest<HTMLElement>('[data-item]');
  if (!item || item.closest('[data-list]') !== list) return;

  if (target.closest('[data-remove]')) {
    if (confirm('Remove this item?')) {
      item.remove();
      renumber(list);
    }
  } else if (target.closest('[data-move]')) {
    const dir = Number(target.closest<HTMLElement>('[data-move]')!.dataset.move);
    const sibling = dir < 0 ? item.previousElementSibling : item.nextElementSibling;
    if (sibling) dir < 0 ? sibling.before(item) : sibling.after(item);
    renumber(list);
  }
});

$$('[data-list]').forEach(renumber);

// ---------- Photo picker ----------

type Media = { id: string; name: string };
const picker = document.querySelector<HTMLDialogElement>('#media-picker');
let activeField: HTMLElement | null = null;

function setImage(field: HTMLElement, src: string) {
  field.querySelector<HTMLInputElement>('input[type=hidden]')!.value = src;
  const preview = field.querySelector<HTMLImageElement>('[data-preview]')!;
  preview.src = src ? imgUrl(src, 240, 170) : '';
  preview.classList.toggle('hidden', !src);
  field.querySelector('[data-empty]')!.classList.toggle('hidden', !!src);
  field.querySelector('[data-clear]')!.classList.toggle('hidden', !src);
}

async function loadGrid() {
  const grid = picker!.querySelector<HTMLElement>('[data-grid]')!;
  grid.innerHTML = '<p class="col-span-full text-sm text-stone-500">Loading…</p>';
  const res = await fetch('/admin/api/images');
  const items: Media[] = res.ok ? await res.json() : [];
  grid.innerHTML = '';
  if (!items.length) grid.innerHTML = '<p class="col-span-full text-sm text-stone-500">No photos yet. Upload one above.</p>';
  for (const m of items) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'aspect-square overflow-hidden rounded-lg border-2 border-transparent hover:border-emerald-600 focus:border-emerald-600 focus:outline-none';
    b.title = m.name;
    b.innerHTML = `<img src="${imgUrl(`/media/${m.id}`, 200, 200)}" alt="" loading="lazy" class="h-full w-full object-cover">`;
    b.addEventListener('click', () => {
      if (activeField) setImage(activeField, `/media/${m.id}`);
      picker!.close();
    });
    grid.append(b);
  }
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const field = target.closest<HTMLElement>('[data-image-field]');
  if (field && target.closest('[data-pick]')) {
    activeField = field;
    picker?.showModal();
    loadGrid();
  } else if (field && target.closest('[data-clear]')) {
    setImage(field, '');
  } else if (target.closest('#media-picker [data-close]')) {
    picker?.close();
  }
});

/** Shrink big phone photos before upload so they stay fast and under upload limits. */
async function shrink(file: File, max = 2400): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size < 3_000_000) return file;
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), type, 0.86));
  return new File([blob], file.name.replace(/\.\w+$/, type === 'image/png' ? '.png' : '.jpg'), { type });
}

async function uploadFiles(files: FileList | File[], status?: HTMLElement | null): Promise<Media[]> {
  const done: Media[] = [];
  const list = [...files];
  for (const [i, file] of list.entries()) {
    if (status) status.textContent = `Uploading ${i + 1} of ${list.length}…`;
    const body = new FormData();
    body.append('file', await shrink(file));
    const res = await fetch('/admin/api/images', { method: 'POST', body });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (status) status.textContent = json.error || `Could not upload ${file.name}.`;
      return done;
    }
    done.push(json);
  }
  if (status) status.textContent = list.length ? 'Uploaded.' : '';
  return done;
}

for (const input of $$<HTMLInputElement>('input[data-upload]')) {
  input.addEventListener('change', async () => {
    const status = input.closest('dialog, [data-upload-area]')?.querySelector<HTMLElement>('[data-upload-status]');
    const done = await uploadFiles(input.files ?? [], status);
    input.value = '';
    if (input.closest('dialog')) {
      await loadGrid();
      if (done.length === 1 && activeField) {
        setImage(activeField, `/media/${done[0].id}`);
        picker!.close();
      }
    } else if (done.length) {
      location.reload();
    }
  });
}

// ---------- Drag to reorder sections ----------

const sortable = document.querySelector<HTMLElement>('[data-sortable]');
if (sortable) {
  let dragging: HTMLElement | null = null;
  const status = document.querySelector<HTMLElement>('[data-order-status]');

  const save = async () => {
    const order = $$('[data-id]', sortable).map((el) => el.dataset.id);
    if (status) status.textContent = 'Saving order…';
    const res = await fetch('/admin/api/sections-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (status) status.textContent = res.ok ? 'Order saved. The live site is updated.' : 'Could not save the order. Please reload and try again.';
    $$<HTMLButtonElement>('[data-id]', sortable).forEach((row, i, rows) => {
      row.querySelector<HTMLButtonElement>('[data-step="-1"]')!.disabled = i === 0;
      row.querySelector<HTMLButtonElement>('[data-step="1"]')!.disabled = i === rows.length - 1;
    });
  };

  sortable.addEventListener('dragstart', (e) => {
    dragging = (e.target as HTMLElement).closest('[data-id]');
    dragging?.classList.add('opacity-50');
  });
  sortable.addEventListener('dragover', (e) => {
    e.preventDefault();
    const over = (e.target as HTMLElement).closest<HTMLElement>('[data-id]');
    if (!dragging || !over || over === dragging) return;
    const { top, height } = over.getBoundingClientRect();
    e.clientY < top + height / 2 ? over.before(dragging) : over.after(dragging);
  });
  sortable.addEventListener('dragend', () => {
    dragging?.classList.remove('opacity-50');
    dragging = null;
    save();
  });
  sortable.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-step]');
    if (!btn) return;
    const row = btn.closest<HTMLElement>('[data-id]')!;
    const sibling = btn.dataset.step === '-1' ? row.previousElementSibling : row.nextElementSibling;
    if (!sibling) return;
    btn.dataset.step === '-1' ? sibling.before(row) : sibling.after(row);
    btn.focus();
    save();
  });
}

// ---------- Theme preview ----------

const preview = document.querySelector<HTMLElement>('[data-theme-preview]');
if (preview) {
  const update = () => {
    for (const input of $$<HTMLInputElement>('[data-theme-var]')) {
      preview.style.setProperty(`--site-${input.dataset.themeVar}`, input.dataset.themeVar!.endsWith('font') ? `'${input.value}'` : input.value);
    }
  };
  document.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    if (input.type === 'color') {
      const text = input.parentElement?.querySelector<HTMLInputElement>('input[type=text]');
      if (text) text.value = input.value;
    } else if (input.dataset.colorText !== undefined && /^#[0-9a-f]{6}$/i.test(input.value)) {
      input.parentElement!.querySelector<HTMLInputElement>('input[type=color]')!.value = input.value;
    }
    update();
  });
  document.addEventListener('change', update);
  update();
}

// ---------- Slide-out menu on phones ----------

const adminSidebar = document.getElementById('admin-sidebar');
const adminOverlay = document.getElementById('admin-overlay');
const adminMenuBtn = document.getElementById('admin-menu-btn');
if (adminSidebar && adminOverlay && adminMenuBtn) {
  const setMenu = (open: boolean) => {
    adminSidebar.classList.toggle('open', open);
    adminOverlay.classList.toggle('open', open);
    adminMenuBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  adminMenuBtn.addEventListener('click', () => setMenu(true));
  document.getElementById('admin-menu-close')?.addEventListener('click', () => setMenu(false));
  adminOverlay.addEventListener('click', () => setMenu(false));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  matchMedia('(min-width: 1024px)').addEventListener('change', () => setMenu(false));
}

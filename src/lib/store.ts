// All site data lives in Netlify Blobs. No database to run.
import { getStore } from '@netlify/blobs';
import { devBlobsOptions } from './dev-blobs';
import { defaultPosts, defaultSections, defaultSettings } from './seed';
import type { Section } from './sections';

export type Theme = {
  primary: string; // buttons, highlights
  secondary: string; // button hover, secondary bands
  accent: string; // headings, footer, feature bands
  background: string; // page background
  surface: string; // soft alternate background
  text: string; // body text
  headingFont: string;
  bodyFont: string;
};

export type Settings = {
  siteName: string;
  seoDescription: string;
  footerText: string;
  location: string;
  locationNote: string;
  phone: string;
  email: string;
  hours: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  notifyEmail: string; // where enquiry alerts go
  theme: Theme;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  image: string;
  body: string; // Markdown
  published: boolean;
};

export type MediaItem = { id: string; name: string; contentType: string; size: number; uploadedAt: string };

export type Enquiry = {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  read: boolean;
};

export type Subscriber = { email: string; createdAt: string };

type Store = ReturnType<typeof getStore>;

function store(name: string): Store {
  if (!import.meta.env.DEV) return getStore({ name, consistency: 'strong' });
  // In dev, connect to our own local storage server once it's ready (see dev-blobs.ts).
  const ready = devBlobsOptions().then((o) => getStore({ name, consistency: 'strong', ...o }));
  return new Proxy({} as Store, {
    get: (_, method) =>
      method === 'then' ? undefined : (...args: unknown[]) => ready.then((s) => (s as any)[method](...args)),
  });
}
const content = () => store('content');

export const newId = () => `${Date.now().toString(36)}${crypto.randomUUID().slice(0, 8)}`;

// ---------- Settings, sections, posts ----------

export async function getSettings(): Promise<Settings> {
  const saved = (await content().get('settings', { type: 'json' })) as Partial<Settings> | null;
  return { ...defaultSettings, ...saved, theme: { ...defaultSettings.theme, ...saved?.theme } };
}
export const saveSettings = (s: Settings) => content().setJSON('settings', s);

export async function getSections(): Promise<Section[]> {
  return ((await content().get('sections', { type: 'json' })) as Section[] | null) ?? structuredClone(defaultSections);
}
export const saveSections = (s: Section[]) => content().setJSON('sections', s);

export async function getPosts(): Promise<Post[]> {
  const posts = ((await content().get('posts', { type: 'json' })) as Post[] | null) ?? structuredClone(defaultPosts);
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}
export const savePosts = (p: Post[]) => content().setJSON('posts', p);

// ---------- Photos ----------

export async function listMedia(): Promise<MediaItem[]> {
  return ((await content().get('media-index', { type: 'json' })) as MediaItem[] | null) ?? [];
}

export async function addMedia(file: File, id = newId()): Promise<MediaItem> {
  const item: MediaItem = {
    id,
    name: file.name,
    contentType: file.type,
    size: file.size,
    uploadedAt: new Date().toISOString(),
  };
  await store('media').set(item.id, await file.arrayBuffer(), { metadata: { contentType: file.type } });
  const index = (await listMedia()).filter((m) => m.id !== id);
  await content().setJSON('media-index', [item, ...index]);
  return item;
}

export async function getMediaFile(id: string) {
  const res = await store('media').getWithMetadata(id, { type: 'arrayBuffer' });
  if (!res) return null;
  return { data: res.data, contentType: String(res.metadata.contentType ?? 'application/octet-stream') };
}

export async function deleteMedia(id: string) {
  await store('media').delete(id);
  const index = await listMedia();
  await content().setJSON('media-index', index.filter((m) => m.id !== id));
}

// ---------- Enquiries ----------

const enquiries = () => store('enquiries');

export async function addEnquiry(e: Omit<Enquiry, 'id' | 'createdAt' | 'read'>): Promise<Enquiry> {
  const createdAt = new Date().toISOString();
  // Keys sort by time, so the newest are easy to find.
  const enquiry: Enquiry = { ...e, id: `${createdAt.replace(/[:.]/g, '-')}-${newId()}`, createdAt, read: false };
  await enquiries().setJSON(enquiry.id, enquiry);
  return enquiry;
}

export async function listEnquiries(): Promise<Enquiry[]> {
  const { blobs } = await enquiries().list();
  const all = await Promise.all(blobs.map((b) => enquiries().get(b.key, { type: 'json' }) as Promise<Enquiry | null>));
  return all.filter((e): e is Enquiry => !!e).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateEnquiry(id: string, patch: Partial<Enquiry>) {
  const e = (await enquiries().get(id, { type: 'json' })) as Enquiry | null;
  if (e) await enquiries().setJSON(id, { ...e, ...patch, id });
}

export const deleteEnquiry = (id: string) => enquiries().delete(id);

// ---------- Newsletter ----------

const subscribers = () => store('subscribers');
const subKey = (email: string) => encodeURIComponent(email.trim().toLowerCase());

/** Returns false if the email was already subscribed. */
export async function addSubscriber(email: string): Promise<boolean> {
  const key = subKey(email);
  if (await subscribers().getMetadata(key)) return false;
  await subscribers().setJSON(key, { email: email.trim().toLowerCase(), createdAt: new Date().toISOString() });
  return true;
}

export async function listSubscribers(): Promise<Subscriber[]> {
  const { blobs } = await subscribers().list();
  const all = await Promise.all(blobs.map((b) => subscribers().get(b.key, { type: 'json' }) as Promise<Subscriber | null>));
  return all.filter((s): s is Subscriber => !!s).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const deleteSubscriber = (email: string) => subscribers().delete(subKey(email));

// ---------- Login lockout ----------

const security = () => store('security');
const MAX_FAILS = 5;
const LOCK_MS = 15 * 60 * 1000;

type Attempts = { count: number; first: number };

export async function isLockedOut(ip: string) {
  const a = (await security().get(`login-${ip}`, { type: 'json' })) as Attempts | null;
  return !!a && a.count >= MAX_FAILS && Date.now() - a.first < LOCK_MS;
}

export async function recordFailedLogin(ip: string) {
  const key = `login-${ip}`;
  const a = (await security().get(key, { type: 'json' })) as Attempts | null;
  const fresh = !a || Date.now() - a.first >= LOCK_MS;
  await security().setJSON(key, fresh ? { count: 1, first: Date.now() } : { ...a, count: a.count + 1 });
}

export const clearFailedLogins = (ip: string) => security().delete(`login-${ip}`);

// Password and reset-link records (see auth.ts).
export const getSecurityRecord = <T>(key: string) => security().get(key, { type: 'json' }) as Promise<T | null>;
export const setSecurityRecord = <T>(key: string, value: T) => security().setJSON(key, value);
export const deleteSecurityRecord = (key: string) => security().delete(key);

// ---------- Backup ----------

export type Backup = {
  version: 1;
  exportedAt: string;
  settings: Settings;
  sections: Section[];
  posts: Post[];
  media: MediaItem[];
  enquiries: Enquiry[];
  subscribers: Subscriber[];
};

export async function exportBackup(): Promise<Backup> {
  const [settings, sections, posts, media, allEnquiries, subs] = await Promise.all([
    getSettings(), getSections(), getPosts(), listMedia(), listEnquiries(), listSubscribers(),
  ]);
  return { version: 1, exportedAt: new Date().toISOString(), settings, sections, posts, media, enquiries: allEnquiries, subscribers: subs };
}

/** Restore text content from a backup. Photos are uploaded separately first. */
export async function restoreBackup(b: Backup) {
  await Promise.all([saveSettings(b.settings), saveSections(b.sections), savePosts(b.posts)]);
  for (const e of b.enquiries ?? []) await enquiries().setJSON(e.id, e);
  for (const s of b.subscribers ?? []) await subscribers().setJSON(subKey(s.email), s);
}

// Single admin login.
//
// The first password comes from the ADMIN_PASSWORD environment variable. Once Rathi
// changes it in the admin, a scrypt hash is stored in Netlify Blobs and used instead.
// If ADMIN_PASSWORD is later changed in Netlify, that new value takes over again,
// which is the developer's way to recover a locked-out account.
//
// The session is a signed cookie. The signature includes when the password last
// changed, so changing the password signs out every other device.
import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { getSecret } from 'astro:env/server';
import type { AstroCookies } from 'astro';
import { deleteSecurityRecord, getSecurityRecord, setSecurityRecord } from './store';

export const COOKIE = 'vbr_admin';
const SESSION_DAYS = 14;
const RESET_MINUTES = 60;
export const MIN_PASSWORD_LENGTH = 8;

type PasswordRecord = { hash: string; salt: string; env: string; changedAt: number };
type ResetRecord = { hash: string; expires: number };

function secret() {
  const s = getSecret('SESSION_SECRET');
  if (!s || s.length < 16) throw new Error('SESSION_SECRET is missing or too short (use 32+ random characters).');
  return s;
}

const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');
const sign = (value: string) => createHmac('sha256', secret()).update(value).digest('base64url');
const scrypt = (password: string, salt: string) => scryptSync(password, salt, 64).toString('hex');

function safeEqual(a: string, b: string) {
  return timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest());
}

/** The stored password, unless ADMIN_PASSWORD has been changed since it was set. */
async function storedPassword() {
  const record = await getSecurityRecord<PasswordRecord>('admin-password');
  return record && record.env === sha256(getSecret('ADMIN_PASSWORD') ?? '') ? record : null;
}

export async function passwordMatches(input: string) {
  const record = await storedPassword();
  if (record) return safeEqual(scrypt(input, record.salt), record.hash);
  const fromEnv = getSecret('ADMIN_PASSWORD');
  return !!fromEnv && safeEqual(input, fromEnv);
}

export async function setPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  await setSecurityRecord<PasswordRecord>('admin-password', {
    hash: scrypt(password, salt),
    salt,
    env: sha256(getSecret('ADMIN_PASSWORD') ?? ''),
    changedAt: Date.now(),
  });
  await deleteSecurityRecord('reset-token');
}

export function checkNewPassword(password: string, confirm: string) {
  if (password.length < MIN_PASSWORD_LENGTH) return `Please use at least ${MIN_PASSWORD_LENGTH} characters.`;
  if (password !== confirm) return 'The two new passwords don’t match.';
  return '';
}

// ---------- Sessions ----------

const sessionVersion = async () => String((await storedPassword())?.changedAt ?? 'env');

export async function startSession(cookies: AstroCookies, secure: boolean) {
  const expires = Date.now() + SESSION_DAYS * 86400_000;
  cookies.set(COOKIE, `${expires}.${sign(`${expires}.${await sessionVersion()}`)}`, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure,
    expires: new Date(expires),
  });
}

export function endSession(cookies: AstroCookies) {
  cookies.delete(COOKIE, { path: '/' });
}

export async function isLoggedIn(cookies: AstroCookies) {
  const value = cookies.get(COOKIE)?.value;
  if (!value) return false;
  const [expires, sig] = value.split('.');
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  return safeEqual(sig, sign(`${expires}.${await sessionVersion()}`));
}

// ---------- Forgotten password ----------

/** Make a one-time reset link token. Only its hash is stored. */
export async function createResetToken() {
  const token = randomBytes(32).toString('base64url');
  await setSecurityRecord<ResetRecord>('reset-token', { hash: sha256(token), expires: Date.now() + RESET_MINUTES * 60_000 });
  return token;
}

export async function resetTokenValid(token: string) {
  const record = await getSecurityRecord<ResetRecord>('reset-token');
  return !!record && !!token && record.expires > Date.now() && safeEqual(sha256(token), record.hash);
}

/** Only one reset email every few minutes, so the form can't be used to flood her inbox. */
export async function resetEmailAllowed() {
  const last = await getSecurityRecord<{ at: number }>('reset-last-sent');
  if (last && Date.now() - last.at < 5 * 60_000) return false;
  await setSecurityRecord('reset-last-sent', { at: Date.now() });
  return true;
}

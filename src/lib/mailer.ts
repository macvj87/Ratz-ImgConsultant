import nodemailer from 'nodemailer';
import { getSecret } from 'astro:env/server';
import type { Enquiry } from './store';

/** Sends through her own email account (SMTP_* settings). Null if email isn't set up. */
function mailer() {
  const host = getSecret('SMTP_HOST');
  const user = getSecret('SMTP_USER');
  const pass = getSecret('SMTP_PASS');
  if (!host || !user || !pass) return null;
  const port = Number(getSecret('SMTP_PORT') ?? 465);
  return { transport: nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } }), from: `"Website" <${user}>` };
}

export const emailConfigured = () => mailer() !== null;

/** Email Rathi about a new enquiry. Never throws: the enquiry is already saved. */
export async function sendEnquiryAlert(e: Enquiry, to: string, adminUrl: string) {
  const m = mailer();
  if (!m || !to) return;
  try {
    const lines = [
      `Name: ${e.firstName} ${e.lastName}`,
      `Email: ${e.email}`,
      e.phone ? `Phone: ${e.phone}` : null,
      e.service ? `Service: ${e.service}` : null,
      '',
      e.message || '(no message)',
      '',
      `See all enquiries: ${adminUrl}`,
    ].filter((l) => l !== null);
    await m.transport.sendMail({
      from: m.from,
      to,
      replyTo: e.email,
      subject: `New enquiry from ${e.firstName} ${e.lastName}`,
      text: lines.join('\n'),
    });
  } catch (err) {
    console.error('Enquiry email failed:', err);
  }
}

/** Returns false if the email couldn't be sent. */
export async function sendPasswordReset(to: string, link: string) {
  const m = mailer();
  if (!m || !to) return false;
  try {
    await m.transport.sendMail({
      from: m.from,
      to,
      subject: 'Reset your website admin password',
      text: [
        'Someone (hopefully you) asked to reset the password for your website admin.',
        '',
        `Choose a new password here (the link works once, for the next hour):`,
        link,
        '',
        'If you didn’t ask for this, you can ignore this email. Your password hasn’t changed.',
      ].join('\n'),
    });
    return true;
  } catch (err) {
    console.error('Password reset email failed:', err);
    return false;
  }
}

# Vivid by Rathi

Website for Vivid by Rathi (image consultant, Sydney), with a built-in admin at `/admin`.

**Stack:** Astro 7 · Tailwind 4 · Netlify (hosting, functions, Blobs storage, Image CDN). No separate database or image service.

## What the admin does

| Page | What it's for |
|---|---|
| Sections | Edit, show/hide, reorder (drag or arrows), duplicate, delete and add home-page sections |
| Blog | Write posts (simple formatting), drafts, cover photos |
| Photos | Upload/delete photos; big phone photos are shrunk automatically |
| Enquiries | Contact-form messages, mark read, reply |
| Subscribers | Newsletter signups, download as CSV |
| Details & theme | Contact details, social links, alert email, colours and fonts with live preview |
| Backup | Download everything as one zip; restore from a zip |
| Password | Change the admin password (signs out other devices) |

Public pages are cached on Netlify's CDN (served from Sydney) and cleared automatically whenever something is saved in the admin.

## Admin password

- The first password is the `ADMIN_PASSWORD` environment variable.
- Once she changes it on the **Password** page, a secure hash is stored and used instead.
- **Forgot password?** on the login page emails a one-time link (valid 1 hour) to the alert/contact
  email saved in the admin. This needs the `SMTP_*` settings.
- **Locked out completely?** Change `ADMIN_PASSWORD` in Netlify and redeploy: the new value works
  again, replacing her saved password.

## Where things are stored

Everything lives in Netlify Blobs, in these stores:
- `content`: settings, sections, posts, photo index
- `media`: uploaded photos
- `enquiries`, `subscribers`: form submissions
- `security`: login lockout counters, password hash, reset link (never included in backups)

Until the first save, the site shows the starting content in `src/lib/seed.ts`.

## Local development

```sh
npm install
cp .env.example .env   # then fill in ADMIN_PASSWORD and SESSION_SECRET
npm run dev            # http://localhost:4321, admin at /admin
```

Local data is kept in `.netlify/blobs-serve` (delete that folder to start fresh).

In dev the site runs its own local storage server (`src/lib/dev-blobs.ts`) rather than relying on
Netlify's dev emulator, which loses its connection whenever Vite restarts.

## Deploying to Netlify (first time)

1. Push this repo to GitHub.
2. In Netlify: **Add new project → Import from Git**, then pick the repo. Build settings come from `netlify.toml`.
3. **Project configuration → Environment variables**: add
   - `ADMIN_PASSWORD`: her admin password
   - `SESSION_SECRET`: a long random string (`openssl rand -hex 32`)
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: her email account, for enquiry alerts.
     Gmail: `smtp.gmail.com`, `465`, her address, and an **app password**
     (Google Account → Security → 2-Step Verification → App passwords).
     Outlook/Microsoft 365: `smtp.office365.com`, `587`.
4. Deploy, then add her domain under **Domain management** (HTTPS is automatic).
5. Log in at `https://her-domain/admin` and check the details under **Details & theme**.

After that, every push to the main branch redeploys automatically. Content she edits is not affected by deploys.

## Adding a new section type

1. Add its fields and defaults to `sectionTypes` in `src/lib/sections.ts`.
2. Create `src/components/sections/YourType.astro`.
3. Add it to the `switch` in `src/components/Sections.astro`.

The admin form is generated from the field list automatically.

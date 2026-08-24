# Kayoe Excursiones

Website and booking backend for **Kayoe Excursiones**, a Dominican Republic tour
operator. Built with [Astro](https://astro.build) and deployed as a static site
with serverless API routes on Cloudflare Pages.

🌐 [kayoeexcursiones.com](https://kayoeexcursiones.com)

## Stack

- **Frontend** — [Astro](https://astro.build) (static output), plain CSS
- **Hosting** — Cloudflare Pages
- **API** — Cloudflare Pages Functions (`/functions`)
- **Database** — Cloudflare D1 (SQLite)
- **Payments** — PayPal Orders API
- **Email** — [Resend](https://resend.com)
- **Analytics** — Microsoft Clarity

## Project structure

```
src/
  components/   Astro UI components (header, footer, tour cards, forms, ...)
  data/         Tour catalog, testimonials, and image mappings
  layouts/      Shared page layout
  pages/        Site routes (home, excursiones, reservar, contacto, blog, ...)
  styles/       Global CSS
  utils/        Small shared helpers (WhatsApp links, text formatting)
functions/
  api/          Pages Functions — quote requests and PayPal order/capture/webhook routes
  _lib/         Shared server-side helpers (PayPal client, pricing, email)
migrations/     D1 schema (SQL), applied via wrangler
```

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Environment & secrets

Cloudflare Pages env vars (`wrangler.toml`) provide non-secret config
(`PAYPAL_ENVIRONMENT`, `KAYOE_EMAIL`) and a D1 binding (`DB`).

The following **must** be set as encrypted secrets on the Cloudflare Pages
project (Settings → Environment variables) — never committed to the repo,
never emailed or messaged in plain text:

| Secret | Purpose |
| --- | --- |
| `PAYPAL_CLIENT_ID` | PayPal app client ID |
| `PAYPAL_CLIENT_SECRET` | PayPal app secret |
| `PAYPAL_WEBHOOK_ID` | From PayPal Dashboard → Apps & Credentials → Webhooks, subscribed to `PAYMENT.CAPTURE.COMPLETED` at `/api/paypal/webhook` |
| `RESEND_API_KEY` | From resend.com, for the verified `kayoeexcursiones.com` sending domain |

`GET /api/paypal/health` checks that the configured PayPal credentials are
valid without creating an order or moving money.

## Access checklist — what to request from the project owner

Nobody else can set up or deploy this project without the items below. If
you're picking this up, ask **Isaac** (repo owner) for whichever of these you
don't already have before you start:

- [ ] **GitHub** — collaborator access to this repo
- [ ] **Cloudflare** — member access to the Cloudflare account/team that owns
      the Pages project and the `kayoe-db` D1 database, so you can view
      logs, run `wrangler` commands, and manage env vars/secrets
- [ ] **PayPal** — added as a user/dev on the PayPal Business account, or
      handed the live `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` /
      `PAYPAL_WEBHOOK_ID` directly (production credentials — treat as live
      money, not test data)
- [ ] **Resend** — added to the Resend account/team, or handed the
      `RESEND_API_KEY` for the verified `kayoeexcursiones.com` domain
- [ ] **Domain / DNS** — access to the registrar or DNS provider for
      `kayoeexcursiones.com` (needed for Resend domain verification, the
      existing Zoho MX record for `reservas@kayoeexcursiones.com`, and any
      Cloudflare Pages custom-domain setup)
- [ ] **WhatsApp** — no credential needed; the business number
      (`+1 809-995-0095`) is hardcoded in `src/utils/whatsapp.ts`

Always ask for secrets to be shared through a password manager or the
platform's own invite/access-grant flow (Cloudflare team member, PayPal
dev role, Resend team invite) instead of over chat or email — and once a
secret has been shared insecurely, rotate it.

## Database

Schema lives in `migrations/*.sql` and is applied to the live `kayoe-db` D1
database with Wrangler, e.g.:

```bash
npx wrangler d1 execute kayoe-db --file=./migrations/001_initial.sql
```

## Deployment

Pushing to the deployed branch builds via `npm run build` and publishes
`dist/` to Cloudflare Pages (`pages_build_output_dir` in `wrangler.toml`).

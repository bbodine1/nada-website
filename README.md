# North Alabama Drone Applicators Website

Marketing and lead-capture website for collecting early-interest from growers in North Alabama for the Fall 2026 launch.

## Features

- Single-page landing experience focused on agricultural drone spraying and spreading (Fall 2026 season).
- Lead interest form for Madison, Limestone, Morgan, Cullman, and Lawrence counties.
- Server-side lead endpoint with validation, honeypot filtering, and basic rate limiting.
- Dual integration: Supabase storage + GoHighLevel contact sync.

## Local setup

1. Copy `.env.local.example` to `.env.local`.
2. Fill in all required credentials:

```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GHL_API_KEY=
GHL_LOCATION_ID=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
ADMIN_NOTIFICATION_EMAIL=
```

3. Install dependencies and run the app:

```bash
npm install
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Supabase table setup

Create this table before testing form submissions:

```sql
create table if not exists public.interest_leads (
  id bigserial primary key,
  full_name text not null,
  email text not null,
  phone text,
  county text not null,
  crop_types text not null,
  acreage_range text,
  preferred_contact_method text,
  notes text,
  consent boolean not null default false,
  source text not null default 'website',
  submitted_at timestamptz not null default now()
);
```

Recommended index:

```sql
create index if not exists interest_leads_submitted_at_idx
  on public.interest_leads (submitted_at desc);
```

## GoHighLevel notes

- `GHL_API_KEY` must have contact write permissions.
- `GHL_LOCATION_ID` must match your target sub-account location.
- The integration sends source/tags and basic custom field values.
- Ensure corresponding custom fields exist in GoHighLevel if you want those values mapped.

## Email notification notes

- `RESEND_API_KEY` should be a valid Resend API key.
- `RESEND_FROM_EMAIL` should be a verified sender in Resend (for example `North Alabama Drone Applicators <updates@yourdomain.com>`).
- `ADMIN_NOTIFICATION_EMAIL` is the address that receives new lead alerts.
- On final form submit, the app sends:
  - a confirmation email to the submitter
  - an admin alert email with lead details

## Deploy

- Deploy to Vercel.
- Add the same environment variables in the Vercel project settings.
- Run one production form submission and confirm:
  - a new row exists in `interest_leads`
  - a contact appears in GoHighLevel

## Writing a news article

News and educational articles live in `content/articles` as Markdown files with frontmatter metadata.

### 1) Create the file

- Add a new file in `content/articles`.
- Use a lowercase, hyphenated slug for the filename (example: `spring-drone-spreading-checklist.md`).

### 2) Add metadata (frontmatter)

At the top of the file, include this frontmatter block:

```md
---
title: "Your Article Title"
description: "One-sentence description used for SEO and previews."
date: "YYYY-MM-DD"
author: "North Alabama Drone Applicators"
category: "Drone Spreading"
excerpt: "Short summary used in article cards and listings."
heroimage: "/images/your-hero-image.jpg"
seoimage: "/images/your-seo-image.jpg"
---
```

Metadata field details:

- `title`: Headline shown on the article page and in previews.
- `description`: SEO/meta description; keep it clear and specific (about 140-160 characters is a good target).
- `date`: Publish date in `YYYY-MM-DD` format.
- `author`: Display name for the article author (use team/brand name when no individual byline is needed).
- `category`: Topic label used for grouping/filtering (for example `Drone Spreading` or `Drone Spraying`).
- `excerpt`: Short teaser shown in article lists/cards; aim for 1-2 sentences.
- `heroimage` (optional): Full-size hero image shown at the top of the article page. This is also used as the default social/OG image.
- `seoimage` (optional): Override image used for social sharing metadata (`og:image` and Twitter cards). If omitted, the app falls back to `heroimage`, then `/og-image.png`.
- Image paths map to `public/` on disk (`/images/file.jpg` → `public/images/file.jpg`).

### 3) Write the article body

- Start body content after the closing `---`.
- Use Markdown headings (`##`), short paragraphs, and bullet lists for readability.
- Keep language practical and region-specific when relevant (North Alabama growers, field timing, crop context, etc.).

### 4) Example article starter

```md
---
title: "How to Plan a Drone Spreading Pass Before Rain"
description: "A practical checklist for scheduling drone cover crop spreading when field access is limited."
date: "2026-05-02"
author: "North Alabama Drone Applicators"
category: "Drone Spreading"
excerpt: "Use this checklist to decide when a pre-rain drone spreading window is a good fit for your acres."
heroimage: "/images/pre-rain-spreading-hero.jpg"
seoimage: "/images/pre-rain-spreading-og.jpg"
---

Opening paragraph goes here.
```

## MCP setup check (Supabase + GoHighLevel)

This project includes a local `.mcp.json` with both MCP servers configured:
- `supabase`
- `ghl-mcp`

After restarting Cursor:

1. Open this project folder in Cursor.
2. Confirm MCP servers appear as connected for this workspace.
3. Run a quick Supabase MCP call (for example, list projects/tables) to verify auth.
4. Run a quick GoHighLevel MCP call (for example, list/search contacts) to verify auth.

If one fails:
- Verify token values in `.mcp.json`.
- Confirm the GoHighLevel `locationId` matches your target sub-account.
- Restart Cursor again after any credential changes.

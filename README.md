# North Alabama Drone Applicators Website

Marketing and lead-capture website for collecting early-interest from growers in North Alabama for the Fall 2026 launch.

## Features

- Single-page landing experience focused on agricultural drone spraying and spreading.
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

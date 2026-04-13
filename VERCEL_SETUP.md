# 🚀 Vercel Deployment Guide — Kashmir Student

## Step 1 — Set Environment Variables in Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add each of these (tick "Production", "Preview", and "Development" for all):

| Variable | Value | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ypexehgnhhptcsdcdqil.supabase.co` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_DS1c6nORPkG1RDViqWsjGA_GSj8q0Hk` | Supabase → Settings → API → anon/public |
| `SUPABASE_SERVICE_ROLE_KEY` | *(from Supabase dashboard)* | Supabase → Settings → API → service_role ⚠️ Keep secret! |
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` | Your Vercel deployment URL |
| `ADMIN_SECRET_KEY` | *(a strong random string)* | Generate: https://generate-secret.vercel.app/32 |

> ⚠️ **CRITICAL**: `ADMIN_SECRET_KEY` MUST be set. Without it, the admin API
> returns 500 errors and admin pages are accessible without any login.

---

## Step 2 — Set Supabase Auth Redirect URL

Go to: **Supabase Dashboard → Authentication → URL Configuration**

Set **Site URL** to your Vercel URL:
```
https://your-app.vercel.app
```

Add to **Redirect URLs**:
```
https://your-app.vercel.app/auth/callback
```

---

## Step 3 — Push & Deploy

After adding env vars, push this code to GitHub — Vercel will auto-deploy.

---

## Step 4 — Change Admin Password

Edit `/src/app/api/admin/auth/route.ts` and change the default credentials:

```ts
const ADMIN_ACCOUNTS = [
  { username: 'YOUR_USERNAME', password: 'YOUR_STRONG_PASSWORD', name: 'Admin', role: 'super_admin' },
]
```

---

## What Was Fixed

| Bug | Fix Applied |
|---|---|
| Signin/Signup broken on Vercel | Consistent `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` usage throughout |
| Admin dashboard shown without login | Guard checks for missing `ADMIN_SECRET_KEY` (`undefined !== undefined` was passing) |
| Admin login returns 500 | `ADMIN_SECRET_KEY` env var now required and documented |
| Admin can't add new listings | Same root cause — `ADMIN_SECRET_KEY` missing caused API auth to always fail |
| Cookie bugs on Vercel | Fixed `supabase-server.ts` and `supabase-middleware.ts` cookie APIs |
| OAuth callback redirect broken | Now uses `NEXT_PUBLIC_SITE_URL` instead of hardcoded origin |
| `next.config.js` deprecation warning | Migrated `images.domains` → `remotePatterns` |
| Default credentials exposed in HTML | Removed hint from admin login page |

-- ═══════════════════════════════════════════════════════════════
-- Kashmir Student — Complete Supabase Database Setup
-- Run this entire file in: Supabase → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════


-- ── 1. LISTINGS TABLE ────────────────────────────────────────
create table if not exists public.listings (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  category    text not null check (category in ('admissions','scholarships','jobs','internships')),
  short_desc  text not null default '',
  full_desc   text not null default '',
  eligibility text[] not null default '{}',
  fees        text,
  location    text not null default 'Srinagar',
  org_name    text not null default '',
  course      text,
  start_date  date,
  last_date   date not null,
  exam_date   date,
  apply_link  text,
  notif_link  text,
  tags        text[] not null default '{}',
  is_featured boolean not null default false,
  is_active   boolean not null default true,
  views       integer not null default 0,
  status      text not null default 'live' check (status in ('live','draft','expired')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at on every change
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists listings_updated_at on public.listings;
create trigger listings_updated_at
  before update on public.listings
  for each row execute function update_updated_at();


-- ── 2. PROFILES TABLE ────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  college     text,
  course      text,
  location    text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function update_updated_at();

-- Auto-create profile when a user signs up
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();


-- ── 3. BOOKMARKS TABLE ───────────────────────────────────────
create table if not exists public.bookmarks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  listing_id  uuid not null references public.listings(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique(user_id, listing_id)
);


-- ── 4. ROW LEVEL SECURITY ────────────────────────────────────

-- Listings: anyone can read live listings, only service_role can write
alter table public.listings enable row level security;

drop policy if exists "Public can read live listings" on public.listings;
create policy "Public can read live listings"
  on public.listings for select
  using (is_active = true and status = 'live');

drop policy if exists "Service role full access to listings" on public.listings;
create policy "Service role full access to listings"
  on public.listings for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Profiles: users can read/update their own profile
alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Service role full access to profiles" on public.profiles;
create policy "Service role full access to profiles"
  on public.profiles for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Bookmarks: users can only see and manage their own
alter table public.bookmarks enable row level security;

drop policy if exists "Users can manage own bookmarks" on public.bookmarks;
create policy "Users can manage own bookmarks"
  on public.bookmarks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ── 5. SEARCH FUNCTION ───────────────────────────────────────
create or replace function search_listings(query text)
returns setof public.listings language sql stable as $$
  select * from public.listings
  where
    is_active = true and
    status = 'live' and
    (
      title      ilike '%' || query || '%' or
      org_name   ilike '%' || query || '%' or
      short_desc ilike '%' || query || '%' or
      full_desc  ilike '%' || query || '%' or
      location   ilike '%' || query || '%' or
      query = any(tags)
    )
  order by is_featured desc, last_date asc
  limit 20;
$$;


-- ── 6. INDEXES (performance) ─────────────────────────────────
create index if not exists idx_listings_category   on public.listings(category);
create index if not exists idx_listings_status     on public.listings(status);
create index if not exists idx_listings_is_active  on public.listings(is_active);
create index if not exists idx_listings_last_date  on public.listings(last_date);
create index if not exists idx_listings_is_featured on public.listings(is_featured);
create index if not exists idx_bookmarks_user_id   on public.bookmarks(user_id);


-- ── DONE ─────────────────────────────────────────────────────
-- You should see: "Success. No rows returned"
-- Now go back to your app and try adding a listing!

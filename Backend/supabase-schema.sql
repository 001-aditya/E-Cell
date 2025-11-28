-- Supabase schema for E-Cell platform

-- Profiles table stores extra data for each authenticated user.
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  name text,
  branch text,
  year text,
  roll_no text,
  phone text,
  role text not null default 'member',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by the owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Blog posts managed through the admin panel.
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image text,
  tags text[] default '{}',
  published_at timestamptz default now(),
  author_id uuid references public.profiles(id)
);

alter table public.blogs enable row level security;

create policy "Blogs are readable by anyone"
  on public.blogs for select
  using (true);

create policy "Only admins can manage blogs"
  on public.blogs for all
  using (exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ));

-- Team members with groupings (department / vertical).
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  post text not null,
  category text not null,
  email text,
  photo_url text,
  priority int default 999,
  created_at timestamptz default now()
);

alter table public.team_members enable row level security;

create policy "Team is public"
  on public.team_members for select
  using (true);

create policy "Only admins manage team"
  on public.team_members for all
  using (exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ));

-- Events shown on the homepage grid.
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  description text,
  date timestamptz,
  location text,
  cover_image text,
  registration_deadline timestamptz,
  created_at timestamptz default now()
);

alter table public.events enable row level security;

create policy "Events are public"
  on public.events for select
  using (true);

create policy "Admins manage events"
  on public.events for all
  using (exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ));

-- Event registrations submitted by logged-in users.
create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  branch text,
  year text,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table public.event_registrations enable row level security;

create policy "Users can view their registrations"
  on public.event_registrations for select
  using (auth.uid() = user_id);

create policy "Users can register for events"
  on public.event_registrations for insert
  with check (auth.uid() = user_id);

create policy "Admins can see all registrations"
  on public.event_registrations for select
  using (exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));



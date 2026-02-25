-- Forma Motion newsletter database (Supabase/Postgres)

create table if not exists public.newsletter_subscribers (
  id bigserial primary key,
  email text not null unique,
  created_at timestamptz not null default now()
);

-- optional: basic email format constraint
alter table public.newsletter_subscribers
  add constraint email_has_at check (position('@' in email) > 1);

-- Enable RLS and allow anonymous inserts only
alter table public.newsletter_subscribers enable row level security;

drop policy if exists "allow_anon_insert" on public.newsletter_subscribers;
create policy "allow_anon_insert"
on public.newsletter_subscribers
for insert
to anon
with check (true);

-- Optional: no public select access by default (keep emails private)

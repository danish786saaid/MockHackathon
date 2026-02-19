-- Migration: Add foreign keys to EXISTING tables
-- Run this if you already have tables from the old schema and want to add FKs
-- For clean install, use supabase-schema.sql instead

-- 0. Ensure default user exists
insert into users (name, email)
select 'Default User', 'default@sentinel.ai'
where not exists (select 1 from users limit 1);

-- 1. Ensure users exists
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  created_at timestamptz default now()
);
alter table users enable row level security;
drop policy if exists "Allow read users" on users;
create policy "Allow read users" on users for select using (true);

-- 2. Ensure news_feed exists
create table if not exists news_feed (
  id uuid primary key default gen_random_uuid(),
  headline text not null,
  source text,
  created_at timestamptz default now()
);
alter table news_feed enable row level security;
drop policy if exists "Allow read news_feed" on news_feed;
create policy "Allow read news_feed" on news_feed for select using (true);

-- 3. Create transactions table
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  asset text not null,
  action text check (action in ('buy', 'sell', 'swap')) not null,
  amount numeric not null,
  created_at timestamptz default now()
);
alter table transactions enable row level security;
drop policy if exists "Allow read transactions" on transactions;
create policy "Allow read transactions" on transactions for select using (true);

-- 4. Add user_id to rules (if missing), then add FK
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name='rules' and column_name='user_id') then
    alter table rules add column user_id uuid;
    update rules set user_id = (select id from users limit 1) where user_id is null;
    alter table rules add constraint rules_user_id_fkey foreign key (user_id) references users(id) on delete cascade;
  end if;
end $$;

-- 5. Add user_id to portfolio (if missing), then add FK
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name='portfolio' and column_name='user_id') then
    alter table portfolio add column user_id uuid;
    update portfolio set user_id = (select id from users limit 1) where user_id is null;
    alter table portfolio add constraint portfolio_user_id_fkey foreign key (user_id) references users(id) on delete cascade;
  end if;
end $$;

-- 6. Add rule_id, news_id to alerts (if missing)
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name='alerts' and column_name='rule_id') then
    alter table alerts add column rule_id uuid references rules(id) on delete set null;
  end if;
  if not exists (select 1 from information_schema.columns where table_name='alerts' and column_name='news_id') then
    alter table alerts add column news_id uuid references news_feed(id) on delete set null;
  end if;
end $$;

-- 7. Add user_id to activities, trust_gauge, risk_trend, portfolio_holdings, total_holding, performance_data
do $$
declare
  t text;
  tbls text[] := array['activities','trust_gauge','risk_trend','portfolio_holdings','total_holding','performance_data'];
begin
  foreach t in array tbls loop
    if exists (select 1 from information_schema.tables where table_name = t) then
      if not exists (select 1 from information_schema.columns where table_name = t and column_name = 'user_id') then
        execute format('alter table %I add column user_id uuid references users(id) on delete cascade', t);
        execute format('update %I set user_id = (select id from users limit 1) where user_id is null', t);
      end if;
    end if;
  end loop;
end $$;

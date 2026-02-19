-- Migration: Add foreign keys ONLY (no table creation, no seed data)
-- Run this if you already have tables and data from a previous schema run
-- This only adds: transactions table, user_id/rule_id/news_id columns, and FK constraints

-- 0. Ensure at least one user exists (needed for user_id updates)
insert into users (name, email)
select 'Default User', 'default@sentinel.ai'
where not exists (select 1 from users limit 1);

-- 1. Create transactions table (new - didn't exist before)
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  asset text not null,
  action text check (action in ('buy', 'sell', 'swap')) not null,
  amount numeric not null,
  created_at timestamptz default now()
);
alter table transactions enable row level security;
create policy "Allow read transactions" on transactions for select using (true);

-- 2. Add user_id FK to rules
alter table rules add column if not exists user_id uuid;
update rules set user_id = (select id from users limit 1) where user_id is null;
alter table rules drop constraint if exists rules_user_id_fkey;
alter table rules add constraint rules_user_id_fkey foreign key (user_id) references users(id) on delete cascade;

-- 3. Add user_id FK to portfolio (may already have user_id column)
alter table portfolio add column if not exists user_id uuid;
update portfolio set user_id = (select id from users limit 1) where user_id is null;
alter table portfolio drop constraint if exists portfolio_user_id_fkey;
alter table portfolio add constraint portfolio_user_id_fkey foreign key (user_id) references users(id) on delete cascade;

-- 3b. Add user_id FK to trust_gauge (may already have user_id column)
alter table trust_gauge add column if not exists user_id uuid;
update trust_gauge set user_id = (select id from users limit 1) where user_id is null;
alter table trust_gauge drop constraint if exists trust_gauge_user_id_fkey;
alter table trust_gauge add constraint trust_gauge_user_id_fkey foreign key (user_id) references users(id) on delete cascade;

-- 4. Add rule_id, news_id to alerts
alter table alerts add column if not exists rule_id uuid references rules(id) on delete set null;
alter table alerts add column if not exists news_id uuid references news_feed(id) on delete set null;

-- 5. Add user_id FK to activities, risk_trend, portfolio_holdings, total_holding, performance_data
alter table activities add column if not exists user_id uuid references users(id) on delete cascade;
update activities set user_id = (select id from users limit 1) where user_id is null;

alter table risk_trend add column if not exists user_id uuid references users(id) on delete cascade;
update risk_trend set user_id = (select id from users limit 1) where user_id is null;

alter table portfolio_holdings add column if not exists user_id uuid references users(id) on delete cascade;
update portfolio_holdings set user_id = (select id from users limit 1) where user_id is null;

alter table total_holding add column if not exists user_id uuid references users(id) on delete cascade;
update total_holding set user_id = (select id from users limit 1) where user_id is null;

alter table performance_data add column if not exists user_id uuid references users(id) on delete cascade;
update performance_data set user_id = (select id from users limit 1) where user_id is null;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text,
  name text,
  email text,
  password text,
  created_at timestamptz default now()
);
alter table users enable row level security;
drop policy if exists "Allow read users" on users;
create policy "Allow read users" on users for select using (true);
drop policy if exists "Allow insert users" on users;
create policy "Allow insert users" on users for insert with check (true);
drop policy if exists "Allow update users" on users;
create policy "Allow update users" on users for update using (true);

-- Migration: add columns if table already exists
alter table users add column if not exists username text;
alter table users add column if not exists password text;
do $$ begin
  alter table users add constraint users_email_key unique (email);
exception when duplicate_object then null;
end $$;
update users set username = 'default_user', password = 'password123'
where username is null;

create table if not exists news_feed (
  id uuid primary key default gen_random_uuid(),
  headline text not null,
  source text,
  created_at timestamptz default now()
);
alter table news_feed enable row level security;
drop policy if exists "Allow read news_feed" on news_feed;
create policy "Allow read news_feed" on news_feed for select using (true);

create table if not exists rules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  rule text not null,
  status text check (status in ('active', 'paused')) default 'active',
  created_at timestamptz default now()
);
alter table rules enable row level security;
drop policy if exists "Allow read rules" on rules;
create policy "Allow read rules" on rules for select using (true);

create table if not exists portfolio (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  value numeric not null default 0,
  return_pct numeric default 0,
  return_amount numeric default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table portfolio enable row level security;
drop policy if exists "Allow read portfolio" on portfolio;
create policy "Allow read portfolio" on portfolio for select using (true);

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

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  rule_id uuid references rules(id) on delete set null,
  news_id uuid references news_feed(id) on delete set null,
  title text not null,
  severity text check (severity in ('safe', 'warning', 'danger')) default 'safe',
  matched_rule text,
  created_at timestamptz default now()
);
alter table alerts enable row level security;
drop policy if exists "Allow read alerts" on alerts;
create policy "Allow read alerts" on alerts for select using (true);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  action text not null,
  created_at timestamptz default now()
);
alter table activities enable row level security;
drop policy if exists "Allow read activities" on activities;
create policy "Allow read activities" on activities for select using (true);

create table if not exists trust_gauge (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  state text check (state in ('safe', 'warning', 'danger')) default 'safe',
  percent numeric default 0,
  reason text,
  updated_at timestamptz default now()
);
alter table trust_gauge enable row level security;
drop policy if exists "Allow read trust_gauge" on trust_gauge;
create policy "Allow read trust_gauge" on trust_gauge for select using (true);

create table if not exists risk_trend (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  day text not null,
  risk numeric not null,
  value numeric not null,
  created_at timestamptz default now()
);
alter table risk_trend enable row level security;
drop policy if exists "Allow read risk_trend" on risk_trend;
create policy "Allow read risk_trend" on risk_trend for select using (true);

create table if not exists news_sentiment (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  value numeric not null,
  color text default '#22c55e',
  created_at timestamptz default now()
);
alter table news_sentiment enable row level security;
drop policy if exists "Allow read news_sentiment" on news_sentiment;
create policy "Allow read news_sentiment" on news_sentiment for select using (true);

create table if not exists portfolio_holdings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  ticker text not null,
  value numeric not null,
  change_pct numeric default 0,
  units integer default 0,
  created_at timestamptz default now()
);
alter table portfolio_holdings enable row level security;
drop policy if exists "Allow read portfolio_holdings" on portfolio_holdings;
create policy "Allow read portfolio_holdings" on portfolio_holdings for select using (true);

create table if not exists total_holding (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  value numeric not null,
  return_pct numeric default 0,
  return_amount numeric default 0,
  updated_at timestamptz default now()
);
alter table total_holding enable row level security;
drop policy if exists "Allow read total_holding" on total_holding;
create policy "Allow read total_holding" on total_holding for select using (true);

create table if not exists performance_data (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  month text not null,
  value numeric not null,
  created_at timestamptz default now()
);
alter table performance_data enable row level security;
drop policy if exists "Allow read performance_data" on performance_data;
create policy "Allow read performance_data" on performance_data for select using (true);

insert into users (name, email)
select 'Default User', 'default@sentinel.ai'
where not exists (select 1 from users limit 1);

alter table portfolio add column if not exists user_id uuid references users(id) on delete cascade;
alter table rules add column if not exists user_id uuid references users(id) on delete cascade;
alter table activities add column if not exists user_id uuid references users(id) on delete cascade;
alter table trust_gauge add column if not exists user_id uuid references users(id) on delete cascade;
alter table risk_trend add column if not exists user_id uuid references users(id) on delete cascade;
alter table portfolio_holdings add column if not exists user_id uuid references users(id) on delete cascade;
alter table total_holding add column if not exists user_id uuid references users(id) on delete cascade;
alter table performance_data add column if not exists user_id uuid references users(id) on delete cascade;
alter table alerts add column if not exists rule_id uuid references rules(id) on delete set null;
alter table alerts add column if not exists news_id uuid references news_feed(id) on delete set null;

do $$
declare
  default_user_id uuid;
  rules_count int;
  activities_count int;
  alerts_count int;
  sentiment_count int;
begin
  select id into default_user_id from users limit 1;

  insert into portfolio (user_id, value, return_pct, return_amount)
  select default_user_id, 124520, 2.4, 530
  where not exists (select 1 from portfolio limit 1);

  insert into trust_gauge (user_id, state, percent, reason)
  select default_user_id, 'safe', 94, 'No high-risk news matched your rules in the last 24h.'
  where not exists (select 1 from trust_gauge limit 1);

  select count(*) into rules_count from rules;
  if rules_count = 0 then
    insert into rules (user_id, rule, status) values
      (default_user_id, 'If major regulatory crackdown on stablecoins in US, swap USDT to USDC', 'active'),
      (default_user_id, 'If exchange hack reported, pause all trading', 'active'),
      (default_user_id, 'If BTC drops >15% in 24h on bad news, reduce exposure by 50%', 'active'),
      (default_user_id, 'If Fed signals aggressive rate hike, move 20% to stablecoins', 'paused');
  end if;

  select count(*) into activities_count from activities;
  if activities_count = 0 then
    insert into activities (user_id, action) values
      (default_user_id, 'Rule ''USDT to USDC swap'' added'),
      (default_user_id, 'News scan completed - 12 articles'),
      (default_user_id, 'Portfolio sync successful'),
      (default_user_id, 'Trust gauge updated: Low Risk');
  end if;

  insert into portfolio_holdings (user_id, ticker, value, change_pct, units)
  select default_user_id, v.ticker, v.value, v.change_pct, v.units
  from (values
    ('AAPL', 1721.3, 0.92, 104),
    ('TSLA', 1521.3, -0.45, 124),
    ('MSFT', 1721.3, 1.2, 10),
    ('GOOG', 1521.3, 0.88, 90),
    ('NVDA', 1721.3, 2.1, 104)
  ) v(ticker, value, change_pct, units)
  where not exists (select 1 from portfolio_holdings limit 1);

  insert into total_holding (user_id, value, return_pct, return_amount)
  select default_user_id, 12304.11, 3.6, 530
  where not exists (select 1 from total_holding limit 1);

  insert into performance_data (user_id, month, value)
  select default_user_id, v.month, v.value
  from (values
    ('Jan', 50000), ('Feb', 75000), ('Mar', 95000), ('Apr', 125000),
    ('May', 155000), ('Jun', 165500), ('Jul', 172000)
  ) v(month, value)
  where not exists (select 1 from performance_data limit 1);

  insert into risk_trend (user_id, day, risk, value)
  select default_user_id, v.day, v.risk, v.value
  from (values
    ('Mon', 12, 118200), ('Tue', 18, 121500), ('Wed', 8, 119800),
    ('Thu', 22, 120100), ('Fri', 15, 122400), ('Sat', 10, 123100), ('Sun', 6, 124520)
  ) v(day, risk, value)
  where not exists (select 1 from risk_trend limit 1);

  select count(*) into alerts_count from alerts;
  if alerts_count = 0 then
    insert into alerts (title, severity, matched_rule) values
      ('Fed holds rates steady', 'safe', null),
      ('Stablecoin legislation draft in US Senate', 'warning', 'Regulatory crackdown on stablecoins'),
      ('56 new users registered', 'safe', null),
      ('Major exchange reports outage', 'danger', 'Exchange security incident');
  end if;

  select count(*) into sentiment_count from news_sentiment;
  if sentiment_count = 0 then
    insert into news_sentiment (name, value, color) values
      ('Safe', 72, '#22c55e'),
      ('Warning', 18, '#f59e0b'),
      ('Danger', 10, '#ef4444');
  end if;
end $$;

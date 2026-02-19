-- Run this in Supabase SQL Editor to CLEAR all data and see empty/zero states
-- (Tables stay, but all rows are deleted)
-- Order: child tables first (alerts references rules, news_feed)

truncate table alerts restart identity cascade;
truncate table transactions restart identity cascade;
truncate table portfolio restart identity cascade;
truncate table rules restart identity cascade;
truncate table activities restart identity cascade;
truncate table trust_gauge restart identity cascade;
truncate table risk_trend restart identity cascade;
truncate table news_sentiment restart identity cascade;
truncate table portfolio_holdings restart identity cascade;
truncate table total_holding restart identity cascade;
truncate table performance_data restart identity cascade;

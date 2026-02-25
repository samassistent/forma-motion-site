# Newsletter Database Setup (Free)

Use **Supabase Free** as your central subscriber database.

## 1) Create project
- Go to https://supabase.com
- Create a free project

## 2) Create table
- Open SQL Editor
- Run `schema.sql`

## 3) Get credentials
- Project Settings -> API
- Copy:
  - Project URL
  - anon public key

## 4) Connect website
- Open `newsletter.js`
- Fill:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`

## 5) View subscribers
- In Supabase Table Editor: `newsletter_subscribers`
- Or query:
  ```sql
  select * from newsletter_subscribers order by created_at desc;
  ```

## Privacy
- Keep service role key secret (never put it in website JS).
- Website uses only anon key for inserts.

# Admin Panel Setup (Supabase)

The admin panel needs a Supabase project — this is where cards, orders, the
admin login, and card image uploads live. One free account covers all of it.
Follow these steps, then send the three keys back so the panel can be wired up.

## 1. Create the project
1. Go to https://supabase.com → sign up (free).
2. **New project** → name it `momintum` → pick a strong database password → choose a region near San Antonio (e.g. `East US`).
3. Wait ~2 minutes for it to provision.

## 2. Create the tables + storage
1. In the project, open **SQL Editor** (left sidebar) → **New query**.
2. Open the file [`supabase/schema.sql`](supabase/schema.sql) from this repo, copy its **entire** contents, paste into the editor.
3. Click **Run**. You should see "Success". This creates the `products` and `orders` tables, the `cards` image bucket, security rules, and seeds the sample cards.

## 3. Create your admin login
1. Left sidebar → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Enter your email + a password you'll remember. Toggle **Auto Confirm User** ON.
3. This email/password is how you'll log into `/admin`.

## 4. Grab the keys
1. Left sidebar → **Project Settings** (gear) → **API**.
2. Copy these three values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`  ⚠️ keep this one secret

## 5. Send them over
Paste the three values back here (or drop them into `.env.local`). Once I have
them I'll finish wiring the shop + admin panel and test everything end-to-end.

Then they also go into **Vercel → Settings → Environment Variables** (all 3
environments) for the live site, followed by a redeploy without build cache.

-- ─────────────────────────────────────────────────────────────
--  Momintum shop — Supabase schema
--  Run this in your Supabase project: SQL Editor → New query → paste → Run.
-- ─────────────────────────────────────────────────────────────

-- ── Products ──
create table if not exists public.products (
  id          text primary key,
  name        text not null,
  price       numeric not null check (price >= 0),
  category    text not null,
  image       text,
  stock       int  not null default 0 check (stock >= 0),
  featured    boolean not null default false,
  description text,
  created_at  timestamptz not null default now()
);

-- ── Orders ──
create table if not exists public.orders (
  id                uuid primary key default gen_random_uuid(),
  customer_name     text not null,
  email             text not null,
  phone             text,
  fulfillment       text not null,            -- 'pickup' | 'delivery'
  address           text,
  items             jsonb not null,           -- [{ id, name, price, qty }]
  subtotal          numeric not null,
  delivery_fee      numeric not null default 0,
  total             numeric not null,
  paypal_capture_id text,
  status            text not null default 'paid', -- paid|packed|ready|shipped|completed|cancelled
  created_at        timestamptz not null default now()
);

-- ── Row Level Security ──
alter table public.products enable row level security;
alter table public.orders   enable row level security;

-- Products: everyone can read; only logged-in admins can write.
drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products for select using (true);
drop policy if exists products_auth_write on public.products;
create policy products_auth_write on public.products for all to authenticated using (true) with check (true);

-- Orders: only logged-in admins can read/update. Inserts happen from the
-- server via the service-role key (which bypasses RLS), so no insert policy needed.
drop policy if exists orders_auth_read on public.orders;
create policy orders_auth_read on public.orders for select to authenticated using (true);
drop policy if exists orders_auth_update on public.orders;
create policy orders_auth_update on public.orders for update to authenticated using (true);

-- ── Storage bucket for card images ──
insert into storage.buckets (id, name, public)
values ('cards', 'cards', true)
on conflict (id) do nothing;

drop policy if exists card_images_public_read on storage.objects;
create policy card_images_public_read on storage.objects for select using (bucket_id = 'cards');
drop policy if exists card_images_auth_write on storage.objects;
create policy card_images_auth_write on storage.objects for insert to authenticated with check (bucket_id = 'cards');
drop policy if exists card_images_auth_update on storage.objects;
create policy card_images_auth_update on storage.objects for update to authenticated using (bucket_id = 'cards');
drop policy if exists card_images_auth_delete on storage.objects;
create policy card_images_auth_delete on storage.objects for delete to authenticated using (bucket_id = 'cards');

-- ── Seed with the current sample catalog (safe to re-run) ──
insert into public.products (id, name, price, category, image, stock, featured, description) values
  ('pkmn-151-etb',        'Pokémon 151 Elite Trainer Box',     59.99,  'Sealed Product', 'https://images.pokemontcg.io/sv3pt5/logo.png', 8,  true,  'Sealed Scarlet & Violet 151 ETB — 9 booster packs + accessories.'),
  ('charizard-base-psa9', 'Charizard Base Set — PSA 9',         899.00, 'Graded Slabs',   'https://images.pokemontcg.io/base1/4.png',    1,  true,  'Iconic 1999 Base Set Charizard, graded PSA 9 Mint.'),
  ('onepiece-op05-booster','One Piece OP-05 Booster Box',       104.99, 'Sealed Product', 'https://images.pokemontcg.io/sv1/logo.png',   5,  false, 'Awakening of the New Era sealed booster box — 24 packs.'),
  ('luffy-leader-alt',    'Monkey D. Luffy — Alt Art Leader',   74.50,  'One Piece',      'https://images.pokemontcg.io/base1/58.png',   3,  false, 'Sought-after alternate-art Luffy leader card, near mint.'),
  ('prizm-rookie-lot',    'NBA Prizm Rookie Lot (10 cards)',    39.99,  'Sports Cards',   'https://images.pokemontcg.io/base1/10.png',   12, false, 'Curated 10-card lot of Prizm basketball rookies.'),
  ('mewtwo-holo-nm',      'Mewtwo Base Set Holo — NM',          129.99, 'Pokémon',        'https://images.pokemontcg.io/base1/10.png',   2,  true,  'Base Set holographic Mewtwo in near-mint condition.'),
  ('blastoise-base-lp',   'Blastoise Base Set — LP',            149.99, 'Pokémon',        'https://images.pokemontcg.io/base1/2.png',    2,  false, 'Base Set Blastoise holo, lightly played.'),
  ('venusaur-base-psa8',  'Venusaur Base Set — PSA 8',          219.00, 'Graded Slabs',   'https://images.pokemontcg.io/base1/15.png',   1,  false, 'Base Set Venusaur graded PSA 8 NM-MT.'),
  ('nfl-mosaic-blaster',  'NFL Mosaic Blaster Box',             44.99,  'Sealed Product', 'https://images.pokemontcg.io/base1/4.png',    0,  false, 'Panini Mosaic football blaster — chase the Reactive prizms.')
on conflict (id) do nothing;

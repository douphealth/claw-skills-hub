create table if not exists public.pro_bundle_purchases (
  id uuid primary key default gen_random_uuid(),
  stripe_checkout_session_id text not null unique,
  stripe_payment_intent_id text,
  customer_email text,
  product_key text not null default 'openclaw_pro_bundle',
  amount_total bigint not null default 0,
  currency text not null default 'usd',
  payment_status text not null check (payment_status in ('paid','unpaid','no_payment_required')),
  fulfilled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.pro_bundle_purchases enable row level security;

revoke all on table public.pro_bundle_purchases from anon, authenticated;

create index if not exists pro_bundle_purchases_email_idx
  on public.pro_bundle_purchases (customer_email);

create index if not exists pro_bundle_purchases_payment_intent_idx
  on public.pro_bundle_purchases (stripe_payment_intent_id);

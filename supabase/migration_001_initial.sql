-- ============================================================
-- CorDocu — Supabase Migration
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ─── Extensions ──────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── doc_categories ──────────────────────────────────────────
create table if not exists public.doc_categories (
  id              uuid primary key default uuid_generate_v4(),
  slug            text not null unique,
  label           text not null,
  short_description text,
  icon_key        text not null default 'file-text',
  default_expanded boolean not null default false,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ─── doc_content_items ───────────────────────────────────────
create table if not exists public.doc_content_items (
  id              uuid primary key default uuid_generate_v4(),
  category_id     uuid not null references public.doc_categories(id) on delete cascade,
  slug            text not null,
  label           text not null,
  description     text,
  body            text,
  featured_order  integer,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique(category_id, slug)
);

-- ─── doc_page_views (örnek analitik tablo) ───────────────────
create table if not exists public.doc_page_views (
  id              bigserial primary key,
  category_slug   text not null,
  item_slug       text,
  viewed_at       timestamptz not null default now(),
  session_id      text
);

-- ─── Row Level Security ──────────────────────────────────────
alter table public.doc_categories    enable row level security;
alter table public.doc_content_items enable row level security;
alter table public.doc_page_views    enable row level security;

-- Herkes okuyabilir (public docs hub)
create policy "public read doc_categories"
  on public.doc_categories for select
  using (true);

create policy "public read doc_content_items"
  on public.doc_content_items for select
  using (true);

-- page_views: herkes insert yapabilir (anonim tracking), okuma kapalı
create policy "public insert page_views"
  on public.doc_page_views for insert
  with check (true);

-- ─── updated_at otomatik güncelleme ──────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_doc_categories_updated_at
  before update on public.doc_categories
  for each row execute function public.set_updated_at();

create trigger trg_doc_content_items_updated_at
  before update on public.doc_content_items
  for each row execute function public.set_updated_at();

-- ─── Örnek seed verisi ───────────────────────────────────────
insert into public.doc_categories (slug, label, short_description, icon_key, sort_order)
values
  ('general',  'GENEL',            'Genel proje bilgileri ve giriş dökümanları.',          'home',      0),
  ('toplanti', 'TOPLANTI NOTLARI', 'T1 ve T2 toplantı özetleri, kararlar ve eylem maddeleri.', 'calendar', 1),
  ('captable', 'CAP TABLE',        'Hisse yapısı, vesting planı ve yönetişim kuralları.',  'layers',    2)
on conflict (slug) do nothing;

-- ─── İndeksler ───────────────────────────────────────────────
create index if not exists idx_doc_content_items_category_id
  on public.doc_content_items(category_id);

create index if not exists idx_doc_page_views_category_slug
  on public.doc_page_views(category_slug, viewed_at desc);

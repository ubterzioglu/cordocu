create table if not exists public.doc_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  short_description text not null,
  icon_key text not null,
  default_expanded boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists doc_categories_sort_order_idx
  on public.doc_categories (sort_order);

alter table public.doc_categories enable row level security;

grant select on public.doc_categories to anon, authenticated;

drop policy if exists "doc_categories_select_public" on public.doc_categories;

create policy "doc_categories_select_public"
on public.doc_categories
for select
to anon, authenticated
using (true);

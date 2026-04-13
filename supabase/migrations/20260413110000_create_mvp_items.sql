create table if not exists mvp_items (
  id uuid primary key default gen_random_uuid(),
  konu text not null,
  sub text,
  ayrinti text,
  mvp_level text not null default 'Atanmadi',
  added_by text not null default 'All',
  is_seed boolean not null default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint mvp_items_mvp_level_check
    check (mvp_level in ('MVP1', 'MVP2', 'MVP3', 'Atanmadi')),
  constraint mvp_items_added_by_check
    check (added_by in ('UBT', 'Burak', 'Diğer', 'All'))
);

create or replace function public.set_mvp_items_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_mvp_items_updated_at on mvp_items;

create trigger set_mvp_items_updated_at
before update on mvp_items
for each row
execute function public.set_mvp_items_updated_at();

alter table mvp_items enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'mvp_items' and policyname = 'Allow all'
  ) then
    execute 'create policy "Allow all" on mvp_items for all using (true) with check (true)';
  end if;
end
$$;
